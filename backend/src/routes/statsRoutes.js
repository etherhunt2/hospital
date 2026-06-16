const express = require('express');
const router = express.Router();
const { getAboutStats, getNewsStats } = require('../controllers/statsController');

// GET /api/v1/stats/about
router.get('/about', getAboutStats);

// GET /api/v1/stats/news
router.get('/news', getNewsStats);

module.exports = router;
