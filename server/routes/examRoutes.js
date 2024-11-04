const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.Controller');

router.get('/:indexNumber', examController.getExamsByIndex);

module.exports = router;
