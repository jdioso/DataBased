const defineRSO_Members = (sequelize, DataTypes) => {
	const RSO_Members = sequelize.define('RSO_Members', {
		rsoID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'rso',
				key: 'rsoID'
			},
			primaryKey: true
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'userID'
			},
			primaryKey: true // Both rsoID and userID are the primary key
		}
	}, {
		tableName: 'rso_members',
		timestamps: false,
		id: false // Disable auto-increment on the id
	});


	return RSO_Members;
}

module.exports = defineRSO_Members;
