const express = require('express');
const db = require('../models');

const router = express.Router();

// Utility function to check if any field is empty
const isFieldEmpty = (value) => {
	if (value === null || value === undefined) return true;
	if (typeof value === 'string' && value.trim() === '') return true;
	if (typeof value === 'number' && !isFinite(value)) return true; // Check for NaN, Infinity, or -Infinity
	return false;
};

// Create RSO and add user as admin
router.post('/add', async (req, res) => {
	try {
		const { userID, name, numMembers, description } = req.body;

		// Validate required fields
		if (isFieldEmpty(userID) || isFieldEmpty(name) || isFieldEmpty(numMembers) || isFieldEmpty(description)) {
			return res.status(400).json({ error: 'Missing required fields', message: 'Ensure all required fields are provided and non-empty.' });
		}

		// Check if an RSO with the same name already exists
		const existingRSO = await db.rsos.findOne({
			where: { name }
		});

		if (existingRSO) {
			return res.status(409).json({ message: 'An RSO with this name already exists.' });
		}

		// Begin transaction to ensure data consistency
		const result = await db.sequelize.transaction(async (t) => {
			// Create admin entry first
			const newAdmin = await db.admins.create({
				userID: userID
			}, { transaction: t });

			// Create new RSO entry, referencing the newly created adminID
			const newRSO = await db.rsos.create({
				name,
				numMembers,
				description,
				adminID: newAdmin.adminID  // Set the newly created admin as the admin
			}, { transaction: t });

			return { newRSO, newAdmin };
		});

		res.status(201).json({ message: 'RSO created successfully with admin', rsoID: result.newRSO.rsoID, adminID: result.newAdmin.adminID });
	} catch (err) {
		console.error('Failed to create RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});
// Update RSO by ID
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const { name, numMembers, description } = req.body;

	// First, check if there is another RSO with the same name and different ID
	try {
		const existingRSO = await db.rsos.findOne({
			where: {
				name,
				rsoID: { [db.Sequelize.Op.ne]: id }
			}
		});

		if (existingRSO) {
			return res.status(409).json({ message: 'An RSO with the same name already exists.' });
		}

		const currentRSO = await db.rsos.findByPk(id);
		if (!currentRSO) {
			return res.status(404).json({ message: 'RSO not found' });
		}

		// Check for actual data changes
		const isUnchanged = currentRSO.name === name &&
			currentRSO.numMembers === numMembers &&
			currentRSO.description === description;
		if (isUnchanged) {
			return res.status(200).json({ message: 'No changes were made to the RSO.' });
		}

		// Proceed with updating the RSO
		const [updateCount] = await db.rsos.update(
			{ name, numMembers, description },
			{ where: { rsoID: id } }
		);

		if (updateCount > 0) {
			res.status(200).json({ message: 'RSO updated successfully', rsoID: id });
		} else {
			res.status(404).json({ message: 'RSO not found' });
		}
	} catch (err) {
		console.error('Failed to update RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});


router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await db.sequelize.transaction(async (t) => {
			// Fetch the RSO to get the adminID before deletion
			const rso = await db.rsos.findByPk(id, { transaction: t });
			if (!rso) throw new Error('RSO not found');

			// Delete all events associated with the RSO
			const eventsDeleted = await db.events.destroy({
				where: { rsoID: id },
				transaction: t
			});

			// Delete all RSO members
			const membersDeleted = await db.rso_members.destroy({
				where: { rsoID: id },
				transaction: t
			});

			// Delete the RSO
			const rsoDeleted = await db.rsos.destroy({
				where: { rsoID: id },
				transaction: t
			});

			// Now safely delete the admin since it's no longer referenced
			const adminDeleted = await db.admins.destroy({
				where: { adminID: rso.adminID },
				transaction: t
			});

			return { rsoDeleted, adminDeleted, eventsDeleted, membersDeleted };
		});

		res.status(200).json({
			message: 'RSO and all associated data deleted successfully',
			details: result
		});
	} catch (err) {
		console.error('Failed to delete RSO:', err);
		res.status(err.message === 'RSO not found' ? 404 : 500).json({ error: 'Server error', message: err.message });
	}
});


// Search all RSOs
router.get('/searchAll', async (req, res) => {
	try {
		const allRSOs = await db.rsos.findAll();
		res.status(200).json(allRSOs);
	} catch (err) {
		console.error('Failed to retrieve RSOs:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});

// Search RSOs by name
router.get('/searchAll/:name', async (req, res) => {
	const { name } = req.params;
	try {
		const RSO = await db.rsos.findOne({ where: { name } });
		if (RSO) {
			res.status(200).json(RSO);
		} else {
			res.status(404).send('RSO not found');
		}
	} catch (err) {
		console.error('Error fetching RSO by name:', err.message);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});

// Add a member to an RSO
router.post('/:rsoID/members/add', async (req, res) => {
	const { rsoID } = req.params;
	const { userID } = req.body;

	// Validate required fields
	if (isFieldEmpty(rsoID) || isFieldEmpty(userID)) {
		return res.status(400).json({ error: 'Missing required fields', message: 'RSO ID and User ID are required.' });
	}

	try {
		await db.rso_members.create({ rsoID, userID });
		res.status(201).json({ message: 'Member added to RSO successfully.' });
	} catch (err) {
		console.error('Failed to add member to RSO:', err);
		let status = 500;
		let errorMessage = 'Server error';
		switch (err.name) {
			case 'SequelizeForeignKeyConstraintError':
				status = 400;
				errorMessage = 'Invalid RSO ID or User ID';
				break;
			case 'SequelizeUniqueConstraintError':
				status = 409;
				errorMessage = 'User is already a member of this RSO';
				break;
		}
		res.status(status).json({ error: err.name, message: errorMessage });
	}
});

// Remove a member from an RSO
router.delete('/:rsoID/members/:userID', async (req, res) => {
	const { rsoID, userID } = req.params;

	try {
		const result = await db.rso_members.destroy({
			where: { rsoID, userID }
		});

		if (result > 0) {
			res.status(200).json({ message: 'Member removed from RSO successfully.' });
		} else {
			res.status(404).send('Member not found.');
		}
	} catch (err) {
		console.error('Failed to remove member from RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});


router.get('/searchAll/:rsoID/members', async (req, res) => {
	const { rsoID } = req.params;

	try {
		const members = await db.rso_members.findAll({
			where: { rsoID }
		});

		res.status(200).json(members);
	} catch (err) {
		console.error('Failed to retrieve RSO members:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});

module.exports = router;
