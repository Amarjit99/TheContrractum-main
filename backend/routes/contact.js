const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact - submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/contact - get all submissions (admin use)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
