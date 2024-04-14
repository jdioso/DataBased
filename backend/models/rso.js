// models/RSO.js

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

	return RSO;
  };

  module.exports = defineRSO;
