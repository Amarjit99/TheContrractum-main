const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000; // Updated to resolve port conflict

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Connect to MongoDB (only if URI is configured)
const mongoUri = process.env.MONGO_URI;
if (mongoUri && mongoUri.startsWith("mongodb")) {
  mongoose
    .connect(mongoUri)
    .then(async () => {
      console.log("✅ MongoDB connected");

      // Seed default admin user
      try {
        const User = require("./models/User");
        const defaultEmail = "admin@thecontractum.com";
        const adminExists = await User.findOne({ email: defaultEmail });
        if (!adminExists) {
          await User.create({
            firstName: "Admin",
            lastName: "User",
            name: "Admin",
            email: defaultEmail,
            password: "admin12345",
            mobile: "0000000000",
            role: "super-admin",
            isApproved: true,
          });
          console.log("✅ Default admin user created: admin@thecontractum.com");
        }
      } catch (err) {
        console.error("❌ Failed to seed default admin user:", err);
      }
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.warn("⚠️  MONGO_URI not set. Skipping MongoDB connection.");
}

// ---------- Routes ----------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TheContrractum backend is running" });
});

// Feature routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/expert-consultations", require("./routes/expertConsultation"));
app.use("/api/advisor-applications", require("./routes/advisorApplication"));
app.use("/api/visitors", require("./routes/visitors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/cms", require("./routes/cms"));
app.use("/api/partner-applications", require("./routes/partnerApplication"));
app.use("/api/quote-applications", require("./routes/quoteApplication"));
app.use("/api/support-tickets", require("./routes/supportTicket"));
app.use("/api/subscription", require("./routes/subscription"));
app.use("/api/demo-requests", require("./routes/demoRequest"));
app.use("/api/cookies", require("./routes/cookies"));
app.use("/api/survey", require("./routes/survey"));
app.use("/api/admin/news", require("./routes/news"));
app.use("/api/news", require("./routes/news")); // Exposing a cleaner public read path optionally, but we'll point both to the same file which handles logic.
app.use("/api/interns", require("./routes/interns"));
app.use("/api/founders", require("./routes/founders"));
app.use("/api/id-cards", require("./routes/idCards"));
app.use("/api/referrals", require("./routes/referrals"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/completed-projects", require("./routes/completedProjects"));
app.use("/api/contracts", require("./routes/contracts"));
app.use("/api/affiliate-applications", require("./routes/affiliates"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/mini-events", require("./routes/miniEventRoutes"));
app.use("/api/public", require("./routes/publicForms"));


// Serve static files
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT} (Hostinger Ready)`);
});
