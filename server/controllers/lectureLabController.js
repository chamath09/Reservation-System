const Lecture = require('../models/Lecture');
const Lab = require('../models/Lab');

const getLecturesAndLabs = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    const labs = await Lab.find();
    const allSessions = [...lectures, ...labs]; // Combine both sets of lectures and labs
    res.json(allSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLecturesAndLabs };
