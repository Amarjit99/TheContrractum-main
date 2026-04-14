const express = require('express');
const router = express.Router();
const PartnerApplication = require('../models/PartnerApplication');

const mongoose = require('mongoose');

// @route   POST /api/partner-applications
// @desc    Register a new partner application
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('--- Incoming Partner Application ---');
    const newApplication = new PartnerApplication(req.body);
    const savedApplication = await newApplication.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Partner Application',
      title: 'New Partner Application',
      message: `${req.body.name || 'A new partner'} has applied for partnership.`,
      link: '/admin/partners'
    });

    console.log('✅ Document saved successfully!');
    console.log('📍 Database Name:', mongoose.connection.name);
    console.log('📂 Collection Name:', PartnerApplication.collection.name);
    console.log('🆔 Document ID:', savedApplication._id);
    res.status(201).json(savedApplication);
  } catch (err) {
    console.error('❌ Partner Application Error:', err.message);
    res.status(400).json({ 
      message: 'Failed to submit application. Please check your inputs.',
      error: err.message 
    });
  }
});

module.exports = router;
