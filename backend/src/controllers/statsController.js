// @desc    Get about stats
// @route   GET /api/v1/stats/about
// @access  Public
exports.getAboutStats = (req, res) => {
  res.json({
    success: true,
    aboutInfo: {
      heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
      doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1740&auto=format&fit=crop',
      missionVisionGraphic: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
    },
    team: [
      {
        id: 1,
        name: 'Dr. John Smith',
        role: 'Chairman',
        bio: 'Over 30 years of experience in healthcare management.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: 2,
        name: 'Dr. Jane Doe',
        role: 'Medical Director',
        bio: 'Leading our medical staff to excellence.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    ],
    specialists: [
      {
        id: 1,
        firstName: 'Michael',
        lastName: 'Rodriguez',
        specialization: 'Cardiology',
        department: 'Cardiology',
        qualifications: ['MD', 'FACC'],
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 2,
        firstName: 'Sarah',
        lastName: 'Chen',
        specialization: 'Neurology',
        department: 'Neurology',
        qualifications: ['MD', 'PhD'],
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
      }
    ]
  });
};

// @desc    Get news stats
// @route   GET /api/v1/stats/news
// @access  Public
exports.getNewsStats = (req, res) => {
  res.json({
    success: true,
    news: [
      {
        id: 1,
        title: 'New Wing Opening',
        category: 'Hospital Updates',
        date: new Date().toISOString(),
        excerpt: 'We are opening a new state-of-the-art wing for pediatric care.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop'
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Free Health Camp',
        date: new Date(Date.now() + 86400000 * 7).toISOString(),
        time: '09:00 AM - 05:00 PM',
        location: 'Main Hospital Campus'
      }
    ]
  });
};
