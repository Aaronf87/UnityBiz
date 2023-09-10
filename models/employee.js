const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Username must be unique. There cannot be more than one.
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10], // Password must be at least 10 characters
      },
    },
    // Here's where you put the foreign key reference
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "company", // This should match the table name in the database
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = Employee;
