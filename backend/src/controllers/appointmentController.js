const Appointment = require('../models/Appointment');

// @desc    Create appointment
// @route   POST /api/v1/appointment
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      patient: req.user.id
    };

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user appointments
// @route   GET /api/v1/appointment
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'firstName lastName specialization')
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error('Get user appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};