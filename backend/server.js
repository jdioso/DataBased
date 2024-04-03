import express from 'express';

const app = express();

app.use(express.json());


app.use((err, req, res, next) => {
    console.error(err.stack);
res.status(500).send('Something broke!');
})

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});

