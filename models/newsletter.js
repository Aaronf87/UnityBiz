const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Newsletter extends Model {}

Newsletter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING, // *** We will need a seperate table for "category" to use this
      allowNull: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "company",
        key: "id",
      },
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "id", // Added this line to complete the foreign key reference
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "newsletter",
  }
);

module.exports = Newsletter;
