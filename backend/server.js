require('dotenv').config({ path: '../.env' });  // Adjust the path accordingly
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ensure the path matches your structure
const dbRoute = require('./routes/dbRoute'); // Ensure the path matches your structure
const eventRoutes = require('./routes/eventRoutes')
const universityRoutes = require('./routes/universityRoutes') // Ensure the path matches your structure

const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON request body

// Routes
app.use('/api/users', userRoutes);
app.use('/test-db', dbRoute);
app.use('/api/events', eventRoutes);
app.use('/api/universities', universityRoutes);

// Setting up the server
const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
