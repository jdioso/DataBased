const express = require('express');
const db = require('../models');
const router = express.Router();

// Create Event
router.post('/add', async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await db.events.create(eventData);
    res.status(201).json({ message: 'Event created', eventID: newEvent.eventID });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete Event
router.delete('/delete', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.events.destroy({ where: { eventID: id } });
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
router.put('/edit', async (req, res) => {
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
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get All Events
router.get('/searchAll', async (req, res) => {
    try {
      const eventsList = await db.events.findAll();
      res.status(200).json(eventsList);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

// Get Events by University ID
router.get('/searchUni', async (req, res) => {
    const { universityID } = req.params;
    try {
      const eventsList = await db.events.findAll({ where: { universityID: universityID } });
      if (db.events.length > 0) {
        res.status(200).json(eventsList);
      } else {
        res.status(404).send('No events found for this university');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

// Get Events by RSO ID
router.get('/searchRSO', async (req, res) => {
    const { rsoID } = req.params;
    try {
      const eventsList = await db.events.findAll({ where: { rsoID: rsoID } });
      if (db.events.length > 0) {
        res.status(200).json(eventsList);
      } else {
        res.status(404).send('No events found for this RSO');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

module.exports = router;
