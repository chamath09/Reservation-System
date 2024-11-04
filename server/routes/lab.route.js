// routes/lab.route.js

const express = require('express');
const { createLab, getLabs, deleteLab } = require('../controllers/labcontroller');

const router = express.Router();

// Route for creating a new lab
router.post('/', createLab);

// Route for getting all labs (optional)
router.get('/', getLabs);

router.delete('/:id', deleteLab);

module.exports = router;
