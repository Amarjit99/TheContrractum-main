import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Search, Plus, MapPin, Briefcase, Trash2, X, BookOpen, ChevronRight, Edit,
  LayoutDashboard, FileText, CheckCircle, Calendar, Send, UserCheck, Star,
  Award, ShieldAlert, Mail, MessageSquare, RefreshCw, BarChart2, FileSpreadsheet,
  Users, UserPlus, Bell, Clock, ChevronDown, CheckSquare, Settings, Play, Filter,
  ArrowRight, Lock, Upload, Activity, MoreVertical, Volume2, Mic, Code, FolderKanban
} from 'lucide-react';

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Error Boundary — catches runtime crashes and shows a readable panel instead of a blank white page
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('[AdminCareers] Runtime Error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', paddingTop: 80 }}>
            <div style={{ color: '#ef4444', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚠ AdminCareers — Runtime Error</div>
            <pre style={{ background: '#1e293b', padding: 16, borderRadius: 8, color: '#fca5a5', fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{ marginTop: 16, padding: '8px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


const JOB_CATEGORIES = [
  "Technology",
  "Marketing",
  "Legal",
  "HR",
  "Operations",
  "Sales",
  "Finance",
  "Design",
  "Internship Programs"
];

const JOB_SUBCATEGORIES = {
  "Technology": ["Software Developer", "Web Developer", "UI/UX Designer", "QA Engineer", "DevOps Engineer"],
  "Marketing": ["SEO Specialist", "Digital Marketing", "Content Writer", "Social Media Manager"],
  "HR": ["HR Executive", "Talent Acquisition Specialist", "HR Coordinator"],
  "Operations": ["Operations Executive", "Workflow Coordinator", "Process Coordinator"],
  "Sales": ["Sales Executive", "Business Development Executive", "CRM Executive"],
  "Finance": ["Finance Executive", "Billing Executive", "Accountant"],
  "Legal": ["Compliance Executive", "Contract Administrator", "Legal Advisor"],
  "Design": ["Graphic Designer", "UI/UX Designer", "Brand Executive"],
  "Internship Programs": ["Technical Intern", "Marketing Intern", "HR Intern", "Design Intern"]
};

const STATUS_OPTIONS = [
  "New",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "HR Discussion",
  "Selected",
  "Rejected",
  "On Hold"
];

function AdminCareers() {
  const { admin } = useAdminAuth();
  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  // Sidebar Sub-Navigation Tabs: 19 specified screens
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Core Data State
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Global Filters
  const [globalSearch, setGlobalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [subcategoryFilter, setSubcategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All'); // 'All' | 'Today' | 'Week' | 'Month'

  // Job Modal State
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '', department: 'Technology', location: 'Remote', type: 'Full-Time',
    tags: [], startDate: '', endDate: '', jobId: ''
  });
  const [customSkill, setCustomSkill] = useState('');

  // Bio Modal State
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [bioJob, setBioJob] = useState(null);
  const [bioForm, setBioForm] = useState({
    roles: '', skills: '', qualification: '', experience: '', salary: '', benefits: ''
  });

  // Candidate Details Modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState('profile'); 
  const [hrNoteInput, setHrNoteInput] = useState('');
  const [candidateRating, setCandidateRating] = useState(0);

  // Scheduling details
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('Pending');

  // Email / WhatsApp simulation state
  const [commsType, setCommsType] = useState('Email');
  const [emailTemplate, setEmailTemplate] = useState('shortlist');
  const [commsSubject, setCommsSubject] = useState('');
  const [commsMessage, setCommsMessage] = useState('');

  // Category view mock data and states
  const [categoryMetrics, setCategoryMetrics] = useState([
    { id: 'cat-1', name: 'Technology', activePosts: 5, applications: 474, fillRate: 78, leadHR: 'Anita Verma' },
    { id: 'cat-2', name: 'Marketing', activePosts: 3, applications: 224, fillRate: 60, leadHR: 'Rohit Mehta' },
    { id: 'cat-3', name: 'Operations', activePosts: 2, applications: 187, fillRate: 85, leadHR: 'Neha Gupta' },
    { id: 'cat-4', name: 'Sales', activePosts: 3, applications: 150, fillRate: 90, leadHR: 'Anita Verma' },
    { id: 'cat-5', name: 'HR', activePosts: 1, applications: 112, fillRate: 50, leadHR: 'Neha Gupta' },
    { id: 'cat-6', name: 'Finance', activePosts: 2, applications: 62, fillRate: 100, leadHR: 'Rohit Mehta' },
    { id: 'cat-7', name: 'Legal', activePosts: 1, applications: 39, fillRate: 100, leadHR: 'Anita Verma' },
    { id: 'cat-8', name: 'Design', activePosts: 2, applications: 0, fillRate: 0, leadHR: 'Rohit Mehta' },
    { id: 'cat-9', name: 'Internship Programs', activePosts: 4, applications: 85, fillRate: 40, leadHR: 'Neha Gupta' }
  ]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatHR, setNewCatHR] = useState('Anita Verma');

  // Subcategory management state
  const [subcategoriesList, setSubcategoriesList] = useState(() => {
    const list = [];
    Object.keys(JOB_SUBCATEGORIES).forEach(cat => {
      JOB_SUBCATEGORIES[cat].forEach(sub => {
        list.push({ category: cat, name: sub, applicantsCount: Math.floor(Math.random() * 50) + 5, activeJobs: Math.floor(Math.random() * 3) });
      });
    });
    return list;
  });
  const [newSubName, setNewSubName] = useState('');
  const [newSubParent, setNewSubParent] = useState('Technology');

  // Resume database upload simulation state
  const [uploadQueue, setUploadQueue] = useState([]);
  const [parsingProgress, setParsingProgress] = useState(null);

  // Live Interview Simulator Webcam State
  const [interviewSimulatorOpen, setInterviewSimulatorOpen] = useState(false);
  const [simulatedInterviewApp, setSimulatedInterviewApp] = useState(null);
  const [simulatedCodeText, setSimulatedCodeText] = useState(`// Welcome to The Contractum technical assessment room.
// Please write a function to reverse a linked list in JavaScript.

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  let next = null;
  while (current !== null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`);
  const [simulatedMessages, setSimulatedMessages] = useState([
    { sender: 'System', text: 'Candidate has joined the interview room.' },
    { sender: 'Interviewer', text: 'Hello! Welcome to your interview. Can you walk me through the reverseLinkedList function?' },
    { sender: 'Candidate', text: 'Yes, absolutely. The code is running in O(n) time and uses O(1) extra memory by changing the node pointers in place.' }
  ]);
  const [simMessageInput, setSimMessageInput] = useState('');

  // Department targets
  const [departmentHiring, setDepartmentHiring] = useState([
    { department: 'Technology', targetHeadcount: 15, currentFilled: 8, recruiterLead: 'Anita Verma', budgetCode: 'BUDG-TECH-2026', priority: 'High' },
    { department: 'Marketing', targetHeadcount: 8, currentFilled: 3, recruiterLead: 'Rohit Mehta', budgetCode: 'BUDG-MKTG-2026', priority: 'Medium' },
    { department: 'Operations', targetHeadcount: 12, currentFilled: 9, recruiterLead: 'Neha Gupta', budgetCode: 'BUDG-OPS-2026', priority: 'High' },
    { department: 'Legal', targetHeadcount: 2, currentFilled: 1, recruiterLead: 'Anita Verma', budgetCode: 'BUDG-LEGL-2026', priority: 'Low' },
    { department: 'HR', targetHeadcount: 4, currentFilled: 2, recruiterLead: 'Neha Gupta', budgetCode: 'BUDG-HR-2026', priority: 'Medium' },
    { department: 'Sales', targetHeadcount: 10, currentFilled: 7, recruiterLead: 'Anita Verma', budgetCode: 'BUDG-SLS-2026', priority: 'High' },
    { department: 'Finance', targetHeadcount: 3, currentFilled: 3, recruiterLead: 'Rohit Mehta', budgetCode: 'BUDG-FIN-2026', priority: 'Low' },
    { department: 'Design', targetHeadcount: 5, currentFilled: 2, recruiterLead: 'Rohit Mehta', budgetCode: 'BUDG-DSGN-2026', priority: 'Medium' },
    { department: 'Internship Programs', targetHeadcount: 20, currentFilled: 14, recruiterLead: 'Neha Gupta', budgetCode: 'BUDG-INTR-2026', priority: 'Medium' }
  ]);

  // Employee referrals
  const [referrals, setReferrals] = useState([
    { id: 'REF-001', referrer: 'Devendra Singh (Engineering)', candidate: 'Aman Verma', position: 'SDE II', status: 'In Review', bonus: '₹15,000', payoutDate: 'Pending' },
    { id: 'REF-002', referrer: 'Ruchika Sen (HR Team)', candidate: 'Sanjana Roy', position: 'HR Executive', status: 'Offered', bonus: '₹10,000', payoutDate: '2026-06-15' },
    { id: 'REF-003', referrer: 'Vikash Jain (Sales)', candidate: 'Karan Malhotra', position: 'Sales Manager', status: 'Hired', bonus: '₹20,000', payoutDate: '2026-05-01' },
    { id: 'REF-004', referrer: 'Suresh Kumar (Operations)', candidate: 'Aakash Mehra', position: 'Workflow Lead', status: 'Rejected', bonus: '₹0', payoutDate: 'N/A' },
    { id: 'REF-005', referrer: 'Priya Sharma (Design)', candidate: 'Deepika Rao', position: 'UI Designer', status: 'Hired', bonus: '₹12,000', payoutDate: '2026-05-20' }
  ]);

  // Workflow Automations
  const [automations, setAutomations] = useState([
    { id: 'auto-1', trigger: 'On Application Shortlisted', action: 'Send Interview Schedule Link via Email', active: true },
    { id: 'auto-2', trigger: 'On Technical Assessment Passed', action: 'Change status to HR Discussion & Notify Recruiter', active: true },
    { id: 'auto-3', trigger: 'On Document Verification Verified', action: 'Enable Generate Offer Letter panel', active: true },
    { id: 'auto-4', trigger: 'On Offer Accepted', action: 'Auto-create user account in Staff Registration & send welcome WhatsApp', active: false },
    { id: 'auto-5', trigger: 'On Application Rejected', action: 'Send standard courtesy reject email after 48-hour delay', active: true }
  ]);
  const [newAutoTrigger, setNewAutoTrigger] = useState('On Application Shortlisted');
  const [newAutoAction, setNewAutoAction] = useState('');

  // Portal Settings
  const [portalSettings, setPortalSettings] = useState({
    title: 'The Contractum WMS Careers',
    description: 'Join the industry-leading warehouse management logistics enterprise ecosystem. Explore careers at The Contractum.',
    logoUrl: '/assets/main-logo.jpg',
    contactEmail: 'careers@thecontractum.com',
    allowUploads: true,
    autoShortlistMinScore: 4,
    allowedFileFormats: '.pdf,.doc,.docx',
    maxFileSizeMb: 10,
    enableReferralSystem: true
  });

  // Export audit logs
  const [exportLogs, setExportLogs] = useState([
    { id: 'EXP-101', adminName: 'Anita Verma', fileType: 'CSV', range: 'All Categories', recordsCount: 1248, date: '2026-05-28 14:32' },
    { id: 'EXP-102', adminName: 'Rohit Mehta', fileType: 'Excel', range: 'Technology Category', recordsCount: 474, date: '2026-05-27 10:15' },
    { id: 'EXP-103', adminName: 'Neha Gupta', fileType: 'JSON', range: 'Interviews Scheduled', recordsCount: 98, date: '2026-05-25 17:01' }
  ]);

  // Toast notifier helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch Jobs & Applications from backend
  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/cms/jobs`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/cms/applications`, { headers });
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  }, [headers]);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchJobs(), fetchApplications()]);
    setLoading(false);
  }, [fetchJobs, fetchApplications]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Compute Subcategories dynamically based on selected Category filter
  const subcategoriesForFilter = useMemo(() => {
    if (categoryFilter === 'All') return [];
    return JOB_SUBCATEGORIES[categoryFilter] || [];
  }, [categoryFilter]);

  // Reset subcategory filter if category changes
  useEffect(() => {
    setSubcategoryFilter('All');
  }, [categoryFilter]);

  // Filtered Applications logic
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (!app) return false;
      // 1. Search filter (null-safe)
      const fullName = (app.fullName || '').toLowerCase();
      const email = (app.email || '').toLowerCase();
      const jobTitle = (app.jobTitle || '').toLowerCase();
      const q = globalSearch.toLowerCase();
      const matchesSearch = fullName.includes(q) || email.includes(q) || jobTitle.includes(q);
      if (!matchesSearch) return false;

      // 2. Category filter
      if (categoryFilter !== 'All') {
        if (app.category !== categoryFilter) return false;
      }

      // 3. Subcategory filter
      if (subcategoryFilter !== 'All') {
        if (app.subcategory !== subcategoryFilter) return false;
      }

      // 4. Date filter
      if (dateFilter !== 'All') {
        const appDate = new Date(app.createdAt);
        const now = new Date();
        if (dateFilter === 'Today') {
          if (appDate.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === 'Week') {
          const diffTime = Math.abs(now - appDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 7) return false;
        } else if (dateFilter === 'Month') {
          if (appDate.getMonth() !== now.getMonth() || appDate.getFullYear() !== now.getFullYear()) return false;
        }
      }

      return true;
    });
  }, [applications, globalSearch, categoryFilter, subcategoryFilter, dateFilter]);

  // Job post submit (Create / Edit)
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.location) {
      return showToast("Please fill all required fields.", "error");
    }
    setSubmitting(true);
    try {
      const url = editingJob ? `${API}/api/cms/jobs/${editingJob._id}` : `${API}/api/cms/jobs`;
      const method = editingJob ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...jobForm, status: 'Active' })
      });
      if (res.ok) {
        showToast(`Job posting ${editingJob ? 'updated' : 'created'} successfully!`);
        setJobModalOpen(false);
        setEditingJob(null);
        setJobForm({
          title: '', department: 'Technology', location: 'Remote', type: 'Full-Time',
          tags: [], startDate: '', endDate: '', jobId: ''
        });
        fetchJobs();
      } else {
        const err = await res.json();
        showToast(err.message || "Failed to submit job posting.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server connection error.", "error");
    }
    setSubmitting(false);
  };

  // Job Delete
  const handleJobDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const res = await fetch(`${API}/api/cms/jobs/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        showToast("Job posting deleted.");
        fetchJobs();
      } else {
        showToast("Failed to delete job posting.", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Job Bio
  const handleBioSubmit = async (e) => {
    e.preventDefault();
    if (!bioJob) return;
    setSubmitting(true);
    const payload = {
      roles: bioForm.roles.split('\n').map(s => s.trim()).filter(Boolean),
      skills: bioForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      qualification: bioForm.qualification.trim(),
      experience: bioForm.experience.trim(),
      salary: bioForm.salary.trim(),
      benefits: bioForm.benefits.split('\n').map(s => s.trim()).filter(Boolean)
    };
    try {
      const res = await fetch(`${API}/api/cms/jobs/${bioJob._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast("Job bio/details saved successfully!");
        setBioModalOpen(false);
        fetchJobs();
      } else {
        showToast("Failed to save bio details.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error saving bio.", "error");
    }
    setSubmitting(false);
  };

  // Application Updates (Status, Notes, rating, etc.)
  const handleUpdateApplication = async (appId, updatedFields) => {
    try {
      const res = await fetch(`${API}/api/cms/applications/${appId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updated = await res.json();
        setApplications(prev => prev.map(a => a._id === appId ? updated : a));
        if (selectedApp && selectedApp._id === appId) {
          setSelectedApp(updated);
        }
        showToast("Application details updated successfully.");
      } else {
        showToast("Failed to update candidate application.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error updating application.", "error");
    }
  };

  // Delete Application
  const handleDeleteApplication = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this candidate application?")) return;
    try {
      const res = await fetch(`${API}/api/cms/applications/${appId}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showToast("Application deleted.");
        setApplications(prev => prev.filter(a => a._id !== appId));
        if (selectedApp && selectedApp._id === appId) {
          setDetailModalOpen(false);
        }
      } else {
        showToast("Failed to delete application.", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger modal and set active tabs
  const openAppDetails = (app) => {
    setSelectedApp(app);
    setHrNoteInput(app.hrNotes || '');
    setCandidateRating(app.rating || 0);
    setInterviewDate(app.interviewDate || '');
    setInterviewTime(app.interviewTime || '');
    setInterviewStatus(app.interviewStatus || 'Pending');
    setActiveDetailTab('profile');
    setDetailModalOpen(true);
  };

  // Save Internal notes & rating
  const saveInternalHrNotes = async () => {
    if (!selectedApp) return;
    await handleUpdateApplication(selectedApp._id, {
      hrNotes: hrNoteInput,
      rating: candidateRating
    });
  };

  // Save Interview Schedule
  const saveInterviewSchedule = async () => {
    if (!selectedApp) return;
    await handleUpdateApplication(selectedApp._id, {
      interviewDate,
      interviewTime,
      interviewStatus,
      status: 'Interview Scheduled'
    });
  };

  // Simulated Email & WhatsApp communications
  useEffect(() => {
    if (!selectedApp) return;
    const name = selectedApp.fullName;
    const title = selectedApp.jobTitle;

    if (commsType === 'Email') {
      if (emailTemplate === 'shortlist') {
        setCommsSubject(`Application Shortlisted - The Contractum`);
        setCommsMessage(`Dear ${name},\n\nWe are pleased to inform you that your application for "${title}" has been shortlisted. Our HR team will reach out to you shortly to schedule the next rounds.\n\nBest Regards,\nThe Contractum Careers`);
      } else if (emailTemplate === 'interview') {
        setCommsSubject(`Interview Schedule Confirmation - The Contractum`);
        setCommsMessage(`Dear ${name},\n\nYour interview for "${title}" has been scheduled. Please find the details below:\nDate: ${interviewDate || 'To Be Confirmed'}\nTime: ${interviewTime || 'To Be Confirmed'}\nPlatform: Google Meet\n\nLooking forward to speaking with you!\n\nBest Regards,\nHR Team`);
      } else if (emailTemplate === 'offer') {
        setCommsSubject(`Offer of Employment - The Contractum`);
        setCommsMessage(`Dear ${name},\n\nCongratulations! We are thrilled to extend an offer to join The Contractum team as a "${title}". Please review the attached offer letter and document checklist.\n\nBest Regards,\nOperations & HR Team`);
      } else {
        setCommsSubject(`Update regarding your application - The Contractum`);
        setCommsMessage(`Dear ${name},\n\nThank you for your interest in The Contractum and for taking time to apply. We have reviewed your profile, and while it was impressive, we have decided to move forward with other candidates at this time. We will keep your resume in our database for future opportunities.\n\nBest Regards,\nHR Team`);
      }
    } else {
      // WhatsApp default templates
      setCommsSubject('');
      setCommsMessage(`Hi ${name}, this is the HR Team from The Contractum. We are writing to follow up on your application for "${title}". Could you please verify your availability for an introductory call? Thanks!`);
    }
  }, [commsType, emailTemplate, selectedApp, interviewDate, interviewTime]);

  const sendCommunication = async () => {
    if (!selectedApp) return;
    const log = {
      type: commsType,
      message: commsMessage,
      sender: admin?.name || 'HR Recruiter',
      sentAt: new Date()
    };
    const updatedLogs = [...(selectedApp.communicationLogs || []), log];
    await handleUpdateApplication(selectedApp._id, {
      communicationLogs: updatedLogs
    });
    showToast(`${commsType} sent successfully (mock logged).`);
  };

  // Export Reports to CSV Client-side
  const exportReports = () => {
    if (applications.length === 0) {
      return showToast("No applications to export.", "error");
    }
    const headersCsv = ["Application ID", "Candidate Name", "Email", "Phone", "Job Title", "Category", "Subcategory", "Rating", "Assigned HR", "Interview Status", "Application Status", "Applied Date"];
    const rows = applications.map(app => [
      app._id,
      app.fullName,
      app.email,
      app.phone || 'N/A',
      app.jobTitle || 'N/A',
      app.category || 'N/A',
      app.subcategory || 'N/A',
      app.rating || 0,
      app.assignedHR || 'Unassigned',
      app.interviewStatus || 'N/A',
      app.status || 'New',
      new Date(app.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headersCsv.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Recruitment_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Report exported successfully as CSV!");

    // Add to export logs
    const newLog = {
      id: `EXP-${Math.floor(Math.random() * 900) + 100}`,
      adminName: admin?.name || 'Admin',
      fileType: 'CSV',
      range: 'All Filtered Candidates',
      recordsCount: filteredApps.length,
      date: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setExportLogs(prev => [newLog, ...prev]);
  };

  // Computed Dashboard KPI Card Metrics
  const stats = useMemo(() => {
    const totalJobs = jobs.length || 128;
    const activeJobs = jobs.filter(j => j.status === 'Active').length || 76;
    const activeApps = applications.length || 1248;
    const shortlisted = applications.filter(a => a.status === 'Shortlisted').length || 327;
    const interviews = applications.filter(a => a.status === 'Interview Scheduled' || a.interviewStatus === 'Scheduled').length || 98;
    const filled = applications.filter(a => a.status === 'Selected').length || 24;
    const pendingReviews = applications.filter(a => a.status === 'New' || a.status === 'Under Review').length || 156;

    return { totalJobs, activeJobs, activeApps, shortlisted, interviews, filled, pendingReviews };
  }, [jobs, applications]);

  // Charts Computed Data
  // 1. Applications by Department (PieChart)
  const deptData = useMemo(() => {
    const counts = {};
    if (applications.length > 0) {
      applications.forEach(a => {
        const dept = a.category || 'Other';
        counts[dept] = (counts[dept] || 0) + 1;
      });
      return Object.keys(counts).map(dept => ({ name: dept, value: counts[dept] }));
    }
    // Seed default if database is empty
    return [
      { name: 'Technology', value: 474 },
      { name: 'Marketing', value: 224 },
      { name: 'Operations', value: 187 },
      { name: 'Sales', value: 150 },
      { name: 'HR', value: 112 },
      { name: 'Finance', value: 62 },
      { name: 'Legal', value: 39 }
    ];
  }, [applications]);

  const COLORS = ['#1e5cdc', '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#6366f1', '#14b8a6'];

  // 2. Hiring Funnel
  const funnelData = useMemo(() => {
    return [
      { name: 'Applications', count: stats.activeApps, color: '#1e5cdc', width: '100%', pct: '100%' },
      { name: 'Under Review', count: Math.ceil(stats.activeApps * 0.59), color: '#4f46e5', width: '85%', pct: '59%' },
      { name: 'Shortlisted', count: stats.shortlisted, color: '#8b5cf6', width: '70%', pct: '26%' },
      { name: 'Interviews', count: stats.interviews, color: '#f59e0b', width: '55%', pct: '8%' },
      { name: 'Offered', count: Math.ceil(stats.interviews * 0.36), color: '#ec4899', width: '40%', pct: '3%' },
      { name: 'Hired', count: stats.filled, color: '#10b981', width: '25%', pct: '2%' }
    ];
  }, [stats]);

  // 3. Application Trends (7-day area chart)
  const trendsData = useMemo(() => {
    const days = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days[d.toDateString()] = 0;
    }

    if (applications.length > 0) {
      applications.forEach(a => {
        const dateStr = new Date(a.createdAt).toDateString();
        if (days[dateStr] !== undefined) {
          days[dateStr]++;
        }
      });
      return Object.keys(days).map(key => ({
        date: key.split(' ').slice(1, 3).join(' '),
        ThisWeek: days[key] + Math.floor(Math.random() * 5),
        LastWeek: Math.floor(Math.random() * 8) + 2
      }));
    }

    // Default Seed
    return [
      { date: 'May 18', ThisWeek: 450, LastWeek: 380 },
      { date: 'May 19', ThisWeek: 620, LastWeek: 410 },
      { date: 'May 20', ThisWeek: 510, LastWeek: 490 },
      { date: 'May 21', ThisWeek: 700, LastWeek: 550 },
      { date: 'May 22', ThisWeek: 600, LastWeek: 580 },
      { date: 'May 23', ThisWeek: 680, LastWeek: 600 },
      { date: 'May 24', ThisWeek: 820, LastWeek: 640 }
    ];
  }, [applications]);

  // 4. Recruitment Sources Donut
  const sourceData = [
    { name: 'Website', value: 524 },
    { name: 'Linkedin', value: 349 },
    { name: 'Employee Referral', value: 187 },
    { name: 'Indeed', value: 100 },
    { name: 'Naukri', value: 62 },
    { name: 'Others', value: 26 }
  ];

  // 5. Success rate gauges
  const successRate = 68; // %

  // 6. Monthly Hiring Stats
  const monthlyHiringData = [
    { month: 'Jan', Hired: 12 },
    { month: 'Feb', Hired: 19 },
    { month: 'Mar', Hired: 15 },
    { month: 'Apr', Hired: 28 },
    { month: 'May', Hired: stats.filled || 24 },
    { month: 'Jun', Hired: 32 }
  ];

  // 7. Status Overview Data Donut
  const statusOverviewData = useMemo(() => {
    const counts = {};
    STATUS_OPTIONS.forEach(s => { counts[s] = 0; });
    
    // Seed default counts first to ensure beautiful distribution
    const seedCounts = {
      "New": 194,
      "Under Review": 327,
      "Shortlisted": 327,
      "Interview Scheduled": 98,
      "HR Discussion": 36,
      "Selected": 24,
      "Rejected": 196,
      "On Hold": 70
    };
    
    if (applications.length > 0) {
      applications.forEach(a => {
        const s = a.status || 'New';
        counts[s] = (counts[s] || 0) + 1;
      });
      // blend database counts
      Object.keys(seedCounts).forEach(s => {
        if (counts[s]) seedCounts[s] = counts[s];
      });
    }
    
    return Object.keys(seedCounts).map(s => ({ name: s, value: seedCounts[s] }));
  }, [applications]);

  // Upcoming Interviews List
  const upcomingInterviews = useMemo(() => {
    const list = applications
      .filter(a => (a.status === 'Interview Scheduled' || a.interviewStatus === 'Scheduled') && a.interviewDate)
      .map(a => ({
        id: a._id,
        name: a.fullName,
        jobTitle: a.jobTitle,
        date: a.interviewDate,
        time: a.interviewTime,
        assignedHR: a.assignedHR || 'Anita Verma',
        type: 'Online'
      }));

    if (list.length > 0) return list;

    // Seed defaults
    return [
      { id: '1', name: 'Rahul Sharma', jobTitle: 'Senior Full Stack Developer', date: 'May 24, 2025', time: '10:30 AM', assignedHR: 'Anita Verma', type: 'Online' },
      { id: '2', name: 'Priya Nair', jobTitle: 'Digital Marketing Specialist', date: 'May 24, 2025', time: '01:00 PM', assignedHR: 'Rohit Mehta', type: 'In-Person' },
      { id: '3', name: 'Amit Patel', jobTitle: 'HR Executive', date: 'May 25, 2025', time: '11:00 AM', assignedHR: 'Neha Gupta', type: 'Online' }
    ];
  }, [applications]);

  // Pending Follow-Ups
  const pendingFollowups = useMemo(() => {
    const list = applications.filter(a => a.status === 'Under Review' || a.status === 'HR Discussion').map(a => ({
      id: a._id,
      name: a.fullName,
      action: a.status === 'Under Review' ? 'Follow-up for resume' : 'Schedule initial screening',
      priority: a.status === 'Under Review' ? 'High' : 'Medium',
      app: a
    }));

    if (list.length > 0) return list;

    return [
      { id: '1', name: 'Priya Nair', action: 'Follow-up for resume', priority: 'High', app: null },
      { id: '2', name: 'Vikram Singh', action: 'Schedule initial screening', priority: 'Medium', app: null },
      { id: '3', name: 'Neha Joshi', action: 'Background verification', priority: 'Low', app: null }
    ];
  }, [applications]);

  // New alerts list
  const newCandidateAlerts = useMemo(() => {
    const list = applications.filter(a => a.status === 'New').slice(0, 4);
    if (list.length > 0) return list;
    return [
      { _id: '1', fullName: 'Ananya Goel', jobTitle: 'UI/UX Designer', category: 'Design', createdAt: new Date() },
      { _id: '2', fullName: 'Rajesh Mishra', jobTitle: 'DevOps Engineer', category: 'Technology', createdAt: new Date(Date.now() - 3600000) }
    ];
  }, [applications]);

  // Add Category Handler
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      activePosts: 0,
      applications: 0,
      fillRate: 0,
      leadHR: newCatHR
    };
    setCategoryMetrics(prev => [...prev, newCat]);
    JOB_CATEGORIES.push(newCatName.trim());
    JOB_SUBCATEGORIES[newCatName.trim()] = [];
    setNewCatName('');
    showToast(`Job category "${newCat.name}" added successfully.`);
  };

  // Add Subcategory Handler
  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    const newSub = {
      category: newSubParent,
      name: newSubName.trim(),
      applicantsCount: 0,
      activeJobs: 0
    };
    setSubcategoriesList(prev => [...prev, newSub]);
    if (JOB_SUBCATEGORIES[newSubParent]) {
      JOB_SUBCATEGORIES[newSubParent].push(newSubName.trim());
    } else {
      JOB_SUBCATEGORIES[newSubParent] = [newSubName.trim()];
    }
    setNewSubName('');
    showToast(`Subcategory "${newSub.name}" added under ${newSubParent}.`);
  };

  // Simulate PDF resume upload parser
  const handleResumeSimUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileDetails = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      status: 'Parsing'
    };
    setUploadQueue(prev => [fileDetails, ...prev]);
    setParsingProgress(0);

    let progress = 0;
    const timer = setInterval(() => {
      progress += 25;
      setParsingProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        // Add to main applications list as a parsed mock candidate
        const parsedName = file.name.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ');
        const mockNewApp = {
          _id: `APP-PARSED-${Math.floor(Math.random() * 9000) + 1000}`,
          fullName: parsedName,
          email: `${parsedName.toLowerCase().replace(/\s/g, '')}@example.com`,
          phone: '+91 98765 43210',
          jobTitle: 'Software Developer',
          category: 'Technology',
          subcategory: 'Software Developer',
          rating: 4,
          assignedHR: 'Anita Verma',
          status: 'New',
          interviewStatus: 'Pending',
          documentVerificationStatus: 'Pending',
          offerLetterStatus: 'Not Sent',
          createdAt: new Date().toISOString(),
          coverLetter: 'Automatically parsed and ingested via corporate resume reader index.',
          hrNotes: 'Candidate profile extracted from PDF upload. Ready for initial recruiter screening.',
          communicationLogs: []
        };

        setApplications(prev => [mockNewApp, ...prev]);
        setUploadQueue(prev => prev.map(f => f.name === file.name ? { ...f, status: 'Completed' } : f));
        setParsingProgress(null);
        showToast(`Parsed & imported candidate: ${parsedName}`);
      }
    }, 400);
  };

  // Live Coding Interview Room Simulator
  const launchInterviewSimulator = (app) => {
    setSimulatedInterviewApp(app);
    setInterviewSimulatorOpen(true);
    setSimulatedMessages([
      { sender: 'System', text: `Interview Room established for ${app.fullName}` },
      { sender: 'System', text: `Role: ${app.jobTitle} | Category: ${app.category}` },
      { sender: 'Interviewer', text: `Welcome ${app.fullName}. Let us begin our coding round. Please look at the editor panel.` },
      { sender: 'Candidate', text: 'Thank you! Excited to be here. I see the code skeleton.' }
    ]);
  };

  const sendSimMessage = () => {
    if (!simMessageInput.trim()) return;
    setSimulatedMessages(prev => [...prev, { sender: 'Interviewer', text: simMessageInput }]);
    const currentInput = simMessageInput;
    setSimMessageInput('');

    // Simulate candidate reply based on keyword matching
    setTimeout(() => {
      let reply = "Yes, that makes sense. I will adapt the structure accordingly.";
      if (currentInput.toLowerCase().includes('complexity')) {
        reply = "The time complexity is O(N) because we iterate through the list exactly once. Space complexity is O(1).";
      } else if (currentInput.toLowerCase().includes('run') || currentInput.toLowerCase().includes('execute')) {
        reply = "Running tests... All 5 core test cases passed successfully!";
      } else if (currentInput.toLowerCase().includes('bug') || currentInput.toLowerCase().includes('error')) {
        reply = "Ah, good catch! Let me fix the edge case where the head is null.";
      }
      setSimulatedMessages(prev => [...prev, { sender: 'Candidate', text: reply }]);
    }, 1000);
  };

  const completeSimulatedInterview = async () => {
    if (!simulatedInterviewApp) return;
    await handleUpdateApplication(simulatedInterviewApp._id, {
      interviewStatus: 'Completed',
      status: 'HR Discussion',
      hrNotes: `${simulatedInterviewApp.hrNotes || ''}\n[Tech Interview Note] Live assessment completed. Good algorithmic logic, clean code style. Passed.`
    });
    setInterviewSimulatorOpen(false);
    showToast("Interview round logged as Completed. Promoted to HR Discussion.");
  };

  // Staff Registration Submission
  const [staffRegistrationForm, setStaffRegistrationForm] = useState({
    employeeId: '',
    candidateId: '',
    roleAccess: 'Operations Executive',
    joiningDate: new Date().toISOString().split('T')[0],
    workShift: 'General Shift',
    salaryPae: '₹12,00,000'
  });

  const selectedCandidates = useMemo(() => {
    return applications.filter(a => a.status === 'Selected');
  }, [applications]);

  // Set default candidate in staff form
  useEffect(() => {
    if (selectedCandidates.length > 0 && !staffRegistrationForm.candidateId) {
      const cand = selectedCandidates[0];
      setStaffRegistrationForm(prev => ({
        ...prev,
        candidateId: cand._id,
        employeeId: `EMP-WMS-2026-${String(cand._id).slice(-4).toUpperCase()}`
      }));
    }
  }, [selectedCandidates, staffRegistrationForm.candidateId]);

  const handleStaffRegisterSubmit = (e) => {
    e.preventDefault();
    const cand = applications.find(a => a._id === staffRegistrationForm.candidateId);
    if (!cand) return showToast("Candidate selection invalid.", "error");

    showToast(`Staff Registration Successful! ${cand.fullName} added to WMS workforce as ${staffRegistrationForm.roleAccess}.`);
    // Remove from active pipeline by updating status to 'Selected' and adding a mark or deleting
    handleUpdateApplication(cand._id, { status: 'Selected', hrNotes: `${cand.hrNotes}\n[Staff Registered] Employee Account created: ${staffRegistrationForm.employeeId}` });
  };

  // Table pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredApps.slice(start, start + itemsPerPage);
  }, [filteredApps, currentPage]);

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;

  return (
    <AdminLayout>
      {/* Toast Notifier */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <span>{toast.type === 'success' ? '✓' : '✗'}</span>
          {toast.message}
        </div>
      )}

      {/* Careers Sub-sidebar and Main layout wrapper */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Careers Left Sidebar (Dark Blue theme) */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-[#0f172a] text-slate-100 flex flex-col p-5 shrink-0 border-r border-slate-800 transition-all duration-300`}>
          <div className="mb-6 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'hidden' : 'flex'}`}>
              <div className="p-2.5 bg-blue-600 rounded-xl">
                <Briefcase size={22} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm leading-tight uppercase tracking-wider text-blue-400">The Contractum</h2>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Recruitment</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 cursor-pointer"
            >
              <MenuToggleIcon collapsed={sidebarCollapsed} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {/* Header: Recruitment Management */}
            <div>
              {!sidebarCollapsed && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Recruitment Management</p>}
              <nav className="space-y-1">
                {[
                  { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Dashboard Overview' },
                  { id: 'categories', icon: <FolderKanban size={18} />, label: 'Job Categories' },
                  { id: 'subcategories', icon: <Settings size={18} className="rotate-45" />, label: 'Job Subcategories' },
                  { id: 'jobs', icon: <Briefcase size={18} />, label: 'Active Job Posts' },
                  { id: 'internships', icon: <UsersRoundIcon size={18} />, label: 'Internship Programs' },
                  { id: 'applications', icon: <FileText size={18} />, label: 'Applications Management' },
                  { id: 'pipeline', icon: <Play size={18} className="rotate-90" />, label: 'Candidate Pipeline' },
                  { id: 'resume_db', icon: <Upload size={18} />, label: 'Resume Database' },
                  { id: 'interviews', icon: <Calendar size={18} />, label: 'Interview Management' },
                  { id: 'comms_center', icon: <Mail size={18} />, label: 'HR Communication Center' },
                  { id: 'shortlisted', icon: <UserCheck size={18} />, label: 'Shortlisted Candidates' },
                  { id: 'onboarding', icon: <Award size={18} />, label: 'Hiring & Onboarding' },
                  { id: 'staff_registration', icon: <UserPlus size={18} />, label: 'Staff Registration' },
                  { id: 'analytics', icon: <BarChart2 size={18} />, label: 'Recruitment Analytics' },
                  { id: 'dept_hiring', icon: <Users size={18} />, label: 'Department Hiring' },
                  { id: 'referrals', icon: <HandshakeIcon size={18} />, label: 'Employee Referrals' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      activeSubTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                    title={tab.label}
                  >
                    {tab.icon}
                    {!sidebarCollapsed && <span className="truncate">{tab.label}</span>}
                  </button>
                ))}
              </nav>
            </div>

            {/* Header: System & Settings */}
            <div>
              {!sidebarCollapsed && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">System & Settings</p>}
              <nav className="space-y-1">
                {[
                  { id: 'settings', icon: <Settings size={18} />, label: 'Career Portal Settings' },
                  { id: 'workflow_automation', icon: <Activity size={18} />, label: 'Workflow Automation' },
                  { id: 'reports_export', icon: <FileSpreadsheet size={18} />, label: 'Reports & Export' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      activeSubTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                    title={tab.label}
                  >
                    {tab.icon}
                    {!sidebarCollapsed && <span className="truncate">{tab.label}</span>}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-semibold">
            {!sidebarCollapsed ? (
              <>
                Logged in as:
                <p className="text-slate-300 font-bold text-xs mt-1 truncate">{admin?.name || 'Recruitment Officer'}</p>
                <p className="text-blue-400 font-bold text-[9px] uppercase tracking-wider truncate">{admin?.adminSubRole || 'HR Admin'}</p>
              </>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs mx-auto">
                {(admin?.name || 'R')[0]}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Top Custom Header */}
          <header className="border-b border-gray-100 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-20 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 max-w-2xl flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by job title, candidate, skills..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col text-[9px] font-bold text-gray-400">
                <span className="mb-0.5 leading-none">Category</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="All">All Categories</option>
                  {JOB_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory Dropdown */}
              <div className="flex flex-col text-[9px] font-bold text-gray-400">
                <span className="mb-0.5 leading-none">Subcategory</span>
                <select
                  value={subcategoryFilter}
                  onChange={(e) => setSubcategoryFilter(e.target.value)}
                  disabled={categoryFilter === 'All'}
                  className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-50"
                >
                  <option value="All">All Subcategories</option>
                  {subcategoriesForFilter.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex flex-col text-[9px] font-bold text-gray-400">
                <span className="mb-0.5 leading-none">Date Range</span>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="All">May 18 - May 24, 2025</option>
                  <option value="Today">Applied Today</option>
                  <option value="Week">Applied This Week</option>
                  <option value="Month">Applied This Month</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
              <button
                onClick={exportReports}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <FileSpreadsheet size={15} /> Export Reports
              </button>

              <button
                onClick={() => {
                  setEditingJob(null);
                  setJobForm({
                    title: '', department: 'Technology', location: 'Remote', type: 'Full-Time',
                    tags: [], startDate: '', endDate: '', jobId: ''
                  });
                  setJobModalOpen(true);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                <Plus size={15} /> Create New Job Post
              </button>

              {/* Notifications Profile icons */}
              <div className="flex items-center gap-2 border-l border-gray-100 pl-3">
                <button className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-black">12</span>
                </button>
                <button className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors mr-2">
                  <MessageSquare size={18} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-black">5</span>
                </button>

                <div className="flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${admin?.name || 'Anita Verma'}&background=1e5cdc&color=fff`} className="w-8 h-8 rounded-full border border-gray-200 shadow-xs" alt="Profile" />
                  <div className="hidden xl:block text-left text-[10px] leading-tight font-semibold">
                    <p className="text-gray-900">{admin?.name || 'Anita Verma'}</p>
                    <p className="text-gray-400 font-medium">HR Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Sub Tab View Render */}
          <div className="p-6 flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
                <RefreshCw className="animate-spin text-blue-600" size={32} />
                <p className="font-semibold text-sm">Loading Recruitment Data...</p>
              </div>
            ) : (
              <>
                {/* 1. DASHBOARD OVERVIEW */}
                {activeSubTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Careers & Recruitment Dashboard</h1>
                      <p className="text-xs text-gray-500 mt-0.5">Manage job posts, applications, candidates and hiring process efficiently.</p>
                    </div>

                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {[
                        { title: 'Total Job Posts', count: stats.totalJobs, subtitle: `${stats.activeJobs} Active Listings`, trend: '+12.6% vs last week', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <Briefcase size={18} /> },
                        { title: 'Active Applications', count: stats.activeApps, subtitle: 'Excluding rejects', trend: '+18.4% vs last week', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: <Users size={18} /> },
                        { title: 'Shortlisted Candidates', count: stats.shortlisted, subtitle: 'Ready for loop', trend: '+15.3% vs last week', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: <UserCheck size={18} /> },
                        { title: 'Interviews Scheduled', count: stats.interviews, subtitle: 'Loop active', trend: '+8.7% vs last week', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: <Calendar size={18} /> },
                        { title: 'Positions Filled', count: stats.filled, subtitle: 'Offers accepted', trend: '+9.1% vs last week', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <CheckCircle size={18} /> },
                        { title: 'Pending Reviews', count: stats.pendingReviews, subtitle: 'Needs review', trend: '+6.2% vs last week', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: <Clock size={18} /> }
                      ].map((card, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${card.color} shadow-xs flex flex-col justify-between h-32`}>
                          <div className="flex justify-between items-start">
                            <span className="p-2 bg-white/60 rounded-lg">{card.icon}</span>
                            <span className="text-2xl font-bold tracking-tight">{card.count}</span>
                          </div>
                          <div>
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide truncate">{card.title}</h4>
                            <div className="flex justify-between items-center mt-0.5">
                              <p className="text-[10px] font-medium opacity-80 truncate">{card.subtitle}</p>
                              <span className="text-[8px] font-bold bg-white/80 px-1 rounded text-emerald-600">{card.trend}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Double Column Layout: Left charts (2/3), Right widgets (1/3) */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      
                      {/* Left Column: Recharts Analytics */}
                      <div className="xl:col-span-2 space-y-6">
                        
                        {/* AreaChart - Application Trends */}
                        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BarChart2 size={16} className="text-blue-600" /> Application Trends
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={trendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                  <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                <Area name="This Week" type="monotone" dataKey="ThisWeek" stroke="#1e5cdc" strokeWidth={2} fillOpacity={1} fill="url(#colorThisWeek)" />
                                <Area name="Last Week" type="monotone" dataKey="LastWeek" stroke="#9ca3af" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Middle row double charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Funnel Graph */}
                          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">Hiring Funnel</h3>
                            <div className="space-y-2 mt-4">
                              {funnelData.map((stage, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-gray-500 w-24 truncate">{stage.name}</span>
                                  <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden relative">
                                    <div 
                                      className="h-full flex items-center justify-between px-3 text-[10px] font-bold text-white rounded-full transition-all" 
                                      style={{ backgroundColor: stage.color, width: stage.width }}
                                    >
                                      <span>{stage.count}</span>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-400 w-8 text-right">{stage.pct}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* PieChart - Apps by Department */}
                          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">Applications by Department</h3>
                            <div className="h-56 flex items-center">
                              <div className="w-1/2 h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={deptData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={45}
                                      outerRadius={65}
                                      paddingAngle={3}
                                      dataKey="value"
                                    >
                                      {deptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              <div className="w-1/2 space-y-1.5 overflow-y-auto max-h-48 text-[9px] font-bold text-gray-500 pr-1 custom-scrollbar">
                                {deptData.slice(0, 7).map((entry, index) => (
                                  <div key={entry.name} className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1.5 truncate">
                                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                      <span className="truncate">{entry.name}</span>
                                    </div>
                                    <span className="text-gray-400 shrink-0">{entry.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Sourcing channels donut */}
                        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Applications by Source</h3>
                          <div className="h-52 flex items-center">
                            <div className="w-1/2 h-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    dataKey="value"
                                  >
                                    {sourceData.map((entry, idx) => (
                                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 space-y-2 text-[10px] font-bold text-gray-500">
                              {sourceData.map((item, idx) => (
                                <div key={item.name} className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                    <span>{item.name}</span>
                                  </div>
                                  <span className="text-gray-400">{((item.value/1248)*100).toFixed(0)}% ({item.value})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div> {/* END left charts column */}

                      {/* Right Column: HR Widgets */}
                      <div className="space-y-4">

                        {/* Upcoming Interviews widget */}
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                              <Calendar size={15} className="text-indigo-600" /> Upcoming Interviews
                            </h3>
                            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{upcomingInterviews.length} Scheduled</span>
                          </div>
                          <div className="space-y-2">
                            {upcomingInterviews.slice(0,3).map((item, idx) => (
                              <div key={idx} className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center gap-2">
                                <div className="min-w-0">
                                  <h4 className="font-bold text-[11px] text-gray-800 truncate">{item.name}</h4>
                                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{item.jobTitle}</p>
                                  <div className="flex gap-2 items-center text-[9px] text-indigo-600 font-bold mt-1">
                                    <span>📅 {item.date}</span>
                                    <span>⏰ {item.time}</span>
                                  </div>
                                </div>
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                  item.type === 'Online' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                }`}>{item.type}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pending HR Follow-ups */}
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Clock size={15} className="text-amber-500" /> Pending Follow-Ups
                          </h3>
                          <div className="space-y-2">
                            {pendingFollowups.slice(0,3).map((item) => (
                              <div key={item.id} className="p-2.5 bg-amber-50/40 border border-amber-100 rounded-xl flex items-center justify-between gap-3 text-xs">
                                <div>
                                  <span className="font-bold text-gray-800 block truncate max-w-[120px]">{item.name}</span>
                                  <span className="text-[10px] text-gray-500 block truncate max-w-[120px]">{item.action}</span>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                  item.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-100 text-amber-700'
                                }`}>{item.priority}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* New Candidate Alerts */}
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Bell size={15} className="text-blue-500" /> New Candidate Alerts
                          </h3>
                          <div className="space-y-2">
                            {newCandidateAlerts.slice(0,3).map((item) => (
                              <div key={item._id} className="p-2.5 border-b border-gray-100 last:border-0 flex justify-between items-start text-xs font-bold">
                                <div>
                                  <h4 className="font-bold text-gray-900">{item.fullName}</h4>
                                  <p className="text-[10px] text-gray-500 font-semibold">{item.jobTitle}</p>
                                </div>
                                <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{item.category}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Department Hiring Requests */}
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <UserPlus size={15} className="text-emerald-500" /> Dept. Hiring Requests
                          </h3>
                          <div className="space-y-2">
                            {departmentHiring.slice(0,3).map((req, idx) => (
                              <div key={idx} className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
                                <div>
                                  <span className="font-bold text-gray-800 block">{req.department}</span>
                                  <span className="text-[10px] text-gray-500">Target: {req.targetHeadcount} | Filled: {req.currentFilled}</span>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                  req.priority === 'High' ? 'bg-red-50 text-red-600' :
                                  req.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                                }`}>{req.priority}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recruitment Notifications */}
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs">
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Bell size={15} className="text-indigo-600" /> Recruitment Notifications
                          </h3>
                          <div className="space-y-2">
                            {[
                              { text: 'Rahul Sharma completed the Live Coding Assessment.', time: '10m ago' },
                              { text: 'Automated offer letter dispatched to Sanjana Roy.', time: '2h ago' },
                              { text: 'Reference verification approved for Karan Malhotra.', time: '1d ago' }
                            ].map((notif, idx) => (
                              <div key={idx} className="text-xs border-b border-gray-50 pb-2 last:border-b-0 last:pb-0 font-semibold text-gray-700">
                                <p className="leading-snug">{notif.text}</p>
                                <span className="text-[9px] text-gray-400 block mt-0.5">{notif.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div> {/* END right widgets column */}

                    </div> {/* END 3-col grid */}

                    {/* Full-width Applications Table below the grid */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs p-5 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-50">
                            <h3 className="text-xs font-bold text-gray-850 uppercase tracking-wider">Latest Applications</h3>
                            
                            <div className="flex flex-wrap items-center gap-1">
                              {['All', 'New', 'Under Review', 'Shortlisted', 'Interview Scheduled'].map(st => (
                                <button
                                  key={st}
                                  onClick={() => setCategoryFilter(st === 'All' ? 'All' : st)} // Mock filter toggle
                                  className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-gray-50 text-gray-650 hover:bg-gray-100 transition-colors"
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="text-gray-450 font-bold uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                                  <th className="py-2.5 px-3">Application ID</th>
                                  <th className="py-2.5 px-3">Candidate Name</th>
                                  <th className="py-2.5 px-3">Position Applied</th>
                                  <th className="py-2.5 px-3">Category</th>
                                  <th className="py-2.5 px-3">Subcategory</th>
                                  <th className="py-2.5 px-3">Resume Status</th>
                                  <th className="py-2.5 px-3">Assigned HR</th>
                                  <th className="py-2.5 px-3">Interview Status</th>
                                  <th className="py-2.5 px-3">Application Status</th>
                                  <th className="py-2.5 px-3">Applied Date</th>
                                  <th className="py-2.5 px-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                {paginatedApps.map((app) => (
                                  <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3 px-3 font-mono text-[9px] text-gray-450">
                                      {String(app._id).slice(-6).toUpperCase()}
                                    </td>
                                    <td className="py-3 px-3 font-bold text-gray-900">{app.fullName}</td>
                                    <td className="py-3 px-3 text-gray-800">{app.jobTitle}</td>
                                    <td className="py-3 px-3 text-gray-500">{app.category}</td>
                                    <td className="py-3 px-3 text-gray-500">{app.subcategory || 'General'}</td>
                                    <td className="py-3 px-3">
                                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                        app.resume ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                      }`}>
                                        {app.resume ? 'Reviewed' : 'Pending Review'}
                                      </span>
                                    </td>
                                    <td className="py-3 px-3 text-indigo-600 font-bold">{app.assignedHR || 'Unassigned'}</td>
                                    <td className="py-3 px-3">
                                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                        app.interviewStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                        app.interviewStatus === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'
                                      }`}>
                                        {app.interviewStatus || 'Pending'}
                                      </span>
                                    </td>
                                    <td className="py-3 px-3">
                                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                        app.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                        app.status === 'Shortlisted' ? 'bg-purple-50 text-purple-650 border border-purple-100' :
                                        app.status === 'Interview Scheduled' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                        app.status === 'Selected' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-amber-50 text-amber-600'
                                      }`}>
                                        {app.status}
                                      </span>
                                    </td>
                                    <td className="py-3 px-3 text-gray-400 text-[10px] whitespace-nowrap">
                                      {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="py-3 px-3 text-right">
                                      <div className="flex justify-end gap-1.5">
                                        <button onClick={() => openAppDetails(app)} className="p-1 hover:bg-gray-100 text-gray-400 hover:text-blue-600 rounded">
                                          <ChevronRight size={14} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Pagination bar */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-[10px] font-bold text-gray-505">
                            <span>Showing {itemsPerPage * (currentPage - 1) + 1} to {Math.min(itemsPerPage * currentPage, filteredApps.length)} of {filteredApps.length} entries</span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => setCurrentPage(c => Math.max(c - 1, 1))} disabled={currentPage === 1} className="p-1 border border-gray-200 rounded disabled:opacity-50 hover:bg-gray-50 font-black">&lt;</button>
                              {[...Array(totalPages).keys()].map(p => (
                                <button key={p} onClick={() => setCurrentPage(p + 1)} className={`w-6 h-6 rounded border ${currentPage === p + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}>{p + 1}</button>
                              ))}
                              <button onClick={() => setCurrentPage(c => Math.min(c + 1, totalPages))} disabled={currentPage === totalPages} className="p-1 border border-gray-200 rounded disabled:opacity-50 hover:bg-gray-50 font-black">&gt;</button>
                            </div>
                          </div>
                        </div>



                    {/* Bottom Row Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4">
                      
                      {/* Sourcing Channel Performance */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Recruitment Source Performance</h3>
                        <div className="space-y-3.5">
                          {sourceData.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                <span className="truncate max-w-[90px] block">{item.name}</span>
                                <span>{item.value} ({((item.value / 1248) * 100).toFixed(0)}%)</span>
                              </div>
                              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-blue-600" style={{ width: `${(item.value / 524) * 100}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Success rate gauge */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs text-center">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Interview Success Rate</h3>
                        
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="42" stroke="#f3f4f6" strokeWidth="10" fill="none" />
                            <circle cx="56" cy="56" r="42" stroke="#1e5cdc" strokeWidth="10" fill="none" 
                                    strokeDasharray="263" strokeDashoffset={263 - (263 * successRate) / 100} />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-xl font-black text-gray-800">{successRate}%</span>
                            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Success Rate</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-3 text-[9px] font-bold text-gray-500 text-left border-t border-gray-50 pt-2">
                          <div>Conducted: <span className="text-gray-900">128</span></div>
                          <div>Offers Made: <span className="text-gray-900">36</span></div>
                          <div>Accepted: <span className="text-gray-900">24</span></div>
                          <div>Acceptance: <span className="text-gray-900">67%</span></div>
                        </div>
                      </div>

                      {/* Monthly hiring statistics */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Hiring by Month</h3>
                        <div className="h-36">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyHiringData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="month" stroke="#9ca3af" fontSize={9} tickLine={false} />
                              <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
                              <Tooltip />
                              <Bar dataKey="Hired" fill="#1e5cdc" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Application Status Overview Donut Chart */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Application Status Overview</h3>
                        <div className="h-36 flex items-center">
                          <div className="w-1/2 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={statusOverviewData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={22}
                                  outerRadius={36}
                                  dataKey="value"
                                >
                                  {statusOverviewData.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="w-1/2 space-y-1 text-[8px] font-bold text-gray-500 overflow-y-auto max-h-32 pr-1 custom-scrollbar">
                            {statusOverviewData.map((item, idx) => (
                              <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-1 truncate">
                                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                  <span className="truncate">{item.name}</span>
                                </div>
                                <span className="text-gray-400 shrink-0">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Very Bottom Section: HR Activity Logs & Performance */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                      
                      {/* HR Activity Logs */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <Activity size={16} className="text-blue-600" /> HR Activity Logs
                        </h3>
                        <div className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                          {[
                            { action: 'Candidate Shortlisted', details: 'Anita Verma shortlisted Rahul Sharma for Senior Full Stack Developer', time: '10 mins ago', icon: '⚡' },
                            { action: 'Interview Logged', details: 'Rohit Mehta marked Priya Nair interview as Completed', time: '1 hour ago', icon: '📅' },
                            { action: 'Offer Released', details: 'Neha Gupta generated offer letter for Vikram Singh', time: '3 hours ago', icon: '✉️' },
                            { action: 'New Candidate', details: 'Saurabh Mishra applied for Web Developer Intern', time: '5 hours ago', icon: '👤' }
                          ].map((item, idx) => (
                            <div key={idx} className="flex gap-3 text-xs leading-normal border-b border-gray-50 pb-2.5 last:border-0 last:pb-0 font-semibold text-gray-700">
                              <span className="p-1 bg-gray-50 rounded-lg shrink-0 w-6 h-6 flex items-center justify-center">{item.icon}</span>
                              <div className="flex-1">
                                <span className="font-bold text-gray-900 block">{item.action}</span>
                                <span className="text-gray-500 font-medium">{item.details}</span>
                                <span className="text-[9px] text-gray-400 block mt-0.5">{item.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Candidate Communication Logs */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <Mail size={16} className="text-indigo-650" /> Candidate Communication Logs
                        </h3>
                        <div className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                          {[
                            { candidate: 'Rahul Sharma', channel: 'Email', subject: 'Application Shortlisted', time: '10 mins ago' },
                            { candidate: 'Priya Nair', channel: 'WhatsApp', subject: 'Interview Schedule Reminder', time: '1 hour ago' },
                            { candidate: 'Amit Patel', channel: 'Email', subject: 'Google Meet Interview Details', time: 'Yesterday' }
                          ].map((item, idx) => (
                            <div key={idx} className="p-2.5 bg-gray-50 rounded-xl flex justify-between items-center text-xs font-semibold">
                              <div>
                                <span className="font-bold text-gray-805 block truncate max-w-[130px]">{item.candidate}</span>
                                <span className="text-[10px] text-gray-500 block truncate max-w-[130px] font-normal">{item.subject}</span>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                item.channel === 'Email' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                              }`}>
                                {item.channel}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recruitment Performance */}
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <BarChart2 size={16} className="text-emerald-500" /> Recruitment Performance
                        </h3>
                        <div className="space-y-4">
                          {[
                            { metric: 'Offer Acceptance Rate', value: '67%', desc: 'Hires / Offers released', color: 'bg-emerald-500' },
                            { metric: 'Average Time-to-Hire', value: '18 Days', desc: 'Sourcing to offer accepted', color: 'bg-blue-650' },
                            { metric: 'Verification Pass Rate', value: '94%', desc: 'Background check clearance', color: 'bg-indigo-600' }
                          ].map((m, idx) => (
                            <div key={idx} className="space-y-1 text-xs">
                              <div className="flex justify-between font-bold">
                                <span className="text-gray-805">{m.metric}</span>
                                <span className="text-gray-900">{m.value}</span>
                              </div>
                              <p className="text-[9px] text-gray-400 leading-none font-normal">{m.desc}</p>
                              <div className="w-full bg-gray-150 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${m.color}`} style={{ width: m.value.includes('%') ? m.value : '75%' }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* 2. JOB CATEGORIES */}
                {activeSubTab === 'categories' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Job Categories Management</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Manage hiring categories and assign global HR recruiter owners.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Add category card */}
                      <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-5 flex flex-col justify-between h-56">
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Add New Category</h3>
                        <form onSubmit={handleAddCategory} className="space-y-3">
                          <input 
                            type="text" 
                            required
                            placeholder="Category Name (e.g. Technology)" 
                            value={newCatName} 
                            onChange={e => setNewCatName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white outline-none font-semibold"
                          />
                          <select 
                            value={newCatHR} 
                            onChange={e => setNewCatHR(e.target.value)}
                            className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white font-bold text-gray-700"
                          >
                            <option>Anita Verma</option>
                            <option>Rohit Mehta</option>
                            <option>Neha Gupta</option>
                          </select>
                          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs">
                            Create Category Card
                          </button>
                        </form>
                      </div>

                      {/* Display categories */}
                      {categoryMetrics.map((cat) => (
                        <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-56 hover:shadow-md transition-shadow">
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                                Active Positions: {cat.activePosts}
                              </span>
                              <span className="text-[10px] font-bold text-gray-400">ID: {cat.id}</span>
                            </div>
                            <h3 className="text-base font-black text-gray-800 mt-2.5">{cat.name}</h3>
                            <p className="text-[11px] text-gray-400 mt-1 font-semibold">Lead Recruiter: <span className="text-gray-700">{cat.leadHR}</span></p>
                          </div>

                          <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-xs">
                            <div>
                              <span className="text-gray-400 block text-[9px] font-bold uppercase">Total Applicants</span>
                              <span className="text-gray-800 font-bold text-sm">{cat.applications || Math.floor(Math.random() * 50)}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-gray-400 block text-[9px] font-bold uppercase">Target Fill Rate</span>
                              <span className="text-emerald-600 font-bold text-sm">{cat.fillRate || 75}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. JOB SUBCATEGORIES */}
                {activeSubTab === 'subcategories' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Job Subcategories Registry</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Define nested subcategories mapped to global departments for granular application tagging.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Add Form */}
                      <div className="bg-white border border-gray-205 rounded-2xl p-5 shadow-xs h-fit space-y-4">
                        <h3 className="text-xs font-bold text-gray-850 uppercase tracking-widest pb-2 border-b border-gray-50">Create New Subcategory</h3>
                        <form onSubmit={handleAddSubcategory} className="space-y-3.5">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Parent Category</label>
                            <select 
                              value={newSubParent} 
                              onChange={e => setNewSubParent(e.target.value)}
                              className="w-full p-2 border border-gray-200 rounded-xl text-xs bg-white font-bold text-gray-700"
                            >
                              {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Subcategory Name</label>
                            <input 
                              type="text"
                              required
                              placeholder="E.g. Web Developer" 
                              value={newSubName} 
                              onChange={e => setNewSubName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white outline-none font-semibold"
                            />
                          </div>
                          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs">
                            Link Subcategory
                          </button>
                        </form>
                      </div>

                      {/* Subcategories Table */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                            <tr>
                              <th className="py-3 px-4">Subcategory Name</th>
                              <th className="py-3 px-4">Parent Category</th>
                              <th className="py-3 px-4">Active Jobs</th>
                              <th className="py-3 px-4">Total Applicants</th>
                              <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-750">
                            {subcategoriesList.map((sub, idx) => (
                              <tr key={idx} className="hover:bg-gray-50/50">
                                <td className="py-3 px-4 font-bold text-gray-900">{sub.name}</td>
                                <td className="py-3 px-4 text-indigo-650">{sub.category}</td>
                                <td className="py-3 px-4">{sub.activeJobs} Postings</td>
                                <td className="py-3 px-4">{sub.applicantsCount} Applicants</td>
                                <td className="py-3 px-4 text-right">
                                  <button 
                                    onClick={() => {
                                      setSubcategoriesList(prev => prev.filter((_, i) => i !== idx));
                                      showToast("Subcategory deleted.");
                                    }} 
                                    className="text-red-500 hover:text-red-700 p-1"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. ACTIVE JOB POSTS */}
                {activeSubTab === 'jobs' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Job Positions & Active Postings</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Manage job cards shown on public portal.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {jobs.map(job => (
                        <div key={job._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group">
                          <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${
                            job.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}></div>

                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">
                              {job.department}
                            </span>
                            <h4 className="font-bold text-base text-gray-800 mt-2 mb-3 pr-10 line-clamp-1">{job.title}</h4>
                            
                            <div className="space-y-1.5 text-xs text-gray-500 mb-4 font-semibold">
                              <div className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {job.location}</div>
                              <div className="flex items-center gap-1.5"><Briefcase size={14} className="text-gray-400" /> {job.type}</div>
                              {job.jobId && <div className="text-[10px] font-mono bg-gray-100 border border-gray-200 px-2 py-0.5 rounded w-fit">ID: {job.jobId}</div>}
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {(job.tags || []).slice(0, 3).map(t => (
                                <span key={t} className="text-[9px] font-bold bg-slate-100 text-slate-650 px-2 py-0.5 rounded-full">{t}</span>
                              ))}
                              {(job.tags || []).length > 3 && (
                                <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">+{job.tags.length - 3}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2 gap-2">
                            <span className="text-xs font-semibold text-gray-500">
                              {applications.filter(a => a.jobTitle === job.title).length} Apps
                            </span>
                            
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingJob(job);
                                  setJobForm({
                                    title: job.title,
                                    department: job.department,
                                    location: job.location,
                                    type: job.type,
                                    tags: job.tags || [],
                                    startDate: job.startDate || '',
                                    endDate: job.endDate || '',
                                    jobId: job.jobId || ''
                                  });
                                  setJobModalOpen(true);
                                }}
                                className="p-2 hover:bg-gray-100 text-gray-500 hover:text-blue-600 rounded-lg transition-colors"
                                title="Edit Job Details"
                              >
                                <Edit size={14} />
                              </button>
                              
                              <button
                                onClick={() => {
                                  setBioJob(job);
                                  setBioForm({
                                    roles: (job.roles || []).join('\n'),
                                    skills: (job.skills || []).join(', '),
                                    qualification: job.qualification || '',
                                    experience: job.experience || '',
                                    salary: job.salary || '',
                                    benefits: (job.benefits || []).join('\n')
                                  });
                                  setBioModalOpen(true);
                                }}
                                className="p-2 hover:bg-gray-100 text-gray-500 hover:text-indigo-650 rounded-lg transition-colors"
                                title="Manage Job Description/Bio"
                              >
                                <BookOpen size={14} />
                              </button>

                              <button
                                onClick={() => handleJobDelete(job._id)}
                                className="p-2 hover:bg-gray-100 text-gray-500 hover:text-red-650 rounded-lg transition-colors"
                                title="Delete Listing"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. INTERNSHIP PROGRAMS */}
                {activeSubTab === 'internships' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Internship Programs Coordination</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Manage and track technical, marketing, design, and HR student internships.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { title: 'Total Intern Openings', count: 4, label: 'Active Intern Ads' },
                        { title: 'Total Intern Applications', count: applications.filter(a => a.category === 'Internship Programs').length || 85, label: 'All-time submissions' },
                        { title: 'Active Interns Hired', count: 14, label: 'Currently in workplace' },
                        { title: 'Intern Conversion Rate', count: '18%', label: 'Offer accepted rate' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.title}</h4>
                          <p className="text-2xl font-black text-blue-600 mt-1">{item.count}</p>
                          <span className="text-[10px] text-gray-550 font-semibold">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Internship Applications Filtered List */}
                    <div className="bg-white border border-gray-202 rounded-2xl shadow-xs p-5">
                      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Intern Candidate Register</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                            <tr>
                              <th className="py-3 px-4">Candidate Name</th>
                              <th className="py-3 px-4">Intern Role</th>
                              <th className="py-3 px-4">Subcategory</th>
                              <th className="py-3 px-4">Rating</th>
                              <th className="py-3 px-4">Application Status</th>
                              <th className="py-3 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                            {applications.filter(a => a && (a.category === 'Internship Programs' || (a.jobTitle || '').toLowerCase().includes('intern'))).map(app => (
                              <tr key={app._id} className="hover:bg-gray-55/50">
                                <td className="py-3 px-4 font-bold text-gray-900">{app.fullName}</td>
                                <td className="py-3 px-4">{app.jobTitle}</td>
                                <td className="py-3 px-4 text-indigo-650">{app.subcategory || 'General'}</td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-0.5 text-amber-400">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} fill={s <= (app.rating || 0) ? "currentColor" : "none"} />)}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    app.status === 'New' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-650'
                                  }`}>
                                    {app.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <button onClick={() => openAppDetails(app)} className="text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg">
                                    Track
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {applications.filter(a => a && (a.category === 'Internship Programs' || (a.jobTitle || '').toLowerCase().includes('intern'))).length === 0 && (
                              <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-400 font-semibold">No internship applications currently registered in databases.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. APPLICATIONS MANAGEMENT */}
                {activeSubTab === 'applications' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Recruitment Candidate Directory</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Track, screen, and process candidate records globally.</p>
                      </div>
                      <span className="text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-full">
                        {filteredApps.length} Candidates Filtered
                      </span>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
                              <th className="py-3.5 px-4">Application ID</th>
                              <th className="py-3.5 px-4">Candidate Name</th>
                              <th className="py-3.5 px-4">Applied Position</th>
                              <th className="py-3.5 px-4">Category</th>
                              <th className="py-3.5 px-4">Subcategory</th>
                              <th className="py-3.5 px-4">Rating</th>
                              <th className="py-3.5 px-4">Assigned HR</th>
                              <th className="py-3.5 px-4">Interview Status</th>
                              <th className="py-3.5 px-4">Application Status</th>
                              <th className="py-3.5 px-4">Date</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                            {filteredApps.length > 0 ? (
                              filteredApps.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="py-4 px-4 font-mono text-[9px] text-gray-400">
                                    {String(app._id).slice(-6).toUpperCase()}
                                  </td>
                                  <td className="py-4 px-4 font-bold text-gray-900">{app.fullName}</td>
                                  <td className="py-4 px-4 text-gray-800">{app.jobTitle || 'N/A'}</td>
                                  <td className="py-4 px-4 text-gray-500">{app.category || 'N/A'}</td>
                                  <td className="py-4 px-4 text-gray-500">{app.subcategory || 'N/A'}</td>
                                  <td className="py-4 px-4 font-normal">
                                    <div className="flex gap-0.5 text-amber-400">
                                      {[1, 2, 3, 4, 5].map(star => (
                                        <Star key={star} size={11} fill={star <= (app.rating || 0) ? "currentColor" : "none"} />
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4 text-xs font-bold text-indigo-600">
                                    {app.assignedHR || <span className="text-gray-400 font-normal">Unassigned</span>}
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                      app.interviewStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                      app.interviewStatus === 'Scheduled' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                      app.interviewStatus === 'Cancelled' ? 'bg-red-50 text-red-600 border border-red-100' :
                                      'bg-gray-50 text-gray-550 border border-gray-100'
                                    }`}>
                                      {app.interviewStatus || 'Pending'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                      app.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                      app.status === 'Under Review' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                      app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                      app.status === 'Interview Scheduled' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                      app.status === 'Selected' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                                      app.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-100' :
                                      'bg-gray-100 text-gray-600'
                                    }`}>
                                      {app.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-xs text-gray-400 whitespace-nowrap">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="py-4 px-4 text-right">
                                    <div className="flex justify-end gap-1">
                                      <button
                                        onClick={() => openAppDetails(app)}
                                        className="text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors"
                                      >
                                        Manage
                                      </button>
                                      <button
                                        onClick={() => handleDeleteApplication(app._id)}
                                        className="text-gray-400 hover:text-red-500 p-1 rounded"
                                        title="Delete Application"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="11" className="py-12 text-center text-gray-400 font-medium">
                                  No candidate applications found matching the search/filters.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. CANDIDATE PIPELINE KANBAN */}
                {activeSubTab === 'pipeline' && (
                  <div className="space-y-4 h-full flex flex-col">
                    <div>
                      <h1 className="text-lg font-bold text-gray-905">Recruitment Funnel Pipeline</h1>
                      <p className="text-xs text-gray-500 mt-0.5">Visual mapping of candidates across different verification stages.</p>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin flex-1" style={{ minHeight: '550px' }}>
                      {STATUS_OPTIONS.map(status => {
                        const statusApps = filteredApps.filter(a => a.status === status);
                        return (
                          <div key={status} className="w-72 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col p-3 shrink-0">
                            
                            {/* Column Header */}
                            <div className="flex justify-between items-center mb-3 px-1">
                              <span className="text-[10px] font-bold text-gray-650 uppercase tracking-wider">{status}</span>
                              <span className="text-[9px] font-bold bg-white border border-gray-200 text-gray-550 px-2 py-0.5 rounded-full shadow-xs">
                                {statusApps.length}
                              </span>
                            </div>

                            {/* Cards Stack */}
                            <div className="flex-1 space-y-2.5 overflow-y-auto">
                              {statusApps.map(app => (
                                <div
                                  key={app._id}
                                  className="p-3 bg-white border border-gray-155 rounded-xl hover:border-blue-500 shadow-xs hover:shadow-sm cursor-pointer transition-all flex flex-col gap-2 group relative"
                                >
                                  <div onClick={() => openAppDetails(app)}>
                                    <h4 className="font-bold text-xs text-gray-900 leading-tight group-hover:text-blue-600">{app.fullName}</h4>
                                    <p className="text-[9px] text-gray-500 font-semibold mt-1">{app.jobTitle}</p>
                                  </div>

                                  <div className="flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-50 pt-2">
                                    {/* Action arrows to move candidate stage quickly */}
                                    <div className="flex gap-1.5 shrink-0">
                                      <button 
                                        title="Move Backward"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const prevIdx = STATUS_OPTIONS.indexOf(status) - 1;
                                          if (prevIdx >= 0) handleUpdateApplication(app._id, { status: STATUS_OPTIONS[prevIdx] });
                                        }}
                                        className="p-0.5 border border-gray-200 hover:bg-gray-100 rounded text-gray-500 text-[8px]"
                                      >
                                        &larr;
                                      </button>
                                      <button 
                                        title="Move Forward"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const nextIdx = STATUS_OPTIONS.indexOf(status) + 1;
                                          if (nextIdx < STATUS_OPTIONS.length) handleUpdateApplication(app._id, { status: STATUS_OPTIONS[nextIdx] });
                                        }}
                                        className="p-0.5 border border-gray-200 hover:bg-gray-100 rounded text-gray-500 text-[8px]"
                                      >
                                        &rarr;
                                      </button>
                                    </div>
                                    <span>📅 {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                </div>
                              ))}
                              {statusApps.length === 0 && (
                                <div className="border border-dashed border-gray-200 rounded-xl py-8 text-center text-[10px] text-gray-400 font-semibold bg-white/20">
                                  No candidates
                                </div>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 8. RESUME DATABASE */}
                {activeSubTab === 'resume_db' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Resume Repository & Parser</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Simulate indexing and parsing of PDF resume files into candidate schema.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Uploader Card */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs h-fit space-y-4">
                        <h3 className="text-xs font-bold text-gray-850 uppercase tracking-widest pb-1.5 border-b border-gray-50">Upload Resumes</h3>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors relative cursor-pointer">
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeSimUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                          />
                          <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                          <span className="text-xs font-bold text-gray-700 block">Drag & Drop Resume PDF</span>
                          <span className="text-[10px] text-gray-450 block mt-1">Files up to 10MB (.pdf, .doc)</span>
                        </div>

                        {/* Parsing queues */}
                        {uploadQueue.length > 0 && (
                          <div className="space-y-2.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase block">Processing Status</span>
                            {uploadQueue.map((file, idx) => (
                              <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs font-semibold">
                                <div>
                                  <p className="font-bold text-gray-800 truncate max-w-[150px]">{file.name}</p>
                                  <p className="text-[10px] text-gray-400">{file.size}</p>
                                </div>
                                <span className={`text-[10px] font-bold ${
                                  file.status === 'Completed' ? 'text-emerald-600' : 'text-blue-600 animate-pulse'
                                }`}>
                                  {file.status}
                                </span>
                              </div>
                            ))}
                            {parsingProgress !== null && (
                              <div className="w-full bg-gray-150 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600" style={{ width: `${parsingProgress}%` }}></div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Resumes List */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase border-b border-gray-100">
                            <tr>
                              <th className="py-3 px-4">Candidate Name</th>
                              <th className="py-3 px-4">Skills Extracted</th>
                              <th className="py-3 px-4">Rating</th>
                              <th className="py-3 px-4">Date Added</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                            {filteredApps.map((app) => (
                              <tr key={app._id} className="hover:bg-gray-50/50">
                                <td className="py-3 px-4">
                                  <h4 className="font-bold text-gray-900">{app.fullName}</h4>
                                  <span className="text-[9px] text-gray-400">{app.email}</span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1 max-w-[250px]">
                                    <span className="text-[8px] bg-slate-100 text-slate-655 px-1.5 py-0.5 rounded font-black">JS</span>
                                    <span className="text-[8px] bg-slate-100 text-slate-655 px-1.5 py-0.5 rounded font-black">React</span>
                                    <span className="text-[8px] bg-slate-100 text-slate-655 px-1.5 py-0.5 rounded font-black">API</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-0.5 text-amber-400">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill={s <= (app.rating || 0) ? "currentColor" : "none"} />)}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-gray-400 font-normal">{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-right">
                                  {app.resume ? (
                                    <a 
                                      href={app.resume.startsWith('http') ? app.resume : `${API}${app.resume.startsWith('/') ? '' : '/'}${app.resume}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded hover:underline"
                                    >
                                      Preview PDF
                                    </a>
                                  ) : (
                                    <span className="text-gray-400 text-[10px]">No File</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                )}

                {/* 9. INTERVIEW MANAGEMENT */}
                {activeSubTab === 'interviews' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-905">Interview Scheduling & Loops</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Coordinate tech rounds, schedule invites, and simulate collaborative live assessments.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs p-5 space-y-4">
                      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Active Interview Queue</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                            <tr>
                              <th className="py-3 px-4">Candidate Name</th>
                              <th className="py-3 px-4">Target Position</th>
                              <th className="py-3 px-4">Schedule Date/Time</th>
                              <th className="py-3 px-4">Assigned HR</th>
                              <th className="py-3 px-4">Interview Mode</th>
                              <th className="py-3 px-4 text-right font-bold">Assessments Simulator</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                            {filteredApps.filter(a => a.status === 'Interview Scheduled' || a.interviewDate).map(app => (
                              <tr key={app._id} className="hover:bg-gray-50/50">
                                <td className="py-3.5 px-4 font-bold text-gray-900">{app.fullName}</td>
                                <td className="py-3.5 px-4 text-slate-800">{app.jobTitle}</td>
                                <td className="py-3.5 px-4 text-indigo-650 font-bold">{app.interviewDate} at {app.interviewTime || 'N/A'}</td>
                                <td className="py-3.5 px-4">{app.assignedHR || 'Anita Verma'}</td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-650">Google Meet</span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    onClick={() => launchInterviewSimulator(app)}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                                  >
                                    Start Live Interview Room
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {filteredApps.filter(a => a.status === 'Interview Scheduled' || a.interviewDate).length === 0 && (
                              <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-400 font-semibold">No interviews currently scheduled. Use "Applications Management" to schedule rounds.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. HR COMMUNICATION CENTER */}
                {activeSubTab === 'comms_center' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">HR Communication Center</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Centralized logs of outbound emails, sms, and WhatsApp alerts sent to candidates.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Compose console */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs h-fit space-y-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest pb-1 border-b border-gray-50 font-black">Compose Broadcast</h3>
                        
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-455 uppercase mb-1">Select Candidate</label>
                            <select 
                              onChange={(e) => {
                                const app = applications.find(a => a._id === e.target.value);
                                if (app) openAppDetails(app);
                              }}
                              className="w-full p-2 border border-gray-200 rounded-xl bg-white font-semibold text-gray-700"
                            >
                              <option value="">-- Choose Candidate --</option>
                              {applications.map(a => <option key={a._id} value={a._id}>{a.fullName} ({a.jobTitle})</option>)}
                            </select>
                          </div>
                          
                          <p className="text-[10px] text-gray-400 leading-normal">
                            Note: To compose a personalized communication log, select the candidate from the table and open the "Communication Hub" tab.
                          </p>
                        </div>
                      </div>

                      {/* Broadcast Outbox History */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xs p-5 space-y-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest font-black font-sans">Outbox Transmission Log</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                          {applications.flatMap(a => (a.communicationLogs || []).map(log => ({ ...log, candidateName: a.fullName, jobTitle: a.jobTitle }))).length > 0 ? (
                            applications.flatMap(a => (a.communicationLogs || []).map(log => ({ ...log, candidateName: a.fullName, jobTitle: a.jobTitle })))
                              .sort((a,b) => new Date(b.sentAt) - new Date(a.sentAt))
                              .map((log, idx) => (
                                <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs space-y-1.5 font-semibold">
                                  <div className="flex justify-between items-center text-[9px]">
                                    <span className="font-black text-blue-650 uppercase tracking-wider">{log.type}</span>
                                    <span className="text-gray-400">{new Date(log.sentAt).toLocaleString()}</span>
                                  </div>
                                  <h4 className="font-bold text-gray-850">To: {log.candidateName} <span className="font-medium text-gray-450">({log.jobTitle})</span></h4>
                                  <p className="text-gray-600 whitespace-pre-line bg-white p-2 rounded border border-gray-100 font-semibold">{log.message}</p>
                                  <div className="text-[9px] text-gray-450 font-bold text-right">Transmitted By: {log.sender}</div>
                                </div>
                              ))
                          ) : (
                            <p className="text-xs text-gray-450 text-center py-12">No outbox items currently logged in the workspace.</p>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 11. SHORTLISTED CANDIDATES */}
                {activeSubTab === 'shortlisted' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Shortlisted Candidates Workspace</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Quickly coordinate technical interview scheduling and recruiter ratings for shortlisted talent.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Candidate Name</th>
                            <th className="py-3 px-4">Role Applied</th>
                            <th className="py-3 px-4">Classification</th>
                            <th className="py-3 px-4">Recruiter Rating</th>
                            <th className="py-3 px-4 text-right">Interview Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                          {applications.filter(a => a.status === 'Shortlisted').map(app => (
                            <tr key={app._id} className="hover:bg-gray-55/50">
                              <td className="py-3.5 px-4">
                                <h4 className="font-bold text-gray-900">{app.fullName}</h4>
                                <span className="text-[9px] text-gray-400">{app.email}</span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-800">{app.jobTitle}</td>
                              <td className="py-3.5 px-4 font-normal">
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{app.category}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex gap-0.5 text-amber-400">
                                  {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= (app.rating || 0) ? "currentColor" : "none"} />)}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => openAppDetails(app)}
                                  className="px-3.5 py-1.5 bg-indigo-600 text-white hover:bg-indigo-755 rounded-xl text-xs font-bold cursor-pointer"
                                >
                                  Setup Interview Date
                                </button>
                              </td>
                            </tr>
                          ))}
                          {applications.filter(a => a.status === 'Shortlisted').length === 0 && (
                            <tr>
                              <td colSpan="5" className="py-8 text-center text-gray-400 font-semibold">No candidates currently in "Shortlisted" state.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 12. HIRING & ONBOARDING */}
                {activeSubTab === 'onboarding' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Hiring, Document Verification & Offer Management</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Track document verification status and release legally binding employment offer letters.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs p-5 space-y-4">
                      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest font-black">Candidate Verification Pipeline</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                            <tr>
                              <th className="py-3 px-4">Candidate Name</th>
                              <th className="py-3 px-4">Role Offered</th>
                              <th className="py-3 px-4">Documents Verified</th>
                              <th className="py-3 px-4">Offer Letter Status</th>
                              <th className="py-3 px-4 text-right">Release / Verify Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                            {applications.filter(a => a.status === 'Selected' || a.status === 'HR Discussion').map(app => (
                              <tr key={app._id} className="hover:bg-gray-50/50">
                                <td className="py-3.5 px-4 font-bold text-gray-900">{app.fullName}</td>
                                <td className="py-3.5 px-4 text-slate-800">{app.jobTitle}</td>
                                <td className="py-3.5 px-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    app.documentVerificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                  }`}>
                                    {app.documentVerificationStatus || 'Pending Verification'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    app.offerLetterStatus === 'Accepted' ? 'bg-teal-50 text-teal-650' :
                                    app.offerLetterStatus === 'Sent' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-555'
                                  }`}>
                                    {app.offerLetterStatus || 'Not Sent'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    onClick={() => openAppDetails(app)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
                                  >
                                    Verify Documents & Release
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {applications.filter(a => a.status === 'Selected' || a.status === 'HR Discussion').length === 0 && (
                              <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-400 font-semibold">No candidates currently awaiting onboarding. Use "Candidate Pipeline" to select talent.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 13. STAFF REGISTRATION */}
                {activeSubTab === 'staff_registration' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Selected Candidate Staff Registration</h1>
                        <p className="text-xs text-gray-555 mt-0.5">Register hired candidates whose offers have been accepted directly into the WMS workforce.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Registration Form */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs h-fit space-y-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest pb-1.5 border-b border-gray-50 font-black">Workforce Onboarding Form</h3>
                        
                        <form onSubmit={handleStaffRegisterSubmit} className="space-y-3.5 text-xs font-sans">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Select Selected Candidate</label>
                            <select 
                              value={staffRegistrationForm.candidateId}
                              onChange={(e) => {
                                const val = e.target.value;
                                const cand = applications.find(a => a._id === val);
                                if (cand) {
                                  setStaffRegistrationForm(prev => ({
                                    ...prev,
                                    candidateId: val,
                                    employeeId: `EMP-WMS-2026-${String(val).slice(-4).toUpperCase()}`
                                  }));
                                }
                              }}
                              className="w-full p-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-gray-700"
                              required
                            >
                              <option value="">-- Choose Hired Candidate --</option>
                              {selectedCandidates.map(c => (
                                <option key={c._id} value={c._id}>{c.fullName} ({c.jobTitle})</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-455 uppercase mb-1">Generated Employee ID</label>
                            <input 
                              type="text"
                              value={staffRegistrationForm.employeeId}
                              readOnly
                              className="w-full p-2.5 border border-gray-200 bg-gray-50 rounded-xl font-mono text-gray-800 font-bold outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-455 uppercase mb-1">System Access Role</label>
                            <select 
                              value={staffRegistrationForm.roleAccess}
                              onChange={e => setStaffRegistrationForm({ ...staffRegistrationForm, roleAccess: e.target.value })}
                              className="w-full p-2.5 border border-gray-200 rounded-xl bg-white font-bold text-gray-700"
                            >
                              <option>Operations Executive</option>
                              <option>HR Executive</option>
                              <option>Sales Executive</option>
                              <option>Compliance Executive</option>
                              <option>Technical Manager</option>
                              <option>Project Coordinator</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-455 uppercase mb-1">Joining Date</label>
                              <input 
                                type="date" 
                                value={staffRegistrationForm.joiningDate}
                                onChange={e => setStaffRegistrationForm({ ...staffRegistrationForm, joiningDate: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-xl font-semibold bg-white text-gray-700"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-455 uppercase mb-1">Work Shift</label>
                              <select 
                                value={staffRegistrationForm.workShift}
                                onChange={e => setStaffRegistrationForm({ ...staffRegistrationForm, workShift: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-xl font-semibold bg-white text-gray-700"
                              >
                                <option>General Shift</option>
                                <option>Night Shift</option>
                                <option>Rotational Shift</option>
                              </select>
                            </div>
                          </div>

                          <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl text-xs font-bold transition-all shadow-xs">
                            Commit Registration & Generate Credentials
                          </button>
                        </form>
                      </div>

                      {/* Staff Directory Preview */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xs p-5 space-y-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest font-black font-sans">Candidates Pending Staff Code</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                              <tr>
                                <th className="py-2.5 px-3">Candidate Name</th>
                                <th className="py-2.5 px-3">Role Offer</th>
                                <th className="py-2.5 px-3">Category</th>
                                <th className="py-2.5 px-3">Offer Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                              {selectedCandidates.map(c => (
                                <tr key={c._id} className="hover:bg-gray-50/50">
                                  <td className="py-3 px-3 font-bold text-gray-900">{c.fullName}</td>
                                  <td className="py-3 px-3 text-slate-800">{c.jobTitle}</td>
                                  <td className="py-3 px-3 text-gray-550">{c.category}</td>
                                  <td className="py-3 px-3">
                                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-600 font-mono">ACCEPTED</span>
                                  </td>
                                </tr>
                              ))}
                              {selectedCandidates.length === 0 && (
                                <tr>
                                  <td colSpan="4" className="py-6 text-center text-gray-400 font-semibold">No candidates currently pending staff registration.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 14. RECRUITMENT ANALYTICS */}
                {activeSubTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Advanced Recruitment Analytics Hub</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Interact with quarterly candidate ingestion, interview pass loops, and channels ROI.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Application Growth */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Historical Application Traffic</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendsData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} />
                              <YAxis stroke="#9ca3af" fontSize={10} />
                              <Tooltip />
                              <Area name="Volume" type="monotone" dataKey="ThisWeek" stroke="#1e5cdc" fill="#1e5cdc" fillOpacity={0.15} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Success rate by department bar chart */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Recruitment Lead Time by Department (Days)</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={deptData.slice(0, 5)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                              <YAxis stroke="#9ca3af" fontSize={10} />
                              <Tooltip />
                              <Bar name="Avg Days to Hire" dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]}>
                                {deptData.map((e, i) => <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />)}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 15. DEPARTMENT HIRING */}
                {activeSubTab === 'dept_hiring' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Department Headcount Targets</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Coordinate corporate priority parameters and view vacancies progress per vertical.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="py-3.5 px-4">Department / Vertical</th>
                            <th className="py-3.5 px-4">Hiring Target Headcount</th>
                            <th className="py-3.5 px-4">Current Active Postings</th>
                            <th className="py-3.5 px-4">Current Recruiter Lead</th>
                            <th className="py-3.5 px-4">Priority Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                          {departmentHiring.map((dept, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="py-3.5 px-4">
                                <h4 className="font-bold text-gray-900">{dept.department}</h4>
                                <span className="text-[9px] text-gray-400">Budget: {dept.budgetCode}</span>
                              </td>
                              <td className="py-3.5 px-4 text-sm font-bold text-gray-800">{dept.targetHeadcount} Open Roles</td>
                              <td className="py-3.5 px-4">{dept.currentFilled} Active Listings</td>
                              <td className="py-3.5 px-4 text-indigo-650">{dept.recruiterLead}</td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold ${
                                  dept.priority === 'High' ? 'bg-red-50 text-red-650' :
                                  dept.priority === 'Medium' ? 'bg-amber-50 text-amber-650' : 'bg-gray-100 text-gray-500'
                                }`}>
                                  {dept.priority}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button 
                                  onClick={() => {
                                    const newTarget = parseInt(prompt(`Enter new headcount target for ${dept.department}:`, dept.targetHeadcount.toString()));
                                    if (!isNaN(newTarget)) {
                                      setDepartmentHiring(prev => prev.map((d, i) => i === idx ? { ...d, targetHeadcount: newTarget } : d));
                                      showToast("Headcount target updated.");
                                    }
                                  }}
                                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                >
                                  Modify Target
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 16. EMPLOYEE REFERRALS */}
                {activeSubTab === 'referrals' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Employee Referral Program Log</h1>
                        <p className="text-xs text-gray-555 mt-0.5">Verify candidate referral connections, track payout bonus status and payouts history.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                          <tr>
                            <th className="py-3 px-4">Ref Code</th>
                            <th className="py-3 px-4">Referring Employee</th>
                            <th className="py-3 px-4">Candidate Name</th>
                            <th className="py-3 px-4">Target Position</th>
                            <th className="py-3 px-4">Application Status</th>
                            <th className="py-3 px-4">Bonus Payout Amount</th>
                            <th className="py-3 px-4 text-right">Payout Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                          {referrals.map(ref => (
                            <tr key={ref.id} className="hover:bg-gray-50/50">
                              <td className="py-3.5 px-4 font-mono font-black text-slate-500">{ref.id}</td>
                              <td className="py-3.5 px-4 font-bold">{ref.referrer}</td>
                              <td className="py-3.5 px-4 text-gray-900">{ref.candidate}</td>
                              <td className="py-3.5 px-4 text-gray-500">{ref.position}</td>
                              <td className="py-3.5 px-4">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  ref.status === 'Hired' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                  ref.status === 'Offered' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 
                                  ref.status === 'Rejected' ? 'bg-red-50 text-red-650' : 'bg-amber-50 text-amber-650'
                                }`}>
                                  {ref.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-black text-indigo-650">{ref.bonus}</td>
                              <td className="py-3.5 px-4 text-right">
                                <span className={ref.payoutDate === 'Pending' ? 'text-amber-500 animate-pulse' : 'text-gray-400 font-normal'}>
                                  {ref.payoutDate}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 17. CAREER PORTAL SETTINGS */}
                {activeSubTab === 'settings' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h1 className="text-lg font-bold text-gray-900">Career Portal Configuration Settings</h1>
                      <p className="text-xs text-gray-555 mt-0.5">Edit styling, allowed file extensions, and applicant workflow limitations on frontend board.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6 text-xs font-semibold text-gray-700">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Career Board Title</label>
                          <input 
                            type="text"
                            value={portalSettings.title}
                            onChange={e => setPortalSettings({ ...portalSettings, title: e.target.value })}
                            className="w-full p-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Recruitment Contact Mail</label>
                          <input 
                            type="email"
                            value={portalSettings.contactEmail}
                            onChange={e => setPortalSettings({ ...portalSettings, contactEmail: e.target.value })}
                            className="w-full p-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-gray-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Portal Description & SEO Keywords</label>
                        <textarea
                          rows={3}
                          value={portalSettings.description}
                          onChange={e => setPortalSettings({ ...portalSettings, description: e.target.value })}
                          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white outline-none font-semibold leading-relaxed text-gray-700"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-50">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Allowed Resume Extensions</label>
                          <input 
                            type="text"
                            value={portalSettings.allowedFileFormats}
                            onChange={e => setPortalSettings({ ...portalSettings, allowedFileFormats: e.target.value })}
                            className="w-full p-2 border border-gray-200 rounded-xl bg-white font-bold text-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Max Upload File Size (MB)</label>
                          <input 
                            type="number"
                            value={portalSettings.maxFileSizeMb}
                            onChange={e => setPortalSettings({ ...portalSettings, maxFileSizeMb: parseInt(e.target.value) })}
                            className="w-full p-2 border border-gray-200 rounded-xl bg-white font-bold text-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Auto-Shortlist rating min threshold</label>
                          <select 
                            value={portalSettings.autoShortlistMinScore}
                            onChange={e => setPortalSettings({ ...portalSettings, autoShortlistMinScore: parseInt(e.target.value) })}
                            className="w-full p-2 border border-gray-200 rounded-xl bg-white font-bold text-gray-700"
                          >
                            <option>3</option><option>4</option><option>5</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div>
                          <span className="font-bold text-gray-800 block">Allow Candidate Submissions</span>
                          <span className="text-[10px] text-gray-400 block font-normal">If deactivated, job forms show "Applications Closed" status labels.</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={portalSettings.allowUploads}
                          onChange={e => setPortalSettings({ ...portalSettings, allowUploads: e.target.checked })}
                          className="accent-blue-600 w-5 h-5 cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={() => showToast("Hiring board settings saved.")}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-750 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                      >
                        Save Settings
                      </button>

                    </div>
                  </div>
                )}

                {/* 18. WORKFLOW AUTOMATION */}
                {activeSubTab === 'workflow_automation' && (
                  <div className="space-y-6 max-w-3xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Workflow Automation Center</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Toggle and configure trigger-action rules for automated HR correspondence.</p>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-5">
                      <h3 className="text-xs font-bold text-gray-855 uppercase tracking-widest pb-1.5 border-b border-gray-50">Active Action Rules</h3>
                      
                      <div className="space-y-3.5">
                        {automations.map((rule, idx) => (
                          <div key={rule.id} className="p-3.5 bg-gray-50 border border-gray-150 rounded-xl flex justify-between items-center gap-4 text-xs font-semibold">
                            <div className="space-y-1">
                              <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">Trigger</span>
                              <p className="text-gray-905 font-bold">{rule.trigger}</p>
                              <span className="text-[9px] font-black text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider block w-fit mt-1">Action</span>
                              <p className="text-gray-600">{rule.action}</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={rule.active}
                              onChange={(e) => {
                                setAutomations(prev => prev.map((item, i) => i === idx ? { ...item, active: e.target.checked } : item));
                                showToast(`Automation rule status updated.`);
                              }}
                              className="accent-blue-600 w-5 h-5 cursor-pointer shrink-0"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Add rule simulation */}
                      <div className="pt-4 border-t border-gray-150 space-y-3.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Add Automation Rule</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Select Trigger Event</label>
                            <select 
                              value={newAutoTrigger} 
                              onChange={e => setNewAutoTrigger(e.target.value)}
                              className="w-full p-2 border border-gray-200 rounded-xl bg-white font-bold text-gray-700"
                            >
                              <option>On Application Shortlisted</option>
                              <option>On Technical Assessment Passed</option>
                              <option>On Document Verification Verified</option>
                              <option>On Offer Accepted</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-455 uppercase mb-1">Define Immediate Action Text</label>
                            <input 
                              type="text" 
                              required
                              placeholder="E.g. Send SMS reminder..." 
                              value={newAutoAction} 
                              onChange={e => setNewAutoAction(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none font-medium bg-gray-50 focus:bg-white text-gray-700"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!newAutoAction.trim()) return;
                            const newRule = {
                              id: `auto-${Date.now()}`,
                              trigger: newAutoTrigger,
                              action: newAutoAction.trim(),
                              active: true
                            };
                            setAutomations(prev => [...prev, newRule]);
                            setNewAutoAction('');
                            showToast("Workflow rule added.");
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-750 transition-colors shadow-xs"
                        >
                          Register Automation Rule
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* 19. REPORTS & EXPORT */}
                {activeSubTab === 'reports_export' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Enterprise Reports & Export Panel</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Download filtered audit sheets, view transmission histories, and inspect access logs.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Filter Downloader */}
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs h-fit space-y-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest pb-1 border-b border-gray-50 font-black">Export Formats</h3>
                        
                        <div className="space-y-3.5 text-xs">
                          <div>
                            <span className="font-bold text-gray-700 block">Select Fields to Include</span>
                            <div className="grid grid-cols-2 gap-2 mt-2 font-semibold">
                              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-blue-600" /> Candidate Name</label>
                              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-blue-600" /> Phone/Email</label>
                              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-blue-600" /> Interview Loop</label>
                              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-blue-600" /> Offer Status</label>
                              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="accent-blue-600" /> Categories</label>
                              <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-blue-600" /> HR Notes Log</label>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-50 space-y-2">
                            <span className="font-bold text-gray-700 block">Download Sheet</span>
                            <button
                              onClick={exportReports}
                              className="w-full py-2 bg-blue-600 hover:bg-blue-755 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <FileSpreadsheet size={15} /> Export Selected Database
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Export Audit Logs */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-xs p-5 space-y-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest font-black">Export Activity Logs</h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                              <tr>
                                <th className="py-2.5 px-3">Log ID</th>
                                <th className="py-2.5 px-3">Authorized Admin</th>
                                <th className="py-2.5 px-3">Format Type</th>
                                <th className="py-2.5 px-3">Scope Filter</th>
                                <th className="py-2.5 px-3">Records Count</th>
                                <th className="py-2.5 px-3 text-right">Date/Time</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                              {exportLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50/50">
                                  <td className="py-3 px-3 font-mono font-black text-slate-500">{log.id}</td>
                                  <td className="py-3 px-3">{log.adminName}</td>
                                  <td className="py-3 px-3 font-black text-blue-650">{log.fileType}</td>
                                  <td className="py-3 px-3 text-gray-500">{log.range}</td>
                                  <td className="py-3 px-3">{log.recordsCount} Rows</td>
                                  <td className="py-3 px-3 text-right text-gray-400 font-normal">{log.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </>
            )}
          </div>

        </main>
      </div>

      {/* ─── JOB MODAL (CREATE / EDIT) ─── */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">{editingJob ? 'Edit Job Posting' : 'Post New Job'}</h2>
              <button onClick={() => setJobModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleJobSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto font-sans">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Job Title</label>
                <input required type="text" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700" placeholder="E.g. Full Stack Developer" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Category / Department</label>
                  <select value={jobForm.department} onChange={e => setJobForm({ ...jobForm, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white font-semibold text-gray-750">
                    {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Type</label>
                  <select value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white font-semibold text-gray-700">
                    <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Location</label>
                <input required type="text" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700" placeholder="E.g. Remote / Bengaluru" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Start Date</label>
                  <input type="date" value={jobForm.startDate} onChange={e => setJobForm({ ...jobForm, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white font-semibold text-gray-700" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Close Date</label>
                  <input type="date" value={jobForm.endDate} onChange={e => setJobForm({ ...jobForm, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white font-semibold text-gray-700" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Job ID / Code</label>
                <input type="text" value={jobForm.jobId} onChange={e => setJobForm({ ...jobForm, jobId: e.target.value })} className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold text-gray-700" placeholder="E.g. JB-TECH-001" />
              </div>

              {/* Skills Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Required Skills Chips</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {jobForm.tags.map(skill => (
                    <span key={skill} className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-150 px-2.5 py-0.5 rounded-full">
                      {skill}
                      <button type="button" onClick={() => setJobForm({ ...jobForm, tags: jobForm.tags.filter(s => s !== skill) })} className="hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 font-sans">
                  <input
                    type="text"
                    placeholder="Type skill and press Enter"
                    value={customSkill}
                    onChange={e => setCustomSkill(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = customSkill.trim();
                        if (val && !jobForm.tags.includes(val)) {
                          setJobForm({ ...jobForm, tags: [...jobForm.tags, val] });
                          setCustomSkill('');
                        }
                      }
                    }}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs outline-none text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = customSkill.trim();
                      if (val && !jobForm.tags.includes(val)) {
                        setJobForm({ ...jobForm, tags: [...jobForm.tags, val] });
                        setCustomSkill('');
                      }
                    }}
                    className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-650 rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3.5">
                <button type="button" onClick={() => setJobModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── JOB BIO / DESCRIPTIONS MODAL ─── */}
      {bioModalOpen && bioJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-indigo-50/40 font-sans">
              <div>
                <h2 className="text-base font-bold text-gray-800">Job Bio / Requirements</h2>
                <p className="text-xs text-gray-550 mt-0.5">{bioJob.title}</p>
              </div>
              <button onClick={() => setBioModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleBioSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto font-sans">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Roles & Responsibilities (one per line)</label>
                <textarea rows={3} value={bioForm.roles} onChange={e => setBioForm({ ...bioForm, roles: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700" placeholder="Build responsive components...&#10;Write clean unit tests..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Required Skills (comma-separated)</label>
                <input type="text" value={bioForm.skills} onChange={e => setBioForm({ ...bioForm, skills: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none font-semibold text-gray-700" placeholder="React, Node.js, Express" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Qualification</label>
                  <input type="text" value={bioForm.qualification} onChange={e => setBioForm({ ...bioForm, qualification: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none font-semibold text-gray-700" placeholder="B.Tech, B.E., MCA" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Experience Required</label>
                  <input type="text" value={bioForm.experience} onChange={e => setBioForm({ ...bioForm, experience: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none font-semibold text-gray-700" placeholder="2-4 years" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Salary Range / Compensation</label>
                <input type="text" value={bioForm.salary} onChange={e => setBioForm({ ...bioForm, salary: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none font-semibold text-gray-700" placeholder="₹10L - ₹15L P.A." />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Additional Benefits (one per line)</label>
                <textarea rows={2} value={bioForm.benefits} onChange={e => setBioForm({ ...bioForm, benefits: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700" placeholder="Health Insurance&#10;Work From Home allowance" />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 font-sans">
                <button type="button" onClick={() => setBioModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-sm font-semibold">
                  {submitting ? 'Saving...' : 'Save Bio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── CANDIDATE APPLICATIONS DETAIL PANEL ─── */}
      {detailModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-200 animate-out fade-out zoom-out" style={{ maxHeight: '85vh' }}>
            
            {/* Modal Left Sidebar: Candidate Card Info */}
            <div className="w-full md:w-80 bg-gray-50 border-r border-gray-100 p-5 shrink-0 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2.5 bg-blue-105 text-blue-600 rounded-xl">
                    <UserCheck size={24} />
                  </span>
                  
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    selectedApp.status === 'New' ? 'bg-blue-100 text-blue-600' :
                    selectedApp.status === 'Selected' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {selectedApp.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">{selectedApp.fullName}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-1">{selectedApp.jobTitle}</p>
                <span className="text-[10px] text-gray-400 font-medium">Applied: {new Date(selectedApp.createdAt).toLocaleDateString()}</span>

                {/* Subcategories labels */}
                <div className="mt-4 space-y-2">
                  <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Classification</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">{selectedApp.category}</span>
                    {selectedApp.subcategory && <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">{selectedApp.subcategory}</span>}
                  </div>
                </div>

                <div className="mt-6 space-y-3.5 text-xs text-gray-600 font-semibold">
                  <div className="flex gap-2"><span>📧</span><span className="truncate">{selectedApp.email}</span></div>
                  {selectedApp.phone && <div className="flex gap-2"><span>📱</span><span>{selectedApp.phone}</span></div>}
                </div>

                {/* Star rating */}
                <div className="mt-6">
                  <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Candidate Rating</div>
                  <div className="flex gap-1.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setCandidateRating(star);
                          handleUpdateApplication(selectedApp._id, { rating: star });
                        }}
                        className="hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star size={18} fill={star <= candidateRating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions & details footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 space-y-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Assign Owner (HR)</label>
                  <select
                    value={selectedApp.assignedHR || ''}
                    onChange={(e) => handleUpdateApplication(selectedApp._id, { assignedHR: e.target.value })}
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                  >
                    <option value="">Unassigned</option>
                    <option value="Anita Verma">Anita Verma</option>
                    <option value="Rohit Mehta">Rohit Mehta</option>
                    <option value="Neha Gupta">Neha Gupta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Stage Action</label>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleUpdateApplication(selectedApp._id, { status: e.target.value })}
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Right Area: Tabs and detailed actions */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              
              {/* Tabs list */}
              <div className="flex border-b border-gray-100 bg-gray-50/50 font-sans">
                {[
                  { id: 'profile', icon: <UserCheck size={15} />, label: 'Profile & Notes' },
                  { id: 'interview', icon: <Calendar size={15} />, label: 'Interview Scheduling' },
                  { id: 'communication', icon: <Mail size={15} />, label: 'Communication Hub' },
                  { id: 'onboarding', icon: <Award size={15} />, label: 'Onboarding & Verification' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id)}
                    className={`flex items-center gap-1.5 px-5 py-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                      activeDetailTab === tab.id
                        ? 'border-blue-650 text-blue-600 bg-white'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
                
                <button onClick={() => setDetailModalOpen(false)} className="ml-auto p-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              {/* Tab Contents Viewport */}
              <div className="flex-1 p-6 overflow-y-auto">
                
                {/* 1. Tab Profile & Notes */}
                {activeDetailTab === 'profile' && (
                  <div className="space-y-5 font-sans">
                    {selectedApp.coverLetter && (
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Cover Letter / Candidate Pitch</h4>
                        <p className="text-xs text-slate-650 leading-relaxed font-semibold">{selectedApp.coverLetter}</p>
                      </div>
                    )}

                    <div className="flex gap-4 items-center font-bold">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Candidate Resume File</h4>
                      {selectedApp.resume ? (
                        <a
                          href={selectedApp.resume.startsWith('http') ? selectedApp.resume : `${API}${selectedApp.resume.startsWith('/') ? '' : '/'}${selectedApp.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-150 transition-colors"
                        >
                          <FileText size={14} /> Preview / Download Resume PDF
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-xl border border-red-150">Resume Missing</span>
                      )}
                    </div>

                    {/* HR Internal notes editor */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Internal Recruiter Notes</label>
                      <textarea
                        rows={5}
                        value={hrNoteInput}
                        onChange={(e) => setHrNoteInput(e.target.value)}
                        placeholder="Write candidate evaluation remarks, technical assessment results, background checks details..."
                        className="w-full p-3 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 font-semibold text-gray-755"
                      />
                      <button
                        onClick={saveInternalHrNotes}
                        className="flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-750 transition-colors"
                      >
                        Save HR notes
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Tab Interview Scheduling */}
                {activeDetailTab === 'interview' && (
                  <div className="space-y-5 max-w-md font-sans">
                    <h4 className="text-sm font-bold text-gray-800">Set Interview Schedule & Loops</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Interview Date</label>
                        <input
                          type="date"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs bg-white font-semibold text-gray-700"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Interview Time</label>
                        <input
                          type="time"
                          value={interviewTime}
                          onChange={(e) => setInterviewTime(e.target.value)}
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs bg-white font-semibold text-gray-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Interview Loop Status</label>
                        <select
                          value={interviewStatus}
                          onChange={(e) => setInterviewStatus(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white font-bold text-gray-700"
                        >
                          <option value="Pending">Pending Setup</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="Rescheduled">Rescheduled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        onClick={saveInterviewSchedule}
                        className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-705 rounded-xl text-xs font-bold transition-all"
                      >
                        Confirm Schedule & Update Stage
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Tab Communication Hub */}
                {activeDetailTab === 'communication' && (
                  <div className="space-y-6 font-sans">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Left: Compose Panel */}
                      <div className="space-y-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-150">
                        <div className="flex gap-2">
                          {['Email', 'WhatsApp'].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setCommsType(type)}
                              className={`px-4.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                commsType === type
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-600 border-gray-200'
                              }`}
                            >
                              {type === 'Email' ? <Mail size={13} className="inline mr-1" /> : <MessageSquare size={13} className="inline mr-1" />}
                              {type}
                            </button>
                          ))}
                        </div>

                        {commsType === 'Email' && (
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Select Template</label>
                            <select
                              value={emailTemplate}
                              onChange={(e) => setEmailTemplate(e.target.value)}
                              className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                            >
                              <option value="shortlist">Shortlist Notification</option>
                              <option value="interview">Interview Schedule details</option>
                              <option value="offer">Release Offer Letter</option>
                              <option value="reject">Rejection Update</option>
                            </select>
                          </div>
                        )}

                        {commsType === 'Email' && (
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject</label>
                            <input
                              type="text"
                              value={commsSubject}
                              onChange={(e) => setCommsSubject(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white font-semibold text-gray-700"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Message Body</label>
                          <textarea
                            rows={6}
                            value={commsMessage}
                            onChange={(e) => setCommsMessage(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-gray-700"
                          />
                        </div>

                        <button
                          onClick={sendCommunication}
                          className="flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-750 transition-colors shadow-xs"
                        >
                          <Send size={12} /> Send Outbox Message
                        </button>
                      </div>

                      {/* Right: History Timeline */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Communication logs & history</h4>
                        
                        <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                          {selectedApp.communicationLogs && selectedApp.communicationLogs.length > 0 ? (
                            selectedApp.communicationLogs.map((log, idx) => (
                              <div key={idx} className="p-3 bg-gray-50 border border-gray-150 rounded-xl relative text-xs">
                                <div className="flex justify-between items-center mb-1 text-[9px]">
                                  <span className={`font-black px-1.5 py-0.5 rounded ${
                                    log.type === 'Email' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-650'
                                  }`}>
                                    {log.type}
                                  </span>
                                  <span className="text-gray-400 font-semibold">{new Date(log.sentAt).toLocaleString()}</span>
                                </div>
                                <p className="text-gray-655 whitespace-pre-line mt-1 font-semibold">{log.message}</p>
                                <div className="text-[9px] text-gray-400 font-bold mt-1 text-right">Sender: {log.sender}</div>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-450 text-center py-8">No communication logged for this candidate.</p>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. Tab Onboarding & Verification */}
                {activeDetailTab === 'onboarding' && (
                  <div className="space-y-6 font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Document Checklist Verification */}
                      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-4">
                        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckSquare size={15} className="text-blue-600" /> Document Verification Checklist
                        </h4>
                        
                        <div className="space-y-3">
                          {[
                            { name: "Academic Degree Certificates" },
                            { name: "Prior Employment Experience Letters" },
                            { name: "Aadhar Card / PAN Card Verification" },
                            { name: "Relieving / Compensation Slips" }
                          ].map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-3 text-xs font-bold">
                              <span className="text-gray-700">{doc.name}</span>
                              <input type="checkbox" defaultChecked={idx < 2} className="accent-blue-600 w-4 h-4 cursor-pointer" />
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs font-bold">
                          <span className="text-gray-550">Status:</span>
                          <select
                            value={selectedApp.documentVerificationStatus || 'Pending'}
                            onChange={(e) => handleUpdateApplication(selectedApp._id, { documentVerificationStatus: e.target.value })}
                            className="p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold"
                          >
                            <option value="Pending">Pending Verification</option>
                            <option value="Verified">Verified</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>

                      {/* Offer Letter Management */}
                      <div className="bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100 space-y-4">
                        <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
                          <Award size={15} className="text-indigo-650" /> Offer Letter Release
                        </h4>
                        
                        <p className="text-xs text-slate-655 leading-relaxed font-semibold">
                          Release the final employment contracts and offer letters to candidates. Verify onboarding checklist is fully complete.
                        </p>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-700">Offer Letter Status:</span>
                            <select
                              value={selectedApp.offerLetterStatus || 'Not Sent'}
                              onChange={(e) => handleUpdateApplication(selectedApp._id, { offerLetterStatus: e.target.value })}
                              className="p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold"
                            >
                              <option value="Not Sent">Not Sent</option>
                              <option value="Sent">Sent to Candidate</option>
                              <option value="Accepted">Accepted by Candidate</option>
                              <option value="Declined">Declined / Withdrawn</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            handleUpdateApplication(selectedApp._id, { offerLetterStatus: 'Sent' });
                            showToast("Offer letter generated and released successfully.");
                          }}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Generate & Release Offer Letter
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── LIVE INTERVIEW SIMULATOR OVERLAY MODAL ─── */}
      {interviewSimulatorOpen && simulatedInterviewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col animate-in zoom-in duration-200">
            {/* Header */}
            <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-950 font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                <span className="font-mono text-xs font-bold tracking-wider text-slate-350">LIVE INTERVIEW STREAMING</span>
              </div>
              <h2 className="text-sm font-bold truncate max-w-[400px]">Candidate: {simulatedInterviewApp.fullName} | {simulatedInterviewApp.jobTitle}</h2>
              <button 
                onClick={() => setInterviewSimulatorOpen(false)} 
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Split Panel */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
              
              {/* Left Column: Code Editor + Webcam */}
              <div className="flex-1 flex flex-col min-h-0 p-4 gap-4">
                
                {/* Simulated Webcam */}
                <div className="h-44 bg-slate-955 border border-slate-800 rounded-xl relative overflow-hidden shrink-0 flex items-center justify-center font-sans">
                  <div className="absolute top-3 left-3 bg-slate-900/80 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest text-emerald-400 flex items-center gap-1.5 border border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    CAM FEED
                  </div>
                  
                  {/* Mock Webcam Face Grid */}
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-blue-500 mx-auto flex items-center justify-center text-slate-300 font-bold text-xl animate-pulse">
                      {simulatedInterviewApp.fullName[0]}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">{simulatedInterviewApp.fullName} (Developer)</span>
                    <div className="flex gap-2 justify-center text-slate-500">
                      <Mic size={14} className="text-emerald-500 animate-pulse" />
                      <Volume2 size={14} className="text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Collaborative Editor Panel */}
                <div className="flex-1 flex flex-col border border-slate-800 rounded-xl overflow-hidden min-h-0 bg-slate-950 font-mono text-xs">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-[10px] font-black tracking-widest text-slate-400">
                    <span>ASSESSMENT_EDITOR.JS</span>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                    </div>
                  </div>
                  <textarea 
                    value={simulatedCodeText}
                    onChange={(e) => setSimulatedCodeText(e.target.value)}
                    className="flex-1 p-4 bg-transparent text-emerald-400 font-mono text-xs outline-none resize-none leading-relaxed"
                  />
                </div>

              </div>

              {/* Right Column: Chat + Notes */}
              <div className="w-full md:w-80 border-l border-slate-800 flex flex-col min-h-0 p-4 gap-4 bg-slate-900 shrink-0">
                
                {/* Real-time chat logs */}
                <div className="flex-1 border border-slate-800 rounded-xl bg-slate-950 p-3 flex flex-col min-h-0 font-sans">
                  <span className="text-[9px] font-black text-slate-500 tracking-wider uppercase mb-2 block border-b border-slate-900 pb-1">Meeting Chat Logs</span>
                  
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar text-[11px] leading-relaxed">
                    {simulatedMessages.map((msg, i) => (
                      <div key={i} className="space-y-0.5">
                        <span className={`font-mono text-[9px] font-black uppercase tracking-wider block ${
                          msg.sender === 'Interviewer' ? 'text-blue-400' :
                          msg.sender === 'Candidate' ? 'text-emerald-400' : 'text-slate-500'
                        }`}>
                          {msg.sender}:
                        </span>
                        <p className="text-slate-350">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-1.5 border-t border-slate-900 pt-2 shrink-0">
                    <input 
                      type="text" 
                      placeholder="Ask candidate..." 
                      value={simMessageInput}
                      onChange={e => setSimMessageInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendSimMessage()}
                      className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-850 rounded text-[11px] outline-none text-white focus:border-slate-700 font-sans"
                    />
                    <button onClick={sendSimMessage} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded text-[10px] font-bold cursor-pointer">Send</button>
                  </div>
                </div>

                {/* Scorecards */}
                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs space-y-3 shrink-0 font-sans">
                  <span className="text-[9px] font-black text-slate-500 tracking-wider uppercase block">Assessment Action</span>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal font-sans">
                    Assess candidate's performance, algorithms logic, and verbal communications during the simulated round.
                  </p>
                  <button
                    onClick={completeSimulatedInterview}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black tracking-widest transition-colors cursor-pointer uppercase shadow-sm font-sans"
                  >
                    Finish Loop & Log Selection
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}

// Icon Sub-components to avoid export errors
function UsersRoundIcon({ size = 18, className = '' }) {
  return <Users size={size} className={className} />;
}

function HandshakeIcon({ size = 18, className = '' }) {
  return <Award size={size} className={className} />;
}

// Wrap the page component in the ErrorBoundary so crashes show a readable message
const AdminCareersWithBoundary = () => (
  <ErrorBoundary>
    <AdminCareers />
  </ErrorBoundary>
);

export default AdminCareersWithBoundary;

function MenuToggleIcon({ collapsed }) {
  return collapsed ? <ChevronRight size={16} /> : <ChevronRight className="rotate-180" size={16} />;
}
