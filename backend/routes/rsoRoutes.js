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

// Create RSO
router.post('/add', async (req, res) => {
	try {
		const { userID, name, numMembers, description, memberIDs } = req.body;

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

		// If no existing RSO is found, create the new RSO
		const newRSO = await db.rsos.create({
			userID,
			name,
			numMembers,
			description,
			memberIDs
		});
		res.status(201).json({ message: 'RSO created successfully', rsoID: newRSO.rsoID });
	} catch (err) {
		console.error('Failed to create RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});

// Update RSO by ID
router.put('/edit', async (req, res) => {
	const { id, name } = req.body;

	// First, check if there is another RSO with the same name and different ID
	try {
		const existingRSO = await db.rsos.findOne({
			where: {
				name: name,
				rsoID: { [db.Sequelize.Op.ne]: id }
			}
		});

		if (existingRSO) {
			return res.status(409).json({ message: 'An RSO with the same name already exists.' });
		}

		// Fetch the current RSO details to compare
		const currentRSO = await db.rsos.findByPk(id);
		if (!currentRSO) {
			return res.status(404).send('RSO not found');
		}

		// Check if the update details are the same as the existing ones
		if (currentRSO.name === name &&
			currentRSO.numMembers === req.body.numMembers &&
			currentRSO.description === req.body.description &&
			JSON.stringify(currentRSO.memberIDs) === JSON.stringify(req.body.memberIDs)) {
			return res.status(200).json({ message: 'No changes were made to the RSO.' });
		}

		// Proceed with updating the RSO
		const updatedRSO = await db.rsos.update(req.body, {
			where: { rsoID: id }
		});

		if (updatedRSO[0] === 1) {
			res.status(200).send('RSO updated successfully');
		} else {
			res.status(404).send('RSO not found');
		}
	} catch (err) {
		console.error('Failed to update RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});


// Delete RSO by ID
router.delete('/delete', async (req, res) => {
	const { id } = req.body;
	try {
		const deletedCount = await db.rsos.destroy({ where: { rsoID: id } });
		if (deletedCount === 1) {
			res.status(200).send('RSO deleted successfully');
		} else {
			res.status(404).send('RSO not found');
		}
	} catch (err) {
		console.error('Failed to delete RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
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
		await db.rsoMem.create({ rsoID, userID });
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
		const result = await db.rsoMem.destroy({
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

// List all members of an RSO
router.get('/:rsoID/members', async (req, res) => {
	const { rsoID } = req.params;

	try {
		const members = await db.rsoMem.findAll({
			where: { rsoID },
			include: [{
				model: db.users,
				as: 'user',
				attributes: ['userID', 'email', 'firstName', 'lastName']
			}]
		});

		res.status(200).json(members);
	} catch (err) {
		console.error('Failed to list members of RSO:', err);
		res.status(500).json({ error: 'Server error', message: err.message });
	}
});

module.exports = router;
