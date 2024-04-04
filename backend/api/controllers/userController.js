import { getNotes, getNote, createNote } from "./backend/database.js";
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();

router.post('/register', async (req, res) => {
	try {
		const { email, password, first_name, last_name } = req.body;

		// Check if username or email already exist
        const existingUser = await User.findOne({ where: { $or: [{ username }, { email }] } });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

		// Create new user
        const newUser = await User.create({
            email,
            password,
            first_name,
			last_name,
        });

		// Return success response
        res.status(201).json({ message: "User registered successfully", user: newUser});
	}
	catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		if (password !== user.password) {
			return res.status(400).json({ message: "Invalid password" });
		}

		// Generate a token using the secret key from .env
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

		// Return the token with the success response
		res.status(200).json({ message: "User logged in successfully", token });
	}
	catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});


module.exports = router;



