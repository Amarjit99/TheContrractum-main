const express = require("express");
const router = express.Router();
const Cookie = require("../models/Cookie");

// @route   POST /api/cookies/accept
// @desc    Store accepted cookies email in MongoDB
// @access  Public
router.post("/accept", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const newConsent = new Cookie({ email });
    await newConsent.save();

    res.status(201).json({ msg: "Cookie consent accepted and stored", data: newConsent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
