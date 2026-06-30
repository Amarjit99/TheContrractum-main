const express = require("express");
const router = express.Router();
const ExpertConsultation = require("../models/ExpertConsultation");

// POST /api/expert-consultations - submit request
router.post("/", async (req, res) => {
  try {
    const {
      name, email, company,
      systemProductName, technicalIssue, errorScreenshot, deviceInformation, contactDetails,
      consultationTopic, preferredSchedule, phone,
      // Business Consultation fields
      country, industry, serviceRequired, inquiryType, companySize, preferredContactMethod, projectTimeline, message
    } = req.body;

    // Check if new form fields or old form fields are provided
    if (!systemProductName && !consultationTopic && !industry && (!name || !email)) {
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
      phone,
      // Business Consultation fields
      country,
      industry,
      serviceRequired,
      inquiryType,
      companySize,
      preferredContactMethod,
      projectTimeline,
      message
    });

    await newConsultation.save();

    // Create Notification
    const Notification = require("../models/Notification");
    const isExpertForm = !!consultationTopic || !!industry;
    const notificationTitle = isExpertForm ? 'New Expert Consultation Request' : 'New Technical Assistance Request';
    const notificationMessage = isExpertForm 
      ? `${finalName} requested a consultation on: "${industry || consultationTopic}".`
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
