const express = require('express');
const router = express.Router();
const { getAllDepartments, getDepartmentById } = require('../controllers/departmentController');

// GET /api/v1/department
router.get('/', getAllDepartments);

// GET /api/v1/department/:id
router.get('/:id', getDepartmentById);

module.exports = router;
