// @desc    Get all doctors
// @route   GET /api/v1/doctor
// @access  Public
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = [
      {
        id: '1',
        firstName: 'Michael',
        lastName: 'Rodriguez',
        specialization: 'Cardiology',
        qualification: 'MD, FACC',
        experience: 15,
        department: 'Cardiology'
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Chen',
        specialization: 'Neurology',
        qualification: 'MD, PhD',
        experience: 12,
        department: 'Neurology'
      },
      {
        id: '3',
        firstName: 'Emily',
        lastName: 'Johnson',
        specialization: 'Pediatrics',
        qualification: 'MD, FAAP',
        experience: 10,
        department: 'Pediatrics'
      }
    ];

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single doctor
// @route   GET /api/v1/doctor/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    res.json({
      success: true,
      doctor: {
        id: req.params.id,
        firstName: 'Dr.',
        lastName: 'Sample',
        specialization: 'General Medicine'
      }
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get doctors by department
// @route   GET /api/v1/doctor/department/:department
// @access  Public
exports.getDoctorsByDepartment = async (req, res) => {
  try {
    res.json({
      success: true,
      count: 1,
      doctors: [
        {
          id: '1',
          firstName: 'Michael',
          lastName: 'Rodriguez',
          specialization: 'Cardiology',
          qualification: 'MD, FACC',
          experience: 15,
          department: req.params.department
        }
      ]
    });
  } catch (error) {
    console.error('Get doctors by department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};