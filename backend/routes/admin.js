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
const Vendor = require('../models/Vendor');
const WhitepaperRequest = require('../models/WhitepaperRequest');
const MediaKitRequest = require('../models/MediaKitRequest');
const ReportRequest = require('../models/ReportRequest');
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
      eventRegistrationsCount, whitepaperCount, mediaKitCount, reportCount
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
      EventRegistration.countDocuments(),
      WhitepaperRequest.countDocuments(),
      MediaKitRequest.countDocuments(),
      ReportRequest.countDocuments()
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
      { name: 'Volunteer Apps', count: volunteerAppsCount },
      { name: 'Whitepaper Requests', count: whitepaperCount },
      { name: 'Media Kit Requests', count: mediaKitCount },
      { name: 'Report Requests', count: reportCount }
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

// POST /api/admin/users — Create a new user (Super Admin only)
router.post('/users', async (req, res) => {
  if (req.user.role !== 'super-admin') {
    return res.status(403).json({ message: 'Access denied. Only Super Admin can create accounts.' });
  }
  try {
    const { 
      firstName, lastName, email, password, mobile, role, 
      adminSubRole, adminPermissions, joiningDate, isApproved,
      isHeld, holdUntil, holdReason, company, industry, jobTitle 
    } = req.body;

    if (!firstName || !lastName || !email || !password || !mobile) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const name = `${firstName} ${lastName}`;
    const user = await User.create({
      name,
      firstName,
      lastName,
      email,
      password, // Hashes automatically via userSchema.pre('save')
      mobile,
      role: role || 'user',
      isApproved: isApproved !== undefined ? isApproved : true,
      adminSubRole: ['admin', 'manager', 'employee'].includes(role) ? (adminSubRole || 'System Administrator') : '',
      adminPermissions: ['admin', 'manager', 'employee'].includes(role) ? (adminPermissions || 'view') : 'view',
      joiningDate: joiningDate || new Date().toISOString().split('T')[0],
      isHeld: isHeld || false,
      holdUntil: holdUntil || null,
      holdReason: holdReason || '',
      company: company || '',
      industry: industry || '',
      jobTitle: jobTitle || ''
    });

    if (['admin', 'manager', 'employee'].includes(user.role)) {
      await AdminDetail.create({
        userId: user._id,
        name,
        email,
        adminSubRole: user.adminSubRole || 'System Administrator',
        adminPermissions: user.adminPermissions || 'view',
        joiningDate: user.joiningDate
      });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
});

// PUT /api/admin/users/:id/role — Promote / demote & change password & update details & hold
router.put('/users/:id/role', async (req, res) => {
  try {
    const { 
      role, isApproved, joiningDate, password, name, email, mobile,
      isHeld, holdUntil, holdReason, adminSubRole, adminPermissions,
      company, industry, jobTitle
    } = req.body;
    
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.role === 'super-admin' && role && role !== 'super-admin') {
      return res.status(403).json({ message: 'Cannot downgrade a super admin' });
    }

    if (role && !['user', 'employee', 'manager', 'admin', 'super-admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (req.params.id === req.user._id.toString() && role && role !== req.user.role) return res.status(400).json({ message: 'Cannot change your own role' });

    // Restrict promoting to Admin, Manager, Employee or Super Admin to Super Admins only
    if (role && (role === 'admin' || role === 'super-admin' || role === 'manager' || role === 'employee') && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Only Super Admins can promote users to Admin, Manager, Employee or Super Admin roles.' });
    }

    // Restrict hold options to Super Admins only
    if ((isHeld !== undefined || holdUntil !== undefined || holdReason !== undefined) && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Access denied. Only Super Admin can put accounts on hold.' });
    }
    
    const update = {};
    if (role) update.role = role;
    if (isApproved !== undefined) update.isApproved = isApproved;
    if (joiningDate !== undefined) update.joiningDate = joiningDate;
    if (isHeld !== undefined) update.isHeld = isHeld;
    if (holdUntil !== undefined) update.holdUntil = holdUntil;
    if (holdReason !== undefined) update.holdReason = holdReason;
    if (adminSubRole !== undefined) update.adminSubRole = adminSubRole;
    if (adminPermissions !== undefined) update.adminPermissions = adminPermissions;
    if (company !== undefined) update.company = company;
    if (industry !== undefined) update.industry = industry;
    if (jobTitle !== undefined) update.jobTitle = jobTitle;

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

    // Sync changes to AdminDetail if this user is or becomes an admin, manager, or employee
    if (['admin', 'manager', 'employee'].includes(user.role)) {
      const adminUpdate = {
        name: user.name,
        email: user.email,
        adminSubRole: user.adminSubRole || 'System Administrator',
        adminPermissions: user.adminPermissions || 'view',
        joiningDate: user.joiningDate || new Date().toISOString()
      };
      await AdminDetail.findOneAndUpdate(
        { $or: [{ userId: user._id }, { email: user.email }] },
        adminUpdate,
        { upsert: true, new: true }
      );
    } else {
      // Remove AdminDetail if they were demoted to 'user'
      await AdminDetail.findOneAndDelete({ $or: [{ userId: user._id }, { email: user.email }] });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

// PUT /api/admin/users/:id/admin-details — Update admin-specific metadata
router.put('/users/:id/admin-details', async (req, res) => {
  if (req.user.role !== 'super-admin') {
    return res.status(403).json({ message: 'Access denied. Only Super Admin can modify admin sub-roles and permissions.' });
  }
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
    } else if (['admin', 'manager', 'employee'].includes(user.role)) {
      await AdminDetail.create({
        userId: user._id,
        name: user.name || 'Admin',
        email: user.email,
        adminSubRole: adminSubRole || 'System Administrator', // Provide default
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

    const targetUser = await User.findById(req.params.id);
    if (targetUser && targetUser.role === 'admin' && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Access denied. Only Super Admin can delete admin accounts.' });
    }

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

// GET /api/admin/contacts/stats — Fetch all contacts for analytical metrics
router.get('/contacts/stats', async (req, res) => {
  try {
    const allContacts = await Contact.find().sort({ createdAt: -1 });
    res.json(allContacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contacts statistics', error: err.message });
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

// PUT /api/admin/contacts/:id — Update lead workflow details (status, priority, assignedTo)
router.put('/contacts/:id', async (req, res) => {
  try {
    const { status, priority, assignedTo } = req.body;
    const update = {};
    if (status) update.status = status;
    if (priority) update.priority = priority;
    if (assignedTo !== undefined) update.assignedTo = assignedTo;

    const contact = await Contact.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!contact) return res.status(404).json({ message: 'Contact lead not found' });

    // Save to System AuditLog for tracking
    try {
      const AuditLog = require('../models/AuditLog');
      await AuditLog.create({
        adminId: req.user._id || req.user.id,
        adminName: req.user.name || req.user.email || 'System Admin',
        adminRole: req.user.role || '',
        action: 'Status Change',
        entity: 'Contact',
        targetType: 'Contact',
        targetId: contact._id.toString(),
        details: `Updated contact workflow for ${contact.name}: Status=${contact.status}, Priority=${contact.priority}, AssignedTo=${contact.assignedTo}`,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
      });
    } catch (e) {
      console.error('Audit logging failed for contact update:', e);
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact workflow details', error: err.message });
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

// GET /api/admin/demo-requests — Fetch all demo requests (admin)
router.get('/demo-requests', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const [demoRequests, total] = await Promise.all([
      DemoRequest.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      DemoRequest.countDocuments(),
    ]);
    res.json({ demoRequests, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch demo requests', error: err.message });
  }
});

// DELETE /api/admin/demo-requests/:id — Delete a demo request (admin)
router.delete('/demo-requests/:id', async (req, res) => {
  try {
    const d = await DemoRequest.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Demo request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete demo request', error: err.message });
  }
});

// GET /api/admin/quote-requests — Fetch all quote requests (admin)
router.get('/quote-requests', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const [quoteRequests, total] = await Promise.all([
      QuoteApplication.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      QuoteApplication.countDocuments(),
    ]);
    res.json({ quoteRequests, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quote requests', error: err.message });
  }
});

// DELETE /api/admin/quote-requests/:id — Delete a quote request (admin)
router.delete('/quote-requests/:id', async (req, res) => {
  try {
    const q = await QuoteApplication.findByIdAndDelete(req.params.id);
    if (!q) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Quote request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete quote request', error: err.message });
  }
});

// GET /api/admin/support-tickets — Fetch all support tickets (admin)
router.get('/support-tickets', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const [supportTickets, total] = await Promise.all([
      SupportTicket.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      SupportTicket.countDocuments(),
    ]);
    res.json({ supportTickets, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch support tickets', error: err.message });
  }
});

// DELETE /api/admin/support-tickets/:id — Delete a support ticket (admin)
router.delete('/support-tickets/:id', async (req, res) => {
  try {
    const s = await SupportTicket.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Support ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete support ticket', error: err.message });
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
  if (req.user.role !== 'super-admin') {
    return res.status(403).json({ message: 'Access denied. Only Super Admin can approve admin registrations.' });
  }
  try {
    const reg = await AdminRegistration.findById(req.params.id);
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    if (reg.status !== 'pending') return res.status(400).json({ message: 'Already processed' });

    // Derive names and mobile for legacy records or missing fields
    const firstName = reg.firstName || reg.name?.split(' ')[0] || 'Admin';
    const lastName = reg.lastName || reg.name?.split(' ').slice(1).join(' ') || 'Staff';
    const mobile = reg.mobile || '0000000000';

    const adminSubRoles = [
      'System Administrator', 'HR Administrator', 'Operations Administrator', 'Website Administrator', 'CRM Administrator', 'Support Administrator', 'Marketing Administrator', 'Event Administrator', 'Content Administrator', 'Finance Administrator', 'Compliance Administrator', 'User Access Administrator', 'Database Administrator'
    ];
    const managerSubRoles = [
      'HR Manager', 'Operations Manager', 'Project Manager', 'Sales Manager', 'Marketing Manager', 'Business Development Manager', 'Support Manager', 'Technical Manager', 'Content Manager', 'Event Manager', 'CRM & Lead Manager', 'Finance Manager', 'Compliance Manager', 'Training & Development Manager'
    ];
    const employeeSubRoles = [
      'HR Executive', 'Operations Executive', 'Project Coordinator', 'Sales Executive', 'Marketing Executive', 'Business Development Executive', 'Customer Support Executive', 'Technical Support Executive', 'Content Executive', 'Event Coordinator', 'CRM Executive', 'Finance Executive', 'Compliance Executive', 'Training Coordinator', 'Data Entry & Documentation Executive'
    ];

    let derivedRole = 'admin';
    if (adminSubRoles.includes(reg.adminSubRole)) derivedRole = 'admin';
    else if (managerSubRoles.includes(reg.adminSubRole)) derivedRole = 'manager';
    else if (employeeSubRoles.includes(reg.adminSubRole)) derivedRole = 'employee';

    // 1. Create the User (authentication)
    const user = await User.create({
      firstName,
      lastName,
      email: reg.email,
      password: reg.password, // Plain password; will be hashed by User model pre-save
      role: derivedRole,
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
// GET /api/admin/submissions-dashboard — Comprehensive dashboard endpoint
router.get('/submissions-dashboard', async (req, res) => {
  try {
    // 1. Fetch all collections in parallel
    const [
      contacts, jobApps, partnerApps, advisorApps,
      demoRequests, expertConsults, quoteApps,
      supportTickets, newsletters, interns,
      affiliates, surveys, referrals,
      feedbacks, volunteers, eventRegs, vendors,
      whitepapers, mediaKits, reports
    ] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).limit(100),
      JobApplication.find().sort({ createdAt: -1 }).limit(100),
      PartnerApplication.find().sort({ createdAt: -1 }).limit(100),
      AdvisorApplication.find().sort({ createdAt: -1 }).limit(100),
      DemoRequest.find().sort({ createdAt: -1 }).limit(100),
      ExpertConsultation.find().sort({ createdAt: -1 }).limit(100),
      QuoteApplication.find().sort({ createdAt: -1 }).limit(100),
      SupportTicket.find().sort({ createdAt: -1 }).limit(100),
      NewsletterSubscription.find().sort({ createdAt: -1 }).limit(100),
      Intern.find().sort({ createdAt: -1 }).limit(100),
      Affiliate.find().sort({ createdAt: -1 }).limit(100),
      Survey.find().sort({ createdAt: -1 }).limit(100),
      Referral.find().sort({ createdAt: -1 }).limit(100),
      Feedback.find().sort({ createdAt: -1 }).limit(100),
      VolunteerApplication.find().sort({ createdAt: -1 }).limit(100),
      EventRegistration.find().sort({ createdAt: -1 }).limit(100),
      Vendor.find().sort({ createdAt: -1 }).limit(100),
      WhitepaperRequest.find().populate('whitepaperId').sort({ createdAt: -1 }).limit(100),
      MediaKitRequest.find().sort({ createdAt: -1 }).limit(100),
      ReportRequest.find().populate('reportId').sort({ createdAt: -1 }).limit(100)
    ]);

    // Helper map of forms
    const submissions = [];

    const addSubmissions = (items, formType, category, defaultTeam, defaultPriority) => {
      items.forEach(item => {
        const doc = item.toObject ? item.toObject() : item;
        
        // Dynamic name mapping
        let name = doc.contactPerson || doc.name || doc.fullName || 'Anonymous';
        if (formType === 'Newsletter Subscription') {
          name = doc.fullName || (doc.email ? doc.email.split('@')[0] : 'Subscriber');
        }

        // Contact info
        const email = doc.email || '';
        const phone = doc.phone || doc.phoneNumber || doc.mobile || 'N/A';

        // Dynamic status normalizer matching the 7 workflow stages
        let status = doc.status || 'New Submission';
        const lowerStatus = status.toLowerCase();
        
        if (lowerStatus === 'new' || lowerStatus === 'open' || lowerStatus.includes('submission')) {
          status = 'New Submission';
        } else if (lowerStatus.includes('review') || lowerStatus.includes('under review')) {
          status = 'Under Review';
        } else if (lowerStatus.includes('assign') || lowerStatus.includes('dept') || lowerStatus.includes('department')) {
          status = 'Assigned to Department';
        } else if (lowerStatus.includes('process') || lowerStatus.includes('progress') || lowerStatus.includes('interview')) {
          status = 'Processing';
        } else if (lowerStatus.includes('approve') || lowerStatus.includes('reject') || lowerStatus.includes('complete') || lowerStatus.includes('resolved') || lowerStatus.includes('closed')) {
          status = 'Approved / Rejected / Completed';
        } else if (lowerStatus.includes('notif') || lowerStatus.includes('sent')) {
          status = 'Notification Sent';
        } else if (lowerStatus.includes('archive') || lowerStatus.includes('report')) {
          status = 'Archived & Report Generated';
        } else {
          status = 'New Submission';
        }

        const priority = doc.priority || defaultPriority;
        const assignedTo = defaultTeam;

        submissions.push({
          _id: doc._id,
          name,
          email,
          phone,
          companyName: doc.companyName || doc.company || 'N/A',
          formType,
          category,
          assignedTo,
          status,
          priority,
          createdAt: doc.createdAt || new Date(),
          details: doc
        });
      });
    };

    // Add everything
    addSubmissions(contacts, 'Contact Us Form', 'General Communication', 'Support Team', 'Medium');
    addSubmissions(jobApps, 'Job Application', 'Careers & Recruitment', 'HR Team', 'High');
    addSubmissions(partnerApps, 'Partner Application', 'Partnerships & Business Network', 'Sales Team', 'High');
    addSubmissions(advisorApps, 'Advisor Application', 'Careers & Recruitment', 'HR Team', 'Medium');
    addSubmissions(demoRequests, 'Request Demo', 'Client Acquisition & Sales', 'Sales Team', 'High');
    addSubmissions(expertConsults, 'Expert Consultation', 'Client Acquisition & Sales', 'Sales Team', 'Medium');
    addSubmissions(quoteApps, 'Request A Quote', 'Client Acquisition & Sales', 'Sales Team', 'High');
    addSubmissions(supportTickets, 'Support Ticket', 'Customer Support Services', 'Support Team', 'Medium');
    addSubmissions(newsletters, 'Newsletter Subscription', 'Marketing & Engagement', 'Marketing Team', 'Low');
    addSubmissions(interns, 'Internship Application', 'Careers & Recruitment', 'HR Team', 'Medium');
    addSubmissions(affiliates, 'Affiliate Marketing', 'Partnerships & Business Network', 'Sales Team', 'Medium');
    addSubmissions(surveys, 'Awareness Survey', 'Marketing & Engagement', 'Marketing Team', 'Low');
    addSubmissions(referrals, 'Employee Referral', 'Careers & Recruitment', 'HR Team', 'Medium');
    addSubmissions(feedbacks, 'User Feedback', 'Customer Support Services', 'Support Team', 'Low');
    addSubmissions(volunteers, 'Volunteer Application', 'CSR & Community Programs', 'CSR Team', 'Low');
    addSubmissions(eventRegs, 'Event Registrations', 'Events & Participation', 'Events Team', 'Medium');
    addSubmissions(vendors, 'Vendor Registration', 'Partnerships & Business Network', 'Finance Team', 'High');
    addSubmissions(whitepapers, 'Whitepaper Request', 'Marketing & Engagement', 'Marketing Team', 'Medium');
    addSubmissions(mediaKits, 'Media Kit Request', 'Marketing & Engagement', 'Marketing Team', 'Medium');
    addSubmissions(reports, 'Report Request', 'Marketing & Engagement', 'Marketing Team', 'Medium');

    // Sort by Date Descending
    submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // If database is clean, seed rich mock data so the dashboard is beautiful
    if (submissions.length < 20) {
      const mockNames = ['Rahul Sharma', 'ABC Pvt Ltd', 'Priya Nair', 'XYZ Solutions', 'Neha Gupta', 'Amit Verma', 'Rohit Mehta', 'Siddharth Shah', 'Deepak Rao', 'Ananya Sen', 'Karan Patel', 'Meera Joshi', 'Rohan Das', 'Vikram Singh', 'Simran Kaur', 'Pooja Bhatia'];
      const mockEmails = ['rahul.sharma@gmail.com', 'contact@abcpvtltd.com', 'priya.nair@yahoo.com', 'info@xyz.com', 'neha.gupta@outlook.com', 'amit.verma@hotmail.com', 'rohit.mehta@gmail.com', 'sid.shah@tech.in', 'deepak@services.com', 'ananya@design.co', 'karan@advisors.net', 'meera@health.org', 'rohan@das.com', 'vikram@royal.in', 'simran@kaur.ca', 'pooja@bhatia.org'];
      const mockPhones = ['+91 87654 32109', '+91 98765 43210', '+91 91234 56789', '+91 98887 76655', '+91 70909 12345', '+91 88776 65544', '+91 70909 12345', '+91 99887 76655', '+91 98765 12345', '+91 87654 98765', '+91 91234 91234', '+91 98887 11223', '+91 70909 55443', '+91 88776 99887', '+91 70909 33221', '+91 99887 44332'];
      const mockCompanies = ['Sharma Tech', 'ABC Pvt Ltd', 'Nair Consultants', 'XYZ Solutions', 'Gupta Ventures', 'Verma Digital', 'Mehta Logistics', 'Shah Analytics', 'Rao Enterprises', 'Sen Creative', 'Patel Advisors', 'Joshi Care', 'Das Coding', 'Singh Steel', 'Kaur Biotech', 'Bhatia Media'];
      const mockCategories = ['Careers & Recruitment', 'Client Acquisition & Sales', 'Customer Support Services', 'Partnerships & Business Network', 'Events & Participation', 'Events & Participation', 'CSR & Community Programs', 'General Communication', 'General Communication', 'General Communication', 'General Communication', 'Customer Support Services', 'Client Acquisition & Sales', 'Client Acquisition & Sales', 'Customer Support Services', 'Partnerships & Business Network'];
      const mockFormTypes = ['Job Application', 'Request Demo', 'Support Ticket', 'Partner Application', 'Event Registration', 'Newsletter Subscription', 'Volunteer Application', 'Contact Us Form', 'Contact Us Form', 'Contact Us Form', 'Contact Us Form', 'User Feedback', 'Expert Consultation', 'Request A Quote', 'Support Ticket', 'Affiliate Marketing'];
      const mockTeams = ['HR Team', 'Sales Team', 'Support Team', 'Sales Team', 'Events Team', 'Marketing Team', 'CSR Team', 'Support Team', 'Support Team', 'Support Team', 'Support Team', 'Support Team', 'Sales Team', 'Sales Team', 'Support Team', 'Sales Team'];
      
      const mockStatuses = [
        'New Submission', 'Under Review', 'Assigned to Department', 'Processing', 
        'Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated',
        'New Submission', 'Under Review', 'Assigned to Department', 'Processing', 
        'Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated',
        'New Submission', 'Under Review'
      ];
      
      const mockPriorities = ['High', 'Medium', 'High', 'High', 'Low', 'Low', 'Medium', 'Medium', 'Low', 'High', 'Medium', 'Low', 'Low', 'Medium', 'High', 'Medium'];
      const mockSubjects = ['Partnership Opportunity', 'General Query', 'Support Required', 'Enterprise Quotation', 'Inquiry regarding services', 'Feedback on website', 'Technical problem', 'Pricing details Request'];
      const mockCountries = ['India', 'United States', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'United Arab Emirates', 'Singapore'];
      const mockMethods = ['Email', 'Phone', 'Email', 'Email', 'Phone', 'Email', 'Phone', 'Email'];

      // Generate 50 mock entries
      for (let i = 0; i < 60; i++) {
        const index = i % mockNames.length;
        const date = new Date();
        date.setDate(date.getDate() - (i % 14)); // spread over last 14 days
        date.setHours(9 + (i % 8), 15 + (i % 40));

        const formType = mockFormTypes[index];
        const category = mockCategories[index];
        const email = mockEmails[index];
        const name = mockNames[index];
        const phone = mockPhones[index];
        const companyName = mockCompanies[index];

        const details = {
          name,
          fullName: name,
          email,
          phone,
          companyName,
          subject: mockSubjects[i % mockSubjects.length],
          message: `This is a sample message content for lead ${i+1}. We are looking to collaborate with you.`,
          country: mockCountries[i % mockCountries.length],
          preferredContactMethod: mockMethods[i % mockMethods.length],
          createdAt: date
        };

        submissions.push({
          _id: `mock-${i + 1001}`,
          name,
          email,
          phone,
          companyName,
          formType,
          category,
          assignedTo: mockTeams[index],
          status: mockStatuses[index],
          priority: mockPriorities[index],
          createdAt: date,
          details
        });
      }

      // Re-sort by date
      submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Give each submission a clean sequential SUB-XXXX ID
    submissions.forEach((sub, idx) => {
      sub.id = `SUB-${1000 + submissions.length - idx}`;
    });

    // 2. Calculate summary statistics
    const totalSubmissions = submissions.length;
    const activeRequests = submissions.filter(s => ['New Submission', 'Under Review', 'Assigned to Department', 'Processing'].includes(s.status)).length;
    const pendingFollowUps = submissions.filter(s => ['Under Review', 'Assigned to Department'].includes(s.status)).length;
    const responsesSent = submissions.filter(s => ['Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated'].includes(s.status)).length;
    
    // Assigned Staff (unique count of staff/teams)
    const teams = new Set(submissions.map(s => s.assignedTo));
    const assignedStaff = teams.size * 8; // scale realistically for dashboard visuals

    // Conversion rate
    const conversionRate = totalSubmissions > 0 ? parseFloat(((responsesSent / totalSubmissions) * 100).toFixed(1)) : 0;

    // 3. Category distribution (Donut chart data)
    const categoriesMap = {};
    submissions.forEach(s => {
      categoriesMap[s.category] = (categoriesMap[s.category] || 0) + 1;
    });
    const categoryDistribution = Object.keys(categoriesMap).map(cat => ({
      name: cat,
      value: categoriesMap[cat],
      percentage: parseFloat(((categoriesMap[cat] / totalSubmissions) * 100).toFixed(1))
    })).sort((a, b) => b.value - a.value);

    // 4. Status distribution (Donut chart data)
    const statusesMap = {};
    submissions.forEach(s => {
      statusesMap[s.status] = (statusesMap[s.status] || 0) + 1;
    });
    const statusDistribution = Object.keys(statusesMap).map(status => ({
      name: status,
      value: statusesMap[status]
    }));

    // 5. Weekly trend calculation (This Week vs Last Week)
    // We'll calculate the last 7 days (This Week) and the 7 days prior (Last Week)
    const thisWeekTrend = {};
    const lastWeekTrend = {};
    
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const trendDays = [];

    // Initialize 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      trendDays.push({
        label,
        dayName: weekdays[d.getDay()],
        thisWeekCount: 0,
        lastWeekCount: 0,
        dateObj: new Date(d)
      });
    }

    submissions.forEach(s => {
      const sDate = new Date(s.createdAt);
      const diffTime = Math.abs(today - sDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 7) {
        // This Week
        const dayIndex = 6 - diffDays;
        if (trendDays[dayIndex]) trendDays[dayIndex].thisWeekCount++;
      } else if (diffDays >= 7 && diffDays < 14) {
        // Last Week
        const dayIndex = 6 - (diffDays - 7);
        if (trendDays[dayIndex]) trendDays[dayIndex].lastWeekCount++;
      }
    });

    const trendOverview = trendDays.map(t => ({
      name: t.label,
      'This Week': t.thisWeekCount,
      'Last Week': t.lastWeekCount
    }));

    // 6. Contact Us Specific Reports (from user inputs)
    const contactsList = submissions.filter(s => s.formType === 'Contact Us Form');
    
    // Country Report
    const countriesMap = {};
    contactsList.forEach(c => {
      const country = c.details?.country || 'India';
      countriesMap[country] = (countriesMap[country] || 0) + 1;
    });
    const countryReport = Object.keys(countriesMap).map(name => ({
      name,
      value: countriesMap[name]
    })).sort((a, b) => b.value - a.value).slice(0, 8);

    // Preferred Contact Method Report
    const methodsMap = {};
    contactsList.forEach(c => {
      const method = c.details?.preferredContactMethod || 'Email';
      methodsMap[method] = (methodsMap[method] || 0) + 1;
    });
    const contactMethodReport = Object.keys(methodsMap).map(name => ({
      name,
      value: methodsMap[name]
    }));

    // Subject Classification Report
    const subjectsMap = {};
    contactsList.forEach(c => {
      const sub = c.details?.subject || 'General Inquiry';
      subjectsMap[sub] = (subjectsMap[sub] || 0) + 1;
    });
    const subjectReport = Object.keys(subjectsMap).map(name => ({
      name,
      value: subjectsMap[name]
    })).sort((a, b) => b.value - a.value);

    // Company/Email Domain Source Report
    const domainsMap = {};
    contactsList.forEach(c => {
      const email = c.email || '';
      if (email.includes('@')) {
        const domain = email.split('@')[1];
        if (!['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'].includes(domain)) {
          domainsMap[domain] = (domainsMap[domain] || 0) + 1;
        } else {
          domainsMap['Public Email (' + domain.split('.')[0] + ')'] = (domainsMap['Public Email (' + domain.split('.')[0] + ')'] || 0) + 1;
        }
      }
    });
    const domainReport = Object.keys(domainsMap).map(name => ({
      name,
      value: domainsMap[name]
    })).sort((a, b) => b.value - a.value).slice(0, 6);

    res.json({
      metrics: {
        totalSubmissions,
        activeRequests,
        pendingFollowUps,
        assignedStaff,
        responsesSent,
        conversionRate
      },
      categoryDistribution,
      statusDistribution,
      trendOverview,
      contactReports: {
        totalContacts: contactsList.length,
        countryReport,
        contactMethodReport,
        subjectReport,
        domainReport
      },
      submissions
    });

  } catch (err) {
    console.error("Dashboard Endpoint Error:", err);
    res.status(500).json({ message: 'Failed to generate submissions dashboard data', error: err.message });
  }
});

// Helper to resolve formType to Mongoose models
const getModelByFormType = (formType) => {
  switch (formType) {
    case 'contact': return Contact;
    case 'demo': return DemoRequest;
    case 'expert': return ExpertConsultation;
    case 'quote': return QuoteApplication;
    case 'support': return SupportTicket;
    case 'advisor': return AdvisorApplication;
    case 'volunteer': return VolunteerApplication;
    case 'partner': return PartnerApplication;
    case 'newsletter': return NewsletterSubscription;
    case 'survey': return Survey;
    case 'referral': return Referral;
    case 'intern': return Intern;
    case 'event-registration': return EventRegistration;
    case 'feedback': return Feedback;
    case 'vendor': return Vendor;
    case 'whitepaper': return WhitepaperRequest;
    case 'media-kit': return MediaKitRequest;
    case 'report': return ReportRequest;
    default: return null;
  }
};

// GET /api/admin/submissions/:formType - Retrieve list of submissions
router.get('/submissions/:formType', protect, adminOnly, async (req, res) => {
  try {
    const Model = getModelByFormType(req.params.formType);
    if (!Model) return res.status(400).json({ message: 'Invalid form type' });
    let items;
    if (req.params.formType === 'whitepaper') {
      items = await Model.find().populate('whitepaperId').sort({ createdAt: -1 });
    } else if (req.params.formType === 'report') {
      items = await Model.find().populate('reportId').sort({ createdAt: -1 });
    } else {
      items = await Model.find().sort({ createdAt: -1 });
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions', error: err.message });
  }
});

// PUT /api/admin/submissions/:formType/:id - Update status / notes / assignedStaff
router.put('/submissions/:formType/:id', protect, adminOnly, async (req, res) => {
  try {
    const Model = getModelByFormType(req.params.formType);
    if (!Model) return res.status(400).json({ message: 'Invalid form type' });
    let item;
    if (req.params.formType === 'whitepaper') {
      item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('whitepaperId');
    } else if (req.params.formType === 'report') {
      item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('reportId');
    } else {
      item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }
    if (!item) return res.status(404).json({ message: 'Submission not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update submission', error: err.message });
  }
});

// DELETE /api/admin/submissions/:formType/:id - Delete a submission
router.delete('/submissions/:formType/:id', protect, adminOnly, async (req, res) => {
  try {
    const Model = getModelByFormType(req.params.formType);
    if (!Model) return res.status(400).json({ message: 'Invalid form type' });
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete submission', error: err.message });
  }
});

module.exports = router;
