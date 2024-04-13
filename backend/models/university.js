const defineUniversity = (sequelize, DataTypes) => {
	const University = sequelize.define('University', {
	    universityID: {
	      type: DataTypes.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    name: {
	      type: DataTypes.STRING(64),
	      allowNull: false
	    },
	    location: {
	      type: DataTypes.STRING(256),
	      allowNull: false
	    },
	    description: {
	      type: DataTypes.STRING(1024),
	      allowNull: false
	    },
	    userID: {
	      type: DataTypes.INTEGER,
	      allowNull: false
	    },
		numStudents: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	    picture: {
	      type: DataTypes.STRING(2024),
	      allowNull: true
	    },
	  }, {
	    tableName: 'university', // Specify table name
	    timestamps: false // Disable createdAt and updatedAt columns
	  });

	  return University;

};

module.exports = defineUniversity;
