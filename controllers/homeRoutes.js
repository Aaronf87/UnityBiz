const router = require("express").Router();
// const { Company, Employee, Newsletter, PO, Communication } = require("../models");

// The `/` endpoint

// HOME: Display the landing page.
router.get("/", async (req, res) => {
  try {
    res.render("landing");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Company Sign-Up: Display the company sign-up page.
router.get("/company/signup", async (req, res) => {
  try {
    res.render("company-signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Employee Sign-Up: Display the employee sign-up page.
router.get("/employee/signup", async (req, res) => {
  try {
    res.render("employee-signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Company Login: Display the company login page.
router.get("/company/login", async (req, res) => {
  try {
    res.render("company-login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Employee Login: Display the employee login page.
router.get("/employee/login", async (req, res) => {
  try {
    res.render("employee-login");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
