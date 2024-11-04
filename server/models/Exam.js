// models/Exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  indexNumber: { type: String, required: true },
  module: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  date: { type: String, required: true },
  hall: { type: String, required: true },
});

// module.exports = mongoose.model('Exam', ExamSchema);

const Exam = mongoose.model('Exam,', ExamSchema);

module.exports = Exam;