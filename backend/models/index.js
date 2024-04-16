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
db.comments = require('./comments')(sequelize, Sequelize);
db.university = require('./university')(sequelize, Sequelize);
db.rsos = require('./rso')(sequelize, Sequelize);
db.rso_members = require('./rso_members')(sequelize, Sequelize);
db.events = require('./events')(sequelize, Sequelize);
db.admins = require('./admin')(sequelize, Sequelize);
db.super_admins = require('./super_admin')(sequelize, Sequelize);

// Associations
db.users.hasMany(db.comments, { foreignKey: 'userID' });
db.comments.belongsTo(db.users, { foreignKey: 'userID' });

db.users.belongsToMany(db.rsos, { through: db.rso_members, foreignKey: 'userID', otherKey: 'rsoID' });
db.rsos.belongsToMany(db.users, { through: db.rso_members, foreignKey: 'rsoID', otherKey: 'userID' });

db.users.hasMany(db.admins, { foreignKey: 'userID' });
db.admins.belongsTo(db.users, { foreignKey: 'userID' });

db.users.hasMany(db.super_admins, { foreignKey: 'userID' });
db.super_admins.belongsTo(db.users, { foreignKey: 'userID' });

db.university.hasMany(db.users, { foreignKey: 'universityID' });
db.users.belongsTo(db.university, { foreignKey: 'universityID' });

db.university.hasMany(db.events, { foreignKey: 'universityID' });
db.events.belongsTo(db.university, { foreignKey: 'universityID' });

db.rsos.hasMany(db.events, { foreignKey: 'rsoID' });
db.events.belongsTo(db.rsos, { foreignKey: 'rsoID' });

db.university.hasMany(db.super_admins, { foreignKey: 'universityID' });
db.super_admins.belongsTo(db.university, { foreignKey: 'universityID' });

db.comments.belongsTo(db.events, { foreignKey: 'eventID' });
db.events.hasMany(db.comments, { foreignKey: 'eventID' });

db.university.belongsTo(db.super_admins, { foreignKey: 'saID' });
db.super_admins.hasOne(db.university, { foreignKey: 'saID' });

module.exports = db;
