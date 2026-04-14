const express = require('express');
const router = express.Router();
const QuoteApplication = require('../models/QuoteApplication');

// @route   POST /api/quote-applications
// @desc    Register a new quote request
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newQuote = new QuoteApplication(req.body);
    const savedQuote = await newQuote.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Quote Request',
      title: 'New Quote Requested',
      message: `${req.body.name || 'A new lead'} has requested a quote for ${req.body.service || 'a service'}.`,
      link: '/admin/dashboard'
    });

    res.status(201).json(savedQuote);
  } catch (err) {
    console.error('Quote Application Error:', err.message);
    res.status(400).json({ 
      message: 'Failed to submit quote request. Please check your inputs.',
      error: err.message 
    });
  }
});

module.exports = router;
