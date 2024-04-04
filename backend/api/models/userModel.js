// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    first_name: {
        type: DataTypes.STRING
    },

    last_name: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'users' // Name of the table in the database
});

module.exports = User;
