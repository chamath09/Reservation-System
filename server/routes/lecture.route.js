// routes/lecture.route.js

const express = require('express');
const { createLecture, getLectures, deleteLecture } = require('../controllers/lecturecontroller');

const router = express.Router();

// Route for creating a new lecture
router.post('/', createLecture);

// Route for getting all lectures (optional)
router.get('/', getLectures);

router.delete('/:id', deleteLecture);



module.exports = router;
