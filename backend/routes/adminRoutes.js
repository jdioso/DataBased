const express = require('express');
const db = require('../models');

const router = express.Router();

// Create Admin
router.post('/register', async (req, res) => {
	const { userID } = req.body;
	try {
		const newAdmin = await db.admins.create({
			userID
		});
		res.status(201).json({ message: 'Admin registered successfully.', adminID: newAdmin.adminID });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to register admin due to internal server error.' });
	}
});

// Create Super Admin
router.post('/register', async (req, res) => {
	const { userID, universityID } = req.body;
	try {
		const newSA = await db.super_admins.create({
			userID,
            universityID
		});
		res.status(201).json({ message: 'Super Admin registered successfully.', saID: newSA.saID });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to register super admin due to internal server error.' });
	}
});

module.exports = router;  // Don't forget to export the router