const express = require('express');
const router = express.Router();
const Affiliate = require('../models/Affiliate');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// @route   POST api/affiliate-applications
// @desc    Submit an affiliate application
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, contact, email, website, promotionalMethods } = req.body;

        const newApplication = new Affiliate({
            name,
            contact,
            email,
            website,
            promotionalMethods
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: 'Affiliate application submitted successfully',
            data: newApplication
        });
    } catch (err) {
        console.error('Error in affiliate application:', err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
});

// @route   GET api/affiliate-applications
// @desc    Get all affiliate applications
// @access  Private (Admin Only)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const applications = await Affiliate.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
