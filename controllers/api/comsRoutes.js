const express = require('express');
const router = express.Router();
const { Communication } = require('../../models');

// Create a new communication
router.post('/', async (req, res) => {
  try {
    const newCommunication = await Communication.create(req.body);
    res.status(201).json(newCommunication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all communications
router.get('/', async (req, res) => {
  try {
    const communications = await Communication.findAll();
    res.status(200).json(communications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single communication by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const communication = await Communication.findByPk(id);
    if (!communication) {
      return res.status(404).json({ message: 'Communication not found' });
    }
    res.status(200).json(communication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a communication by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await Communication.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Communication not found' });
    }
    res.status(200).json({ message: 'Communication updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a communication by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Communication.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ message: 'Communication not found' });
    }
    res.status(200).json({ message: 'Communication deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
