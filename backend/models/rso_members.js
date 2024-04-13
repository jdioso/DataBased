const defineRSO_Members = (sequelize, DataTypes) => {
	const RSO_Members = sequelize.define('RSO_Members', {
		rsoID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'rso', // table name
				key: 'rsoID'
			}
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user', // table name
				key: 'userID'
			}
		}
	}, {
		tableName: 'rso_members',
		timestamps: false
	});

	return RSO_Members;
}

module.exports = defineRSO_Members;
