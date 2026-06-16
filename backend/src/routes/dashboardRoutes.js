const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const {
  getPatientDashboard,
  getPatientAppointments,
  getPatientPayments,
  getPatientReports,
  getDoctorDashboard,
  getDoctorPatients,
  getDoctorAppointments,
  updateDoctorAppointment,
  createDoctorReport,
  updateDoctorReport,
  deleteDoctorReport,
  getDoctorReports
} = require('../controllers/dashboardController');

// Middleware to verify role
const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({
      success: false,
      message: `Access denied. This resource is for ${role}s only.`
    });
  }
  next();
};

// ─── Patient Routes ─────────────────────────────────
router.get('/patient', requireAuth, requireRole('Patient'), getPatientDashboard);
router.get('/patient/appointments', requireAuth, requireRole('Patient'), getPatientAppointments);
router.get('/patient/payments', requireAuth, requireRole('Patient'), getPatientPayments);
router.get('/patient/reports', requireAuth, requireRole('Patient'), getPatientReports);

// ─── Doctor Routes ──────────────────────────────────
router.get('/doctor', requireAuth, requireRole('Doctor'), getDoctorDashboard);
router.get('/doctor/patients', requireAuth, requireRole('Doctor'), getDoctorPatients);
router.get('/doctor/appointments', requireAuth, requireRole('Doctor'), getDoctorAppointments);
router.put('/doctor/appointment/:id', requireAuth, requireRole('Doctor'), updateDoctorAppointment);
router.get('/doctor/reports', requireAuth, requireRole('Doctor'), getDoctorReports);
router.post('/doctor/report', requireAuth, requireRole('Doctor'), createDoctorReport);
router.put('/doctor/report/:id', requireAuth, requireRole('Doctor'), updateDoctorReport);
router.delete('/doctor/report/:id', requireAuth, requireRole('Doctor'), deleteDoctorReport);

module.exports = router;
