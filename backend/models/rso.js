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
			// Reference to an admin will be established in index.js as a foreign key association
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true  // Enforce unique constraint for RSO names
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
