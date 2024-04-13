const express = require('express');
const Event = require('../models/eventModel'); // Import the Event model
const router = express.Router();

// Create Event
router.post('/events', async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await Event.create(eventData);
    res.status(201).json({ message: 'Event created', eventID: newEvent.eventID });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete Event
router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Event.destroy({ where: { eventID: id } });
    if (deleted) {
      res.status(200).json({ message: 'Event deleted', eventID: id });
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Edit Event
router.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;
  try {
    const [updated] = await Event.update(eventData, { where: { eventID: id } });
    if (updated) {
      res.status(200).json({ message: 'Event updated', eventID: id });
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get All Events
router.get('/events', async (req, res) => {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

// Get Events by University ID
router.get('/events/:universityID', async (req, res) => {
    const { universityID } = req.params;
    try {
      const events = await Event.findAll({ where: { universityID: universityID } });
      if (events.length > 0) {
        res.status(200).json(events);
      } else {
        res.status(404).send('No events found for this university');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

// Get Events by RSO ID
router.get('/events/:rsoID', async (req, res) => {
    const { rsoID } = req.params;
    try {
      const events = await Event.findAll({ where: { rsoID: rsoID } });
      if (events.length > 0) {
        res.status(200).json(events);
      } else {
        res.status(404).send('No events found for this RSO');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

module.exports = router;