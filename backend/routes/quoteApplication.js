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
    
    // Increment Inquiries for the selected service
    const Service = require('../models/Service');
    const serviceName = req.body.serviceRequired || req.body.service;
    if (serviceName) {
      await Service.findOneAndUpdate(
        { title: serviceName },
        { $inc: { inquiries: 1 } }
      ).catch(err => console.error("Failed to increment service inquiries:", err));
    }

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Quote Request',
      title: 'New Quote Requested',
      message: `${req.body.name || req.body.fullName || 'A new lead'} has requested a quote for ${serviceName || 'a service'}.`,
      link: '/admin/contacts?tab=quote'
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
