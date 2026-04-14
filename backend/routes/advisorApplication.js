const express = require("express");
const router = express.Router();
const AdvisorApplication = require("../models/AdvisorApplication");

// POST /api/advisor-applications - submit request
router.post("/", async (req, res) => {
  try {
    const { 
      fullName, email, phone, linkedin, domain, 
      experience, currentOrg, achievements, interestStatement 
    } = req.body;

    if (!fullName || !email || !phone || !domain || !experience || !currentOrg || !interestStatement) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const newApplication = new AdvisorApplication({
      fullName, email, phone, linkedin, domain, 
      experience, currentOrg, achievements, interestStatement
    });

    await newApplication.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Advisor Application',
      title: 'New Advisor Application',
      message: `${fullName} has applied to be an advisor for "${domain}".`,
      link: '/admin/dashboard'
    });

    res.status(201).json({ success: true, message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Advisor application route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/advisor-applications - get all submissions
router.get("/", async (req, res) => {
  try {
    const applications = await AdvisorApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
