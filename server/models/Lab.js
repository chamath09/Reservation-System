// models/Lab.js

const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  module: { type: String, required: true },
  moduleCode: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  labHall: { type: String, required: true },
  hallType: { type: String, default: 'lab'},
});

// Create the model
const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;
