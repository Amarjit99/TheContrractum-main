const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// GET settings (Publicly accessible - used by footer, templates, etc.)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ companyName: 'The Contractum' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
});

// PUT update settings (Admin only)
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    const { companyName, companyLogo, companySeal, authorizedSignature, signatoryDesignation, socialLinks, contactDetails } = req.body;
    let settings = await Settings.findOne();

    if (settings) {
      if (companyName) settings.companyName = companyName;
      if (companyLogo !== undefined) settings.companyLogo = companyLogo;
      if (companySeal !== undefined) settings.companySeal = companySeal;
      if (authorizedSignature !== undefined) settings.authorizedSignature = authorizedSignature;
      if (signatoryDesignation) settings.signatoryDesignation = signatoryDesignation;
      if (socialLinks) {
        const current = settings.socialLinks ? settings.socialLinks.toObject() : {};
        settings.socialLinks = { ...current, ...socialLinks };
      }
      if (contactDetails) {
        const current = settings.contactDetails ? settings.contactDetails.toObject() : {};
        settings.contactDetails = { ...current, ...contactDetails };
      }
      settings.updatedBy = req.user?.name || req.user?.email || 'Admin';
      await settings.save();
    } else {
      settings = await Settings.create({
        companyName: companyName || 'The Contractum',
        companyLogo: companyLogo || '',
        companySeal: companySeal || '',
        authorizedSignature: authorizedSignature || '',
        signatoryDesignation: signatoryDesignation || 'Authorized Authority',
        socialLinks: socialLinks || {},
        contactDetails: contactDetails || {},
        updatedBy: req.user?.name || req.user?.email || 'Admin'
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings', error: err.message });
  }
});

module.exports = router;
