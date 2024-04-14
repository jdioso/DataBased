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

module.exports = router;
