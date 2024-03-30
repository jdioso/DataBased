import express from 'express';

import { getNotes, getNote, createNote } from "./database.js";

const app = express();

app.use(express.json());

app.get('/notes', async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
});

app.get('/notes/:id', async (req, res) => {
	const id = req.params.id;
	const note = await getNote(id);
	res.send(note);
});

app.post('/notes', async (req, res) => {
	const {title,contents} = req.body;
	const note = await createNote(title, contents);
	res.send(note);
});

app.use((err, req, res, next) => {
	  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(3000, () => {
	  console.log('Server listening on port 3000');
});
