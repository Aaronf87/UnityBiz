const router = require("express").Router();
const { Newsletter } = require("../models");

// The `/` endpoint

// LANDING PAGE: Display the landing page.
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

// HOME: Display the newsletters and navbar
router.get("/home", async (req, res) => {
  try {
    const newsData = await Newsletter.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: Employee, attributes: ["first_name", "last_name"] }],
    });

    const newsletters = newsData.map((newsletter) => newsletter.get({ plain: true }));

    res.render("home", { 
      newsletters,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      company_id: req.session.company_id,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
