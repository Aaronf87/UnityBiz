const sequelize = require("../config/connection");
const {
  Company,
  Employee,
  Newsletter,
  PO,
  Communication,
} = require("../models");

const companyData = require("./companyData.json");
const employeeData = require("./employeeData.json");
const newletterData = require("./newsletterData.json");
const poData = require("./poData.json");
const communicationData = require("./communicationData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await Company.bulkCreate(companyData);
  console.log("\n----- TEST Company SEEDED -----\n");

  await Employee.bulkCreate(employeeData);
  console.log("\n----- TEST Employee SEEDED -----\n");

  await Newsletter.bulkCreate(newletterData);
  console.log("\n----- TEST Newsletter SEEDED -----\n");

  await PO.bulkCreate(poData);
  console.log("\n----- TEST PO SEEDED -----\n");

  await Communication.bulkCreate(communicationData);
  console.log("\n----- TEST Communication SEEDED -----\n");

  process.exit(0);
};

seedDatabase();
