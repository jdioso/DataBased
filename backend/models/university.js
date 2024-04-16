const defineUniversity = (sequelize, DataTypes) => {
	const University = sequelize.define('University', {
		universityID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		location: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(1024),
			allowNull: false
		},
		saID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'super_admin',
				key: 'saID'
			}
		},
		numStudents: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		domain: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		picture: {
			type: DataTypes.STRING(2048),
			allowNull: true
		}
	}, {
		tableName: 'university',
		timestamps: false
	});

	return University;
};

module.exports = defineUniversity;
