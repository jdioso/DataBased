const express = require('express');
const db = require('../models');

const router = express.Router();

// Create RSO
router.post('/add', async (req, res) => {
	try {
		const { userID, name, numMembers, description, memberIDs } = req.body;

		const newRSO = await db.rsos.create({
			userID,
			name,
			numMembers,
			description,
			memberIDs
		});
		res.status(201).json({message: 'RSO created successfully', rsoID: newRSO.rsoID});
	// 	Considering adding admin (userID) to the rso_members table
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Update RSO by ID
router.put('/edit', async (req, res) => {
	const {id} = req.body;
	try {
		const updatedRSO = await db.rsos.update(req.body, {
			where: {rsoID: id}
		});
		if (updatedRSO[0] === 1) {
			res.status(200).send('RSO updated successfully');
		} else {
			res.status(404).send('RSO not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Delete RSO by ID
router.delete('/delete', async (req, res) => {
	const {id} = req.body;
	try {
		const deletedCount = await db.rsos.destroy({ where: { rsoID: id } });
		if (deletedCount === 1) {
			res.status(200).send('RSO deleted successfully');
		} else {
			res.status(404).send('RSO not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Search all RSOs
router.get('/searchAll', async (req, res) => {
	try {
		const allRSOs = await db.rsos.findAll();
		res.status(200).json(allRSOs);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
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
        console.error('Error fetching RSO:', err.message);
        res.status(500).send('Server error');
    }
});

// Add a member to an RSO
router.post('/:rsoID/members/add', async (req, res) => {
	const {rsoID} = req.params;
	const {userID} = req.body;

	try {
		await db.rsoMem.create({rsoID, userID});
		res.status(201).json({message: 'Member added to RSO successfully.'});
	} catch (err) {
		if (err.name === 'SequelizeForeignKeyConstraintError') {
			res.status(400).send('Invalid RSO ID or User ID');
		} else if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(409).send('User is already a member of this RSO');
		} else {
			console.error(err);
			res.status(500).send('Server error');
		}
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
		console.error(err);
		res.status(500).send('Server error');
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
		console.error(err);
		res.status(500).send('Server error');
	}
});


module.exports = router;
