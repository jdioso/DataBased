const express = require('express');
const db  = require('../models'); // Adjust according to your models' structure
const router = express.Router();

// Create University
router.post('/add', async (req, res) => {
	try {
		const universityData = req.body;
		const newUniversity = await db.university.create(universityData);
		res.status(201).json({ message: 'University created', universityID: newUniversity.universityID });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Delete University
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		// First, delete or update the child rows.
		// For example, if you want to delete them:
		await db.events.destroy({ where: { universityID: id } });

		// Now, delete the university itself.
		const deleted = await db.university.destroy({ where: { universityID: id } });
		if (deleted) {
			res.status(200).json({ message: 'University deleted', universityID: id });
		} else {
			res.status(404).send('University not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});


// Edit University
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const universityData = req.body;
	try {
		const [updated] = await db.university.update(universityData, { where: { universityID: id } });
		if (updated) {
			res.status(200).json({ message: 'University updated', universityID: id });
		} else {
			res.status(404).send('University not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Get All Universities
router.get('/searchAll', async (req, res) => {
	try {
		const universityList = await db.university.findAll();
		res.status(200).json(universityList);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// Get University by ID
router.get('/search/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const university = await db.university.findByPk(id);
		if (university) {
			res.status(200).json(university);
		} else {
			res.status(404).send('University not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

module.exports = router;
