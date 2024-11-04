const Exam = require('../models/Exam');

exports.getExamsByIndex = async (req, res) => {
  const indexNumber = req.params.indexNumber;

  try {
    const exams = await Exam.find({ indexNumber }).sort({ date: 1, startTime: 1 }); // Sort by date and startTime
    if (exams.length === 0) {
      return res.status(404).json({ message: 'No exams found for this index number.' });
    }
    res.json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
