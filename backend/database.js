require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection pool (recommended for production use)
const pool = mysql.createPool({
	connectionLimit : 10,
	host            : process.env.MYSQL_HOST,
	user            : process.env.MYSQL_USER,
	password        : process.env.MYSQL_PASSWORD,
	database        : process.env.MYSQL_DATABASE,
	port: process.env.AWS_PORT
});

// Attempt to catch connection errors
pool.getConnection((err, connection) => {
	if (err) {
		console.error('Error connecting to the database: ' + err.stack);
		return;
	}
	if (connection) {
		console.log('Connected to the RDS database as ID ' + connection.threadId);
		connection.release();
	}
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
