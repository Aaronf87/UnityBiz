const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add other fields as required
});

module.exports = Company;
