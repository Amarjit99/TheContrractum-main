const express = require("express");
const router = express.Router();
const DemoRequest = require("../models/DemoRequest");

// @route   POST api/demo-requests
// @desc    Submit a request for a live demo
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, company, jobTitle, employeeCount, interestArea, message } = req.body;

    if (!firstName || !lastName || !email || !company) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newDemoRequest = new DemoRequest({
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      employeeCount,
      interestArea,
      message,
    });

    await newDemoRequest.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Demo Request',
      title: 'New Demo Requested',
      message: `${firstName} ${lastName} from ${company} requested a live demo for "${interestArea}".`,
      link: '/admin/dashboard'
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
