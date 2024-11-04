// controllers/lectureController.js

const Lecture = require('../models/Lecture');

// Create a new lecture
const createLecture = async (req, res) => {
  const { module, moduleCode, date, startTime, endTime, hall } = req.body;

  // Check for existing lectures with the same date, time, and hall
  const existingLecture = await Lecture.findOne({
    date,
    hall,
    $or: [
      { startTime: { $lte: endTime }, endTime: { $gte: startTime } },
    ],
  });

  if (existingLecture) {
    return res.status(400).json({ message: 'This time slot for the selected hall has already been taken.' });
  }

  try {
    const lecture = new Lecture({ module, moduleCode, date, startTime, endTime, hall });
    await lecture.save();
    res.status(201).json({ message: 'Lecture added successfully!', lecture });
  } catch (error) {
    res.status(500).json({ message: 'Error adding lecture', error });
  }
};

// Get all lectures (optional, for demonstration purposes)
const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lectures', error });
  }
};

// Function to delete a lecture
const deleteLecture = async (req, res) => {
  try {
    const result = await Lecture.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lecture', error });
  }
};

module.exports = { createLecture, getLectures, deleteLecture };
