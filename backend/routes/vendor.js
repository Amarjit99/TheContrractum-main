const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");
const Notification = require("../models/Notification");

// POST /api/vendor - submit vendor registration
router.post("/", async (req, res) => {
  try {
    const { 
      companyName, vendorName, vendorContact, gstNumber, panNumber, contactPerson, 
      businessAddress, servicesOffered, companyType, directors, 
      authorizedDirectorName, authorizationDetails, bankDetails, documents 
    } = req.body;

    if (!companyName || !gstNumber || !panNumber || !contactPerson || !businessAddress || !servicesOffered) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const newVendor = new Vendor({
      companyName,
      vendorName,
      vendorContact,
      gstNumber,
      panNumber,
      contactPerson,
      businessAddress,
      servicesOffered,
      companyType,
      directors,
      authorizedDirectorName,
      authorizationDetails,
      bankDetails,
      documents
    });
    await newVendor.save();

    // Create Notification in database for Admin Panel Notification Icon
    await Notification.create({
      type: 'Vendor Registration',
      title: 'New Vendor Registration',
      message: `A new vendor "${companyName}" (${vendorName || contactPerson}) has registered.`,
      link: '/admin/submissions?tab=vendor'
    });

    res.status(201).json({ success: true, message: "Vendor registration submitted successfully!" });
  } catch (err) {
    console.error("Vendor route error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/vendor - retrieve all vendor registrations
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// PUT /api/vendor/:id - update vendor status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Vendor not found." });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// DELETE /api/vendor/:id - delete vendor registration
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Vendor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Vendor not found." });
    res.json({ message: "Vendor deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
