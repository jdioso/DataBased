const defineSA = (sequelize, DataTypes) => {
	const SA = sequelize.define('SA', {
		saID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        userID: {
			type: DataTypes.INTEGER,
		},
        univeristyID: {
            type: DataTypes.INTEGER,
        }
	}, {
		tableName: 'super_admin',
		timestamps: false  // Disable Sequelize's automatic timestamping
	});

	return SA;
};

module.exports = defineSA;