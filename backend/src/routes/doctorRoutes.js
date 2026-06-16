const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, getDoctorsByDepartment } = require('../controllers/doctorController');

// GET /api/v1/doctor
router.get('/', getAllDoctors);

// GET /api/v1/doctor/department/:department
router.get('/department/:department', getDoctorsByDepartment);

// GET /api/v1/doctor/:id
router.get('/:id', getDoctorById);

module.exports = router;
