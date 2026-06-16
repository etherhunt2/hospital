const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');

// POST /api/v1/message
router.post('/', sendMessage);

// GET /api/v1/message
router.get('/', getMessages);

module.exports = router;
