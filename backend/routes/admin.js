const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');
const JobApplication = require('../models/JobApplication');
const Partner = require('../models/Partner');
const Blog = require('../models/Blog');
const PartnerApplication = require('../models/PartnerApplication');
const AdvisorApplication = require('../models/AdvisorApplication');
const DemoRequest = require('../models/DemoRequest');
const ExpertConsultation = require('../models/ExpertConsultation');
const QuoteApplication = require('../models/QuoteApplication');
const SupportTicket = require('../models/SupportTicket');
const NewsletterSubscription = require('../models/NewsletterSubscription');
const Intern = require('../models/Intern');
const Affiliate = require('../models/Affiliate');
const Survey = require('../models/Survey');
const Referral = require('../models/Referral');
const Notification = require('../models/Notification');
const AdminRegistration = require('../models/AdminRegistration');
const MiniEvent = require('../models/MiniEvent');
const Feedback = require('../models/Feedback');
const VolunteerApplication = require('../models/VolunteerApplication');
const EventRegistration = require('../models/EventRegistration');
const AdminDetail = require('../models/Admin');
const Certificate = require('../models/Certificate');
const IdCard = require('../models/IdCard');
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
      totalApplications, totalPartners, totalBlogs,
      totalCertificates, totalIdCards
    ] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Visitor.countDocuments(),
      JobApplication.countDocuments(),
      Partner.countDocuments(),
      Blog.countDocuments(),
      Certificate.countDocuments(),
      IdCard.countDocuments()
    ]);

    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    const recentApplications = await JobApplication.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers, totalContacts, totalVisitors,
      totalApplications, totalPartners, totalBlogs,
      totalCertificates, totalIdCards,
      recentContacts, recentApplications
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
});

// GET /api/admin/detailed-stats — Certificate and lifecycle insights
router.get('/detailed-stats', async (req, res) => {
  try {
    const [
      categoryDistribution,
      deptDistribution,
      locationDistribution,
      monthlyTrends
    ] = await Promise.all([
      Certificate.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }]),
      Certificate.aggregate([{ $group: { _id: "$department", count: { $sum: 1 } } }]),
      Certificate.aggregate([{ $group: { _id: "$location", count: { $sum: 1 } } }]),
      Certificate.aggregate([
        {
          $group: {
            _id: { $month: "$issueDate" },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ])
    ]);

    res.json({
      categoryDistribution,
      deptDistribution,
      locationDistribution,
      monthlyTrends
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch detailed stats', error: err.message });
  }
});

// GET /api/admin/form-stats — Dynamic form stats for dashboard visuals
router.get('/form-stats', async (req, res) => {
  try {
    const [
      contactCount, jobAppsCount, partnerAppsCount, advisorAppsCount,
      demoRequestsCount, expertConsultsCount, quoteAppsCount,
      supportTicketsCount, newsletterCount, internAppsCount,
      affiliateAppsCount, surveyResponsesCount, referralCount,
      staffRegistrationsCount, miniEvents, feedbackCount, volunteerAppsCount,
      eventRegistrationsCount
    ] = await Promise.all([
      Contact.countDocuments(),
      JobApplication.countDocuments(),
      PartnerApplication.countDocuments(),
      AdvisorApplication.countDocuments(),
      DemoRequest.countDocuments(),
      ExpertConsultation.countDocuments(),
      QuoteApplication.countDocuments(),
      SupportTicket.countDocuments(),
      NewsletterSubscription.countDocuments(),
      Intern.countDocuments(),
      Affiliate.countDocuments(),
      Survey.countDocuments(),
      Referral.countDocuments(),
      AdminRegistration.countDocuments({ status: 'pending' }),
      MiniEvent.find(),
      Feedback.countDocuments(),
      VolunteerApplication.countDocuments(),
      EventRegistration.countDocuments()
    ]);

    const rsvpCount = miniEvents.reduce((acc, curr) => acc + (curr.attendees ? curr.attendees.length : 0), 0);

    const stats = [
      { name: 'Contact Us', count: contactCount },
      { name: 'Job Apps', count: jobAppsCount },
      { name: 'Partner Apps', count: partnerAppsCount },
      { name: 'Advisor Apps', count: advisorAppsCount },
      { name: 'Demo Requests', count: demoRequestsCount },
      { name: 'Expert Consults', count: expertConsultsCount },
      { name: 'Quote Apps', count: quoteAppsCount },
      { name: 'Support Tickets', count: supportTicketsCount },
      { name: 'Newsletters', count: newsletterCount },
      { name: 'Intern Apps', count: internAppsCount },
      { name: 'Affiliate Apps', count: affiliateAppsCount },
      { name: 'User Surveys', count: surveyResponsesCount },
      { name: 'Referrals', count: referralCount },
      { name: 'Staff Requests', count: staffRegistrationsCount },
      { name: 'Event RSVPs', count: rsvpCount },
      { name: 'Event Registrations', count: eventRegistrationsCount },
      { name: 'User Feedback', count: feedbackCount },
      { name: 'Volunteer Apps', count: volunteerAppsCount }
    ];

    const totalResponses = stats.reduce((acc, curr) => acc + curr.count, 0);

    res.json({
      totalForms: stats.length,
      totalResponses,
      stats
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch form stats', error: err.message });
  }
});

// GET /api/admin/notifications/unread-count — Number of unread notifications
router.get('/notifications/unread-count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({ isRead: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch unread count' });
  }
});

// GET /api/admin/notifications — Recent notifications
router.get('/notifications', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50; // increased limit for the full page
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(limit);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// DELETE /api/admin/notifications/:id — Delete a notification
router.delete('/notifications/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

// PUT /api/admin/notifications/mark-read — Mark all notifications as read
router.put('/notifications/mark-read', async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark notifications as read' });
  }
});

// GET /api/admin/users — All users
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const query = {};
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    if (role) query.role = role;

    let [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      User.countDocuments(query),
    ]);

    // If fetching admins, merge with AdminDetail (admindb) data
    if (role === 'admin') {
      const adminDetails = await AdminDetail.find({ email: { $in: users.map(u => u.email) } });
      users = users.map(u => {
        const detail = adminDetails.find(d => d.email === u.email);
        if (detail) {
          return {
            ...u.toObject(),
            adminSubRole: detail.adminSubRole,
            adminPermissions: detail.adminPermissions,
            joiningDate: detail.joiningDate
          };
        }
        return u;
      });
    }

    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// PUT /api/admin/users/:id/role — Promote / demote & change password & update details
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role, isApproved, joiningDate, password, name, email, mobile } = req.body;
    
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.role === 'super-admin' && role && role !== 'super-admin') {
      return res.status(403).json({ message: 'Cannot downgrade a super admin' });
    }

    if (role && !['user', 'admin', 'super-admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (req.params.id === req.user._id.toString() && role && role !== req.user.role) return res.status(400).json({ message: 'Cannot change your own role' });
    
    const update = {};
    if (role) update.role = role;
    if (isApproved !== undefined) update.isApproved = isApproved;
    if (joiningDate !== undefined) update.joiningDate = joiningDate;

    if (name) {
      update.name = name;
      update.firstName = name.split(' ')[0] || '';
      update.lastName = name.split(' ').slice(1).join(' ') || ' ';
    }
    if (email) update.email = email;
    if (mobile) update.mobile = mobile;

    if (password && password.trim().length > 0) {
      const bcrypt = require('bcryptjs');
      update.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Sync changes to AdminDetail if this user is an admin
    if (name || email) {
      const adminUpdate = {};
      if (name) adminUpdate.name = name;
      if (email) adminUpdate.email = email;
      await AdminDetail.findOneAndUpdate(
        { $or: [{ userId: targetUser._id }, { email: targetUser.email }] },
        adminUpdate
      );
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

// PUT /api/admin/users/:id/admin-details — Update admin-specific metadata
router.put('/users/:id/admin-details', async (req, res) => {
  try {
    const { adminSubRole, adminPermissions, joiningDate, isApproved } = req.body;
    
    const update = {
      adminSubRole,
      adminPermissions,
      joiningDate,
      isApproved: isApproved !== undefined ? isApproved : true
    };

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Sync or create AdminDetail
    const adminDetail = await AdminDetail.findOne({ $or: [{ userId: user._id }, { email: user.email }] });
    if (adminDetail) {
      if (adminSubRole !== undefined) adminDetail.adminSubRole = adminSubRole;
      if (adminPermissions !== undefined) adminDetail.adminPermissions = adminPermissions;
      if (joiningDate !== undefined) adminDetail.joiningDate = joiningDate;
      await adminDetail.save();
    } else if (user.role === 'admin') {
      await AdminDetail.create({
        userId: user._id,
        name: user.name || 'Admin',
        email: user.email,
        adminSubRole: adminSubRole || 'HR', // Provide default
        adminPermissions: adminPermissions || 'view',
        joiningDate: joiningDate || new Date().toISOString()
      });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update admin details', error: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) return res.status(400).json({ message: 'Cannot delete your own account' });
    const user = await User.findOneAndDelete({ _id: req.params.id, role: { $ne: 'super-admin' } });
    if (!user) {
      const existing = await User.findById(req.params.id);
      if (existing && existing.role === 'super-admin') return res.status(403).json({ message: 'Super admin accounts cannot be deleted' });
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Clean up orphaned AdminDetail if user was an admin
    await AdminDetail.findOneAndDelete({ $or: [{ userId: user._id }, { email: user.email }] });

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
      Contact.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Contact.countDocuments(),
    ]);
    res.json({ contacts, total, page, pages: Math.ceil(total / limit) });
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

// GET /api/admin/pending-registrations — Pending admin requests
router.get('/pending-registrations', async (req, res) => {
  try {
    const list = await AdminRegistration.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending registrations' });
  }
});

// POST /api/admin/approve-registration/:id — Approve an admin registration
router.post('/approve-registration/:id', async (req, res) => {
  try {
    const reg = await AdminRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    if (reg.status !== 'pending') return res.status(400).json({ message: 'Already processed' });

    // Derive names and mobile for legacy records or missing fields
    const firstName = reg.firstName || reg.name?.split(' ')[0] || 'Admin';
    const lastName = reg.lastName || reg.name?.split(' ').slice(1).join(' ') || 'Staff';
    const mobile = reg.mobile || '0000000000';

    // 1. Create the User (authentication)
    const user = await User.create({
      firstName,
      lastName,
      email: reg.email,
      password: reg.password, // Plain password; will be hashed by User model pre-save
      role: 'admin',
      isApproved: true,
      mobile: mobile,
      adminSubRole: reg.adminSubRole,
      joiningDate: reg.joiningDate
    });

    // 2. Create the Admin Detail (stored in admindb collection)
    await AdminDetail.create({
      userId: user._id,
      name: `${firstName} ${lastName}`,
      email: reg.email,
      adminSubRole: reg.adminSubRole,
      adminPermissions: reg.adminPermissions,
      joiningDate: reg.joiningDate,
      registrationId: reg._id
    });

    // 3. Update status
    reg.status = 'approved';
    await reg.save();

    res.json({ message: 'Registration approved successfully!' });
  } catch (err) {
    console.error('Approval Error:', err);
    res.status(500).json({ message: 'Failed to approve registration', error: err.message });
  }
});

module.exports = router;
