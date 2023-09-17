const router = require("express").Router();
const { PO } = require("../../models");
const withAuth = require("../../util/auth");

// The `/api/po` endpoint

// CREATE: a new PO
router.post("/", withAuth, async (req, res) => {
  try {
    const poData = await PO.create(req.body);
    res.status(201).json({ po: poData, message: "PO created successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATES: an existing PO using its `id`.
router.put("/:id", withAuth, async (req, res) => {
  try {
    const poData = await PO.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!poData[0]) {
      res.status(400).json({ message: "No PO found with this ID." });
      return;
    }
    res.status(200).json(poData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // DELETE: an existing PO using its `id`.
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const poData = await PO.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!poData) {
      res.status(400).json({ message: "No PO found with this ID." });
      return;
    }
    res.status(200).json(poData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
