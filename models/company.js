const { Model, DataTypes, UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Company extends Model {}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: { // Company unique identifier to link employee to company
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      unique: true, // Only one unique identifier can exist for a company
    },
    admin: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [10], // Password must be at least 10 characters
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newCompanyData) => {
        newCompanyData.password = await bcrypt.hash(
          newCompanyData.password,
          10
        );
        return newCompanyData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "company",
  }
);

module.exports = Company;
