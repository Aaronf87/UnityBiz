// Import models
const Company = require("./Communication");
const Employee = require("./Employee");
const Newsletter = require("./Newsletter");
const PO = require("./PO");
const Communication = require("./Communication");

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

// Employee has many messages

//=================================***

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

//=================================***

module.exports = {
  Company,
  Employee,
  Newsletter,
  PO,
  Communication,
};
