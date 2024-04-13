const defineRSO = (sequelize, DataTypes) => {
	const RSO = sequelize.define('RSO', {
		rsoID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		numMembers: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(1024),
			allowNull: false
		},
	}, {
		tableName: 'rso', // Specify table name
		timestamps: false // Disable createdAt and updatedAt columns
	});

	// Associations
	RSO.associate = (models) => {
		// Associating RSO with User
		RSO.belongsTo(models.User, {
			foreignKey: 'userID',
			as: 'creator' // Optional alias
		});

		// Associating RSO with RSO_Members
		RSO.hasMany(models.RSO_Members, {
			foreignKey: 'rsoID',
			as: 'members' // Optional alias
		});
	};

	return RSO;
}

module.exports = defineRSO;
