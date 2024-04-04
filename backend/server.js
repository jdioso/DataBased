import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());


app.use((err, req, res, next) => {
    console.error(err.stack);
res.status(500).send('Something broke!');
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

