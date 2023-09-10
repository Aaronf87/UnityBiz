const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class PO extends Model {}

PO.init(
  {
    id: {
      // Purchase Order ID
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    po_number: {
      // Purchase Order Number
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.INTEGER,
      allowNull: true, // This can be null because there may not be an invoice number when the PO is created
    },
    goods: {
      // Goods, Product, or Services
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      // Cost of goods
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    vendor_name: {
      // Vendor name
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    vendor_address: {
      // Vendor address
      type: DataTypes,
      allowNull: false,
    },
    vendor_city: {
      // Vendor city
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor_state: {
      // Vendor state
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    vendor_zip: {
      // Vendor zip
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "company",
        key: "id",
      },
    },
  },
  {
    // Added timestamp to PO's (default)
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = PO;
