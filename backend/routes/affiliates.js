const express = require('express');
const router = express.Router();
const Affiliate = require('../models/Affiliate');
const { protect } = require('../middleware/auth');
const { adminOnly, checkSubRole } = require('../middleware/admin');

// @route   POST api/affiliate-applications
// @desc    Submit an affiliate application
// @access  Public
router.post('/', async (req, res) => {
    try {
        const {
            name,
            contact,
            email,
            website,
            promotionalMethods,
            audienceCategory,
            paymentDetails,
            promotionMethod
        } = req.body;

        const newApplication = new Affiliate({
            name,
            contact,
            email,
            website,
            promotionalMethods,
            audienceCategory,
            paymentDetails,
            promotionMethod
        });

        await newApplication.save();

        // Create Admin Notification
        const Notification = require("../models/Notification");
        try {
            await Notification.create({
                type: 'Affiliate Application',
                title: 'New Affiliate Application',
                message: `${name} has applied for the Affiliate Program.`,
                link: '/admin/affiliates'
            });
        } catch (notifErr) {
            console.error('Error creating affiliate notification:', notifErr.message);
        }

        res.status(201).json({
            success: true,
            message: 'Your form is submitted successfully.',
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
router.get('/', protect, checkSubRole(['Finance']), async (req, res) => {
    try {
        const applications = await Affiliate.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/affiliate-applications/:id
// @desc    Update an affiliate application status/details
// @access  Private (Admin Only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const { status, name, website, audienceCategory, paymentDetails, promotionMethod } = req.body;
        
        let application = await Affiliate.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        // Update fields if provided
        if (status) application.status = status;
        if (name) application.name = name;
        if (website) application.website = website;
        if (audienceCategory) application.audienceCategory = audienceCategory;
        if (paymentDetails) application.paymentDetails = paymentDetails;
        if (promotionMethod) application.promotionMethod = promotionMethod;

        await application.save();
        res.json({ success: true, message: 'Application updated successfully', data: application });
    } catch (err) {
        console.error('Error updating application:', err.message);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});

// @route   DELETE api/affiliate-applications/:id
// @desc    Delete an affiliate application
// @access  Private (Admin Only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const application = await Affiliate.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        await Affiliate.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (err) {
        console.error('Error deleting application:', err.message);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});

module.exports = router;
