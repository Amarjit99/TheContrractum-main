const express = require("express");
const router = express.Router();
const ExpertConsultation = require("../models/ExpertConsultation");

// POST /api/expert-consultations - submit request
router.post("/", async (req, res) => {
  try {
    const { name, email, company } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newConsultation = new ExpertConsultation({ name, email, company });
    await newConsultation.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Expert Consultation',
      title: 'New Consultation Request',
      message: `${name} from ${company} requested a consultation.`,
      link: '/admin/contacts'
    });

    res.status(201).json({ success: true, message: "Request sent successfully!" });
  } catch (err) {
    console.error("Expert route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/expert-consultations - get all submissions
router.get("/", async (req, res) => {
  try {
    const consultations = await ExpertConsultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
