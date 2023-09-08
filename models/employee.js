const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10],
    },
  },
  // Here's where you put the foreign key reference
  company_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'company',  // This should match the table name in the database
      key: 'id',
    }
  }
});

module.exports = Employee;

