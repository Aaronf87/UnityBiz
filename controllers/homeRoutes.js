const router = require("express").Router();
router.get("/company/signup", async (req, res) => {
  try {
    res.render("company-signup");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/employee/signup", async (req, res) => {
    try {
      res.render("employee-signup");
    } catch (err) {
      res.status(500).json(err);
    }
  });
// ***WILL PASS IN MODELS THAT MATTHEW WILL MAKE
// const {  } = require("../models");

// The `/` endpoint

module.exports = router;
