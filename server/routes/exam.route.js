// routes/exam.route.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const examController = require('../controllers/examcontroller');

// Setup multer for file uploads (destination is 'uploads/' directory)
const upload = multer({ dest: 'uploads/' });

// Route to handle Excel file upload
router.post('/upload-exam', upload.single('file'), examController.uploadExamExcel);

module.exports = router;
