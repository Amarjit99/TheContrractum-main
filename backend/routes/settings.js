const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// GET settings (Publicly accessible for templates)
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
    const { companyName, companyLogo, companySeal, authorizedSignature, signatoryDesignation } = req.body;
    let settings = await Settings.findOne();
    
    if (settings) {
      settings.companyName = companyName || settings.companyName;
      settings.companyLogo = companyLogo !== undefined ? companyLogo : settings.companyLogo;
      settings.companySeal = companySeal !== undefined ? companySeal : settings.companySeal;
      settings.authorizedSignature = authorizedSignature !== undefined ? authorizedSignature : settings.authorizedSignature;
      settings.signatoryDesignation = signatoryDesignation !== undefined ? signatoryDesignation : settings.signatoryDesignation;
      settings.updatedBy = req.user?.name || req.user?.email || 'Admin';
      await settings.save();
    } else {
      settings = await Settings.create({
        companyName: companyName || 'The Contractum',
        companyLogo: companyLogo || '',
        companySeal: companySeal || '',
        authorizedSignature: authorizedSignature || '',
        signatoryDesignation: signatoryDesignation || 'Authorized Authority',
        updatedBy: req.user?.name || req.user?.email || 'Admin'
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings' });
  }
});

module.exports = router;
