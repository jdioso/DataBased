const defineRSO = (sequelize, DataTypes) => {
	const RSO = sequelize.define('RSO', {
		rsoID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		adminID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		numMembers: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(1024),
			allowNull: false
		}
	}, {
		tableName: 'rso',
		timestamps: false
	});

	return RSO;
};

module.exports = defineRSO;
