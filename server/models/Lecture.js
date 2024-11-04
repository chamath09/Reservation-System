// models/Lecture.js

const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  module: { type: String, required: true },
  moduleCode: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  hall: { type: String, required: true },
  hallType: { type: String, default: 'lecture'},
});

// Create the model
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
