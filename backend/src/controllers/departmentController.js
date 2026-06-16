// @desc    Get all departments
// @route   GET /api/v1/department
// @access  Public
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = [
      {
        id: '1',
        name: 'Cardiology',
        description: 'Comprehensive heart care with advanced diagnostic and treatment options',
        headOfDepartment: 'Dr. Michael Rodriguez, MD',
        location: '3rd Floor, East Wing',
        specialists: 12
      },
      {
        id: '2',
        name: 'Neurology',
        description: 'Expert care for neurological conditions and brain health',
        headOfDepartment: 'Dr. Sarah Chen, MD, PhD',
        location: '4th Floor, West Wing',
        specialists: 8
      },
      {
        id: '3',
        name: 'Pediatrics',
        description: 'Specialized healthcare for infants, children, and adolescents',
        headOfDepartment: 'Dr. Emily Johnson, MD',
        location: '2nd Floor, South Wing',
        specialists: 15
      },
      {
        id: '4',
        name: 'Orthopedics',
        description: 'Advanced treatment for bones, joints, and musculoskeletal system',
        headOfDepartment: 'Dr. James Wilson, MD',
        location: '1st Floor, North Wing',
        specialists: 10
      },
      {
        id: '5',
        name: 'Emergency Medicine',
        description: '24/7 emergency medical services with rapid response team',
        headOfDepartment: 'Dr. Robert Martinez, MD',
        location: 'Ground Floor, Main Entrance',
        specialists: 20
      },
      {
        id: '6',
        name: 'Oncology',
        description: 'Comprehensive cancer care with latest treatment technologies',
        headOfDepartment: 'Dr. Lisa Thompson, MD, PhD',
        location: '5th Floor, Central Wing',
        specialists: 7
      }
    ];

    res.json({
      success: true,
      count: departments.length,
      departments
    });
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single department
// @route   GET /api/v1/department/:id
// @access  Public
exports.getDepartmentById = async (req, res) => {
  try {
    // This would typically query database
    res.json({
      success: true,
      message: 'Department details retrieved',
      department: {
        id: req.params.id,
        name: 'Sample Department',
        description: 'Department description'
      }
    });
  } catch (error) {
    console.error('Get department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};