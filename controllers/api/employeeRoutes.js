const router = require("express").Router();
const { Employee, Company } = require("../../models");

// The `/api/employee` endpoint

// ***TEST ROUTE WILL BE DELETED: Get all employees
router.get("/", async (req, res) => {
  try {
    const employeeData = await Employee.findAll({
      include: [{ model: Company, attributes: ["company_id"] }],
    });

    res.status(200).json({ employee: employeeData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE EMPLOYEE: Employee Sign-Up Route
router.post("/", async (req, res) => {
  try {
    // Find Company ID using the Company's UUID.
    const companyData = await Company.findOne({
      where: { company_id: req.body.company_id },
      attributes: ["id", "company_id"],
    });

    if (!companyData) {
      res.status(400).json({ message: "Incorrect company id." });
      return;
    }

    // Replace Company UUID with Company ID in req.body
    for (const key in req.body) {
      if (`${key}` === "company_id") {
        req.body[`${key}`] = companyData.id;
        break;
      }
    }

    // Check if username is taken, message is displayed prompting to choose another username.
    const validName = await Employee.findOne({
      where: { username: req.body.username },
    });

    if (validName) {
      res
        .status(400)
        .json({ message: "Username is taken. Choose another username." });
      return;
    }

    // Validates hashed password.
    const validPassword = await companyData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // Create new username.
    const employeeData = await Employee.create(req.body);
    res.status(200).json({
      employee: employeeData,
      message: "Successfully created account!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// VALIDATE EMPLOYEE: Employee Sign-In/Login Route
router.post("/login", async (req, res) => {
  try {
    const employeeData = await Employee.findOne({
      where: { username: req.body.username },
    });
    if (!employeeData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await employeeData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    res.json({ employee: employeeData, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// ***Future : Option to UPDATE Username

// ***Future: Option to DELETE Username

module.exports = router;
