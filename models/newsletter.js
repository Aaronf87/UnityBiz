const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Newsletter extends Model {}

Newsletter.init(
  {
    id: {
      // Newsletter Table ID
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      // Newsletter Title
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      // Newsletter Content
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      // Newsletter Category
      // *** We will need a seperate table for "category" to use this ***
      // *** Can hold until MVP ***
      type: DataTypes.STRING, 
      allowNull: true,
    },
    company_id: {
      // Links newsletter to the company
      type: DataTypes.INTEGER,
      references: {
        model: "company",
        key: "id",
      },
    },
    employee_id: {
      // Links newsletter to the employee who created this newsletter
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "id", // Added this line to complete the foreign key reference
      },
    },
  },
  {
    // Added timestamp to Newsletters (default)
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "newsletter",
  }
);

module.exports = Newsletter;
