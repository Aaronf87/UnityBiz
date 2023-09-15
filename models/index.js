// Import models
const Company = require("./Company.js");
const Employee = require("./Employee.js");
const Newsletter = require("./Newsletter.js");
const PO = require("./PO.js");
const Communication = require("./Communication.js");

// <===== Company Relationships =====>

// Company has many employees
Company.hasMany(Employee, {
  foreignKey: "company_id",
});

// Company has many newsletters
Company.hasMany(Newsletter, {
  foreignKey: "company_id",
});

// Company has many POs
Company.hasMany(PO, {
  foreignKey: "company_id",
});

// <===== Employee Relationships =====>

// Employee belongs to one company
Employee.belongsTo(Company, {
  foreignKey: "company_id",
});

// Employee has many newsletters
Employee.hasMany(Newsletter, {
  foreignKey: "employee_id",
});

// Employee has many POs
Employee.hasMany(PO, {
  foreignKey: "employee_id",
});

// Employee has many messages. Creator (employee).
Employee.hasMany(Communication, {
  as: "creator",
  foreignKey: "creator_id",
});

// Employee has many messages. Recipient (employee).
Employee.hasMany(Communication, {
  as: "recipient",
  foreignKey: "recipient_id",
});

// <===== Newsletter Relationships =====>

// Newsletter belongs to one company
Newsletter.belongsTo(Company, {
  foreignKey: "company_id",
});

// Newsletter belongs to one employee
Newsletter.belongsTo(Employee, {
  foreignKey: "employee_id",
});

// <===== PO Relationships =====>

// PO belongs to one company
PO.belongsTo(Company, {
  foreignKey: "company_id",
});

// PO belongs to one employee
PO.belongsTo(Employee, {
  foreignKey: "employee_id",
});

// <===== Communication Relationships =====>

// Message belongs to one creator (employee).
Communication.belongsTo(Employee, {
  as: "creator",
  foreignKey: "creator_id",
});

// Message belongs to one recipient (employee).
Communication.belongsTo(Employee, {
  as: "recipient",
  foreignKey: "recipient_id",
});

module.exports = {
  Company,
  Employee,
  Newsletter,
  PO,
  Communication,
};
