const express = require('express');
const db = require('../models'); // Adjust according to your models' structure
const router = express.Router();

// Function to handle validation errors
const handleValidationError = (err, res) => {
	const errors = err.errors.map(e => e.message);
	console.error('Validation errors', errors);
	res.status(400).json({ message: "Validation errors", details: errors });
};

// Create University, figure out picture later
router.post('/add', async (req, res) => {
	try {
		const { name, location, description, saID, domain, numStudents, picture } = req.body;
			if (!name || !location || !description || !saID || !numStudents || domain) {
			return res.status(400).send('Missing required fields');
		}

		// Check for duplicate name
		const existingUniversity = await db.university.findOne({ where: { name } });
		if (existingUniversity) {
			return res.status(409).json({ message: 'A university with this name already exists.' });
		}
		const newUniversity = await db.university.create({ name, location, description, userID, numStudents, picture });
		res.status(201).json({ message: 'University created', universityID: newUniversity.universityID });
	} catch (err) {
		console.error('Error creating university:', err.message);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).json({ message: 'Server error', error: err.message });
		}
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
			res.status(404).json({ message: 'University not found', universityID: id });
		}
	} catch (err) {
		console.error('Error deleting university:', err.message);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// Edit University
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const updateData = req.body;
	try {
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No data provided for update." });
		}

		// First, check if the university exists
		const university = await db.university.findByPk(id);
		if (!university) {
			return res.status(404).json({ message: 'University not found', universityID: id });
		}

		// Check for empty strings in the update fields
		for (const key in updateData) {
			if (updateData.hasOwnProperty(key) && updateData[key].trim() === "") {
				return res.status(400).json({ message: `Invalid update: ${key} cannot be empty.` });
			}
		}

		// If name is in the request and it's different from the current name
		if (updateData.name && updateData.name !== university.name) {
			// Check if another university with the new name already exists
			const existingUniversity = await db.university.findOne({ where: { name: updateData.name } });
			if (existingUniversity) {
				return res.status(409).json({ message: 'Another university with this name already exists.', name: updateData.name });
			}
		}

		// Check if the update data is different from existing data
		const needsUpdate = Object.keys(updateData).some(key => university[key] !== updateData[key]);
		if (!needsUpdate) {
			return res.status(200).json({ message: 'No changes were made to the university.', universityID: id });
		}

		// Proceed with the update if changes are needed
		const [updated] = await db.university.update(updateData, { where: { universityID: id } });
		if (updated) {
			res.status(200).json({ message: 'University updated', universityID: id });
		} else {
			// If for some reason the update fails
			res.status(500).json({ message: 'Failed to update university', universityID: id });
		}
	} catch (err) {
		console.error('Error updating university:', err.message);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).json({ message: 'Server error', error: err.message });
		}
	}
});

// Get All Universities
router.get('/searchAll', async (req, res) => {
	try {
		const universityList = await db.university.findAll();
		res.status(200).json(universityList);
	} catch (err) {
		console.error('Error fetching all universities:', err.message);
		res.status(500).json({ message: 'Server error', error: err.message });
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
			res.status(404).json({ message: 'University not found', universityID: id });
		}
	} catch (err) {
		console.error('Error fetching university:', err.message);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// Get University by domain
router.get('/search/:domain', async (req, res) => {
	const { domain } = req.params;
	try {
		const existingUniversity = await db.university.findOne({ where: { domain } });
		if (existingUniversity) {
			res.status(200).json(existingUniversity);
		} else {
			res.status(404).json({ message: 'University not found', domain: domain });
		}
	} catch (err) {
		console.error('Error fetching university:', err.message);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

module.exports = router;
