const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");

// POST /api/contact - submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, fullName, email, phone, companyName, subject, message, country, preferredContactMethod } = req.body;

    const resolvedName = fullName || name;
    if (!resolvedName || !email || !subject || !message) {
      return res.status(400).json({ error: "Name, Email, Subject, and Message are required." });
    }

    const newContact = new Contact({
      name: resolvedName,
      fullName: resolvedName,
      email,
      phone,
      companyName,
      subject,
      message,
      country,
      preferredContactMethod
    });
    await newContact.save();

    // Create Notification
    await Notification.create({
      type: 'Contact Form',
      title: 'New Contact Lead',
      message: `${resolvedName} has sent a message regarding "${subject}"`,
      link: '/admin/contacts?tab=general'
    });

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/contact - get all submissions (admin use)
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
