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
		universityID: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'user',
		timestamps: false
	});

	return User;
};

module.exports = defineUser;
