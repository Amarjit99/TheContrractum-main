const express = require("express");
const router = express.Router();
const IdCard = require("../models/IdCard");
const { protect: auth } = require("../middleware/auth");

// In the plan, I put photo in MongoDB as a string (base64) so it's easier to fetch from DB without configuring multer, but let's see. If they have upload.js, maybe I can use base64 for simplicity since I don't know the exact upload format expected.
// Better yet, I can support both or just Base64 via JSON. I'll stick to Base64 in JSON payload. No multer needed for direct base64.

// Create a new ID Card
router.post("/", auth, async (req, res) => {
  try {
    const {
      employeeId,
      name,
      category,
      department,
      designation,
      bloodGroup,
      contactNumber,
      email,
      photo,
      status,
      validUntil,
      cardColor,
    } = req.body;

    // Basic validation
    if (!employeeId || !name || !category || !department || !designation || !contactNumber || !email || !photo || !validUntil) {
      return res.status(400).json({ message: "Mandatory fields are missing." });
    }

    const existingCard = await IdCard.findOne({ employeeId });
    if (existingCard) {
      return res.status(400).json({ message: "Employee ID already exists." });
    }

    const newIdCard = new IdCard({
      employeeId,
      name,
      category,
      department,
      designation,
      bloodGroup,
      contactNumber,
      email,
      photo,
      status,
      validUntil,
      cardColor,
    });

    await newIdCard.save();
    res.status(201).json(newIdCard);
  } catch (error) {
    console.error("Error creating ID Card:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get all ID Cards (Admin)
router.get("/", auth, async (req, res) => {
  try {
    const idCards = await IdCard.find().sort({ issueDate: -1 });
    res.json(idCards);
  } catch (error) {
    console.error("Error fetching ID Cards:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const ScanLog = require("../models/ScanLog");

// Get all scan logs (Admin) — MUST be before /:employeeId
router.get("/logs/all", auth, async (req, res) => {
  try {
    const logs = await ScanLog.find().sort({ scannedAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    console.error("Error fetching scan logs:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Batch upload ID Cards
router.post("/bulk", auth, async (req, res) => {
  try {
    const cards = req.body;
    if (!Array.isArray(cards)) return res.status(400).json({ message: "Invalid data format." });

    // Filter out duplicates (based on employeeId)
    const existingIds = await IdCard.find({ employeeId: { $in: cards.map(c => c.employeeId) } }).select('employeeId');
    const existingSet = new Set(existingIds.map(c => c.employeeId));
    
    const newCards = cards.filter(c => !existingSet.has(c.employeeId));
    
    if (newCards.length === 0) {
      return res.status(400).json({ message: "All records in this file already exist." });
    }

    await IdCard.insertMany(newCards);
    res.status(201).json({ message: `Successfully onboarded ${newCards.length} records.`, count: newCards.length });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get specific ID Card by Employee ID (Public, so no auth required for verifying)
// MUST be after all static routes (/logs/all, /bulk)
router.get("/:employeeId", async (req, res) => {
  try {
    const idCard = await IdCard.findOne({ employeeId: req.params.employeeId });
    if (!idCard) return res.status(404).json({ message: "ID Card not found." });

    // Log the scan event for auditing
    try {
      await ScanLog.create({
        employeeId: idCard.employeeId,
        employeeName: idCard.name,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent']
      });
    } catch (logErr) {
      console.error("Failed to save scan log:", logErr);
    }

    res.json(idCard);
  } catch (error) {
    console.error("Error fetching ID Card:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete an ID Card
router.delete("/:id", auth, async (req, res) => {
  try {
    const idCard = await IdCard.findByIdAndDelete(req.params.id);
    if (!idCard) return res.status(404).json({ message: "ID Card not found." });
    res.json({ message: "ID Card deleted successfully." });
  } catch (error) {
    console.error("Error deleting ID Card:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update ID Card Status
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedCard = await IdCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: "ID Card not found." });
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating ID Card:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
