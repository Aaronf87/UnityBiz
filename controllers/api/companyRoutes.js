const router = require("express").Router();
const { Company } = require("../../models");

// The `/api/company` endpoint

// *** FUTURE FEATURE ADMIN CONTROL: BACKEND READY ***

// CREATE COMPANY: Company Creation Route
router.post("/", async (req, res) => {
  try {
    const companyData = await Company.create(req.body);
    res.status(200).json({
      company: companyData,
      message: "Successfully created company account!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// VALIDATE COMPANY: Company Login Route. Login via Admin and Password.
router.post("/login", async (req, res) => {
  try {
    const companyData = await Company.findOne({
      where: { admin: req.body.admin },
    });
    if (!companyData) {
      res.status(400).json({
        message: "Incorrect company username or password. Please try again!",
      });
      return;
    }

    const validPassword = await companyData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({
        message: "Incorrect company username or password. Please try again!",
      });
      return;
    }

    res.json({ company: companyData, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// ***Future : Option to UPDATE Username

// ***Future: Option to DELETE Username

module.exports = router;
