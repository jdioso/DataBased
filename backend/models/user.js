module.exports = (sequelize, DataTypes) => {
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
		}
	}, {
		tableName: 'user',
		timestamps: false  // Disable Sequelize's automatic timestamping
	});

	return User;
};
