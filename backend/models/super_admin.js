const defineSA = (sequelize, DataTypes) => {
	const SA = sequelize.define('SA', {
		saID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        userID: {
			type: DataTypes.INTEGER,
	        allowNull: false,
	        references: {
		        model: 'user',
		        key: 'userID'
	        },
	        unique: true
		},
		universityID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'university',
				key: 'universityID'
			}
		}
	}, {
		tableName: 'super_admin',
		timestamps: false
	});

	return SA;
};

module.exports = defineSA;
