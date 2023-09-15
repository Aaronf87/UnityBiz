const router = require('express').Router();
const { Newsletter, Employee } = require('../../models');
const withAuth = require("../../util/auth");

// The `/api/news` endpoint

// GET all newsletter posts
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const newsData = await Newsletter.findAll({
//       order: [["createdAt", "DESC"]],
//       include: [{ model: Employee, attributes: ["first_name", "last_name"] }],
//     });
//     res.status(200).json(newsData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// CREATE: a new newsletter post
router.post('/', withAuth, async (req, res) => {
  try {
    const newsData = await Newsletter.create(req.body);
    res.status(201).json(newsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATES: an existing newsletter using its `id`.
router.put("/:id", withAuth, async (req, res) => {
  try {
    const newsData = await Newsletter.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!newsData[0]) {
      res.status(400).json({ message: "No newsletter found with this ID." });
      return;
    }
    res.status(200).json(newsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE: an existing newsletter using its `id`.
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const newsData = await Newsletter.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!newsData) {
      res.status(400).json({ message: "No newsletter found with this ID." });
      return;
    }
    res.status(200).json(newsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// *** Get a single newsletter post by ID ***
router.get('/:id', withAuth, async (req, res) => {
  try {
    const newsletter = await Newsletter.findByPk(req.params.id);
    if (!newsletter) {
      res.status(404).json({ message: 'No newsletter found with this id!' });
      return;
    }
    res.status(200).json(newsletter);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


