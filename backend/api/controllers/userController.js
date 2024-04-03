import { getNotes, getNote, createNote } from "./backend/database.js";

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


