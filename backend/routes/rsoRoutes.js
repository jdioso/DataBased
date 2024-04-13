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
		});
		res.status(201).json({ message: 'RSO created successfully', rsoID: newRSO.rsoID });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Update RSO by ID
router.put('/edit', async (req, res) => {
	const { id } = req.body;
	try {
		const updatedRSO = await db.rsos.update(req.body, {
			where: { rsoID: id }
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
	const { id } = req.body;
	try {
		const deletedCount = await db.RSO.destroy({ where: { rsoID: id } });
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
		const allRSOs = await db.RSO.findAll();
		res.status(200).json(allRSOs);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Search RSOs by name
router.get('/rso', async (req, res) => {
	try {
		const { name } = req.query;
		if (!name) {
			return res.status(400).send('Name parameter is required');
		}

		const rsoByName = await db.RSO.findAll({
			where: {
				name: {
					[db.Sequelize.Op.iLike]: `%${name}%` // Case-insensitive search
				}
			}
		});

		res.status(200).json(rsoByName);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

module.exports = router;
