const router = require("express").Router();

const companyRoutes = require("./companyRoutes");
// const employeeRoutes = require("./employeeRoutes");

const newsRoutes = require("./newsRoutes");

// *** Communication and PO routes on hold for now....
// const comsRoutes = require("./commentRoutes");
// const poRoutes = require("./commentRoutes");


//Send all the requests that begin with /api/company to the companyRoutes.js in the api folder.
router.use("/company", companyRoutes);

//Send all the requests that begin with /api/employee to the employeeRoutes.js in the api folder.
// router.use("/employee", employeeRoutes);

//Send all the requests that begin with /api/comments to the newsRoutes.js in the api folder.
router.use("/news", newsRoutes);

// *** Commnunication and PO routes on hold for now....
// router.use("/coms", comRoutes);
// router.use("/po", poRoutes);


module.exports = router;
