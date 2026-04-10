const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
            name: "Admin",
            email: defaultEmail,
            password: "admin12345",
            role: "admin",
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
app.use("/api/visitors", require("./routes/visitors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/cms", require("./routes/cms"));

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
