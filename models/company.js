const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/connection');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    unique: true
  }
  // Add other fields as required
});

module.exports = Company;
