import express from 'express';
// Make sure the path matches the location of your routes file
import router from './api/routes/routes.js';

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the imported routes
// Assuming you want to prefix user and RSO routes with '/api'
app.use('/api', router);

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
