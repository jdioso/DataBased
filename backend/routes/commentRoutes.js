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

// Create Comment
router.post('/add', async (req, res) => {
	try {
		const commentData = req.body;
		if (!commentData.text || !commentData.rating || !commentData.eventID || !commentData.userID) {  // Assuming these are required fields
			return res.status(400).json({ message: "Missing required comment fields" });
		}

		const newComment = await db.comments.create(commentData);
		res.status(201).json({ message: 'Comment created', commentID: newComment.commentID });
	} catch (err) {
		logError(err, 'Create', 'comment');
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).json({ message: 'Server error', error: err.message });
		}
	}
});

// Delete Comment
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deleted = await db.comments.destroy({ where: { commentID: id } });
		if (deleted) {
			res.status(200).json({ message: 'Comment deleted', commentID: id });
		} else {
			res.status(404).json({ message: 'Comment not found', commentID: id });
		}
	} catch (err) {
		logError(err, 'Delete', `comment ${id}`);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

// Edit Comment
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	try {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: "No data provided for update." });
		}

		const [updated] = await db.comments.update(req.body, { where: { commentID: id } });
		if (updated) {
			res.status(200).json({ message: 'Comment updated successfully.', commentID: id });
		} else {
			// Check if the comment actually exists
			const commentExists = await db.comments.findByPk(id);
			if (commentExists) {
				res.status(200).json({ message: 'No changes were made to the comment.', commentID: id });
			} else {
				res.status(404).json({ message: 'Comment not found.', commentID: id });
			}
		}
	} catch (err) {
		logError(err, 'Update', `comment ${id}`);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).json({ message: 'Server error', error: err.message });
		}
	}
});


// Get comments based on eventID
router.get('/search/:eventID', async (req, res) => {
	const { eventID } = req.params;
	try {
		const commentList = await db.comments.findAll({ where: { eventID } });
		if (commentList.length > 0) {
			res.status(200).json(commentList);
		} else {
			res.status(404).json({ message: 'No comments found for this event', eventID: eventID });
		}
	} catch (err) {
		logError(err, 'Fetch', `comments for event ${eventID}`);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
});

module.exports = router;
