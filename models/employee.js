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
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'company',
      key: 'id',
    }
  }
  // Add other fields like email, etc., as required
});

module.exports = Employee;

