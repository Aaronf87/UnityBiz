const express = require('express');  // <-- Make sure this line is here
const router = express.Router();
const { Communication, Employee } = require("../../models");
const withAuth = require("../../util/auth");

// The `/api/coms` endpoint

// GET all communications
router.get("/", withAuth, async (req, res) => {
  try {
    const comsData = await Communication.findAll({
      include: [
        {
          model: Employee,
          as: "creator",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Employee,
          as: "recipient",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
    res.status(200).json(comsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// *** GET a single communication by ID
router.get("/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const comsData = await Communication.findByPk(id);
    if (!comsData) {
      return res.status(404).json({ message: "Communication not found" });
    }
    res.status(200).json(comsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// CREATE: a new communication
router.post("/", withAuth, async (req, res) => {
  try {
    const comsData = await Communication.create(req.body);
    res.status(201).json(comsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATES: a communication by ID
router.put("/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await Communication.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Communication not found" });
    }
    res.status(200).json({ message: "Communication updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE: a communication by ID
router.delete("/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Communication.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Communication not found" });
    }
    res.status(200).json({ message: "Communication deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
