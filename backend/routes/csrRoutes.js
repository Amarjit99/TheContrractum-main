const express = require("express");
const router = express.Router();
const CSRInitiative = require("../models/CSRInitiative");
const CSRReportDownload = require("../models/CSRReportDownload");

// POST /api/csr/report-download - Save a report download request
router.post("/report-download", async (req, res) => {
  try {
    const { name, email, contact, country } = req.body;
    if (!name || !email || !contact) {
      return res.status(400).json({ message: "Name, email, and contact are required." });
    }
    
    // Server-side validation
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Only @gmail.com email addresses are allowed." });
    }
    if (contact.replace(/\D/g, "").length !== 10) {
      return res.status(400).json({ message: "Contact number must be exactly 10 digits." });
    }

    const newDownload = new CSRReportDownload({ name, email, contact, country });
    await newDownload.save();
    res.status(201).json({ success: true, message: "Download registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error saving download request", error: error.message });
  }
});

// GET /api/csr/report-downloads - Get all report downloads
router.get("/report-downloads", async (req, res) => {
  try {
    const downloads = await CSRReportDownload.find().sort({ createdAt: -1 });
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report downloads", error: error.message });
  }
});

// GET all CSR initiatives
router.get("/", async (req, res) => {
  try {
    const csrs = await CSRInitiative.find().sort({ createdAt: -1 });
    res.json(csrs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching CSR initiatives", error: error.message });
  }
});

// GET single CSR initiative
router.get("/:id", async (req, res) => {
  try {
    const csr = await CSRInitiative.findById(req.params.id);
    if (!csr) return res.status(404).json({ message: "CSR Initiative not found" });
    res.json(csr);
  } catch (error) {
    res.status(500).json({ message: "Error fetching CSR initiative", error: error.message });
  }
});

// POST new CSR initiative
router.post("/", async (req, res) => {
  try {
    const newCsr = new CSRInitiative(req.body);
    await newCsr.save();
    res.status(201).json(newCsr);
  } catch (error) {
    res.status(400).json({ message: "Error creating CSR initiative", error: error.message });
  }
});

// PUT update CSR initiative
router.put("/:id", async (req, res) => {
  try {
    const updatedCsr = await CSRInitiative.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCsr) return res.status(404).json({ message: "CSR Initiative not found" });
    res.json(updatedCsr);
  } catch (error) {
    res.status(400).json({ message: "Error updating CSR initiative", error: error.message });
  }
});

// DELETE CSR initiative
router.delete("/:id", async (req, res) => {
  try {
    const deletedCsr = await CSRInitiative.findByIdAndDelete(req.params.id);
    if (!deletedCsr) return res.status(404).json({ message: "CSR Initiative not found" });
    res.json({ message: "CSR Initiative deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting CSR initiative", error: error.message });
  }
});

// PATCH to toggle featured status
router.patch("/:id/toggle-featured", async (req, res) => {
  try {
    const csr = await CSRInitiative.findById(req.params.id);
    if (!csr) return res.status(404).json({ message: "CSR Initiative not found" });
    csr.featured = !csr.featured;
    await csr.save();
    res.json(csr);
  } catch (error) {
    res.status(500).json({ message: "Error toggling featured status", error: error.message });
  }
});

module.exports = router;
