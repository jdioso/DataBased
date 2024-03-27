import mysql from 'mysql2';

mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'test'
}).promise();
