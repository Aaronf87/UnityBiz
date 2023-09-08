const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Newsletter = sequelize.define('Newsletter', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Newsletter;
