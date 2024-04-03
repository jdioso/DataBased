import mysql from 'mysql2';

import 'dotenv/config';
console.log(process.env)

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
}).promise();

export async function getNotes() {
	const [rows] = await pool.query('SELECT * FROM notes');
	return rows;
}

export async function getNote(id) {
	const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
	return rows[0];
}

export async function createNote( title, content ) {
	const [result] = await pool.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
	return result.insertId;
}

const result = await createNote('Hello', 'World');
console.log(result);
