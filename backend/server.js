require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dbRoute = require('./routes/dbRoute');
const eventRoutes = require('./routes/eventRoutes')
const universityRoutes = require('./routes/universityRoutes')
const commentRoutes = require('./routes/commentRoutes')
const rsoRoutes = require('./routes/rsoRoutes');

const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON request body

// Routes
app.use('/api/users', userRoutes);
app.use('/test-db', dbRoute);
app.use('/api/events', eventRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/rso', rsoRoutes);

// Setting up the server
const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
