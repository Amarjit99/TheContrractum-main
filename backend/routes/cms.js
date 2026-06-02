const express = require('express');
const Blog = require('../models/Blog');
const Job = require('../models/Job');
const Partner = require('../models/Partner');
const Service = require('../models/Service');
const JobApplication = require('../models/JobApplication');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const upload = require('../middleware/upload');

const router = express.Router();

// Helper to generate full CRUD routes for a specific Model
const generateCRUDRoutes = (Model, pathName) => {
  // Public GET all
  router.get(`/${pathName}`, async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: `Failed to fetch ${pathName}` });
    }
  });

  // Public GET single
  router.get(`/${pathName}/:id`, async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching item' });
    }
  });

  // Protected POST create
  router.post(`/${pathName}`, protect, adminOnly, async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: `Failed to create ${pathName}`, error: err.message });
    }
  });

  // Protected PUT update
  router.put(`/${pathName}/:id`, protect, adminOnly, async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: 'Failed to update', error: err.message });
    }
  });

  // Protected DELETE
  router.delete(`/${pathName}/:id`, protect, adminOnly, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete' });
    }
  });
};

// Generate standard routes
generateCRUDRoutes(Blog, 'blogs');
generateCRUDRoutes(Job, 'jobs');
generateCRUDRoutes(Partner, 'partners');
generateCRUDRoutes(Service, 'services');

// Job Applications
router.get('/applications', protect, adminOnly, async (req, res) => {
  const apps = await JobApplication.find().sort({ createdAt: -1 });
  res.json(apps);
});

// Update Job Application (SaaS Dashboard Actions)
router.put('/applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const app = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Job Application
router.delete('/applications/:id', protect, adminOnly, async (req, res) => {
  try {
    const app = await JobApplication.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/applications', upload.single('resume'), async (req, res) => {
  try {
    console.log("RECEIVED APPLICATION!");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : '';
    const jobTitle = req.body.positionApplied || req.body.jobTitle || '';
    const positionApplied = req.body.positionApplied || req.body.jobTitle || '';
    const app = new JobApplication({
      ...req.body,
      jobTitle,
      positionApplied,
      resume: resumeUrl
    });
    await app.save();

    // Create Notification
    const Notification = require("../models/Notification");
    await Notification.create({
      type: 'Job Application',
      title: 'New Job Application',
      message: `${req.body.fullName} has applied for the position of "${positionApplied}".`,
      link: '/admin/careers'
    });

    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Blog Image Upload
router.post('/blogs/upload-image', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });
  const imageUrl = `/uploads/blogs/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
