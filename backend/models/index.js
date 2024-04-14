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
db.rsoMem = require('./rso_members')(sequelize, Sequelize);
db.events = require('./events')(sequelize, Sequelize);
db.rso_members = require('./rso_members')(sequelize, Sequelize);

// Even though foreign keys in the database enforce data integrity. We use sequelize to enforce the relationships in the code.
// This makes it easier to query the database and get the data we need.
db.rsoMem.belongsTo(db.users, { as: 'user', foreignKey: 'userID' }); // rsoMem.userID -> users.userID
db.users.hasMany(db.rsoMem, { as: 'rsoMem', foreignKey: 'userID' })

// Example:
// the " as: 'user' " is used to rename the association and must match exactly the name of the association in the model above.
// changing one to 'users' will cause an error.
// code snippet from backend/routes/rsoRoutes.js where this is used:

/* router.get('/:rsoID/members'...
const members = await db.rsoMem.findAll({
			where: { rsoID },
			include: [{
				model: db.users,
				as: 'user',
				attributes: ['userID', 'email', 'firstName', 'lastName']
			}]
		});
		...
 */

module.exports = db;
