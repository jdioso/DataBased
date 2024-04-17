const defineAdmin = (sequelize, DataTypes) => {
	const Admin = sequelize.define('Admin', {
		adminID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userID: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'userID',
			}
		}
	}, {
		tableName: 'admin',
		timestamps: false
	});

	return Admin;
};

module.exports = defineAdmin;
