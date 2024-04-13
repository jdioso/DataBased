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

		const newComment = await db.comments.create(commentData);
		res.status(201).json({ message: 'Comment created', commentID: newComment.commentID });
	} catch (err) {
		logError(err, 'Create', 'comment');
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).send('Server error');
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
			res.status(404).send('Comment not found');
		}
	} catch (err) {
		logError(err, 'Delete', `comment ${id}`);
		res.status(500).send('Server error');
	}
});

// Edit Comment
router.put('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const commentData = req.body;
	try {
		const [updated] = await db.comments.update(commentData, { where: { commentID: id } });
		if (updated) {
			res.status(200).json({ message: 'Comment updated', commentID: id });
		} else {
			res.status(404).send('Comment not found');
		}
	} catch (err) {
		logError(err, 'Update', `comment ${id}`);
		if (err.name === 'SequelizeValidationError') {
			handleValidationError(err, res);
		} else {
			res.status(500).send('Server error');
		}
	}
});

//Get comments based on eventID
router.get('/search/:eventID', async (req, res) => {
	const { eventID } = req.params;
	try {
		const commentList = await db.comments.findAll({ where: { eventID } });
		res.status(200).json(commentList);
	} catch (err) {
		logError(err, 'Fetch', `comments for event ${eventID}`);
		res.status(500).send('Server error');
	}
});


module.exports = router;

