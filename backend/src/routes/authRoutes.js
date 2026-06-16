const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// POST /api/v1/auth/register
router.post('/register', register);

// POST /api/v1/auth/login
router.post('/login', login);

// GET /api/v1/auth/logout
router.get('/logout', logout);

module.exports = router;
