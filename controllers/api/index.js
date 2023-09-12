const router = require("express").Router();

const companyRoutes = require("./companyRoutes");
const employeeRoutes = require("./employeeRoutes");
const newsRoutes = require("./newsRoutes");
const poRoutes = require("./poRoutes");
const comsRoutes = require("./comsRoutes");

// Send requests /api/company to the companyRoutes.js in the api folder.
router.use("/company", companyRoutes);

// Send requests /api/employee to the employeeRoutes.js in the api folder.
router.use("/employee", employeeRoutes);

// Send requests /api/comments to the newsRoutes.js in the api folder.
router.use("/news", newsRoutes);

// Send requests /api/po to the poRoutes.js in the api folder.
router.use("/po", poRoutes);

// Send requests /api/coms to the comsRoutes.js in the api folder.
router.use("/coms", comsRoutes);

module.exports = router;
