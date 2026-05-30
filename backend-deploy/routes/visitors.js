const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");

// GET /api/visitors - get current count
router.get("/", async (req, res) => {
  try {
    let record = await Visitor.findOne();
    if (!record) {
      record = await Visitor.create({ count: 0 });
    }
    res.json({ count: record.count });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/visitors/increment - increment visitor count
router.post("/increment", async (req, res) => {
  try {
    let record = await Visitor.findOne();
    if (!record) {
      record = await Visitor.create({ count: 1 });
    } else {
      record.count += 1;
      await record.save();
    }
    res.json({ count: record.count });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
