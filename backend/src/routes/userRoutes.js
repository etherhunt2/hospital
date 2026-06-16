const express = require('express');
const router = express.Router();
const { getPatientProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

// GET /api/v1/user/patient/me
router.get('/patient/me', auth, getPatientProfile);

module.exports = router;
