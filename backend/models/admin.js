const defineAdmin = (sequelize, DataTypes) => {
	const Admin = sequelize.define('Admin', {
		adminID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        userID: {
			type: DataTypes.INTEGER,
		}
	}, {
		tableName: 'admin',
		timestamps: false  // Disable Sequelize's automatic timestamping
	});

	return Admin;
};

module.exports = defineAdmin;