const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Communication extends Model {}

Communication.init(
  {
    id: {
      // Message Table ID
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      // Title of Message
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      // Content of Message
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creator_id: {
      // Creator Employee ID
      type: DataTypes.INTEGER,
      reference: {
        model: "employee",
        key: "id",
      },
    },
    recipient_id: {
      // Recipient Employee ID
      type: DataTypes.INTEGER,
      reference: {
        model: "employee",
        key: "id",
      },
    },
  },
  {
    // Added timestamp to Communications's (default)
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "communication",
  }
);

module.exports = Communication;
