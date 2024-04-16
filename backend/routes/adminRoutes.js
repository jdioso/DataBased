const express = require('express');
const db = require('../models');

const router = express.Router();

// Create Admin
router.post('/registerAdmin', async (req, res) => {
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

// Get Admin
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const admin = await db.admins.findByPk(id, {
			attributes: ['adminID', 'userID']
		});
		if (admin) {
			res.status(200).json(admin);
		} else {
			res.status(404).json({ error: 'admin not found.' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error fetching admin data from the database.' });
	}
});

// Create Super Admin
router.post('/registerSA', async (req, res) => {
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

// Get Super Admin
router.get('/super_admin/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const SA = await db.super_admins.findByPk(id, {
			attributes: ['saID', 'universityID', 'userID']
		});
		if (SA) {
			res.status(200).json(SA);
		} else {
			res.status(404).json({ error: 'super admin not found.' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error fetching super admin data from the database.' });
	}
});



module.exports = router;  // Don't forget to export the router