// controllers/examController.js
const Exam = require('../models/Exam');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Function to handle Excel file upload and parsing
exports.uploadExamExcel = async (req, res) => {
  try {
    // Get the path of the uploaded file
    const filePath = path.join(__dirname, '../uploads/', req.file.filename);
    
    // Read and parse the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    // Save each record to the database
    for (let record of data) {
      const newExam = new Exam({
        name: record.name,
        email: record.email,
        indexNumber: record.indexNumber,
        module: record.module,
        startTime: record.startTime,
        endTime: record.endTime,
        date: record.date,
        hall:record.hall
      });

      await newExam.save();
    }

    // Remove the file after processing
    fs.unlinkSync(filePath);

    res.status(200).json({ message: 'Excel file uploaded and data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading Excel file' });
  }
};
