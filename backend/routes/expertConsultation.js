const express = require("express");
const router = express.Router();
const ExpertConsultation = require("../models/ExpertConsultation");

// POST /api/expert-consultations - submit request
router.post("/", async (req, res) => {
  try {
    const {
      name, email, company,
      systemProductName, technicalIssue, errorScreenshot, deviceInformation, contactDetails,
      consultationTopic, preferredSchedule, phone
    } = req.body;

    // Check if new form fields or old form fields are provided
    if (!systemProductName && !consultationTopic && (!name || !email)) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Set fallbacks for compatibility
    const finalName = name || contactDetails || "Technical Assistance";
    const finalEmail = email || (contactDetails && contactDetails.includes('@') ? contactDetails : "tech-support@thecontractum.com");
    const finalCompany = company || systemProductName || "N/A";

    const newConsultation = new ExpertConsultation({
      name: finalName,
      email: finalEmail,
      company: finalCompany,
      systemProductName,
      technicalIssue,
      errorScreenshot,
      deviceInformation,
      contactDetails,
      consultationTopic,
      preferredSchedule,
      phone
    });

    await newConsultation.save();

    // Create Notification
    const Notification = require("../models/Notification");
    const isExpertForm = !!consultationTopic;
    const notificationTitle = isExpertForm ? 'New Expert Consultation Request' : 'New Technical Assistance Request';
    const notificationMessage = isExpertForm 
      ? `${finalName} requested a consultation on: "${consultationTopic}".`
      : `${finalName} requested assistance on ${finalCompany}.`;

    await Notification.create({
      type: 'Expert Consultation',
      title: notificationTitle,
      message: notificationMessage,
      link: `/admin/submissions?tab=expert&id=${newConsultation._id}`
    });

    res.status(201).json({ success: true, message: "Request submitted successfully!" });
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
