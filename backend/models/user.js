const defineUser = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
	}, {
		tableName: 'user',
		timestamps: false  // Disable Sequelize's automatic timestamping
	});

	// // Define the relationship between User and RSO
	// User.associate = models => {
	// 	User.belongsToMany(models.rsos, {
	// 		through: models.rso_members,
	// 		foreignKey: 'userID',
	// 		as: 'rsos'
	// 	});
	// };

	return User;
};

module.exports = defineUser;
