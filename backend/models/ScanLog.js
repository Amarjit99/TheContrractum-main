const mongoose = require("mongoose");

const scanLogSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    index: true,
  },
  employeeName: String,
  scannedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
  userAgent: String,
  location: String, // Optional: Derived from IP
});

module.exports = mongoose.model("ScanLog", scanLogSchema);
