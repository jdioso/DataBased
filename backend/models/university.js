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
		},
		domain: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
		numStudents: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	}, {
		tableName: 'university',
		timestamps: false
	});

	return University;
};

module.exports = defineUniversity;
