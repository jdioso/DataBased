require('dotenv').config(); // to use environment variables from .env file
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ensure the path matches your structure

const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON request body

// Routes
app.use('/api/users', userRoutes);

// Setting up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
