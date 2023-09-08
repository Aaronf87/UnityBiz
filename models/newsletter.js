const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Newsletter = sequelize.define(
  "Newsletter",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {  // Note: It should be 'references' not 'reference'
        model: "employee",
        key: "id"  // Added this line to complete the foreign key reference
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "newsletter",
  }
);

module.exports = Newsletter;

