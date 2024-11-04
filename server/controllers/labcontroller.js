// controllers/labController.js

const Lab = require('../models/Lab');

// Create a new lab session
const createLab = async (req, res) => {
  const { module, moduleCode, date, startTime, endTime, labHall } = req.body;

  // Check for existing lab sessions with the same date, time, and hall
  const existingLab = await Lab.findOne({
    date,
    labHall,
    $or: [
      { startTime: { $lte: endTime }, endTime: { $gte: startTime } },
    ],
  });

  if (existingLab) {
    return res.status(400).json({ message: 'This time slot for the selected lab hall has already been taken.' });
  }

  try {
    const lab = new Lab({ module, moduleCode, date, startTime, endTime, labHall });
    await lab.save();
    res.status(201).json({ message: 'Lab added successfully!', lab });
  } catch (error) {
    res.status(500).json({ message: 'Error adding lab', error });
  }
};

// Get all labs (optional, for demonstration purposes)
const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching labs', error });
  }
};

// Function to delete a lab
const deleteLab = async (req, res) => {
  try {
    const result = await Lab.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Lab not found' });
    }
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lab', error });
  }
};

module.exports = { createLab, getLabs, deleteLab };
