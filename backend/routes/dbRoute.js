const express = require('express');
const router = express.Router();
const db = require('../database'); // Ensure this path correctly points to your database connection setup file

// Define the route for testing database connectivity
router.get('/', (req, res) => {  // Change '/test-db' to '/' since '/test-db' is already prefixed in server.js
	db.query('SELECT 1 + 1 AS solution', (err, results) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: 'Unable to connect to database',
				error: err
			});
		}
		res.status(200).json({
			success: true,
			message: 'Connected to database successfully',
			results: results[0]
		});
	});
});

module.exports = router;  // Don't forget to export the router
