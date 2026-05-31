const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { initializeBackupCron } = require("./utils/backup");
const { initializeReportCron } = require("./utils/reports");
const { initializeExpiryCron } = require("./utils/expiryNotifier");

const app = express();
const PORT = process.env.PORT || 5000; // Updated to resolve port conflict

// Trust proxy — required for Hostinger (runs behind Nginx reverse proxy)
// Without this, express-rate-limit throws ValidationError on X-Forwarded-For headers
app.set("trust proxy", 1);

// Middleware (Must be before Rate Limiters for CORS to work on 429 responses)
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Rate Limiting — 1000 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." }
});
app.use("/api/", apiLimiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many login attempts. Please try again after 15 minutes." }
});
app.use("/api/auth/login", authLimiter);

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
        let adminUser = await User.findOne({ email: defaultEmail });
        if (!adminUser) {
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
        } else {
          // Check if password and role are already correct to prevent redundant saves / double-hashing on hot reload restarts
          const isPasswordCorrect = await adminUser.matchPassword("admin12345");
          if (!isPasswordCorrect || adminUser.role !== "super-admin" || !adminUser.isApproved) {
            adminUser.password = "admin12345";
            adminUser.role = "super-admin";
            adminUser.isApproved = true;
            await adminUser.save();
            console.log("✅ Default admin user credentials synced to admin12345 / super-admin");
          } else {
            console.log("✅ Default admin user already has correct password and role (skipping save)");
          }
        }

        const defaultCustomerEmail = "customer@thecontractum.com";
        const customerExists = await User.findOne({ email: defaultCustomerEmail });
        if (!customerExists) {
          await User.create({
            firstName: "John",
            lastName: "Doe",
            name: "John Doe",
            email: defaultCustomerEmail,
            password: "customer12345",
            mobile: "9876543210",
            role: "user",
            isApproved: true,
            company: "Contractum Corp",
            industry: "Legal Tech",
            jobTitle: "Operations Director"
          });
          console.log("✅ Default customer user created: customer@thecontractum.com");
        }
      } catch (err) {
        console.error("❌ Failed to seed default users:", err);
      }
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.warn("⚠️  MONGO_URI not set. Skipping MongoDB connection.");
}

// ---------- Routes ----------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TheContractum backend is running" });
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
app.use("/api/event-registrations", require("./routes/eventRegistration"));
app.use("/api/public", require("./routes/publicForms"));
app.use("/api/audit-logs", require("./routes/auditLogs"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/tasks", require("./routes/tasks"));


// Serve static files
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT} (Hostinger Ready)`);
  initializeBackupCron();
  initializeReportCron();
  initializeExpiryCron();
});
