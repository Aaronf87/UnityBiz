const router = require("express").Router();
const { Company } = require("../../models");

// The `/api/company` endpoint

// CREATE COMPANY: Company Creation Route
router.post("/", async (req, res) => {
  try {
    const companyData = await Company.create(req.body);
    res
      .status(200)
      .json({
        company: companyData,
        companyData: "Successfully created company account!",
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

// VALIDATE: Company ADMIN Login Route
// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { name: req.body.name } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password. Please try again!" });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password. Please try again!" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.user_name = userData.name;
//       req.session.logged_in = true;
//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
