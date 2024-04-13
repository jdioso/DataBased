// Define Event model
const Event = sequelize.define('Event', {
    eventID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    privacy: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 7),
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    contactEmail: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    universityID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rsoID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    tableName: 'events', // Specify table name
    timestamps: false // Disable createdAt and updatedAt columns
  });
  
  module.exports = Event;