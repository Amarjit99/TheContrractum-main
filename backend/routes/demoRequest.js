const express = require("express");
const router = express.Router();
const DemoRequest = require("../models/DemoRequest");

// @route   POST api/demo-requests
// @desc    Submit a request for a live demo
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, companyName, email, phoneNumber, productInterested, preferredDate } = req.body;

    if (!name || !companyName || !email || !phoneNumber || !productInterested || !preferredDate) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newDemoRequest = new DemoRequest({
      name,
      companyName,
      email,
      phoneNumber,
      productInterested,
      preferredDate,
    });

    await newDemoRequest.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Demo Request',
      title: 'New Demo Requested',
      message: `${name} from ${companyName} requested a live demo for "${productInterested}" on ${new Date(preferredDate).toLocaleDateString()}.`,
      link: '/admin/contacts?tab=demo'
    });

    res.status(201).json({
      message: "The Live Demo request has been submitted successfully!",
      request: newDemoRequest,
    });
  } catch (err) {
    console.error("Error submitting demo request:", err.message);
    res.status(500).json({ message: "Server Error. Please try again later." });
  }
});

module.exports = router;
