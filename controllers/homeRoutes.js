const router = require("express").Router();
const { Company, Employee, Newsletter, PO } = require("../models");

// The `/` endpoint

// LANDING PAGE: Display the landing page.
router.get("/", async (req, res) => {
  try {
    res.render("landing", {
      logged_in: req.session.logged_in,
    });
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
  if (!req.session.logged_in) {
    res.redirect("/redirect");
    return;
  }
  try {
    const newsData = await Newsletter.findAll({
      where: { company_id: req.session.company_id },
      order: [["createdAt", "DESC"]],
      include: [{ model: Employee, attributes: ["first_name", "last_name"] }],
    });

    const newsletters = newsData.map((newsletter) =>
      newsletter.get({ plain: true })
    );

    // *** DELETE THIS CONSOLE.LOG
    console.log(newsletters);

    res.render("home", {
      newsletters,
      logged_in: req.session.logged_in,
      company_id: req.session.company_id,
      user_id: req.session.user_id,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/po", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/redirect");
    return;
  }
  try {
    const companyData = await Company.findOne({
      where: { id: req.session.company_id },
      attributes: ["name", "phone", "state", "city", "address", "zip"],
    });

    const company = companyData.get({ plain: true });

    // *** DELETE THIS CONSOLE.LOG
    console.log(company);

    res.render("PO", {
      company,
      logged_in: req.session.logged_in,
      company_id: req.session.company_id,
      user_id: req.session.user_id,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/po/view", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/redirect");
    return;
  }
  try {
    const companyData = await Company.findOne({
      where: { id: req.session.company_id },
      attributes: ["name", "phone", "state", "city", "address", "zip"],
    });

    const company = companyData.get({ plain: true });

    const poData = await PO.findAll({
      where: { company_id: req.session.company_id },
      order: [["createdAt", "DESC"]],
      include: [{ model: Employee, attributes: ["first_name", "last_name"] }],
    });

    const pos = poData.map((singlePO) => singlePO.get({ plain: true }));

    // *** DELETE THIS CONSOLE.LOG
    console.log(company);
    console.log(pos);

    res.render("po-view", {
      pos,
      company,
      logged_in: req.session.logged_in,
      company_id: req.session.company_id,
      user_id: req.session.user_id,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/redirect", async (req, res) => {
  try {
    res.render("redirect");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("*", async (req, res) => {
  res.render("404");
});

module.exports = router;
