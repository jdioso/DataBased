import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

export const User = sequelize.define('User', {
    userID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(64), allowNull: false },
    password: { type: DataTypes.STRING(64), allowNull: false }
});

export const SuperAdmin = sequelize.define('SuperAdmin', {
    universityID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'userID' } }
});

export const Admin = sequelize.define('Admin', {
    rsold: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    universityID: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'University', key: 'universityID' } },
    userID: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'userID' } }
});

export const RSO = sequelize.define('RSO', {
    rsold: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(64), allowNull: false },
    userID: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'userID' } }
});

export const University = sequelize.define('University', {
    universityID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(64), allowNull: false },
    location: { type: DataTypes.STRING(256), allowNull: false },
    description: { type: DataTypes.STRING(1024), allowNull: false },
    photo: { type: DataTypes.STRING(2048), allowNull: false },
    userID: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'userID' } }
});

export const Events = sequelize.define('Events', {
    eventID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eventType: { type: DataTypes.STRING(16), allowNull: false },
    privacy: { type: DataTypes.STRING(16), allowNull: false },
    name: { type: DataTypes.STRING(64), allowNull: false },
    description: { type: DataTypes.STRING(1024), allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
    contactName: { type: DataTypes.STRING(64), allowNull: false },
    contactEmail: { type: DataTypes.STRING(64), allowNull: false },
    contactNumber: { type: DataTypes.STRING(16), allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    universityID: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'University', key: 'universityID' } },
    approved: { type: DataTypes.BOOLEAN, allowNull: false }
});
  
  // Associations
  User.hasMany(SuperAdmin, { foreignKey: 'userID' });
  SuperAdmin.belongsTo(User, { foreignKey: 'userID' });
  
  User.hasMany(Admin, { foreignKey: 'userID' });
  Admin.belongsTo(User, { foreignKey: 'userID' });
  
  University.belongsTo(User, { foreignKey: 'userID' });
  User.hasMany(University, { foreignKey: 'userID' });
  
  RSO.belongsTo(User, { foreignKey: 'userID' });
  User.hasMany(RSO, { foreignKey: 'userID' });
  
  Events.belongsTo(University, { foreignKey: 'universityID' });
  University.hasMany(Events, { foreignKey: 'universityID' });
