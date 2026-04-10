const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');
const JobApplication = require('../models/JobApplication');
const Partner = require('../models/Partner');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

const router = express.Router();

// All admin routes require JWT + admin role
router.use(protect, adminOnly);

// GET /api/admin/stats — Dashboard overview numbers
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers, totalContacts, totalVisitors, 
      totalApplications, totalPartners, totalBlogs
    ] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Visitor.countDocuments(),
      JobApplication.countDocuments(),
      Partner.countDocuments(),
      Blog.countDocuments(),
    ]);
    
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    const recentApplications = await JobApplication.find().sort({ createdAt: -1 }).limit(5);

    res.json({ 
      totalUsers, totalContacts, totalVisitors, 
      totalApplications, totalPartners, totalBlogs,
      recentContacts, recentApplications 
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
});

// GET /api/admin/users — All users
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] } : {};
    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit),
      User.countDocuments(query),
    ]);
    res.json({ users, total, page, pages: Math.ceil(total/limit) });
  } catch {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// PUT /api/admin/users/:id/role — Promote / demote
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (req.params.id === req.user._id.toString()) return res.status(400).json({ message: 'Cannot change your own role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Failed to update role' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) return res.status(400).json({ message: 'Cannot delete your own account' });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// GET /api/admin/contacts — All contact submissions
router.get('/contacts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit),
      Contact.countDocuments(),
    ]);
    res.json({ contacts, total, page, pages: Math.ceil(total/limit) });
  } catch {
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', async (req, res) => {
  try {
    const c = await Contact.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Contact deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

module.exports = router;
