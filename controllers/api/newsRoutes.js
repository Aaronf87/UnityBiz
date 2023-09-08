const router = require('express').Router();
const Newsletter = require('../../models/newsletter');  // adjust the path to your Newsletter model

console.log("Imported Newsletter model:", Newsletter); // Log the imported Newsletter model

// Create a new newsletter post
router.post('/', async (req, res) => {
  console.log("Request body:", req.body);  // Log the request body
  try {
    const newNewsletter = await Newsletter.create(req.body);
    console.log("New newsletter created:", newNewsletter);  // Log the new newsletter
    res.status(201).json(newNewsletter);
  } catch (err) {
    console.log("Error:", err);  // Log any errors
    res.status(500).json(err);
  }
});

// Get all newsletter posts
router.get('/', async (req, res) => {
  try {
    const newsletters = await Newsletter.findAll();
    console.log("Found newsletters:", newsletters);  // Log the found newsletters
    res.status(200).json(newsletters);
  } catch (err) {
    console.log("Error:", err);  // Log any errors
    res.status(500).json(err);
  }
});

// Get a single newsletter post by ID
router.get('/:id', async (req, res) => {
  try {
    const newsletter = await Newsletter.findByPk(req.params.id);
    if (!newsletter) {
      console.log("No newsletter found with this id!");  // Log the result
      res.status(404).json({ message: 'No newsletter found with this id!' });
      return;
    }
    console.log("Found newsletter:", newsletter);  // Log the found newsletter
    res.status(200).json(newsletter);
  } catch (err) {
    console.log("Error:", err);  // Log any errors
    res.status(500).json(err);
  }
});

// Update a newsletter post by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedNewsletter = await Newsletter.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedNewsletter[0]) {
      console.log("No newsletter found with this id!");  // Log the result
      res.status(404).json({ message: 'No newsletter found with this id!' });
      return;
    }
    console.log("Updated newsletter:", updatedNewsletter);  // Log the updated newsletter
    res.status(200).json(updatedNewsletter);
  } catch (err) {
    console.log("Error:", err);  // Log any errors
    res.status(500).json(err);
  }
});

// Delete a newsletter post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNewsletter = await Newsletter.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedNewsletter) {
      console.log("No newsletter found with this id!");  // Log the result
      res.status(404).json({ message: 'No newsletter found with this id!' });
      return;
    }
    console.log("Deleted newsletter:", deletedNewsletter);  // Log the deleted newsletter
    res.status(200).json(deletedNewsletter);
  } catch (err) {
    console.log("Error:", err);  // Log any errors
    res.status(500).json(err);
  }
});

module.exports = router;


