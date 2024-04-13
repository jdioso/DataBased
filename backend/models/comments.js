const defineComments = (sequelize, DataTypes) => {
	const Comments = sequelize.define('Comments', {
		commentID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		text: {
			type: DataTypes.STRING(1024),
			allowNull: false
		},
		rating: {
			type: DataTypes.TINYINT,
			allowNull: true,
			validate: {
				min: 1,
				max: 5
			}
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'userID'
			}
		},
		eventID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'events',
				key: 'eventID'
			}
		}
	}, {
		tableName: 'comments',
		timestamps: false
	});

	return Comments;
};

module.exports = defineComments;
