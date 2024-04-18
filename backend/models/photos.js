const definePhotos = (sequelize, DataTypes) => {
	const Photos = sequelize.define('Photos', {
		picID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
            autoIncrement: true
		},
		universityID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'university',
				key: 'universityID'
			}
		},
        picture_url: {
            type: DataTypes.STRING(2048),
            allowNull: false,
        }
	}, {
		tableName: 'university_pictures',
		timestamps: false,
		id: false // Disable auto-increment on the id
	});


	return Photos;
}

module.exports = definePhotos;
