const express = require('express');
const {
    createNotice,
    getNotices,
    updateNotice,
    deleteNotice,
} = require('../controllers/noticeController');

const router = express.Router();

// POST /api/notices
router.post('/', createNotice);

// GET /api/notices
router.get('/', getNotices);

// PUT /api/notices/:id
router.put('/:id', updateNotice);

// DELETE /api/notices/:id
router.delete('/:id', deleteNotice);

module.exports = router;
