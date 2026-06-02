const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const VolunteerApplication = require('../models/VolunteerApplication');

// @desc    Submit Feedback
// @route   POST /api/public/feedback
// @access  Public
router.post('/feedback', async (req, res) => {
  try {
    const { rating, message, name, email } = req.body;
    if (!rating || !message) {
      return res.status(400).json({ message: 'Rating and message are required' });
    }
    const feedback = await Feedback.create({ rating, message, name, email });

    // Create Admin Notification
    const Notification = require("../models/Notification");
    try {
      await Notification.create({
        type: 'User Feedback',
        title: 'New User Feedback Received',
        message: `${name || 'Someone'} rated: ${rating}/5. Message: "${message.substring(0, 40)}..."`,
        link: `/admin/submissions?tab=feedback&id=${feedback._id}`
      });
    } catch (notifErr) {
      console.error('Error creating feedback notification:', notifErr.message);
    }

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

    // Create Admin Notification
    const Notification = require("../models/Notification");
    try {
      await Notification.create({
        type: 'Volunteer Application',
        title: 'New Volunteer Application',
        message: `${req.body.fullName} has applied as a Volunteer.`,
        link: '/admin/submissions'
      });
    } catch (notifErr) {
      console.error('Error creating volunteer notification:', notifErr.message);
    }

    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
