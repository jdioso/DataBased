const express = require('express');
const db = require('../models');
const router = express.Router();

// Function to handle validation errors
const handleValidationError = (err, res) => {
	const errors = err.errors.map(e => e.message);
	console.error('Validation errors', errors);
	res.status(400).json({ message: "Validation errors", details: errors });
};

// Function for logging errors
const logError = (err, operation, specifics = '') => {
	console.error(`${operation} error${specifics ? ` for ${specifics}` : ''}:`, err.message);
};

// Create Event
router.post('/add', async (req, res) => {
	try {
		const eventData = req.body;
		// Basic validation for required fields could be added here if necessary
		const newEvent = await db.events.create(eventData);
		res.status(201).json({ message: 'Event created', eventID: newEvent.eventID });
	} catch (err) {
		logError(err, 'Create', 'event');
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).send('Server error');
		}
	}
});

// Delete Event
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deleted = await db.events.destroy({ where: { eventID: id } });
		if (deleted) {
			res.status(200).json({ message: 'Event deleted', eventID: id });
		} else {
			res.status(404).send('Event not found');
		}
	} catch (err) {
		logError(err, 'Delete', `event ${id}`);
		res.status(500).send('Server error');
	}
});

// Edit Event
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const eventData = req.body;
	try {
		const [updated] = await db.events.update(eventData, { where: { eventID: id } });
		if (updated) {
			res.status(200).json({ message: 'Event updated', eventID: id });
		} else {
			res.status(404).send('Event not found');
		}
	} catch (err) {
		logError(err, 'Update', `event ${id}`);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).send('Server error');
		}
	}
});

// Get All Events
router.get('/searchAll', async (req, res) => {
	try {
		const eventsList = await db.events.findAll();
		res.status(200).json(eventsList);
	} catch (err) {
		logError(err, 'Retrieve', 'all events');
		res.status(500).send('Server error');
	}
});

// Get Events by University ID
router.get('/searchUni/:universityID', async (req, res) => {
	const { universityID } = req.params;
	try {
		const eventsList = await db.events.findAll({ where: { universityID: universityID } });
		if (eventsList.length > 0) {
			res.status(200).json(eventsList);
		} else {
			res.status(404).send('No events found for this university');
		}
	} catch (err) {
		logError(err, 'Retrieve', `events for university ${universityID}`);
		res.status(500).send('Server error');
	}
});

// Get Events by RSO ID
router.get('/searchRSO/:rsoID', async (req, res) => {
	const { rsoID } = req.params;
	try {
		const eventsList = await db.events.findAll({ where: { rsoID: rsoID } });
		if (eventsList.length > 0) {
			res.status(200).json(eventsList);
		} else {
			res.status(404).send('No events found for this RSO');
		}
	} catch (err) {
		logError(err, 'Retrieve', `events for RSO ${rsoID}`);
		res.status(500).send('Server error');
	}
});

module.exports = router;
