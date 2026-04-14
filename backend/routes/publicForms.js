const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const VolunteerApplication = require('../models/VolunteerApplication');

// @desc    Submit Feedback
// @route   POST /api/public/feedback
// @access  Public
router.post('/feedback', async (req, res) => {
  try {
    const { rating, message } = req.body;
    if (!rating || !message) {
      return res.status(400).json({ message: 'Rating and message are required' });
    }
    const feedback = await Feedback.create({ rating, message });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Submit Volunteer Application
// @route   POST /api/public/volunteer
// @access  Public
router.post('/volunteer', async (req, res) => {
  try {
    const application = await VolunteerApplication.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
