const express = require('express');
const db = require('../models');

const router = express.Router();

// Create User
router.post('/register', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send('Email and password are required');
	}

	try {
		// Store the password directly without hashing
		const newUser = await db.users.create({
			email,
			password
		});
		res.status(201).json({ message: 'User registered', userID: newUser.userID });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await db.users.findOne({ where: { email: req.body.email } });
		if (!user) {
			return res.status(401).send('No user found with that email');
		}

		// Compare the plain text password directly
		const isMatch = (req.body.password === user.password);
		if (!isMatch) {
			return res.status(401).send('Password incorrect');
		}

		res.status(200).json({ message: 'User logged in successfully', userID: user.userID });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

router.get('/user/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await db.users.findByPk(id, {
			attributes: ['userID', 'email'] // Limiting the returned attributes
		});
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).send('User not found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Error fetching user');
	}
});

module.exports = router;
