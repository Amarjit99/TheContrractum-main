import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Search, CheckCircle, Clock, Edit3, X, Plus, ShieldAlert,
  LayoutDashboard, FileText, Calendar, Send, UserCheck, Star,
  Award, Shield, Mail, MessageSquare, RefreshCw, BarChart2, FileSpreadsheet,
  Users, UserPlus, Bell, Lock, Key, Settings, Trash2, Eye, ShieldCheck, Activity, Globe,
  ChevronRight, ChevronDown, Folder, FolderOpen, Crown
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ADMIN_SUB_ROLES = [
  'System Administrator', 'HR Administrator', 'Operations Administrator', 'Website Administrator',
  'CRM Administrator', 'Support Administrator', 'Marketing Administrator', 'Event Administrator',
  'Content Administrator', 'Finance Administrator', 'Compliance Administrator', 'User Access Administrator',
  'Database Administrator'
];

const MANAGER_SUB_ROLES = [
  'HR Manager', 'Operations Manager', 'Project Manager', 'Sales Manager', 'Marketing Manager',
  'Business Development Manager', 'Support Manager', 'Technical Manager', 'Content Manager',
  'Event Manager', 'CRM & Lead Manager', 'Finance Manager', 'Compliance Manager', 'Training & Development Manager'
];

const EMPLOYEE_SUB_ROLES = [
  'HR Executive', 'Operations Executive', 'Project Coordinator', 'Sales Executive', 'Marketing Executive',
  'Business Development Executive', 'Customer Support Executive', 'Technical Support Executive',
  'Content Executive', 'Event Coordinator', 'CRM Executive', 'Finance Executive', 'Compliance Executive',
  'Training Coordinator', 'Data Entry & Documentation Executive'
];

const ROLE_DETAILS = {
  // Admins
  'System Administrator': {
    description: 'Manages critical infrastructure, server environments, platform configuration, and core authorization policies.',
    classification: 'Admin Level',
    permissions: ['System Configuration', 'Server & Security Monitoring', 'Access Control Management', 'Platform Maintenance']
  },
  'HR Administrator': {
    description: 'Responsible for employee onboarding, recruitment tracking, attendance systems, and official human resource documents.',
    classification: 'Admin Level',
    permissions: ['Employee Management', 'Recruitment Administration', 'Attendance Monitoring', 'HR Documentation']
  },
  'Operations Administrator': {
    description: 'Oversees operational workflows, coordinates departmental logistics, supervises processes, and monitors productivity indicators.',
    classification: 'Admin Level',
    permissions: ['Workflow Administration', 'Operational Monitoring', 'Department Coordination', 'Process Supervision']
  },
  'Website Administrator': {
    description: 'Maintains company website front-ends, configures CMS content portals, monitors SEO ranking performance, and deploys site updates.',
    classification: 'Admin Level',
    permissions: ['Website Content Management', 'CMS Administration', 'SEO Monitoring', 'Website Updates']
  },
  'CRM Administrator': {
    description: 'Manages customer relationships data structures, pipelines configuration, leads management system, and sales statistics reporting.',
    classification: 'Admin Level',
    permissions: ['Lead Management', 'CRM Configuration', 'Customer Data Monitoring', 'Sales Pipeline Administration']
  },
  'Support Administrator': {
    description: 'Directs customer support queue routing, manages SLA rules configurations, monitors chat transcripts, and evaluates customer support ratings.',
    classification: 'Admin Level',
    permissions: ['Support Ticket Monitoring', 'Escalation Handling', 'SLA Administration', 'Customer Support Oversight']
  },
  'Marketing Administrator': {
    description: 'Monitors brand campaigns metrics, configures outreach triggers, executes marketing email operations, and aligns customer funnel stats.',
    classification: 'Admin Level',
    permissions: ['Campaign Administration', 'Social Media Monitoring', 'Analytics Tracking', 'Brand Management']
  },
  'Event Administrator': {
    description: 'Controls online event registrations schedules, maps participant rosters, issues event certificates, and coordinates virtual venues.',
    classification: 'Admin Level',
    permissions: ['Event Management', 'Registration Monitoring', 'Webinar Administration', 'Event Coordination']
  },
  'Content Administrator': {
    description: 'Moderates public facing blog posts, catalogs digital media libraries, designs landing layout templates, and monitors tag structures.',
    classification: 'Admin Level',
    permissions: ['Blog Administration', 'Media Management', 'Publication Workflow', 'Editorial Monitoring']
  },
  'Finance Administrator': {
    description: 'Tracks vendor invoice processing, configures payment portal webhooks, reviews payroll requests, and prepares revenue forecasts.',
    classification: 'Admin Level',
    permissions: ['Billing Management', 'Invoice Administration', 'Payment Monitoring', 'Financial Reporting']
  },
  'Compliance Administrator': {
    description: 'Enforces system privacy laws compliance, manages data logs retention policies, checks user terms, and tracks regulatory disclosures.',
    classification: 'Admin Level',
    permissions: ['Legal Documentation', 'Audit Administration', 'Compliance Monitoring', 'Risk Management']
  },
  'User Access Administrator': {
    description: 'Handles new account approvals, regulates security token generation, implements account locks, and decides role modifications.',
    classification: 'Admin Level',
    permissions: ['User Account Management', 'Roles & Permissions', 'Authentication Monitoring', 'Access Control']
  },
  'Database Administrator': {
    description: 'Maintains database engine instances, manages backup storage catalogs, resolves slow queries, and oversees schema migrations.',
    classification: 'Admin Level',
    permissions: ['Database Monitoring', 'Backup Management', 'Data Security', 'Performance Optimization']
  },

  // Managers
  'HR Manager': {
    description: 'Oversees candidate pipelines, manages human resources processes, coordinates interview tracks, and evaluates staff performance.',
    classification: 'Manager Level',
    permissions: ['Recruitment Management', 'Employee Management', 'Interview Coordination', 'Staff Performance Monitoring']
  },
  'Operations Manager': {
    description: 'Coordinates daily operational workflows, monitors staff backlogs, schedules processes, and works on workflow optimization.',
    classification: 'Manager Level',
    permissions: ['Daily Operations', 'Workflow Monitoring', 'Team Coordination', 'Process Optimization']
  },
  'Project Manager': {
    description: 'Plans projects timelines, allocates task tickets to project coordinators, tracks progress deliverables, and handles client coordination.',
    classification: 'Manager Level',
    permissions: ['Project Planning', 'Task Assignment', 'Project Tracking', 'Client Coordination']
  },
  'Sales Manager': {
    description: 'Sets revenue targets, manages lead workflows, establishes onboarding pipelines, and supervises sales executive activities.',
    classification: 'Manager Level',
    permissions: ['Lead Management', 'Client Acquisition', 'Revenue Tracking', 'Sales Team Monitoring']
  },
  'Marketing Manager': {
    description: 'Supervises campaign operations, oversees branding designs, executes lead generation tactics, and manages social media strategies.',
    classification: 'Manager Level',
    permissions: ['Campaign Management', 'Social Media Oversight', 'SEO & Branding', 'Lead Generation']
  },
  'Business Development Manager': {
    description: 'Builds strategic corporate partnerships, coordinates vendor relations, leads client relations, and defines expansion strategies.',
    classification: 'Manager Level',
    permissions: ['Partnerships', 'Vendor Coordination', 'Client Relations', 'Expansion Strategy']
  },
  'Support Manager': {
    description: 'Maintains customer service SLA metrics, handles support ticket escalations, manages resolution queues, and oversees support teams.',
    classification: 'Manager Level',
    permissions: ['Customer Support Oversight', 'Ticket Escalation', 'SLA Monitoring', 'Resolution Management']
  },
  'Technical Manager': {
    description: 'Monitors server infrastructure health, administers deployment pipelines, manages technical queues, and supervises support staff.',
    classification: 'Manager Level',
    permissions: ['Website & System Monitoring', 'Server & Security Management', 'Software Deployment', 'Technical Team Supervision']
  },
  'Content Manager': {
    description: 'Directs digital publishing schedules, manages blog layouts, reviews media library uploads, and designs content workflows.',
    classification: 'Manager Level',
    permissions: ['Blog & Media Management', 'Content Publishing', 'Website Content Updates', 'Editorial Workflow']
  },
  'Event Manager': {
    description: 'Plans company events catalogs, monitors registrant attendee charts, schedules webinars, and supervises event executions.',
    classification: 'Manager Level',
    permissions: ['Event Planning', 'Registration Management', 'Webinar Coordination', 'Event Execution']
  },
  'CRM & Lead Manager': {
    description: 'Designs CRM pipelines, audits incoming client inquiries, monitors conversion analytics, and directs client follow-up loops.',
    classification: 'Manager Level',
    permissions: ['Lead Pipeline Management', 'CRM Monitoring', 'Client Follow-Ups', 'Conversion Tracking']
  },
  'Finance Manager': {
    description: 'Generates company balance sheets, controls budget allocations, reviews invoice accounts, and processes payment protocols.',
    classification: 'Manager Level',
    permissions: ['Financial Reporting', 'Budget Management', 'Invoice Monitoring', 'Payment Processing']
  },
  'Compliance Manager': {
    description: 'Audits regulatory compliance rules, monitors policy logs, enforces security compliance guidelines, and manages risks.',
    classification: 'Manager Level',
    permissions: ['Legal Compliance', 'Audit Monitoring', 'Policy Enforcement', 'Risk Management']
  },
  'Training & Development Manager': {
    description: 'Formulates employee training curriculum, schedules training sessions, audits certificate awards, and manages learning system portals.',
    classification: 'Manager Level',
    permissions: ['Employee Training', 'Skill Development', 'Certification Programs', 'Learning Management']
  },

  // Employees / Staff
  'HR Executive': {
    description: 'Supports recruitment onboarding processes, schedules candidate interviews, manages document files, and assists managers.',
    classification: 'Staff / Employee Level',
    permissions: ['Recruitment Assistance', 'Employee Coordination', 'Interview Scheduling', 'HR Documentation']
  },
  'Operations Executive': {
    description: 'Executes day-to-day department tasks, compiles operational status logs, coordinates processes, and files reports.',
    classification: 'Staff / Employee Level',
    permissions: ['Workflow Execution', 'Operations Support', 'Process Coordination', 'Daily Reporting']
  },
  'Project Coordinator': {
    description: 'Coordinates tasks schedules, maintains project documentation worksheets, bridges team communication, and logs progress indices.',
    classification: 'Staff / Employee Level',
    permissions: ['Task Coordination', 'Project Documentation', 'Team Communication', 'Progress Tracking']
  },
  'Sales Executive': {
    description: 'Follows up on incoming hot leads, communicates quotes parameters, logs pipeline conversion details, and updates CRM profiles.',
    classification: 'Staff / Employee Level',
    permissions: ['Lead Follow-Up', 'Client Communication', 'Sales Conversion', 'CRM Updates']
  },
  'Marketing Executive': {
    description: 'Executes brand outreach campaigns, edits company social media feeds, runs local SEO tasks, and updates marketing links.',
    classification: 'Staff / Employee Level',
    permissions: ['Campaign Execution', 'Social Media Handling', 'SEO Activities', 'Brand Promotion']
  },
  'Business Development Executive': {
    description: 'Assists in partner relationship management, coordinates vendor communications, reaches out to prospects, and collects research.',
    classification: 'Staff / Employee Level',
    permissions: ['Partnership Coordination', 'Vendor Communication', 'Client Outreach', 'Market Research']
  },
  'Customer Support Executive': {
    description: 'Resolves customer trouble tickets, processes live chat inquiries, follows up on client issues, and reports bugs.',
    classification: 'Staff / Employee Level',
    permissions: ['Ticket Handling', 'Customer Assistance', 'Complaint Resolution', 'Support Follow-Ups']
  },
  'Technical Support Executive': {
    description: 'Provides technical support, diagnoses site connectivity errors, monitors performance, and registers bug tickets.',
    classification: 'Staff / Employee Level',
    permissions: ['System Monitoring', 'Website Maintenance', 'Bug Reporting', 'Technical Assistance']
  },
  'Content Executive': {
    description: 'Drafts articles copy, manages file uploads inside media libraries, formats tags, and updates pages metadata.',
    classification: 'Staff / Employee Level',
    permissions: ['Blog Management', 'Content Uploads', 'Media Coordination', 'Editorial Support']
  },
  'Event Coordinator': {
    description: 'Handles participant event registration, coordinates webinar setup, handles attendee logs, and files event reports.',
    classification: 'Staff / Employee Level',
    permissions: ['Event Registrations', 'Participant Coordination', 'Webinar Support', 'Event Documentation']
  },
  'CRM Executive': {
    description: 'Maintains lead database systems integrity, inputs contact details, updates pipeline logs, and logs customer communications.',
    classification: 'Staff / Employee Level',
    permissions: ['Lead Database Management', 'Follow-Up Tracking', 'CRM Updates', 'Customer Communication']
  },
  'Finance Executive': {
    description: 'Processes vendor bills, files payment vouchers, compiles expense sheets, and registers payment verification items.',
    classification: 'Staff / Employee Level',
    permissions: ['Invoice Processing', 'Payment Tracking', 'Financial Documentation', 'Expense Management']
  },
  'Compliance Executive': {
    description: 'Checks document upload files, audits verification status logs, monitors terms compliance, and submits report sheets.',
    classification: 'Staff / Employee Level',
    permissions: ['Documentation Verification', 'Policy Monitoring', 'Audit Support', 'Compliance Reporting']
  },
  'Training Coordinator': {
    description: 'Coordinates employee training dates, schedules certification classes, manages attendee charts, and supports trainer requirements.',
    classification: 'Staff / Employee Level',
    permissions: ['Employee Training', 'Session Coordination', 'Certification Tracking', 'Learning Support']
  },
  'Data Entry & Documentation Executive': {
    description: 'Inputs platform data records, verifies user submission forms, catalog files collections, and files database documents.',
    classification: 'Staff / Employee Level',
    permissions: ['Data Processing', 'Submission Verification', 'Documentation Uploads', 'Record Management']
  }
};

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

export default function AdminUsers() {
  const { admin } = useAdminAuth();
  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  // Sub-Navigation Tabs: 'overview' | 'roles' | 'modules' | 'website-users' | 'customer-accounts' | 'staff-accounts' | 'security' | 'logs'
  const [activeSubTab, setActiveSubTab] = useState('overview');

  // Role Hierarchy explorer states
  const [selectedRole, setSelectedRole] = useState('System Administrator');
  const [expandedNodes, setExpandedNodes] = useState({
    'Admins': true,
    'Managers': false,
    'Employees': false
  });

  // Custom permissions matrix local storage simulation mapping role -> active permissions
  const [activePermissionsByRole, setActivePermissionsByRole] = useState(() => {
    const initial = {};
    Object.keys(ROLE_DETAILS).forEach(role => {
      initial[role] = [...ROLE_DETAILS[role].permissions];
    });
    return initial;
  });

  // Custom permissions access level mapping role -> access level
  const [roleAccessLevels, setRoleAccessLevels] = useState(() => {
    const initial = {};
    Object.keys(ROLE_DETAILS).forEach(role => {
      initial[role] = role === 'System Administrator' ? 'view-delete-edit' : 'view';
    });
    MANAGER_SUB_ROLES.forEach(role => {
      initial[role] = 'view-delete';
    });
    EMPLOYEE_SUB_ROLES.forEach(role => {
      initial[role] = 'view';
    });
    return initial;
  });

  // Core Data States
  const [userData, setUserData] = useState({ users: [], total: 0 });
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Edit / Create Modals
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', role: '', password: '',
    isHeld: false, holdUntil: '', holdReason: '', adminSubRole: '', adminPermissions: 'view',
    company: '', industry: '', jobTitle: ''
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', mobile: '',
    role: 'user', adminSubRole: 'HR Administrator', adminPermissions: 'view',
    isHeld: false, holdUntil: '', holdReason: '',
    company: '', industry: '', jobTitle: ''
  });

  const [holdingUser, setHoldingUser] = useState(null);
  const [holdDirectData, setHoldDirectData] = useState({ holdUntil: '', holdReason: '' });

  // Security and policy configurations
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [ipRestricted, setIpRestricted] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { id: 'KEY-01', name: 'Public Webhooks', key: 'tc_live_7a3d90f23b2c...', status: 'Active' },
    { id: 'KEY-02', name: 'Stripe Payments', key: 'tc_live_9e2f11c8d4a7...', status: 'Active' }
  ]);

  // Module configurations
  const [modules, setModules] = useState({
    services: true,
    blogs: true,
    news: true,
    projects: true,
    careers: true,
    events: true,
    contracts: true,
    certificates: true,
    idCards: true,
    referrals: true
  });

  // Role hierarchy explorer helpers
  const toggleNode = (nodeName) => {
    setExpandedNodes(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
  };

  const toggleRolePermission = (role, perm) => {
    setActivePermissionsByRole(prev => {
      const current = prev[role] || [];
      const next = current.includes(perm)
        ? current.filter(p => p !== perm)
        : [...current, perm];
      return { ...prev, [role]: next };
    });
  };

  const handleSaveRolePermissions = async () => {
    try {
      toast.success(`Access permissions and policies updated for ${selectedRole}.`);
      // Add simulated log to audit trail
      const mockLog = {
        _id: `MOCK-LOG-${Date.now()}`,
        performedBy: { name: admin?.name || 'Super Admin', email: admin?.email || 'admin@contractum.com' },
        action: 'Update',
        entity: 'Role Policy',
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
        details: `Updated permissions and access scope for: ${selectedRole}`
      };
      setAuditLogs(prev => [mockLog, ...prev]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save role configuration');
    }
  };

  // Fetch all users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/users?search=${search}&page=${page}&limit=50`, { headers });
      const d = await res.json();
      setUserData(d);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
    setLoading(false);
  }, [search, page, headers]);

  // Fetch audit logs
  const fetchAuditLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/audit-logs`, { headers });
      const logs = await res.json();
      setAuditLogs(Array.isArray(logs) ? logs : []);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    }
  }, [headers]);

  useEffect(() => {
    fetchUsers();
    fetchAuditLogs();
  }, [fetchUsers, fetchAuditLogs, activeSubTab]);

  // Delete User
  const deleteUser = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`${API}/api/admin/users/${id}`, { method: 'DELETE', headers });
    if (res.ok) {
      toast.success('User deleted.');
      fetchUsers();
    } else {
      toast.error('Failed to delete user');
    }
  };

  // Verify User
  const verifyUser = async (id, name, currentRole) => {
    if (!confirm(`Verify user "${name}"?`)) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ role: currentRole || 'user', isApproved: true })
      });
      if (res.ok) {
        toast.success('User verified successfully!');
        fetchUsers();
      } else {
        toast.error('Failed to verify user');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error verifying user');
    }
  };

  // Create User
  const handleCreateUser = async () => {
    try {
      const payload = { ...createFormData };
      if (!payload.isHeld) {
        payload.holdUntil = null;
        payload.holdReason = '';
      }
      const res = await fetch(`${API}/api/admin/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success('User created successfully!');
        setIsCreateModalOpen(false);
        fetchUsers();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to create user');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error creating user');
    }
  };

  // Update User
  const handleUpdateUser = async () => {
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      const res = await fetch(`${API}/api/admin/users/${editingUser._id}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success('User updated successfully!');
        setEditingUser(null);
        fetchUsers();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to update user');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating user');
    }
  };

  // Release hold
  const handleReleaseHoldDirect = async (u) => {
    if (!confirm(`Release account hold for "${u.name}"?`)) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${u._id}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          isHeld: false,
          holdUntil: null,
          holdReason: '',
          role: u.role,
          isApproved: u.isApproved
        })
      });
      if (res.ok) {
        toast.success(`Hold released for ${u.name}.`);
        fetchUsers();
      } else {
        toast.error('Failed to release hold');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error releasing hold');
    }
  };

  // Confirm hold
  const handleConfirmHoldDirect = async () => {
    if (!holdDirectData.holdUntil || !holdDirectData.holdReason) {
      toast.error('Please specify both hold date and reason');
      return;
    }
    try {
      const res = await fetch(`${API}/api/admin/users/${holdingUser._id}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          isHeld: true,
          holdUntil: holdDirectData.holdUntil,
          holdReason: holdDirectData.holdReason,
          role: holdingUser.role,
          isApproved: holdingUser.isApproved
        })
      });
      if (res.ok) {
        toast.success(`Account for ${holdingUser.name} is now on hold.`);
        setHoldingUser(null);
        fetchUsers();
      } else {
        toast.error('Failed to place account on hold');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating hold status');
    }
  };

  // Computed dashboard Overview stats (incorporates real + mock numbers matching mock layout image)
  const dashboardStats = useMemo(() => {
    const list = userData.users || [];
    const totalUsers = 2548; // Mock matching the exact layout value
    const activeUsers = 1842;
    const adminUsers = list.filter(u => u.role === 'admin' || u.role === 'super-admin').length + 118;
    const rolesDefined = 28;
    const modulesTools = 42;
    const loginAttempts = 3421;

    return { totalUsers, activeUsers, adminUsers, rolesDefined, modulesTools, loginAttempts };
  }, [userData]);

  const COLORS = ['#1e5cdc', '#10b981', '#4f46e5', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

  // Donut chart: Users by Type
  const userTypeData = [
    { name: 'Website Users', value: 1294 },
    { name: 'Customer Accounts', value: 748 },
    { name: 'Staff Accounts', value: 356 },
    { name: 'Admin Accounts', value: 150 }
  ];

  // Line Chart: User Growth (Last 7 Days)
  const userGrowthData = [
    { name: 'May 18', Users: 280 },
    { name: 'May 19', Users: 490 },
    { name: 'May 20', Users: 320 },
    { name: 'May 21', Users: 520 },
    { name: 'May 22', Users: 410 },
    { name: 'May 23', Users: 580 },
    { name: 'May 24', Users: 640 }
  ];

  // Donut chart: Users by Status
  const userStatusData = [
    { name: 'Active', value: 1842 },
    { name: 'Inactive', value: 506 },
    { name: 'Suspended', value: 150 },
    { name: 'Pending', value: 50 }
  ];

  // Top 5 Roles
  const topRolesData = [
    { role: 'Super Admin', count: 12, color: 'bg-purple-100 text-purple-700' },
    { role: 'Admin', count: 38, color: 'bg-blue-100 text-blue-700' },
    { role: 'Editor', count: 156, color: 'bg-emerald-100 text-emerald-700' },
    { role: 'Manager', count: 284, color: 'bg-amber-100 text-amber-700' },
    { role: 'User', count: 1286, color: 'bg-gray-100 text-gray-700' }
  ];

  // Modules Overview
  const modulesOverviewData = [
    { name: 'Content Management', count: 1248, max: 1500, color: 'bg-blue-600' },
    { name: 'Event Management', count: 832, max: 1500, color: 'bg-emerald-500' },
    { name: 'Submission Management', count: 745, max: 1500, color: 'bg-purple-600' },
    { name: 'CRM & Leads', count: 612, max: 1500, color: 'bg-amber-500' },
    { name: 'E-Learning', count: 498, max: 1500, color: 'bg-teal-500' }
  ];

  // Recent Authentication Logs
  const recentAuthLogs = [
    { name: 'John Admin', event: 'Login', ip: '192.168.1.10', time: 'May 24, 2025 10:15 AM', status: 'Success' },
    { name: 'Sarah Wilson', event: 'Login', ip: '192.168.1.15', time: 'May 24, 2025 09:42 AM', status: 'Success' },
    { name: 'Mike Johnson', event: 'Failed Login', ip: '192.168.1.33', time: 'May 24, 2025 09:21 AM', status: 'Failed' },
    { name: 'Priya Sharma', event: 'Password Change', ip: '192.168.1.18', time: 'May 24, 2025 08:55 AM', status: 'Success' },
    { name: 'David Brown', event: 'Logout', ip: '192.168.1.10', time: 'May 24, 2025 08:34 AM', status: 'Success' }
  ];

  // Access summary widgets
  const accessSummaryList = [
    { title: 'Restricted Access', count: 98, color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Lock size={18} /> },
    { title: 'Access Requests', count: 24, color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <ShieldAlert size={18} /> },
    { title: 'Permissions Groups', count: 156, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <ShieldCheck size={18} /> },
    { title: 'API Keys Active', count: 12, color: 'text-purple-600 bg-purple-50 border-purple-100', icon: <Key size={18} /> }
  ];

  // Export User List to CSV
  const exportUserReport = () => {
    if (!userData.users || userData.users.length === 0) {
      return toast.error("No user records to export.");
    }
    const headersCsv = ["User ID", "Name", "Email", "Mobile", "Role", "Sub-Role", "Status", "Joined Date"];
    const rows = userData.users.map(u => [
      u._id,
      u.name,
      u.email,
      u.mobile || u.phone || 'N/A',
      u.role || 'user',
      u.adminSubRole || 'N/A',
      u.isHeld ? 'Held' : (u.isApproved ? 'Verified' : 'Pending'),
      new Date(u.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headersCsv.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `User_Access_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("User report exported successfully as CSV!");
  };

  return (
    <AdminLayout>
      {/* Split dashboard portal wrapper */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 -m-6 rounded-2xl overflow-hidden border border-gray-100">
        
        {/* User Access Navigation Sidebar (Dark Blue theme) */}
        <aside className="w-full lg:w-72 bg-slate-900 text-slate-100 flex flex-col p-5 shrink-0 border-r border-slate-800">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">User Access</h2>
              <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase">CMS Controls</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {[
              { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview Dashboard' },
              { id: 'roles', icon: <ShieldCheck size={18} />, label: 'Roles & Permissions Management' },
              { id: 'modules', icon: <Settings size={18} />, label: 'Company Modules & Tools Management' },
              { id: 'website-users', icon: <Users size={18} />, label: 'Website User Management' },
              { id: 'customer-accounts', icon: <Crown size={18} />, label: 'User & Customer Accounts' },
              { id: 'staff-accounts', icon: <UserPlus size={18} />, label: 'Staff & Admin Accounts' },
              { id: 'security', icon: <Lock size={18} />, label: 'Access Control Settings' },
              { id: 'logs', icon: <Activity size={18} />, label: 'Authentication & Activity Logs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id);
                  setPage(1);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500 font-medium">
            Authorized admin:
            <p className="text-slate-300 font-semibold text-xs mt-1 truncate">{admin?.name || 'Access Manager'}</p>
            <p className="text-blue-400 font-semibold text-[10px] uppercase tracking-wide truncate">{admin?.adminSubRole || 'User Administrator'}</p>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Header */}
          <header className="border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-20">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                User & Access Management Dashboard
              </h2>
              {activeSubTab !== 'overview' && <p className="text-xs text-gray-500 mt-0.5 capitalize">Tab: {activeSubTab.replace('-', ' ')}</p>}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportUserReport}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <FileSpreadsheet size={15} /> Export Report
              </button>

              {activeSubTab === 'staff-accounts' && admin?.role === 'super-admin' && (
                <button
                  onClick={() => {
                    setCreateFormData({
                      firstName: '', lastName: '', email: '', password: '', mobile: '',
                      role: 'employee', adminSubRole: 'HR Executive', adminPermissions: 'view',
                      isHeld: false, holdUntil: '', holdReason: ''
                    });
                    setIsCreateModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  <Plus size={15} /> Add Staff Account
                </button>
              )}

              <button
                onClick={() => {
                  fetchUsers();
                  fetchAuditLogs();
                }}
                className="p-2 border border-gray-200 text-gray-500 hover:text-blue-600 rounded-xl transition-colors hover:bg-gray-50 cursor-pointer"
                title="Refresh logs & users"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </header>

          {/* Views render */}
          <div className="p-6 flex-1 overflow-y-auto">
            {loading && activeSubTab !== 'overview' && activeSubTab !== 'security' && activeSubTab !== 'roles' && activeSubTab !== 'modules' ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                <RefreshCw className="animate-spin text-blue-600" size={32} />
                <p className="font-semibold text-xs text-gray-500">Loading Directory Data...</p>
              </div>
            ) : (
              <>
                {/* VIEW 1: OVERVIEW DASHBOARD */}
                {activeSubTab === 'overview' && (
                  <div className="space-y-6">
                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {[
                        { title: 'Total Users', count: dashboardStats.totalUsers, rate: '↑ 18.6% vs last week', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <Users size={18} /> },
                        { title: 'Active Users', count: dashboardStats.activeUsers, rate: '↑ 16.2% vs last week', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <UserCheck size={18} /> },
                        { title: 'Admin Users', count: dashboardStats.adminUsers, rate: '↑ 4.8% vs last week', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: <Shield size={18} /> },
                        { title: 'Roles Defined', count: dashboardStats.rolesDefined, rate: '↑ 7.7% vs last week', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: <ShieldCheck size={18} /> },
                        { title: 'Modules / Tools', count: dashboardStats.modulesTools, rate: '↑ 10.5% vs last week', color: 'bg-teal-50 text-teal-600 border-teal-100', icon: <Settings size={18} /> },
                        { title: 'Login Attempts', count: dashboardStats.loginAttempts, rate: '↓ 6.3% vs last week', color: 'bg-red-50 text-red-600 border-red-100', icon: <Lock size={18} /> }
                      ].map((card, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${card.color} flex flex-col justify-between h-32`}>
                          <div className="flex justify-between items-start">
                            <span className="p-2 bg-white/60 rounded-lg">{card.icon}</span>
                            <span className="text-2xl font-bold tracking-tight">{card.count}</span>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{card.title}</h4>
                            <p className="text-[9px] font-semibold opacity-85 mt-0.5">{card.rate}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Visual Charts row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      
                      {/* LineChart - User Growth */}
                      <div className="xl:col-span-2 bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <BarChart2 size={15} className="text-blue-600" /> User Growth (Last 7 Days)
                        </h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                              <Tooltip />
                              <Line type="monotone" dataKey="Users" stroke="#1e5cdc" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Donut Chart - Users by Type */}
                      <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-2">Users by Type</h3>
                        <div className="h-44 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={userTypeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={60}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {userTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 mt-2">
                          {userTypeData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center justify-between text-xs text-gray-600">
                              <div className="flex items-center gap-2 font-medium">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                <span>{entry.name}</span>
                              </div>
                              <span className="font-bold text-gray-800">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Inner Grids: Top Roles, Modules progress, Recent logs, Access summary */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      
                      {/* Left: Top Roles & Modules */}
                      <div className="xl:col-span-2 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Top 5 Roles */}
                          <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">Top 5 Roles by Users</h3>
                            <div className="space-y-3">
                              {topRolesData.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs p-2 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-100 transition-colors">
                                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${item.color}`}>{item.role}</span>
                                  <span className="font-bold text-gray-800">{item.count}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Modules progress */}
                          <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">Modules / Tools Activity</h3>
                            <div className="space-y-3.5">
                              {modulesOverviewData.map((item, idx) => (
                                <div key={idx} className="space-y-1 text-xs">
                                  <div className="flex justify-between font-bold text-gray-700">
                                    <span>{item.name}</span>
                                    <span>{item.count}</span>
                                  </div>
                                  <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${(item.count / item.max) * 100}%` }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Recent Registrations & Authentication logs table */}
                        <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <Activity size={15} className="text-indigo-600" /> Recent Authentication Logs
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                                  <th className="py-2.5 px-3">User</th>
                                  <th className="py-2.5 px-3">Event Type</th>
                                  <th className="py-2.5 px-3">IP Address</th>
                                  <th className="py-2.5 px-3">Time</th>
                                  <th className="py-2.5 px-3 text-right">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
                                {recentAuthLogs.map((log, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="py-2.5 px-3 font-bold text-gray-800">{log.name}</td>
                                    <td className="py-2.5 px-3">{log.event}</td>
                                    <td className="py-2.5 px-3 font-mono text-[10px]">{log.ip}</td>
                                    <td className="py-2.5 px-3 text-gray-400">{log.time}</td>
                                    <td className="py-2.5 px-3 text-right">
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                        log.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                      }`}>
                                        {log.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>

                      {/* Right: Status donut and Access Summary */}
                      <div className="space-y-6">
                        
                        {/* Status Donut */}
                        <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">Users by Status</h3>
                          <div className="h-40 flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={userStatusData} cx="50%" cy="50%" outerRadius={50} innerRadius={35} dataKey="value">
                                  {userStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#10b981', '#6b7280', '#ef4444', '#f59e0b'][index % 4]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                              <span className="text-xs text-gray-400 font-bold block uppercase leading-none">Total</span>
                              <span className="text-lg font-black text-gray-800">2,548</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-bold text-gray-500">
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Active: 1,842</div>
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-gray-500 rounded-full"></span> Inactive: 506</div>
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Held: 150</div>
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> Pending: 50</div>
                          </div>
                        </div>

                        {/* Access Summary Icons */}
                        <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs space-y-3.5">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Access Summary</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {accessSummaryList.map((item, idx) => (
                              <div key={idx} className={`p-3 rounded-xl border ${item.color} flex flex-col justify-between h-20`}>
                                <div className="flex justify-between items-center opacity-80">{item.icon} <span className="font-mono text-base font-black">{item.count}</span></div>
                                <span className="text-[9px] font-bold uppercase tracking-wider">{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* VIEW 2: ROLES & PERMISSIONS */}
                {activeSubTab === 'roles' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Roles & Permissions Management</h3>
                      <p className="text-xs text-gray-500">Explore the corporate hierarchy tree and configure access scopes for system sub-roles</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      {/* Left Pane: Role Hierarchy Tree Explorer */}
                      <div className="lg:col-span-2 bg-gray-50/50 p-4 border border-gray-150 rounded-2xl space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                          <Shield size={16} className="text-blue-600" />
                          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Role Catalog Explorer</span>
                        </div>

                        <div className="space-y-2 select-none">
                          {/* Super Admin Root Node */}
                          <button
                            onClick={() => setSelectedRole('Super Admin')}
                            className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                              selectedRole === 'Super Admin'
                                ? 'bg-blue-600 text-white font-bold shadow-xs'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Crown size={14} className={selectedRole === 'Super Admin' ? 'text-white' : 'text-amber-500'} />
                              <span>Super Admin</span>
                            </div>
                            <ChevronRight size={12} className={selectedRole === 'Super Admin' ? 'text-white' : 'text-gray-400'} />
                          </button>

                          {/* Admin Root Node */}
                          <button
                            onClick={() => setSelectedRole('Admin')}
                            className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                              selectedRole === 'Admin'
                                ? 'bg-blue-600 text-white font-bold shadow-xs'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Shield size={14} className={selectedRole === 'Admin' ? 'text-white' : 'text-blue-500'} />
                              <span>Admin</span>
                            </div>
                            <ChevronRight size={12} className={selectedRole === 'Admin' ? 'text-white' : 'text-gray-400'} />
                          </button>
                                                   {/* Admins Folder */}
                          <div>
                            <button
                              onClick={() => { toggleNode('Admins'); setSelectedRole('Admins'); }}
                              className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all ${
                                selectedRole === 'Admins' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {expandedNodes.Admins ? (
                                  <FolderOpen size={14} className="text-indigo-500" />
                                ) : (
                                  <Folder size={14} className="text-indigo-500" />
                                )}
                                <span>Admins</span>
                              </div>
                              {expandedNodes.Admins ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                            </button>

                            {expandedNodes.Admins && (
                              <div className="pl-4 ml-3 border-l border-gray-200 space-y-1 mt-1">
                                {ADMIN_SUB_ROLES.map((role, rIdx) => {
                                  const isLast = rIdx === ADMIN_SUB_ROLES.length - 1;
                                  const isSelected = selectedRole === role;
                                  return (
                                    <button
                                      key={role}
                                      onClick={() => setSelectedRole(role)}
                                      className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between text-xs transition-all ${
                                        isSelected
                                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        <span className="text-gray-300 font-mono text-[10px] select-none">{isLast ? '└─' : '├─'}</span>
                                        <ShieldCheck size={12} className={isSelected ? 'text-white' : 'text-indigo-400 flex-shrink-0'} />
                                        <span className="truncate">{role}</span>
                                      </div>
                                      <ChevronRight size={11} className={isSelected ? 'text-white flex-shrink-0' : 'text-gray-400 flex-shrink-0'} />
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Managers Folder */}
                          <div>
                            <button
                              onClick={() => { toggleNode('Managers'); setSelectedRole('Managers'); }}
                              className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all ${
                                selectedRole === 'Managers' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {expandedNodes.Managers ? (
                                  <FolderOpen size={14} className="text-amber-500" />
                                ) : (
                                  <Folder size={14} className="text-amber-500" />
                                )}
                                <span>Managers</span>
                              </div>
                              {expandedNodes.Managers ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                            </button>

                            {expandedNodes.Managers && (
                              <div className="pl-4 ml-3 border-l border-gray-200 space-y-1 mt-1">
                                {MANAGER_SUB_ROLES.map((role, rIdx) => {
                                  const isLast = rIdx === MANAGER_SUB_ROLES.length - 1;
                                  const isSelected = selectedRole === role;
                                  return (
                                    <button
                                      key={role}
                                      onClick={() => setSelectedRole(role)}
                                      className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between text-xs transition-all ${
                                        isSelected
                                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        <span className="text-gray-300 font-mono text-[10px] select-none">{isLast ? '└─' : '├─'}</span>
                                        <ShieldCheck size={12} className={isSelected ? 'text-white' : 'text-amber-500 flex-shrink-0'} />
                                        <span className="truncate">{role}</span>
                                      </div>
                                      <ChevronRight size={11} className={isSelected ? 'text-white flex-shrink-0' : 'text-gray-400 flex-shrink-0'} />
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Employees Folder */}
                          <div>
                            <button
                              onClick={() => { toggleNode('Employees'); setSelectedRole('Employees'); }}
                              className={`w-full text-left py-2 px-3 rounded-xl flex items-center justify-between text-xs font-bold transition-all ${
                                selectedRole === 'Employees' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {expandedNodes.Employees ? (
                                  <FolderOpen size={14} className="text-gray-500" />
                                ) : (
                                  <Folder size={14} className="text-gray-500" />
                                )}
                                <span>Employees / Staff</span>
                              </div>
                              {expandedNodes.Employees ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                            </button>

                            {expandedNodes.Employees && (
                              <div className="pl-4 ml-3 border-l border-gray-200 space-y-1 mt-1">
                                {EMPLOYEE_SUB_ROLES.map((role, rIdx) => {
                                  const isLast = rIdx === EMPLOYEE_SUB_ROLES.length - 1;
                                  const isSelected = selectedRole === role;
                                  return (
                                    <button
                                      key={role}
                                      onClick={() => setSelectedRole(role)}
                                      className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between text-xs transition-all ${
                                        isSelected
                                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        <span className="text-gray-300 font-mono text-[10px] select-none">{isLast ? '└─' : '├─'}</span>
                                        <ShieldCheck size={12} className={isSelected ? 'text-white' : 'text-gray-400 flex-shrink-0'} />
                                        <span className="truncate">{role}</span>
                                      </div>
                                      <ChevronRight size={11} className={isSelected ? 'text-white flex-shrink-0' : 'text-gray-400 flex-shrink-0'} />
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* Right Pane: Dynamic Permission detail configurator */}
                      <div className="lg:col-span-3 bg-white p-5 border border-gray-150 rounded-2xl space-y-5">
                        {(() => {
                          if (['Super Admin', 'Admin', 'Admins', 'Managers', 'Employees'].includes(selectedRole)) {
                            const isSuper = selectedRole === 'Super Admin';
                            const isAdminRoot = selectedRole === 'Admin';
                            const isAdminsCat = selectedRole === 'Admins';
                            const isManagersCat = selectedRole === 'Managers';
                            const isEmployeesCat = selectedRole === 'Employees';

                            let title = selectedRole;
                            let level = '';
                            let mainResp = '';
                            let responsibilities = [];

                            if (isSuper) {
                              level = 'Full Enterprise Access';
                              mainResp = 'Complete system control and governance';
                              responsibilities = [
                                'Enterprise System Control', 'Global Access Management', 'Company & Branch Management',
                                'Financial & Operational Oversight', 'Security & Compliance Monitoring', 'Enterprise Reports & Analytics',
                                'HR & Recruitment Oversight', 'Website & CMS Management', 'Workflow Automation Control', 'Final Approval Authority'
                              ];
                            } else if (isAdminRoot || isAdminsCat) {
                              title = isAdminRoot ? 'Admin' : 'Admins Category';
                              level = 'Department-Level Access';
                              mainResp = 'Operational administration and management';
                              responsibilities = [
                                'Department Administration', 'User & Staff Management', 'Content & Website Management',
                                'Lead & Submission Monitoring', 'Contract & Certificate Management', 'Event & Registration Management',
                                'Reports & Performance Tracking', 'Communication Management', 'Task Assignment', 'Department Approval Processing'
                              ];
                            } else if (isManagersCat) {
                              title = 'Managers Category';
                              level = 'Team & Workflow Access';
                              mainResp = 'Team handling and operational supervision';
                              responsibilities = [
                                'Team Supervision', 'Staff Coordination', 'Lead Follow-Up Monitoring',
                                'Recruitment & Interview Coordination', 'Client Communication Handling', 'Project & Workflow Tracking',
                                'Submission Verification', 'Daily Operations Management', 'Performance Reporting', 'Escalation Handling'
                              ];
                            } else if (isEmployeesCat) {
                              title = 'Employees / Staff Category';
                              level = 'Assigned Module Access';
                              mainResp = 'Task execution and support operations';
                              responsibilities = [
                                'Submission Processing', 'Customer Communication', 'Lead Follow-Ups',
                                'Support Ticket Handling', 'Recruitment Assistance', 'Data Entry & Verification',
                                'Content Updates', 'Event Coordination', 'Daily Task Execution', 'Report Submission'
                              ];
                            }

                            return (
                              <div className="space-y-5">
                                {/* Header */}
                                <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                                  <div>
                                    <h4 className="text-sm font-black text-gray-900">{title}</h4>
                                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mt-0.5 block">{level}</span>
                                  </div>
                                  <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded">
                                    Enterprise Role Node
                                  </span>
                                </div>

                                {/* Main Responsibilities */}
                                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2">
                                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Scope of Authority</span>
                                  <p className="text-xs font-semibold leading-relaxed">{mainResp}</p>
                                </div>

                                {/* Responsibilities List */}
                                <div className="space-y-2">
                                  <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Core Responsibilities</span>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {responsibilities.map((resp, index) => (
                                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-750">
                                        <CheckCircle size={13} className="text-emerald-500 flex-shrink-0" />
                                        <span className="truncate">{resp}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Enterprise Access Control Reference */}
                                <div className="border-t border-gray-150 pt-4 space-y-3">
                                  <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Enterprise Access Control Reference</span>
                                  <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs">
                                    <table className="w-full text-left text-xs border-collapse">
                                      <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase">
                                          <th className="py-2.5 px-3">Role</th>
                                          <th className="py-2.5 px-3">Access Level</th>
                                          <th className="py-2.5 px-3">Main Responsibilities</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                                        {[
                                          { role: 'Super Admin', level: 'Full Enterprise Access', desc: 'Complete system control and governance' },
                                          { role: 'Admin', level: 'Department-Level Access', desc: 'Operational administration and management' },
                                          { role: 'Manager', level: 'Team & Workflow Access', desc: 'Team handling and operational supervision' },
                                          { role: 'Staff / Employee', level: 'Assigned Module Access', desc: 'Task execution and support operations' }
                                        ].map((r, rIdx) => {
                                          const isActive = (r.role === 'Super Admin' && selectedRole === 'Super Admin') ||
                                            (r.role === 'Admin' && (selectedRole === 'Admin' || selectedRole === 'Admins')) ||
                                            (r.role === 'Manager' && selectedRole === 'Managers') ||
                                            (r.role === 'Staff / Employee' && selectedRole === 'Employees');
                                          return (
                                            <tr key={rIdx} className={`hover:bg-gray-50/50 ${isActive ? 'bg-blue-50/50 text-blue-900 font-semibold' : ''}`}>
                                              <td className="py-2.5 px-3 font-bold text-gray-900">{r.role}</td>
                                              <td className="py-2.5 px-3 text-indigo-600 font-semibold">{r.level}</td>
                                              <td className="py-2.5 px-3 text-gray-500">{r.desc}</td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Enterprise Workflow Chart */}
                                <div className="border-t border-gray-150 pt-4 space-y-3">
                                  <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Enterprise Workflow Structure</span>
                                  <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl">
                                    <div className="flex flex-col items-center gap-2.5">
                                      {/* Node 1: Super Admin */}
                                      <div className={`px-4 py-1.5 rounded-lg border text-center transition-all ${isSuper ? 'bg-blue-600 text-white font-bold border-blue-600' : 'bg-white border-gray-200 text-gray-700'}`}>
                                        <span className="text-[10px] uppercase font-bold block">Super Admin</span>
                                      </div>
                                      <div className="h-4 w-0.5 bg-gray-300"></div>

                                      {/* Node 2: Admin */}
                                      <div className={`px-4 py-1.5 rounded-lg border text-center transition-all ${(isAdminRoot || isAdminsCat) ? 'bg-blue-600 text-white font-bold border-blue-600' : 'bg-white border-gray-200 text-gray-700'}`}>
                                        <span className="text-[10px] uppercase font-bold block">Admin</span>
                                      </div>
                                      <div className="h-4 w-0.5 bg-gray-300"></div>

                                      {/* Node 3: Department Managers */}
                                      <div className={`px-4 py-1.5 rounded-lg border text-center transition-all ${isManagersCat ? 'bg-blue-600 text-white font-bold border-blue-600' : 'bg-white border-gray-200 text-gray-700'}`}>
                                        <span className="text-[10px] uppercase font-bold block">Department Managers</span>
                                      </div>
                                      <div className="h-4 w-0.5 bg-gray-300"></div>

                                      {/* Node 4: Staff / Employees */}
                                      <div className={`px-4 py-1.5 rounded-lg border text-center transition-all ${isEmployeesCat ? 'bg-blue-600 text-white font-bold border-blue-600' : 'bg-white border-gray-200 text-gray-700'}`}>
                                        <span className="text-[10px] uppercase font-bold block">Staff / Employees</span>
                                      </div>
                                      <div className="h-4 w-0.5 bg-gray-300"></div>

                                      {/* Node 5: Client Interaction */}
                                      <div className="px-4 py-1.5 rounded-lg border border-emerald-500 bg-emerald-50 text-emerald-800 text-center">
                                        <span className="text-[10px] uppercase font-bold block">Customer & Client Interaction</span>
                                      </div>
                                      <div className="h-4 w-0.5 bg-gray-300"></div>

                                      {/* Node 6: Escalations Loop */}
                                      <div className="px-4 py-1.5 rounded-lg border border-dashed border-indigo-400 bg-indigo-50/50 text-indigo-800 text-center flex items-center gap-1">
                                        <Activity size={10} className="text-indigo-500 animate-pulse" />
                                        <span className="text-[9px] uppercase font-bold block">Reports & Escalations Loop Back</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // Standard Sub-Role Details view
                          const roleInfo = ROLE_DETAILS[selectedRole] || {
                            description: 'Executes assigned duties and coordinates tasks within the department portal.',
                            classification: 'Staff / Employee Level',
                            permissions: ['Task Execution', 'Daily Reporting', 'Activity Logging', 'Collaboration Workspace']
                          };

                          const activeStaff = userData.users?.filter(u => {
                            if (selectedRole === 'Super Admin') return u.role === 'super-admin';
                            if (selectedRole === 'Admin') return u.role === 'admin' && !u.adminSubRole;
                            return u.adminSubRole === selectedRole;
                          }) || [];

                          const roleScope = roleAccessLevels[selectedRole] || 'view';

                          return (
                            <>
                              {/* Header */}
                              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                                <div>
                                  <h4 className="text-sm font-black text-gray-900">{selectedRole}</h4>
                                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 block">{roleInfo.classification}</span>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                  roleScope === 'view-delete-edit' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                  roleScope === 'view-delete' ? 'bg-amber-50 text-amber-600 border border-amber-150' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  Scope: {roleScope}
                                </span>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-gray-500 leading-relaxed font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                                {roleInfo.description}
                              </p>

                              {/* Permissions Checklist */}
                              <div className="space-y-3">
                                <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Assigned Sub-Modules</span>
                                <div className="space-y-2.5">
                                  {roleInfo.permissions.map(perm => {
                                    const isChecked = activePermissionsByRole[selectedRole]?.includes(perm) ?? true;
                                    const isDisabled = selectedRole === 'Super Admin'; // Super Admin can't be toggled

                                    return (
                                      <label
                                        key={perm}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                          isChecked ? 'border-blue-100 bg-blue-50/20' : 'border-gray-200 hover:bg-gray-50'
                                        } cursor-pointer`}
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            disabled={isDisabled}
                                            onChange={() => toggleRolePermission(selectedRole, perm)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-350 rounded accent-blue-600"
                                          />
                                          <div>
                                            <span className="text-xs font-bold text-gray-800 block">{perm}</span>
                                            <span className="text-[10px] text-gray-400 block mt-0.5">Grants operational clearance to this specific sub-module</span>
                                          </div>
                                        </div>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                                          isChecked ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                          {isChecked ? 'Allowed' : 'Blocked'}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Scope control */}
                              <div className="pt-2">
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Default Authorization Level</label>
                                <select
                                  value={roleScope}
                                  disabled={selectedRole === 'Super Admin'}
                                  onChange={(e) => setRoleAccessLevels(prev => ({ ...prev, [selectedRole]: e.target.value }))}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:border-blue-500 font-semibold"
                                >
                                  <option value="view">Only See (view)</option>
                                  <option value="view-delete">See and Delete (view-delete)</option>
                                  <option value="view-delete-edit">See, Delete and Edit (view-delete-edit)</option>
                                </select>
                              </div>

                              {/* Active Users Assigned */}
                              <div className="border-t border-gray-150 pt-4 space-y-3">
                                <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Assigned staff accounts ({activeStaff.length})</span>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                  {activeStaff.length > 0 ? (
                                    activeStaff.map(u => (
                                      <div key={u._id} className="flex justify-between items-center p-2.5 bg-gray-50 border border-gray-100 rounded-xl">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                                            {getInitials(u.name)}
                                          </div>
                                          <div>
                                            <span className="text-xs font-bold text-gray-800 block leading-tight">{u.name}</span>
                                            <span className="text-[10px] text-gray-400 block">{u.email}</span>
                                          </div>
                                        </div>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                                          u.isHeld ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                          {u.isHeld ? 'Suspended' : 'Active'}
                                        </span>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-[10px] text-gray-400 font-medium italic">No active staff accounts currently allocated to this sub-role</p>
                                  )}
                                </div>
                              </div>
                              {/* Action controls */}
                              <div className="flex justify-end gap-2 border-t border-gray-150 pt-4">
                                <button
                                  onClick={handleSaveRolePermissions}
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                                >
                                  Save Configurations
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </div>

                    </div>
                  </div>
                )}

                {/* VIEW 3: MODULES CONTROL */}
                {activeSubTab === 'modules' && (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Company Modules & Tools Control</h3>
                      <p className="text-xs text-gray-500">Configure which Website Management (WMS) and Company Management (CMS) modules are active</p>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs space-y-4">
                      {Object.keys(modules).map(key => (
                        <div key={key} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                          <div>
                            <span className="font-bold text-xs capitalize text-gray-800">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <p className="text-[10px] text-gray-400">Toggle public availability of this tool in the portal</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={modules[key]}
                            onChange={(e) => {
                              setModules({ ...modules, [key]: e.target.checked });
                              toast.success(`Module "${key}" ${e.target.checked ? 'enabled' : 'disabled'}`);
                            }}
                            className="accent-blue-600 w-5 h-5 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VIEW 4: WEBSITE USER DIRECTORY */}
                {activeSubTab === 'website-users' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-gray-800">Website Users Directory</h3>
                        <p className="text-xs text-gray-500">Standard registered customer and user accounts (role: user)</p>
                      </div>
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {userData.users?.filter(u => u.role === 'user').length || 0} Registered Users
                      </span>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-100">
                            <th className="py-3.5 px-4">User Name</th>
                            <th className="py-3.5 px-4">Email</th>
                            <th className="py-3.5 px-4">Mobile</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {userData.users?.filter(u => u.role === 'user').map(u => (
                            <tr key={u._id} className="hover:bg-gray-50/50">
                              <td className="py-3.5 px-4 font-bold text-gray-900">{u.name}</td>
                              <td className="py-3.5 px-4 font-medium text-gray-500">{u.email}</td>
                              <td className="py-3.5 px-4">{u.mobile || u.phone || 'N/A'}</td>
                              <td className="py-3.5 px-4">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  u.isHeld ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                  {u.isHeld ? 'Suspended' : 'Active'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => {
                                    setEditingUser(u);
                                    setFormData({
                                      name: u.name || '', email: u.email || '', mobile: u.mobile || u.phone || '',
                                      role: u.role || 'user', password: '', isHeld: u.isHeld || false,
                                      holdUntil: u.holdUntil ? u.holdUntil.split('T')[0] : '', holdReason: u.holdReason || '',
                                      adminSubRole: u.adminSubRole || '', adminPermissions: u.adminPermissions || 'view',
                                      company: u.company || '', industry: u.industry || '', jobTitle: u.jobTitle || ''
                                    });
                                  }}
                                  className="text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded"
                                >
                                  Modify
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* VIEW 5: USER & CUSTOMER ACCOUNTS */}
                {activeSubTab === 'customer-accounts' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-gray-800">User & Customer Accounts</h3>
                        <p className="text-xs text-gray-500">Corporate clients and business customer accounts with professional profile details</p>
                      </div>
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {userData.users?.filter(u => u.role === 'user' && (u.company || u.industry || u.jobTitle)).length || 0} Customers
                      </span>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-100">
                            <th className="py-3.5 px-4">Customer Name / Email</th>
                            <th className="py-3.5 px-4">Company</th>
                            <th className="py-3.5 px-4">Industry Sector</th>
                            <th className="py-3.5 px-4">Job Title</th>
                            <th className="py-3.5 px-4">Mobile</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {(() => {
                            const customers = userData.users?.filter(u => u.role === 'user' && (u.company || u.industry || u.jobTitle)) || [];
                            if (customers.length === 0) {
                              return (
                                <tr>
                                  <td colSpan="7" className="py-12 text-center text-gray-400 font-medium italic">
                                    No customer accounts found with professional profiles. Use "Modify" in Website Users tab to assign company details.
                                  </td>
                                </tr>
                              );
                            }
                            return customers.map(u => (
                              <tr key={u._id} className="hover:bg-gray-50/50">
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">
                                      {getInitials(u.name)}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-900 text-xs">{u.name}</p>
                                      <p className="text-[10px] text-gray-400 mt-0.5">{u.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-gray-800">{u.company || 'N/A'}</td>
                                <td className="py-3.5 px-4 font-semibold text-indigo-600">{u.industry || 'N/A'}</td>
                                <td className="py-3.5 px-4 text-gray-600">{u.jobTitle || 'N/A'}</td>
                                <td className="py-3.5 px-4">{u.mobile || u.phone || 'N/A'}</td>
                                <td className="py-3.5 px-4">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    u.isHeld ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                                  }`}>
                                    {u.isHeld ? 'Suspended' : 'Active'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex justify-end gap-1.5">
                                    <button
                                      onClick={() => {
                                        setEditingUser(u);
                                        setFormData({
                                          name: u.name || '', email: u.email || '', mobile: u.mobile || u.phone || '',
                                          role: u.role || 'user', password: '', isHeld: u.isHeld || false,
                                          holdUntil: u.holdUntil ? u.holdUntil.split('T')[0] : '', holdReason: u.holdReason || '',
                                          adminSubRole: u.adminSubRole || '', adminPermissions: u.adminPermissions || 'view',
                                          company: u.company || '', industry: u.industry || '', jobTitle: u.jobTitle || ''
                                        });
                                      }}
                                      className="px-2 py-1 bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 rounded text-[10px]"
                                    >
                                      Modify
                                    </button>
                                    {admin?.role === 'super-admin' && (
                                      u.isHeld ? (
                                        <button
                                          onClick={() => handleReleaseHoldDirect(u)}
                                          className="px-2 py-1 bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 rounded text-[10px]"
                                        >
                                          Release
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => { setHoldingUser(u); setHoldDirectData({ holdUntil: '', holdReason: '' }); }}
                                          className="px-2 py-1 bg-red-50 text-red-600 font-bold hover:bg-red-100 rounded text-[10px]"
                                        >
                                          Hold
                                        </button>
                                      )
                                    )}
                                    <button
                                      onClick={() => deleteUser(u._id, u.name)}
                                      className="text-gray-400 hover:text-red-500 p-1 rounded"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* VIEW 5: STAFF & ADMIN ACCOUNTS (REAL USER DIRECTORY) */}
                {activeSubTab === 'staff-accounts' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-gray-800">Staff & Admin Accounts Directory</h3>
                        <p className="text-xs text-gray-500">Manage internal admin, manager, and employee accounts</p>
                      </div>
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {userData.users?.filter(u => u.role !== 'user').length || 0} Staff Members
                      </span>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-100">
                            <th className="py-3.5 px-4">Staff Member</th>
                            <th className="py-3.5 px-4">Role / Classification</th>
                            <th className="py-3.5 px-4">Assigned Department Sub-Role</th>
                            <th className="py-3.5 px-4">Verify Status</th>
                            <th className="py-3.5 px-4">Hold Schedule</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {userData.users?.filter(u => u.role !== 'user').map(u => (
                            <tr key={u._id} className="hover:bg-gray-50/50">
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">
                                    {getInitials(u.name)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 text-xs">{u.name}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 uppercase font-bold text-[10px] text-gray-500">
                                {u.role?.replace('-', ' ')}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-indigo-600">
                                {u.adminSubRole || 'N/A'}
                              </td>
                              <td className="py-3.5 px-4">
                                {u.isHeld ? (
                                  <span className="text-[9px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-150">On Hold</span>
                                ) : u.isApproved ? (
                                  <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-150">Verified</span>
                                ) : (
                                  <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-150">Pending</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                {admin?.role === 'super-admin' && u.role !== 'super-admin' ? (
                                  u.isHeld ? (
                                    <button onClick={() => handleReleaseHoldDirect(u)} className="text-[10px] font-bold text-emerald-600 hover:underline">
                                      Release
                                    </button>
                                  ) : (
                                    <button onClick={() => { setHoldingUser(u); setHoldDirectData({ holdUntil: '', holdReason: '' }); }} className="text-[10px] font-bold text-red-500 hover:underline">
                                      Hold Account
                                    </button>
                                  )
                                ) : '-'}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex justify-end gap-1">
                                  {!u.isApproved && (
                                    <button onClick={() => verifyUser(u._id, u.name, u.role)} className="px-2 py-1 bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 rounded text-[10px]">
                                      Verify
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      setEditingUser(u);
                                      setFormData({
                                        name: u.name || '', email: u.email || '', mobile: u.mobile || u.phone || '',
                                        role: u.role || 'user', password: '', isHeld: u.isHeld || false,
                                        holdUntil: u.holdUntil ? u.holdUntil.split('T')[0] : '', holdReason: u.holdReason || '',
                                        adminSubRole: u.adminSubRole || '', adminPermissions: u.adminPermissions || 'view',
                                        company: u.company || '', industry: u.industry || '', jobTitle: u.jobTitle || ''
                                      });
                                    }}
                                    className="px-2 py-1 bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 rounded text-[10px]"
                                  >
                                    Edit
                                  </button>
                                  {u.role !== 'super-admin' && (
                                    <button onClick={() => deleteUser(u._id, u.name)} className="text-gray-400 hover:text-red-500 p-1 rounded">
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* VIEW 6: SECURITY & ACCESS CONFIGS */}
                {activeSubTab === 'security' && (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Security Policies & API Keys</h3>
                      <p className="text-xs text-gray-500">Configure global access control and tokens</p>
                    </div>

                    <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Minimum Password Length</label>
                        <input
                          type="number"
                          value={passwordMinLength}
                          onChange={(e) => setPasswordMinLength(parseInt(e.target.value))}
                          className="w-32 px-3 py-1.5 border border-gray-200 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={sessionTimeout}
                          onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                          className="w-32 px-3 py-1.5 border border-gray-200 rounded-xl text-xs"
                        />
                      </div>

                      <div className="flex justify-between items-center py-2 border-t border-b border-gray-100">
                        <div>
                          <span className="font-bold text-xs text-gray-800">Restrict Access by IP Address</span>
                          <p className="text-[10px] text-gray-400">Lock down the admin panel to approved corporate IP networks</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={ipRestricted}
                          onChange={(e) => setIpRestricted(e.target.checked)}
                          className="accent-blue-600 w-5 h-5 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold text-gray-800 uppercase">Active API Credentials</h4>
                          <button
                            onClick={() => {
                              const newKey = { id: `KEY-0${apiKeys.length + 1}`, name: 'New Integration', key: 'tc_live_5b1a82f37c...', status: 'Active' };
                              setApiKeys([...apiKeys, newKey]);
                              toast.success("API token successfully generated.");
                            }}
                            className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline"
                          >
                            + Generate Key
                          </button>
                        </div>

                        <div className="space-y-2">
                          {apiKeys.map(k => (
                            <div key={k.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-gray-700 block">{k.name}</span>
                                <span className="font-mono text-[10px] text-gray-400 mt-0.5 block">{k.key}</span>
                              </div>
                              <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">{k.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => toast.success("Access policy configurations updated.")}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                      >
                        Save Configurations
                      </button>
                    </div>
                  </div>
                )}

                {/* VIEW 7: AUTHENTICATION & ACTIVITY LOGS (AUDIT TRAIL) */}
                {activeSubTab === 'logs' && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-800">System Audit Trail logs</h3>
                      <p className="text-xs text-gray-500">Activity logs of operations executed by managers and administrators</p>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-100">
                            <th className="py-3.5 px-4">Operator</th>
                            <th className="py-3.5 px-4">Action</th>
                            <th className="py-3.5 px-4">Entity Type</th>
                            <th className="py-3.5 px-4">IP Address</th>
                            <th className="py-3.5 px-4">Time Date</th>
                            <th className="py-3.5 px-4 text-right">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {auditLogs.length > 0 ? (
                            auditLogs.map((log) => {
                              const operatorName = log.performedBy?.name || log.adminId?.name || 'System / Guest';
                              const operatorEmail = log.performedBy?.email || log.adminId?.email || 'N/A';

                              return (
                                <tr key={log._id} className="hover:bg-gray-50/50">
                                  <td className="py-3.5 px-4">
                                    <p className="font-bold text-gray-900">{operatorName}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{operatorEmail}</p>
                                  </td>
                                  <td className="py-3.5 px-4">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      log.action === 'Create' ? 'bg-blue-50 text-blue-600' :
                                      log.action === 'Delete' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                      {log.action}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 font-semibold text-gray-600">{log.entity || 'System'}</td>
                                  <td className="py-3.5 px-4 font-mono text-gray-400">{log.ipAddress || '127.0.0.1'}</td>
                                  <td className="py-3.5 px-4 text-gray-400">
                                    {new Date(log.createdAt).toLocaleString()}
                                  </td>
                                  <td className="py-3.5 px-4 text-right max-w-[150px] truncate" title={log.details}>
                                    {log.details || 'N/A'}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="6" className="py-12 text-center text-gray-400 font-medium">
                                No activity audit logs recorded yet in the database.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </>
            )}
          </div>
        </main>
      </div>

      {/* ─── ADD/EDIT USER MODALS ─── */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" style={{ maxHeight: '85vh' }}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-base font-bold text-gray-800">Update User Account Details</h2>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 8rem)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile</label>
                  <input type="text" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Update Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    disabled={editingUser?.role === 'super-admin'}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white"
                  >
                    <option value="user">User</option>
                    <option value="employee">Staff / Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {['admin', 'manager', 'employee'].includes(formData.role) && (
                <div className="grid grid-cols-2 gap-4 border-t border-gray-150 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Assign Sub-Role</label>
                    <select
                      value={formData.adminSubRole}
                      onChange={(e) => setFormData({ ...formData, adminSubRole: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white"
                    >
                      <option value="">Select a Sub-Role</option>
                      {formData.role === 'admin' && ADMIN_SUB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      {formData.role === 'manager' && MANAGER_SUB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      {formData.role === 'employee' && EMPLOYEE_SUB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Permissions Level</label>
                    <select value={formData.adminPermissions} onChange={(e) => setFormData({ ...formData, adminPermissions: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white">
                      <option value="view">Only See (view)</option>
                      <option value="view-delete">See and Delete (view-delete)</option>
                      <option value="view-delete-edit">See, Delete and Edit (view-delete-edit)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">New Password (Optional)</label>
                <input type="password" placeholder="Leave blank to keep current" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
              </div>

              {formData.role === 'user' && (
                <div className="grid grid-cols-3 gap-4 border-t border-gray-150 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Company</label>
                    <input type="text" placeholder="e.g. Contractum Corp" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Industry Sector</label>
                    <input type="text" placeholder="e.g. Legal Tech" value={formData.industry || ''} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Job Title</label>
                    <input type="text" placeholder="e.g. Director" value={formData.jobTitle || ''} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                  </div>
                </div>
              )}

              {admin?.role === 'super-admin' && (
                <div className="space-y-4 border-t border-gray-150 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isHeld} onChange={(e) => setFormData({ ...formData, isHeld: e.target.checked })} className="w-4 h-4 text-red-600 focus:ring-red-500 rounded border-gray-300" />
                    <span className="text-xs font-bold text-gray-700">Suspend Account (Hold Option)</span>
                  </label>

                  {formData.isHeld && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Hold Until Date</label>
                        <input type="date" value={formData.holdUntil} onChange={(e) => setFormData({ ...formData, holdUntil: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Hold Reason</label>
                        <input type="text" placeholder="Reason for suspension" value={formData.holdReason} onChange={(e) => setFormData({ ...formData, holdReason: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button onClick={() => setEditingUser(null)} className="flex-1 py-2 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-white transition-all">Cancel</button>
              <button onClick={handleUpdateUser} className="flex-[2] py-2 bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white rounded-xl transition-all shadow-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" style={{ maxHeight: '85vh' }}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-base font-bold text-gray-800">Add New Staff / User Account</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 8rem)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">First Name</label>
                  <input type="text" value={createFormData.firstName} onChange={(e) => setCreateFormData({ ...createFormData, firstName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Last Name</label>
                  <input type="text" value={createFormData.lastName} onChange={(e) => setCreateFormData({ ...createFormData, lastName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input type="email" value={createFormData.email} onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                  <input type="text" value={createFormData.mobile} onChange={(e) => setCreateFormData({ ...createFormData, mobile: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                  <input type="password" value={createFormData.password} onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Role Type</label>
                  <select value={createFormData.role} onChange={(e) => setCreateFormData({ ...createFormData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white">
                    <option value="user">User</option>
                    <option value="employee">Staff / Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {['admin', 'manager', 'employee'].includes(createFormData.role) && (
                <div className="grid grid-cols-2 gap-4 border-t border-gray-150 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Assign Sub-Role</label>
                    <select
                      value={createFormData.adminSubRole}
                      onChange={(e) => setCreateFormData({ ...createFormData, adminSubRole: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white"
                    >
                      <option value="">Select a Sub-Role</option>
                      {createFormData.role === 'admin' && ADMIN_SUB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      {createFormData.role === 'manager' && MANAGER_SUB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      {createFormData.role === 'employee' && EMPLOYEE_SUB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Permissions Level</label>
                    <select value={createFormData.adminPermissions} onChange={(e) => setCreateFormData({ ...createFormData, adminPermissions: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white">
                      <option value="view">Only See (view)</option>
                      <option value="view-delete">See and Delete (view-delete)</option>
                      <option value="view-delete-edit">See, Delete and Edit (view-delete-edit)</option>
                    </select>
                  </div>
                </div>
              )}

              {createFormData.role === 'user' && (
                <div className="grid grid-cols-3 gap-4 border-t border-gray-150 pt-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Company</label>
                    <input type="text" placeholder="e.g. Contractum Corp" value={createFormData.company || ''} onChange={(e) => setCreateFormData({ ...createFormData, company: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Industry Sector</label>
                    <input type="text" placeholder="e.g. Legal Tech" value={createFormData.industry || ''} onChange={(e) => setCreateFormData({ ...createFormData, industry: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Job Title</label>
                    <input type="text" placeholder="e.g. Director" value={createFormData.jobTitle || ''} onChange={(e) => setCreateFormData({ ...createFormData, jobTitle: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button onClick={() => setIsCreateModalOpen(false)} className="flex-1 py-2 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-white transition-all">Cancel</button>
              <button onClick={handleCreateUser} className="flex-[2] py-2 bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white rounded-xl transition-all shadow-sm">Create Account</button>
            </div>
          </div>
        </div>
      )}

      {holdingUser && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-red-50">
              <h2 className="text-xs font-bold text-red-700 uppercase tracking-wide">Suspend User Account</h2>
              <button onClick={() => setHoldingUser(null)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Set a suspension period and write a reason for placing <strong>{holdingUser.name}</strong> on account hold.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Hold Until Date</label>
                <input type="date" value={holdDirectData.holdUntil} onChange={(e) => setHoldDirectData({ ...holdDirectData, holdUntil: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Reason for Hold</label>
                <input type="text" placeholder="e.g. Violation of policy" value={holdDirectData.holdReason} onChange={(e) => setHoldDirectData({ ...holdDirectData, holdReason: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs outline-none" />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button onClick={() => setHoldingUser(null)} className="flex-1 py-2 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-white transition-all">Cancel</button>
                <button onClick={handleConfirmHoldDirect} className="flex-[2] py-2 bg-red-600 hover:bg-red-750 text-xs font-bold text-white rounded-xl transition-all shadow-sm">Confirm Suspension</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
