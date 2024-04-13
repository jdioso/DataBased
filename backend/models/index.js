const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	{
		host: process.env.MYSQL_HOST,
		dialect: 'mysql'
	}
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models import
db.users = require('./user')(sequelize, Sequelize);
db.admins = require('./admin')(sequelize, Sequelize);
db.superAdmins = require('./super_admin')(sequelize, Sequelize);
db.universities = require('./university')(sequelize, Sequelize);
db.rsos = require('./rso')(sequelize, Sequelize);
db.events = require('./events')(sequelize, Sequelize);
db.comments = require('./comments')(sequelize, Sequelize);

module.exports = db;
