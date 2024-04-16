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

// Check for duplicate event names
const checkDuplicateEventName = async (name, eventId = null) => {
	// Check if any event other than the current one has the same name
	const criteria = {
		where: { name: name },
	};
	if (eventId) criteria.where.eventID = { [db.Sequelize.Op.ne]: eventId };  // Exclude current event in case of update
	const event = await db.events.findOne(criteria);
	return !!event;
};

const isEmpty = (value) => {
	if (value === null || value === undefined) return true;
	return typeof value === 'string' && value.trim() === '';

};

// Create Event
router.post('/add', async (req, res) => {
	const eventData = req.body;
	const requiredFields = ['eventType', 'privacy', 'name', 'description', 'latitude', 'longitude',
		'contactName', 'contactEmail', 'contactNumber', 'time', 'date', 'universityID', 'approved'];

	// if eventData.rsoID is provided, add it to the required fields
	if (eventData.rsoID) requiredFields.push('rsoID');


	try {
		for (let field of requiredFields) {
			if (isEmpty(eventData[field] && field !== 'rsoID')) {
				return res.status(400).json({ message: `Missing or empty required field: ${field}` });
			}
		}

		// Check for duplicate names
		if (await checkDuplicateEventName(eventData.name)) {
			return res.status(409).json({ message: 'An event with the same name already exists.' });
		}

		const newEvent = await db.events.create(eventData);
		res.status(201).json({ message: 'Event created successfully', eventID: newEvent.eventID });
	} catch (err) {
		console.error('Error creating event:', err.message);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).json({ message: 'Server error', error: err.message });
		}
	}
});

// Edit Event
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const eventData = req.body;

	try {
		const event = await db.events.findByPk(id);
		if (!event) {
			return res.status(404).json({ message: 'Event not found', eventID: id });
		}

		for (const key in eventData) {
			if (key !== 'rsoID' && isEmpty(eventData[key])) {
				return res.status(400).json({ message: `Invalid update: ${key} cannot be empty.` });
			}
		}

		// Check for duplicate names on updates if the name is being changed
		if (eventData.name && eventData.name !== event.name && await checkDuplicateEventName(eventData.name, id)) {
			return res.status(409).json({ message: 'Another event with the same name already exists.' });
		}

		const [updated] = await db.events.update(eventData, { where: { eventID: id } });
		if (updated) {
			res.status(200).json({ message: 'Event updated successfully', eventID: id });
		} else {
			return res.status(500).json({ message: 'Failed to update event', eventID: id });
		}
	} catch (err) {
		console.error('Error updating event:', err.message);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
		res.status(500).json({ message: 'Server error', error: err.message });
		}
	}
});

// Delete Event
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deleted = await db.events.destroy({ where: { eventID: id } });
		if (deleted) {
			res.status(200).json({ message: 'Event deleted successfully', eventID: id });
		} else {
			res.status(404).json({ message: 'Event not found', eventID: id });
		}
	} catch (err) {
		logError(err, 'Delete', `event ${id}`);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// Get All Events
router.get('/searchAll', async (req, res) => {
	try {
		const eventsList = await db.events.findAll();
		if (eventsList.length > 0) {
			res.status(200).json(eventsList);
		} else {
			res.status(404).json({ message: 'No events found' });
		}
	} catch (err) {
		logError(err, 'Retrieve', 'all events');
		res.status(500).json({ message: 'Server error', error: err.message });
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
			res.status(404).json({ message: 'No events found for this university', universityID });
		}
	} catch (err) {
		logError(err, 'Retrieve', `events for university ${universityID}`);
		res.status(500).json({ message: 'Server error', error: err.message });
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
			res.status(404).json({ message: 'No events found for this RSO', rsoID });
		}
	} catch (err) {
		logError(err, 'Retrieve', `events for RSO ${rsoID}`);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});
// Fetch Events by Type (RSO or University)
router.get('/searchByType', async (req, res) => {
	const { type } = req.query;  // Expect 'rso' or 'university' as query parameter

	let queryOptions;
	if (type === 'rso') {
		queryOptions = { where: { rsoID: { [db.Sequelize.Op.ne]: null } } };
	} else if (type === 'university') {
		queryOptions = { where: { rsoID: null } };
	} else {
		return res.status(400).json({ message: 'Invalid event type specified. Use "rso" or "university".' });
	}

	try {
		const eventsList = await db.events.findAll(queryOptions);
		if (eventsList.length > 0) {
			res.status(200).json(eventsList);
		} else {
			res.status(404).json({ message: `No events found for the specified type: ${type}` });
		}
	} catch (err) {
		console.error(`Error retrieving ${type} events:`, err.message);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});


module.exports = router;
