const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database'); // Adjust the path according to your project structure

// Register User
router.post('/register', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send('Email and password are required');
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 8);
		db.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
			if (err) {
				return res.status(500).send('Error registering new user');
			}
			res.status(201).json({ message: 'User registered', userID: results.insertId });  // Returning userID to the client
		});
	} catch (err) {
		res.status(500).send("Server error");
	}
});

// User Login
router.post('/login', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send('Email and password are required');
	}

	db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
		if (err || results.length === 0) {
			return res.status(401).send('No user found with that email');
		}

		const user = results[0];
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).send('Invalid credentials');
		}

		res.status(200).json({ message: 'User logged in successfully', userID: user.userID });  // Returning userID to the client
	});
});


// Get User Details
router.get('/user/:id', (req, res) => {
	const { id } = req.params;
	db.query('SELECT userID, email FROM user WHERE userID = ?', [id], (err, results) => {
		if (err) {
			return res.status(500).send('Error fetching user');
		}
		if (results.length > 0) {
			res.status(200).json(results[0]);
		} else {
			res.status(404).send('User not found');
		}
	});
});

module.exports = router;
