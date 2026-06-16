const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controllers/appointmentController');

// POST /api/v1/appointment
router.post('/', createAppointment);

// GET /api/v1/appointment
router.get('/', getAppointments);

module.exports = router;
