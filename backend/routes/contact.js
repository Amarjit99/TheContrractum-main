const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");

// POST /api/contact - submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // Create Notification
    await Notification.create({
      type: 'Contact Form',
      title: 'New Contact Lead',
      message: `${name} has sent a message regarding "${subject}"`,
      link: '/admin/contacts'
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
