// @desc    Send contact message
// @route   POST /api/v1/message
// @access  Public
exports.sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // In a real app, you might save this to database or send email
    console.log('Contact message received:', {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    res.json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon.'
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all messages
// @route   GET /api/v1/message
// @access  Private
exports.getMessages = async (req, res) => {
  res.json({
    success: true,
    messages: []
  });
};