const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const { protect: auth } = require('../middleware/auth'); // Optional admin auth

// 1. Submit a New Referral (Public / Employee)
router.post('/', async (req, res) => {
  try {
    const { referrerName, candidateName, candidateEmail, candidatePhone, jobRole } = req.body;
    
    // Validation
    if (!referrerName || !candidateName || !candidateEmail || !candidatePhone || !jobRole) {
      return res.status(400).json({ message: "All fields are required to submit a referral." });
    }

    const newReferral = new Referral({
      referrerName,
      candidateName,
      candidateEmail,
      candidatePhone,
      jobRole
    });

    await newReferral.save();
    res.status(201).json({ message: "Referral submitted successfully!", result: newReferral });
  } catch (error) {
    console.error("Error submitting referral:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. Fetch all referrals (Admin & Dashboard user)
// Here we support fetching by a `referrerName` query to filter for the employee dashboard
router.get('/', async (req, res) => {
  try {
    const { referrerName } = req.query;
    let query = {};
    if (referrerName) {
        query.referrerName = referrerName;
    }
    const referrals = await Referral.find(query).sort({ createdAt: -1 });
    res.json(referrals);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 3. Update Status (Admin)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Applied', 'Interview', 'Hired', 'Declined'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status." });
    }

    const updated = await Referral.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Referral not found." });
    
    res.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 4. Approve Reward (Admin)
router.put('/:id/reward', auth, async (req, res) => {
  try {
    const updated = await Referral.findByIdAndUpdate(
        req.params.id, 
        { rewardStatus: 'Rewarded' }, 
        { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Referral not found." });
    
    res.json(updated);
  } catch (error) {
    console.error("Error updating reward:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
