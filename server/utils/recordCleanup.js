// utils/recordCleanup.js
const mongoose = require('mongoose');

// Common function to delete past records
const deletePastRecords = async (model) => {
  try {
    // Get current date and time
    const currentDate = new Date();

    // Find and delete all records where the date is in the past
    // or the date is today and the end time has passed
    const result = await model.deleteMany({
      $or: [
        { date: { $lt: currentDate } }, // Delete if date is in the past
        {
          date: { $eq: currentDate }, // If the date is today
          endTime: { $lt: currentDate.toTimeString().slice(0, 5) } // Compare time strings (HH:MM)
        }
      ]
    });

    console.log(`${result.deletedCount} past record(s) have been deleted from ${model.modelName}.`);
  } catch (error) {
    console.error(`Error deleting past records from ${model.modelName}:`, error);
  }
};

module.exports = deletePastRecords; // Export the function
