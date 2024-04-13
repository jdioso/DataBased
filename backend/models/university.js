// Define University model
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
    picture: {
      type: DataTypes.STRING(2024),
      allowNull: true
    },
    numStudents: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Universities', // Specify table name
    timestamps: false // Disable createdAt and updatedAt columns
  });
  
  module.exports = University;