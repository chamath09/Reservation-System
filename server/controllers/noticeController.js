const Notice = require('../models/Notice');

// Create a new notice
const createNotice = async (req, res) => {
    try {
        const notice = new Notice(req.body);
        await notice.save();
        res.status(201).json(notice);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create notice.', error });
    }
};

// Get all notices
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch notices.', error });
    }
};

// Update a notice
const updateNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update notice.', error });
    }
};

// Delete a notice
const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        await Notice.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete notice.', error });
    }
};

module.exports = { createNotice, getNotices, updateNotice, deleteNotice };
