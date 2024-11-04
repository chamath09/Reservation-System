const express = require('express');
const { getLecturesAndLabs } = require('../controllers/lectureLabController');

const router = express.Router();

router.get('/', getLecturesAndLabs); // GET request for lectures and labs

module.exports = router;
