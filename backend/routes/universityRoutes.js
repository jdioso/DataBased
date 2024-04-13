const express = require('express');
const db  = require('../models'); // Adjust according to your models' structure
const router = express.Router();

// Function to handle validation errors
const handleValidationError = (err, res) => {
	const errors = err.errors.map(e => e.message);
	console.error('Validation errors', errors);
	res.status(400).json({ message: "Validation errors", details: errors });
};

// Create University
router.post('/add', async (req, res) => {
	try {
		const universityData = req.body;
		if (!universityData.name || !universityData.location || !universityData.numStudents) {
			return res.status(400).send('Missing required fields');
		}
		const newUniversity = await db.university.create(universityData);
		res.status(201).json({ message: 'University created', universityID: newUniversity.universityID });
	} catch (err) {
		console.error('Error creating university:', err.message);
		if (err.name === 'SequelizeValidationError') return handleValidationError(err, res);
		res.status(500).send('Server error');
	}
});

// Delete University
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deletedEvents = await db.events.destroy({ where: { universityID: id } });
		const deleted = await db.university.destroy({ where: { universityID: id } });
		if (deleted) {
			res.status(200).json({ message: 'University deleted', universityID: id, eventsDeleted: deletedEvents });
		} else {
			res.status(404).send('University not found');
		}
	} catch (err) {
		console.error('Error deleting university:', err.message);
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
		console.error('Error updating university:', err.message);
		if (err.name === 'SequelizeValidationError') return handleValidationError(err, res);
		res.status(500).send('Server error');
	}
});

// Get All Universities
router.get('/searchAll', async (req, res) => {
	try {
		const universityList = await db.university.findAll();
		res.status(200).json(universityList);
	} catch (err) {
		console.error('Error fetching all universities:', err.message);
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
		console.error('Error fetching university:', err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
