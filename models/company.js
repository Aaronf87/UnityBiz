const { Model, DataTypes, UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Company extends Model {
  // Function will compare company's hashed password.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Company.init(
  {
    id: {
      // Company Table ID
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // Company Name
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    phone: {
      // Company Phone Number
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    address: {
      // Company Address
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      // Company City
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      // Company State
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      // Company Zip
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      // Unique Identifier to link Employee with Company
      // We will not use company table id because it is less secure
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      unique: true, // Only one unique identifier can exist for a company
    },
    admin: {
      // Administrator for the company that may modify important details.
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    password: {
      // Password for Company Administrator.
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [10], // Password must be at least 10 characters
      },
    },
  },
  {
    hooks: {
      // Encrypts company's admin's password.
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
