import express from 'express';
import router from './api/routes/routes.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
