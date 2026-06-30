const express = require("express");
const router = express.Router();
const EventRegistration = require("../models/EventRegistration");
const Notification = require("../models/Notification");

// @route   POST api/event-registrations
// @desc    Submit an event registration
// @access  Public
router.post("/", async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      firstName,
      lastName,
      email,
      phone,
      organization,
      amountPaid,
      paymentMethod,
      paymentStatus,
      paymentDetails
    } = req.body;

    if (!eventName || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newRegistration = new EventRegistration({
      eventName,
      eventDate,
      eventTime,
      firstName,
      lastName,
      email,
      phone,
      organization,
      amountPaid: amountPaid || "Free",
      paymentMethod: paymentMethod || "N/A",
      paymentStatus: paymentStatus || "N/A",
      paymentDetails: paymentDetails || {},
    });

    await newRegistration.save();

    // Create Notification
    await Notification.create({
      type: "Event Registration",
      title: "New Event Registration",
      message: `${firstName} ${lastName} registered for "${eventName}".`,
      link: "/admin/event-registrations", 
    });

    res.status(201).json({
      message: "Registration submitted successfully!",
      registration: newRegistration,
    });
  } catch (err) {
    console.error("Error submitting event registration:", err.message);
    res.status(500).json({ message: "Server Error. Please try again later." });
  }
});

// @route   GET api/event-registrations
// @desc    Get all event registrations
// @access  Admin (should be protected, but keeping it simple for now as per project pattern)
router.get("/", async (req, res) => {
  try {
    const registrations = await EventRegistration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error("Error fetching registrations:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
