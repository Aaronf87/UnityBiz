const router = require("express").Router();
// const { Company, Employee, Newsletter, PO, Communication } = require("../models");

// The `/` endpoint

// HOME: Display all blog posts on homepage.
router.get("/", async (req, res) => {
  try {
    // const postData = await PO.findAll({
    //   order: [["createdAt", "DESC"]],
    //   include: [{ model: User, attributes: ["name"] }],
    // });

    // const posts = postData.map((post) => post.get({ plain: true }));

    res.render("PO");
  } catch (err) {
    res.status(500).json(err);
  }
});

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
router.get("/company/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
}
);


module.exports = router;
