require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection pool (recommended for production use)
const pool = mysql.createPool({
	connectionLimit : 10,
	host            : process.env.MYSQL_HOST,
	user            : process.env.MYSQL_USER,
	password        : process.env.MYSQL_PASSWORD,
	database        : process.env.MYSQL_DATABASE
});

// Attempt to catch connection errors
pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Database connection was closed.');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has too many connections.');
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('Database connection was refused.');
		}
	}

	if (connection) connection.release();
	return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
