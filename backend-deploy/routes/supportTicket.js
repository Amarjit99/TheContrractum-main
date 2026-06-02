const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');

// @route   POST /api/support-tickets
// @desc    Submit a new support ticket
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newTicket = new SupportTicket(req.body);
    const savedTicket = await newTicket.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Support Ticket',
      title: 'New Support Ticket',
      message: `${req.body.name || 'A user'} has submitted a support ticket regarding "${req.body.subject || 'Support'}".`,
      link: '/admin/dashboard'
    });

    res.status(201).json(savedTicket);
  } catch (err) {
    console.error('Support Ticket Error:', err.message);
    res.status(400).json({ 
      message: 'Failed to submit support ticket. Please check your inputs.',
      error: err.message 
    });
  }
});

module.exports = router;
