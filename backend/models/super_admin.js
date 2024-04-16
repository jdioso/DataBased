const defineSA = (sequelize, DataTypes) => {
	const SA = sequelize.define('SA', {
		saID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        userID: {
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
        univeristyID: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        }
	}, {
		tableName: 'SA',
		timestamps: false  // Disable Sequelize's automatic timestamping
	});

	return SA;
};

module.exports = defineSA;