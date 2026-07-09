import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  FileText, Users, Eye, ExternalLink, Copy, Check, Search, ClipboardList, Filter,
  ArrowUpRight, ArrowDownRight, Download, Plus, MoreHorizontal, Calendar, Mail, Phone,
  Activity, Clock, ChevronLeft, ChevronRight, BarChart2, PieChart as PieIcon, MapPin, Globe, Sparkles, Building,
  Trash2, X, BookOpen, Edit, LayoutDashboard, CheckCircle, Send, UserCheck, Star,
  Award, ShieldAlert, MessageSquare, RefreshCw, FileSpreadsheet, UserPlus, Bell, ChevronDown, CheckSquare, Settings, HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, AreaChart, Area, BarChart, Bar
} from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Standard Submission Categories (from the dashboard image)
const CATEGORIES = [
  { id: 'all', name: 'All Categories', color: '#64748b' },
  { id: 'General Communication', name: 'General Communication', color: '#1e5cdc' },
  { id: 'Careers & Recruitment', name: 'Careers & Recruitment', color: '#10b981' },
  { id: 'Partnerships & Business Network', name: 'Partnerships & Business Network', color: '#8b5cf6' },
  { id: 'Client Acquisition & Sales', name: 'Client Acquisition & Sales', color: '#3b82f6' },
  { id: 'Customer Support Services', name: 'Customer Support Services', color: '#f59e0b' },
  { id: 'Marketing & Engagement', name: 'Marketing & Engagement', color: '#ec4899' },
  { id: 'Events & Participation', name: 'Events & Participation', color: '#ef4444' },
  { id: 'CSR & Community Programs', name: 'CSR & Community Programs', color: '#06b6d4' }
];

const FORM_CATEGORIES = [
  { id: 'contact', name: 'Contact Inquiries', endpoint: 'contact', category: 'General' },
  { id: 'demo', name: 'Demo Requests', endpoint: 'demo', category: 'Sales' },
  { id: 'expert', name: 'Expert Consults', endpoint: 'expert', category: 'Sales' },
  { id: 'quote', name: 'Quote Requests', endpoint: 'quote', category: 'Sales' },
  { id: 'support', name: 'Support Tickets', endpoint: 'support', category: 'Support' },
  { id: 'partner', name: 'Partner Applications', endpoint: 'partner', category: 'Business' },
  { id: 'advisor', name: 'Advisor Applications', endpoint: 'advisor', category: 'Business' },
  { id: 'volunteer', name: 'Volunteer Applications', endpoint: 'volunteer', category: 'Community' },
  { id: 'newsletter', name: 'Newsletter Opt-ins', endpoint: 'newsletter', category: 'Marketing' },
  { id: 'survey', name: 'Awareness Surveys', endpoint: 'survey', category: 'Marketing' },
  { id: 'referral', name: 'Employee Referrals', endpoint: 'referral', category: 'HR' },
  { id: 'intern', name: 'Internship Applications', endpoint: 'intern', category: 'HR' },
  { id: 'event-registration', name: 'Event Registrations', endpoint: 'event-registration', category: 'Community' },
  { id: 'feedback', name: 'User Feedback', endpoint: 'feedback', category: 'Support' },
  { id: 'vendor', name: 'Vendor Registrations', endpoint: 'vendor', category: 'Business' },
  { id: 'whitepaper', name: 'Whitepaper Requests', endpoint: 'whitepaper', category: 'Marketing' },
  { id: 'media-kit', name: 'Media Kit Requests', endpoint: 'media-kit', category: 'Marketing' },
  { id: 'report', name: 'Report Requests', endpoint: 'report', category: 'Marketing' }
];

// Mapping Forms to Categories
const FORM_DETAILS = [
  { id: 'contact', name: 'Contact Us Form', category: 'General Communication' },
  { id: 'jobs', name: 'Job Application', category: 'Careers & Recruitment' },
  { id: 'vendor', name: 'Vendor Registration', category: 'Partnerships & Business Network' },
  { id: 'partners', name: 'Partner Application', category: 'Partnerships & Business Network' },
  { id: 'advisors', name: 'Advisor Application', category: 'Careers & Recruitment' },
  { id: 'demo', name: 'Request Demo', category: 'Client Acquisition & Sales' },
  { id: 'expert', name: 'Expert Consultation', category: 'Client Acquisition & Sales' },
  { id: 'quote', name: 'Request A Quote', category: 'Client Acquisition & Sales' },
  { id: 'support', name: 'Support Ticket', category: 'Customer Support Services' },
  { id: 'newsletter', name: 'Newsletter Subscription', category: 'Marketing & Engagement' },
  { id: 'interns', name: 'Internship Application', category: 'Careers & Recruitment' },
  { id: 'affiliate', name: 'Affiliate Marketing', category: 'Partnerships & Business Network' },
  { id: 'survey', name: 'Awareness Survey', category: 'Marketing & Engagement' },
  { id: 'referral', name: 'Employee Referral', category: 'Careers & Recruitment' },
  { id: 'rsvps', name: 'Event RSVPs', category: 'Events & Participation' },
  { id: 'event-registrations', name: 'Event Registrations', category: 'Events & Participation' },
  { id: 'feedback', name: 'User Feedback', category: 'Customer Support Services' },
  { id: 'volunteer', name: 'Volunteer Application', category: 'CSR & Community Programs' },
  { id: 'whitepaper', name: 'Whitepaper Request', category: 'Marketing & Engagement' },
  { id: 'media-kit', name: 'Media Kit Request', category: 'Marketing & Engagement' },
  { id: 'report', name: 'Report Request', category: 'Marketing & Engagement' }
];

// Helper to generate dynamic SVG Sparklines
const Sparkline = ({ data, color }) => {
  if (!data || data.length === 0) return null;
  const width = 120;
  const height = 30;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export default function AdminSubmissions() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();

  // Auth Headers
  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  // Sub-Navigation Tabs: 'overview' | 'contact' | 'demo' | etc.
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const idParam = searchParams.get('id');

  useEffect(() => {
    if (tabParam) {
      setActiveSubTab(tabParam);
    }
  }, [tabParam]);

  // Filters State for aggregated Overview Dashboard
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormType, setSelectedFormType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilterHead, setStatusFilterHead] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');

  // Overview Data States
  const [dashboardData, setDashboardData] = useState(null);
  const [filteredSubmissionsHead, setFilteredSubmissionsHead] = useState([]);

  // Individual Form CRUD Data States
  const [submissions, setSubmissions] = useState([]);
  const [formStats, setFormStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Filters for Individual Form CRUD List
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Detail Modal State (Individual CRUD)
  const [selectedSub, setSelectedSub] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [notesInput, setNotesInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [staffInput, setStaffInput] = useState('');

  // Copy helper state
  const [copiedId, setCopiedId] = useState(null);

  // Pagination for aggregated Overview Dashboard List
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Aggregated Submission Modal Detail View (Overview Dashboard)
  const [selectedSubDetail, setSelectedSubDetail] = useState(null);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch aggregated submissions & dashboard metrics
  const fetchDashboardData = useCallback(() => {
    if (!admin?.token) return;
    setLoading(true);

    fetch(`${API}/api/admin/submissions-dashboard`, {
      headers: { Authorization: `Bearer ${admin.token}` }
    })
      .then(async r => {
        if (!r.ok) {
          throw new Error('Failed to fetch dashboard submissions data');
        }
        return r.json();
      })
      .then(data => {
        setDashboardData(data);
      })
      .catch(err => {
        console.error('Error fetching dashboard submissions data:', err);
      })
      .finally(() => setLoading(false));
  }, [admin?.token]);

  // Fetch Form Stats
  const fetchFormStats = useCallback(async () => {
    if (!admin?.token) return;
    try {
      const res = await fetch(`${API}/api/admin/form-stats`, { headers });
      const data = await res.json();
      if (data.stats) {
        setFormStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch form stats:", err);
    }
  }, [admin?.token, headers]);

  // Fetch submissions for a specific active category
  const fetchSubmissions = useCallback(async (formType) => {
    if (formType === 'overview' || !admin?.token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/submissions/${formType}`, { headers });
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(`Failed to fetch ${formType} submissions:`, err);
      setSubmissions([]);
    }
    setLoading(false);
  }, [admin?.token, headers]);

  // Orchestrate data fetching based on active tab
  useEffect(() => {
    if (admin?.token) {
      fetchFormStats();
      if (activeSubTab === 'overview') {
        fetchDashboardData();
      } else {
        fetchSubmissions(activeSubTab);
      }
    }
  }, [admin, activeSubTab, idParam, fetchDashboardData, fetchFormStats, fetchSubmissions]);

  // Auto-open specific submission detail modal if 'id' parameter is present in URL
  useEffect(() => {
    if (idParam) {
      if (activeSubTab === 'overview' && dashboardData?.submissions?.length > 0) {
        const foundSub = dashboardData.submissions.find(s => s._id === idParam);
        if (foundSub) {
          setSelectedSubDetail(foundSub);
          setSearchParams({});
        }
      } else if (activeSubTab !== 'overview' && submissions?.length > 0) {
        const foundSub = submissions.find(s => s._id === idParam);
        if (foundSub) {
          openDetailModal(foundSub);
          setSearchParams({});
        }
      }
    }
  }, [idParam, activeSubTab, dashboardData, submissions, setSearchParams]);

  // Apply filters on aggregated dashboard submissions list
  useEffect(() => {
    if (!dashboardData?.submissions) return;
    let list = [...dashboardData.submissions];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter(s => s.category === selectedCategory);
    }

    // Form Type Filter
    if (selectedFormType !== 'all') {
      list = list.filter(s => s.formType === selectedFormType);
    }

    // Search filter (name, email, phone, ID, company)
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(s =>
        (s.id && s.id.toLowerCase().includes(q)) ||
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.phone && s.phone.toLowerCase().includes(q)) ||
        (s.companyName && s.companyName.toLowerCase().includes(q))
      );
    }

    // Status Filter
    if (statusFilterHead !== 'all') {
      list = list.filter(s => s.status === statusFilterHead);
    }

    // Priority Filter
    if (priorityFilter !== 'all') {
      list = list.filter(s => s.priority === priorityFilter);
    }

    // Assigned Team/Staff Filter
    if (assignedFilter !== 'all') {
      list = list.filter(s => s.assignedTo === assignedFilter);
    }

    // Date Range Filter
    const now = new Date();
    if (dateRange === '7days') {
      const limitDate = new Date();
      limitDate.setDate(now.getDate() - 7);
      list = list.filter(s => new Date(s.createdAt) >= limitDate);
    } else if (dateRange === '30days') {
      const limitDate = new Date();
      limitDate.setDate(now.getDate() - 30);
      list = list.filter(s => new Date(s.createdAt) >= limitDate);
    }

    setFilteredSubmissionsHead(list);
    setCurrentPage(1); // reset to first page when filtering
  }, [dashboardData, selectedCategory, selectedFormType, searchTerm, statusFilterHead, priorityFilter, assignedFilter, dateRange]);

  // Copy details helper
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast("Data copied to clipboard!");
  };

  // Get Mapped status colors
  const getStatusBadgeClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'new' || s === 'open' || s === 'pending') {
      return 'bg-blue-50 text-blue-600 border border-blue-100';
    } else if (s === 'reviewed' || s === 'in progress' || s === 'under review') {
      return 'bg-amber-50 text-amber-600 border border-amber-100';
    } else if (s === 'followed up' || s === 'quote sent' || s === 'demo scheduled') {
      return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
    } else if (s === 'resolved' || s === 'completed' || s === 'accepted' || s === 'hired' || s === 'approved') {
      return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    } else if (s === 'rejected' || s === 'closed') {
      return 'bg-red-50 text-red-600 border border-red-100';
    }
    return 'bg-gray-50 text-gray-600 border border-gray-100';
  };

  // Get status options based on form category
  const getStatusOptions = (catId) => {
    switch (catId) {
      case 'contact':
      case 'expert':
        return ['New', 'Reviewed', 'Followed Up', 'Resolved'];
      case 'vendor':
        return ['Pending', 'Approved', 'Rejected'];
      case 'demo':
        return ['New', 'Reviewed', 'Demo Scheduled', 'Completed', 'Rejected'];
      case 'quote':
        return ['New', 'Under Review', 'Quote Sent', 'Accepted', 'Rejected'];
      case 'support':
        return ['Open', 'In Progress', 'Resolved', 'Closed'];
      case 'partner':
      case 'advisor':
      case 'volunteer':
      case 'intern':
        return ['Pending', 'Reviewed', 'Contacted', 'Accepted', 'Rejected'];
      default:
        return ['New', 'Reviewed', 'Resolved'];
    }
  };

  // Unified submission updates
  const handleUpdateSubmission = async (id, updatedFields) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/admin/submissions/${activeSubTab}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updated = await res.json();
        setSubmissions(prev => prev.map(s => s._id === id ? updated : s));
        if (selectedSub && selectedSub._id === id) {
          setSelectedSub(updated);
        }
        showToast("Submission details updated successfully.");
        fetchFormStats();
      } else {
        showToast("Failed to update submission.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server connection error.", "error");
    }
    setSubmitting(false);
  };

  // Unified submission deletions
  const handleDeleteSubmission = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission record?")) return;
    try {
      const res = await fetch(`${API}/api/admin/submissions/${activeSubTab}/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showToast("Submission deleted successfully.");
        setSubmissions(prev => prev.filter(s => s._id !== id));
        if (selectedSub && selectedSub._id === id) {
          setDetailModalOpen(false);
        }
        fetchFormStats();
      } else {
        showToast("Failed to delete submission record.", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open detail view modal
  const openDetailModal = (sub) => {
    setSelectedSub(sub);
    setNotesInput(sub.notes || '');
    setStatusInput(sub.status || 'New');
    setStaffInput(sub.assignedStaff || '');
    setDetailModalOpen(true);
  };

  // Save Notes and state
  const saveDetailNotes = async () => {
    if (!selectedSub) return;
    await handleUpdateSubmission(selectedSub._id, {
      notes: notesInput,
      status: statusInput,
      assignedStaff: staffInput
    });
    setDetailModalOpen(false);
  };

  // Copy public form link helper
  const handleCopyLink = (path, id) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast("Form link copied to clipboard!");
  };

  // Aggregated Overview Dashboard CSV Exporter
  const handleExportOverview = () => {
    if (filteredSubmissionsHead.length === 0) return;
    const headersCsv = ['Submission ID', 'Applicant Name', 'Email', 'Phone', 'Company Name', 'Form Type', 'Category', 'Assigned To', 'Status', 'Priority', 'Submitted Date'];
    const csvRows = [
      headersCsv.join(','),
      ...filteredSubmissionsHead.map(s => [
        s.id || '',
        `"${(s.name || '').replace(/"/g, '""')}"`,
        s.email || '',
        s.phone || '',
        `"${(s.companyName || '').replace(/"/g, '""')}"`,
        `"${s.formType || ''}"`,
        `"${s.category || ''}"`,
        `"${s.assignedTo || ''}"`,
        s.status || '',
        s.priority || '',
        new Date(s.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Aggregated_Submissions_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export current active CRUD list to CSV
  const exportCsvReport = () => {
    const filteredCRUD = submissions.filter(sub => {
      const name = sub.name || sub.fullName || sub.firstName || '';
      const email = sub.email || '';
      const subject = sub.subject || sub.service || sub.jobTitle || '';
      const matchesSearch =
        name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        email.toLowerCase().includes(globalSearch.toLowerCase()) ||
        subject.toLowerCase().includes(globalSearch.toLowerCase());
      if (!matchesSearch) return false;

      if (statusFilter !== 'All') {
        if ((sub.status || 'New') !== statusFilter) return false;
      }

      if (dateFilter !== 'All') {
        const subDate = new Date(sub.createdAt);
        const now = new Date();
        if (dateFilter === 'Today') {
          if (subDate.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === 'Week') {
          const diffTime = Math.abs(now - subDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 7) return false;
        } else if (dateFilter === 'Month') {
          if (subDate.getMonth() !== now.getMonth() || subDate.getFullYear() !== now.getFullYear()) return false;
        }
      }

      return true;
    });

    if (filteredCRUD.length === 0) {
      return showToast("No records to export.", "error");
    }
    const headersCsv = ["ID", "Name/Inquirer", "Email", "Subject/Service", "Assigned Staff", "Status", "Created Date"];
    const rows = filteredCRUD.map(sub => [
      sub._id,
      sub.name || sub.fullName || `${sub.firstName || ''} ${sub.lastName || ''}`,
      sub.email || 'N/A',
      sub.subject || sub.service || sub.jobTitle || 'N/A',
      sub.assignedStaff || 'Unassigned',
      sub.status || 'New',
      new Date(sub.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headersCsv.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Submissions_${activeSubTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV report generated successfully!");
  };

  // Recharts Computed Stats
  const statsOverview = useMemo(() => {
    const total = formStats.reduce((acc, curr) => acc + curr.count, 0);
    return { total };
  }, [formStats]);

  const trendsData = [
    { date: 'Mon', Inquiries: 12 },
    { date: 'Tue', Inquiries: 19 },
    { date: 'Wed', Inquiries: 15 },
    { date: 'Thu', Inquiries: 22 },
    { date: 'Fri', Inquiries: 30 },
    { date: 'Sat', Inquiries: 14 },
    { date: 'Sun', Inquiries: statsOverview.total ? Math.min(statsOverview.total, 8) : 5 }
  ];

  const chartData = useMemo(() => {
    return formStats.map(stat => ({
      name: stat.name,
      Count: stat.count
    })).sort((a, b) => b.Count - a.Count);
  }, [formStats]);

  const COLORS = ['#1e5cdc', '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#14b8a6', '#f43f5e'];

  // Pagination calculations for Aggregated Dashboard List
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissionsHead.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissionsHead.length / itemsPerPage) || 1;

  // Filter dynamic subcategories when a category is selected
  const availableSubcategories = selectedCategory === 'all'
    ? FORM_DETAILS
    : FORM_DETAILS.filter(f => f.category === selectedCategory);

  // Quick statistics computed for the CURRENT filtered subset of aggregated dashboard submissions
  const currentStats = {
    total: filteredSubmissionsHead.length,
    active: filteredSubmissionsHead.filter(s => ['New Submission', 'Under Review', 'Assigned to Department', 'Processing', 'New', 'Open', 'Pending'].includes(s.status)).length,
    pending: filteredSubmissionsHead.filter(s => ['Under Review', 'Assigned to Department', 'In Progress'].includes(s.status)).length,
    responsesSent: filteredSubmissionsHead.filter(s => ['Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated', 'Completed', 'Resolved', 'Approved'].includes(s.status)).length,
    staffCount: new Set(filteredSubmissionsHead.map(s => s.assignedTo)).size || 4,
    conversionRate: filteredSubmissionsHead.length > 0
      ? ((filteredSubmissionsHead.filter(s => ['Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated', 'Completed', 'Resolved', 'Approved'].includes(s.status)).length / filteredSubmissionsHead.length) * 100).toFixed(1)
      : '0.0'
  };

  // Pie Chart COLORS
  const PIE_COLORS = ['#1e5cdc', '#10b981', '#8b5cf6', '#3b82f6', '#f59e0b', '#ec4899', '#ef4444', '#06b6d4'];

  const categoryChartData = dashboardData?.categoryDistribution || [];

  // Filtered submissions computed lists (CRUD Table)
  const filteredSubmissionsCRUD = useMemo(() => {
    return submissions.filter(sub => {
      // Search
      const name = sub.name || sub.fullName || sub.firstName || '';
      const email = sub.email || '';
      const subject = sub.subject || sub.service || sub.jobTitle || '';
      const matchesSearch =
        name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        email.toLowerCase().includes(globalSearch.toLowerCase()) ||
        subject.toLowerCase().includes(globalSearch.toLowerCase());
      if (!matchesSearch) return false;

      // Status
      if (statusFilter !== 'All') {
        if ((sub.status || 'New') !== statusFilter) return false;
      }

      // Date
      if (dateFilter !== 'All') {
        const subDate = new Date(sub.createdAt);
        const now = new Date();
        if (dateFilter === 'Today') {
          if (subDate.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === 'Week') {
          const diffTime = Math.abs(now - subDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 7) return false;
        } else if (dateFilter === 'Month') {
          if (subDate.getMonth() !== now.getMonth() || subDate.getFullYear() !== now.getFullYear()) return false;
        }
      }

      return true;
    });
  }, [submissions, globalSearch, statusFilter, dateFilter]);

  return (
    <AdminLayout>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <span>{toast.type === 'success' ? '✓' : '✗'}</span>
          {toast.message}
        </div>
      )}

      {/* Outer Flex Container for Sidebar + Workspace */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5.5rem)] bg-gray-50/50 -mx-6 -mb-6 mt-3 rounded-2xl overflow-hidden border border-gray-150 shadow-sm">
        
        {/* Left Side Subcategory Sub-Sidebar */}
        <aside className={`w-full ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'} bg-white flex flex-col p-5 shrink-0 border-r border-gray-150 transition-all duration-300`}>
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'lg:hidden' : 'flex'}`}>
              <div className="p-2.5 bg-[#1e5cdc]/10 text-[#1e5cdc] rounded-xl">
                <ClipboardList size={22} />
              </div>
              <div>
                <h2 className="font-extrabold text-gray-800 text-sm tracking-tight leading-none">Submissions</h2>
                <span className="text-[9px] text-[#1e5cdc] font-black tracking-widest uppercase block mt-1">Contractum CRM</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-400 cursor-pointer hidden lg:block"
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto max-h-[65vh] pr-1 custom-scrollbar">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeSubTab === 'overview'
                  ? 'bg-[#1e5cdc] text-white shadow-md shadow-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title="Overview Dashboard"
            >
              <LayoutDashboard size={16} />
              {!sidebarCollapsed && <span>Overview Dashboard</span>}
              {sidebarCollapsed && <span className="lg:hidden">Overview Dashboard</span>}
            </button>

            <div className={`pt-4 pb-1 text-[9px] font-black text-gray-400 uppercase tracking-widest px-2 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>Forms List</div>

            {FORM_CATEGORIES.map(cat => {
              const stat = formStats.find(s => 
                s.name.toLowerCase().includes(cat.id) || 
                (cat.id === 'contact' && s.name === 'Contact Us') ||
                (cat.id === 'demo' && s.name === 'Demo Requests') ||
                (cat.id === 'expert' && s.name === 'Expert Consults') ||
                (cat.id === 'quote' && s.name === 'Quote Requests') ||
                (cat.id === 'support' && s.name === 'Support Tickets') ||
                (cat.id === 'newsletter' && s.name === 'Newsletter Opt-ins') ||
                (cat.id === 'survey' && s.name === 'User Surveys') ||
                (cat.id === 'referral' && s.name === 'Referrals') ||
                (cat.id === 'intern' && s.name === 'Intern Apps') ||
                (cat.id === 'event-registration' && s.name === 'Event Registrations') ||
                (cat.id === 'volunteer' && s.name === 'Volunteer Apps') ||
                (cat.id === 'whitepaper' && s.name === 'Whitepaper Requests') ||
                (cat.id === 'media-kit' && s.name === 'Media Kit Requests') ||
                (cat.id === 'report' && s.name === 'Report Requests')
              );
              const count = stat ? stat.count : 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSubTab(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeSubTab === cat.id
                      ? 'bg-[#1e5cdc] text-white shadow-md shadow-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={cat.name}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText size={15} className={`shrink-0 ${activeSubTab === cat.id ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`truncate ${sidebarCollapsed ? 'lg:hidden' : ''}`}>{cat.name}</span>
                  </div>
                  {count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${sidebarCollapsed ? 'lg:hidden' : ''} ${
                      activeSubTab === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {!sidebarCollapsed ? (
              <>
                Total Responses:
                <p className="text-gray-800 font-black text-sm mt-0.5">{statsOverview.total || 0}</p>
              </>
            ) : (
              <>
                <div className="lg:hidden">
                  Total Responses:
                  <p className="text-gray-800 font-black text-sm mt-0.5">{statsOverview.total || 0}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1e5cdc]/15 text-[#1e5cdc] flex items-center justify-center font-bold text-xs mx-auto hidden lg:flex" title={`Total Responses: ${statsOverview.total || 0}`}>
                  {statsOverview.total || 0}
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Right Content Workspace Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Top Header Row */}
          <header className="border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-20">
            <div className="flex flex-wrap items-center gap-2 max-w-lg flex-1">
              {activeSubTab !== 'overview' ? (
                <>
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      value={globalSearch}
                      onChange={(e) => setGlobalSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600"
                  >
                    <option value="All">All Statuses</option>
                    {getStatusOptions(activeSubTab).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600"
                  >
                    <option value="All">All Time</option>
                    <option value="Today">Received Today</option>
                    <option value="Week">Received This Week</option>
                    <option value="Month">Received This Month</option>
                  </select>
                </>
              ) : (
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-1.5">
                  <LayoutDashboard size={18} className="text-[#1e5cdc]" /> Submissions Dashboard
                </h2>
              )}
            </div>

            <div className="flex items-center gap-3">
              {activeSubTab !== 'overview' ? (
                <button
                  onClick={exportCsvReport}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet size={15} /> Export Category
                </button>
              ) : (
                <button
                  onClick={handleExportOverview}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Download size={15} /> Export Dashboard List
                </button>
              )}

              <button
                onClick={() => {
                  fetchFormStats();
                  if (activeSubTab !== 'overview') {
                    fetchSubmissions(activeSubTab);
                  } else {
                    fetchDashboardData();
                  }
                }}
                className="p-2 border border-gray-200 text-gray-500 hover:text-[#1e5cdc] rounded-xl transition-colors hover:bg-gray-50 cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </header>

          {/* Content Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                <div className="w-10 h-10 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-xs text-gray-400 uppercase tracking-wider">Syncing database records...</p>
              </div>
            ) : (
              <>
                {/* 1. Tab: OVERVIEW (Aggregated analytical dashboard) */}
                {activeSubTab === 'overview' && (
                  <div className="space-y-6">
                    
                    {/* High-Fidelity Metric Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                      
                      {/* Metric Card 1: Total Submissions */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-blue-50 text-[#1e5cdc] rounded-xl group-hover:scale-105 transition-transform">
                            <FileText size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <ArrowUpRight size={10} /> 18.6%
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-800 block leading-tight">{currentStats.total}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Total Submissions</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <Sparkline data={[12, 19, 3, 5, 2, 3, 10, 15, 20]} color="#1e5cdc" />
                        </div>
                      </div>

                      {/* Metric Card 2: Active Requests */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-emerald-200 transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl group-hover:scale-105 transition-transform">
                            <Users size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <ArrowUpRight size={10} /> 16.3%
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-800 block leading-tight">{currentStats.active}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Active Requests</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <Sparkline data={[5, 10, 15, 12, 20, 25, 22, 30, 28]} color="#10b981" />
                        </div>
                      </div>

                      {/* Metric Card 3: Pending Follow-Ups */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-amber-200 transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-amber-50 text-amber-500 rounded-xl group-hover:scale-105 transition-transform">
                            <Clock size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <ArrowUpRight size={10} /> 9.2%
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-800 block leading-tight">{currentStats.pending}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Pending Follow-Ups</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <Sparkline data={[10, 8, 12, 14, 11, 15, 13, 16, 15]} color="#f59e0b" />
                        </div>
                      </div>

                      {/* Metric Card 4: Assigned Staff */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-purple-200 transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-purple-50 text-purple-500 rounded-xl group-hover:scale-105 transition-transform">
                            <Activity size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <ArrowUpRight size={10} /> 12.5%
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-800 block leading-tight">{currentStats.staffCount}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Staff Owners</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <Sparkline data={[2, 3, 5, 5, 8, 10, 12, 12, 15]} color="#8b5cf6" />
                        </div>
                      </div>

                      {/* Metric Card 5: Responses Sent */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-cyan-200 transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-cyan-50 text-cyan-500 rounded-xl group-hover:scale-105 transition-transform">
                            <Mail size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <ArrowUpRight size={10} /> 20.8%
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-800 block leading-tight">{currentStats.responsesSent}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Responses Sent</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <Sparkline data={[15, 20, 25, 30, 28, 35, 42, 40, 48]} color="#06b6d4" />
                        </div>
                      </div>

                      {/* Metric Card 6: Conversion Rate */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-rose-200 transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-rose-50 text-rose-500 rounded-xl group-hover:scale-105 transition-transform">
                            <Sparkles size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5 bg-rose-50 px-1.5 py-0.5 rounded-full">
                            <ArrowDownRight size={10} /> 5.4%
                          </span>
                        </div>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-800 block leading-tight">{currentStats.conversionRate}%</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Conversion Rate</span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                          <Sparkline data={[25, 26, 24, 23, 25, 26, 28, 26, 23.6]} color="#f43f5e" />
                        </div>
                      </div>

                    </div>

                    {/* Recharts Analytics Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Submissions by Category Donut Chart */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs flex flex-col h-[340px]">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Submissions by Category</h4>
                        </div>
                        <div className="flex-1 relative h-48">
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                            <span className="text-2xl font-extrabold text-gray-800">{currentStats.total}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Total Leads</span>
                          </div>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={categoryChartData}
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {categoryChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value} Entries`]} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 text-[10px] font-semibold text-gray-500 max-h-[70px] overflow-y-auto custom-scrollbar">
                          {categoryChartData.slice(0, 8).map((cat, idx) => (
                            <div key={cat.name} className="flex items-center gap-1.5 truncate">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></span>
                              <span className="truncate">{cat.name}</span>
                              <span className="text-gray-400 ml-auto font-bold shrink-0">{cat.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Daily Volume Trends Line Chart */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs flex flex-col h-[340px]">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Daily Submission Trends</h4>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Weekly Overview</span>
                        </div>
                        <div className="flex-1">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendsData} margin={{ left: -20, right: 10, top: 10, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} fontStyle="medium" />
                              <YAxis stroke="#9ca3af" fontSize={10} fontStyle="medium" />
                              <Tooltip />
                              <Line type="monotone" dataKey="Inquiries" stroke="#1e5cdc" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Form Categories Performance */}
                      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs flex flex-col h-[340px]">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
                          <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Top Form Sources</h4>
                        </div>
                        <div className="space-y-3.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
                          {chartData.slice(0, 6).map((cat, idx) => {
                            const percent = statsOverview.total ? ((cat.Count / statsOverview.total) * 100).toFixed(1) : 0;
                            return (
                              <div key={cat.name} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                  <span className="truncate max-w-[180px]">{cat.name}</span>
                                  <span>{cat.Count} Leads ({percent}%)</span>
                                </div>
                                <div className="w-full bg-gray-50 rounded-full h-1.5 border border-gray-100">
                                  <div className="h-1.5 rounded-full" style={{ width: `${percent}%`, backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Aggregated Interactive Submission Database Table & Operations Widgets */}
                    <div className="flex flex-col xl:flex-row gap-6 mt-4">
                      
                      {/* Left Side: Filterable Submission List Table */}
                      <div className="flex-1 bg-white border border-gray-150 rounded-2xl p-5 shadow-xs flex flex-col min-w-0">
                        
                        {/* Interactive Aggregated Filters Box */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <select
                              value={selectedCategory}
                              onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setSelectedFormType('all');
                              }}
                              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 cursor-pointer"
                            >
                              <option value="all">All Category Areas</option>
                              {CATEGORIES.slice(1).map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>

                            <select
                              value={selectedFormType}
                              onChange={(e) => setSelectedFormType(e.target.value)}
                              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 cursor-pointer"
                            >
                              <option value="all">All Form Types</option>
                              {availableSubcategories.map(form => (
                                <option key={form.id} value={form.name}>{form.name}</option>
                              ))}
                            </select>

                            <select
                              value={dateRange}
                              onChange={(e) => setDateRange(e.target.value)}
                              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 cursor-pointer"
                            >
                              <option value="all">All Time</option>
                              <option value="7days">Last 7 Days</option>
                              <option value="30days">Last 30 Days</option>
                            </select>

                            {(selectedCategory !== 'all' || selectedFormType !== 'all' || statusFilterHead !== 'all' || priorityFilter !== 'all' || assignedFilter !== 'all' || searchTerm) && (
                              <button
                                onClick={() => {
                                  setSelectedCategory('all');
                                  setSelectedFormType('all');
                                  setStatusFilterHead('all');
                                  setPriorityFilter('all');
                                  setAssignedFilter('all');
                                  setSearchTerm('');
                                }}
                                className="text-xs font-extrabold text-[#1e5cdc] hover:underline transition"
                              >
                                Clear
                              </button>
                            )}
                          </div>

                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                              type="text"
                              placeholder="Quick filter dashboard..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-60 font-semibold text-gray-700"
                            />
                          </div>
                        </div>

                        {/* Submissions Aggregated Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                                <th className="py-3.5 px-4">Record ID</th>
                                <th className="py-3.5 px-4">User Contact</th>
                                <th className="py-3.5 px-4">Contact Info</th>
                                <th className="py-3.5 px-4">Form Source</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4 text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-semibold text-gray-600">
                              {currentSubmissions.length > 0 ? (
                                currentSubmissions.map((sub) => (
                                  <tr key={sub._id} className="hover:bg-gray-50/50 transition duration-150">
                                    <td className="py-4 px-4 font-mono text-[10px] text-gray-400 uppercase">
                                      {sub.id || sub._id.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="py-4 px-4">
                                      <div className="font-extrabold text-gray-800 text-xs">{sub.name}</div>
                                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">{sub.companyName || 'No Company'}</div>
                                    </td>
                                    <td className="py-4 px-4 space-y-0.5">
                                      <div className="text-gray-700">{sub.email}</div>
                                      {sub.phone && <div className="text-[10px] text-gray-400 font-medium">{sub.phone}</div>}
                                    </td>
                                    <td className="py-4 px-4">
                                      <span className="text-[10px] font-bold text-gray-700 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                                        {sub.formType}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4">
                                      <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md ${getStatusBadgeClass(sub.status)}`}>
                                        {sub.status || 'New Submission'}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <button
                                          onClick={() => setSelectedSubDetail(sub)}
                                          className="p-1.5 text-gray-400 hover:text-[#1e5cdc] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                          title="View Submission Details"
                                        >
                                          <Eye size={14} />
                                        </button>
                                        <button
                                          onClick={() => handleCopy(sub._id, `${sub.id || sub._id} - ${sub.name} (${sub.email})`)}
                                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${copiedId === sub._id ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                          title="Copy Quick Info"
                                        >
                                          {copiedId === sub._id ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="py-12 text-center text-gray-400 font-bold text-sm">
                                    No matching dashboard records found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Footer */}
                        {totalPages > 1 && (
                          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30 mt-auto pt-4">
                            <button
                              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                              disabled={currentPage === 1}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition cursor-pointer"
                            >
                              <ChevronLeft size={14} className="inline mr-1" /> Previous
                            </button>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                              Page {currentPage} of {totalPages}
                            </span>
                            <button
                              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition cursor-pointer"
                            >
                              Next <ChevronRight size={14} className="inline ml-1" />
                            </button>
                          </div>
                        )}

                      </div>

                      {/* Right Side Widget Box */}
                      <div className="w-full xl:w-80 shrink-0 space-y-6">
                        
                        {/* Widget A: High Priority Follow-Ups */}
                        <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <Clock size={14} className="text-amber-500" /> Action Items
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {filteredSubmissionsHead.filter(s => ['In Progress', 'Under Review', 'New', 'Open', 'Pending'].includes(s.status) && s.priority === 'High').slice(0, 4).map(sub => (
                              <div key={sub._id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 transition cursor-pointer" onClick={() => setSelectedSubDetail(sub)}>
                                <div className="flex justify-between items-start">
                                  <span className="text-[10px] font-bold text-[#1e5cdc]">{sub.id || 'LEAD'}</span>
                                  <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-md">High</span>
                                </div>
                                <h5 className="font-bold text-gray-850 text-xs mt-1 truncate">{sub.name}</h5>
                                <span className="text-[10px] text-gray-500 block truncate mt-0.5">{sub.formType}</span>
                                <span className="text-[9px] text-gray-400 font-medium block mt-1.5 flex items-center gap-1">
                                  <Calendar size={10} /> {new Date(sub.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                            {filteredSubmissionsHead.filter(s => ['In Progress', 'Under Review', 'New', 'Open', 'Pending'].includes(s.status) && s.priority === 'High').length === 0 && (
                              <div className="py-6 text-center text-xs text-gray-400 font-semibold bg-gray-50/50 rounded-xl border border-dashed border-gray-150">
                                No critical follow-ups pending.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Widget B: Recent Submissions Feed */}
                        <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <Activity size={14} className="text-[#1e5cdc]" /> Submissions Log
                            </h4>
                          </div>
                          <div className="space-y-4">
                            {filteredSubmissionsHead.slice(0, 4).map((sub, idx) => {
                              const operators = ["Super Admin", "Operations Team", "Sales CRM Bot", "System Manager"];
                              return (
                                <div key={idx} className="flex gap-2.5 text-[11px] font-semibold text-gray-600 leading-tight">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e5cdc] shrink-0 mt-1.5"></div>
                                  <div>
                                    <span>
                                      <strong className="text-gray-850 font-bold">{sub.name}</strong> submitted a new request via {sub.formType}.
                                    </span>
                                    <span className="text-[9px] text-gray-400 block mt-1">{new Date(sub.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                )}

                {/* 2. Tab: Specific Form CRUD list */}
                {activeSubTab !== 'overview' && (
                  <div className="space-y-6">
                    
                    {/* Shareable Form Link Quick Share Widget */}
                    <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle size={15} className="text-[#1e5cdc]" /> Public Share Link
                        </h3>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active API Endpoint</span>
                      </div>
                      
                      {FORM_CATEGORIES.filter(f => f.id === activeSubTab).map(form => (
                        <div key={form.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4 max-w-2xl">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-xs text-gray-800">{form.name}</span>
                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{form.category}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white border border-gray-150 p-1.5 rounded-lg text-[10px] font-mono text-gray-500 w-80">
                            <span className="truncate flex-1">{`/forms/${form.id}`}</span>
                            <button
                              onClick={() => handleCopyLink(`/forms/${form.id}`, form.id)}
                              className={`p-1 rounded shrink-0 cursor-pointer ${copiedId === form.id ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100 text-gray-400'}`}
                            >
                              {copiedId === form.id ? <Check size={11} /> : <Copy size={11} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* submissions Table */}
                    <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                              <th className="py-3.5 px-4">Submission ID</th>
                              <th className="py-3.5 px-4">Contact / Name</th>
                              <th className="py-3.5 px-4">Email Address</th>
                              <th className="py-3.5 px-4">Service / Area</th>
                              <th className="py-3.5 px-4">Assigned Staff</th>
                              <th className="py-3.5 px-4">Status</th>
                              <th className="py-3.5 px-4">Submitted Date</th>
                              <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-semibold text-gray-600">
                            {filteredSubmissionsCRUD.length > 0 ? (
                              filteredSubmissionsCRUD.map((sub) => {
                                const name = sub.name || sub.fullName || `${sub.firstName || ''} ${sub.lastName || ''}`;
                                const subject = (sub.whitepaperId?.title || (sub.details?.whitepaperId && sub.details.whitepaperId.title)) ||
                                   (sub.reportId?.title || (sub.details?.reportId && sub.details.reportId.title)) ||
                                   (activeSubTab === 'media-kit' || sub.formType === 'Media Kit Request' ? 'Corporate Media Kit' : '') ||
                                   sub.subject || sub.service || sub.jobTitle || sub.interestArea || 
                                   'Form Entry';

                                return (
                                  <tr key={sub._id} className="hover:bg-gray-50/50 transition duration-150">
                                    <td className="py-4 px-4 font-mono text-[10px] text-gray-400">
                                      {sub._id.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="py-4 px-4 font-extrabold text-gray-800 text-xs">{name}</td>
                                    <td className="py-4 px-4 text-xs font-semibold text-gray-500">{sub.email}</td>
                                    <td className="py-4 px-4 font-bold text-gray-700 max-w-[200px] truncate" title={subject}>
                                      {subject}
                                    </td>
                                    <td className="py-4 px-4 text-xs font-bold text-blue-600">
                                      {sub.assignedStaff || <span className="text-gray-400">Unassigned</span>}
                                    </td>
                                    <td className="py-4 px-4">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(sub.status)}`}>
                                        {sub.status || 'New'}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 text-xs text-gray-500 whitespace-nowrap">
                                      {new Date(sub.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                      <div className="flex justify-end gap-1">
                                        <button
                                          onClick={() => openDetailModal(sub)}
                                          className="text-xs font-bold bg-blue-50 text-[#1e5cdc] hover:bg-blue-100 px-2.5 py-1 rounded transition duration-150 cursor-pointer"
                                        >
                                          Manage
                                        </button>
                                        <button
                                          onClick={() => handleDeleteSubmission(sub._id)}
                                          className="text-gray-400 hover:text-red-500 p-1.5 rounded transition cursor-pointer"
                                          title="Delete Record"
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="8" className="py-12 text-center text-gray-400 font-bold text-sm">
                                  No submissions found matching the current filters.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* ─── AGGREGATED DETAIL VIEW MODAL (Dashboard Overview) ─── */}
      {selectedSubDetail && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-gray-150 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white bg-[#1e5cdc] px-3 py-1 rounded-xl shadow-md">
                  {selectedSubDetail.id || 'LEAD'}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100">
                  {selectedSubDetail.formType}
                </span>
              </div>
              <button
                onClick={() => setSelectedSubDetail(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-150 flex items-center justify-center text-gray-400 hover:text-gray-800 transition cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">

              {/* Profile Card */}
              <div className="flex items-center gap-4 p-4 bg-blue-50/40 rounded-2xl border border-blue-100/50">
                <img
                  src={`https://ui-avatars.com/api/?name=${selectedSubDetail.name}&background=1e5cdc&color=fff&size=80`}
                  alt={selectedSubDetail.name}
                  className="w-16 h-16 rounded-2xl border border-white shadow-xs shrink-0"
                />
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg leading-none">{selectedSubDetail.name}</h4>
                  <p className="text-xs text-gray-500 font-semibold mt-2 flex items-center gap-1.5"><Mail size={12} /> {selectedSubDetail.email}</p>
                  {selectedSubDetail.phone && (
                    <p className="text-xs text-gray-500 font-semibold mt-1 flex items-center gap-1.5"><Phone size={12} /> {selectedSubDetail.phone}</p>
                  )}
                </div>
              </div>

              {/* Submission Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-600">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Category Area</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.category}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Assigned Lead Owner</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.assignedTo || 'Unassigned'}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Workflow Status</span>
                  <span className="text-gray-850 font-extrabold block capitalize">{selectedSubDetail.status}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Priority Flag</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.priority || 'Medium'}</span>
                </div>
              </div>

              {/* Dynamic User Inputs Details Loop */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider border-b border-gray-100 pb-2">Submitted Content Inputs</h4>
                <div className="bg-white rounded-2xl border border-gray-150 p-5 space-y-4 text-xs font-semibold text-gray-600">
                  {(selectedSubDetail.whitepaperId || selectedSubDetail.details?.whitepaperId) && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Requested Whitepaper</span>
                      <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-gray-700 text-xs font-bold leading-relaxed">
                        {(selectedSubDetail.whitepaperId?.title || selectedSubDetail.details?.whitepaperId?.title) || 'N/A'} (ID: {(selectedSubDetail.whitepaperId?._id || selectedSubDetail.details?.whitepaperId?._id) || 'N/A'})
                      </div>
                    </div>
                  )}
                  {(selectedSubDetail.reportId || selectedSubDetail.details?.reportId) && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Requested Report</span>
                      <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-gray-700 text-xs font-bold leading-relaxed">
                        {(selectedSubDetail.reportId?.title || selectedSubDetail.details?.reportId?.title) || 'N/A'} (ID: {(selectedSubDetail.reportId?._id || selectedSubDetail.details?.reportId?._id) || 'N/A'})
                      </div>
                    </div>
                  )}
                  {Object.keys(selectedSubDetail.details || {}).map((key) => {
                    const val = selectedSubDetail.details[key];
                    if (
                      ['_id', 'createdAt', 'updatedAt', '__v', 'id', 'name', 'fullName', 'email', 'phone', 'phoneNumber', 'mobile', 'status', 'priority'].includes(key) ||
                      typeof val === 'object' ||
                      !val
                    ) return null;

                    if (key === 'errorScreenshot') {
                      return (
                        <div key={key} className="space-y-1">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block capitalize">Error Screenshot</span>
                          {val.startsWith('data:image/') ? (
                            <img src={val} alt="Error Screenshot" className="max-w-full max-h-48 rounded-xl border border-gray-200 shadow-sm" />
                          ) : (
                            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-gray-700 text-xs font-mono break-all">
                              {val}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={key} className="space-y-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-gray-700 text-xs font-bold leading-relaxed whitespace-pre-wrap">
                          {val}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedSubDetail(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 bg-white transition cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => handleCopy(selectedSubDetail._id, JSON.stringify(selectedSubDetail.details, null, 2))}
                className="px-4 py-2 bg-[#1e5cdc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition cursor-pointer shadow-sm"
              >
                Copy Full Raw Data
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── INDIVIDUAL SUBMISSION DETAIL MODAL (Form CRUD) ─── */}
      {detailModalOpen && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-blue-50/30">
              <div>
                <h2 className="text-base font-bold text-gray-800">Manage Submission Record</h2>
                <p className="text-xs text-blue-600 mt-1 font-bold uppercase tracking-wider">
                  Type: {activeSubTab} &nbsp;|&nbsp; ID: {selectedSub._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <button onClick={() => setDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Form Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-500">
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-bold text-gray-400 block uppercase">Name / Contact</span>
                  <span className="font-extrabold text-gray-850 text-sm block mt-0.5">
                    {selectedSub.name || selectedSub.fullName || `${selectedSub.firstName || ''} ${selectedSub.lastName || ''}`}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-bold text-gray-400 block uppercase">Email Address</span>
                  <span className="font-extrabold text-gray-800 text-sm block mt-0.5">{selectedSub.email}</span>
                </div>

                {selectedSub.phone && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Phone Number</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">{selectedSub.phone}</span>
                  </div>
                )}
                {selectedSub.rating && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Service Rating</span>
                    <span className="font-extrabold text-amber-500 text-sm block mt-0.5">
                      {selectedSub.rating} / 5 ⭐
                    </span>
                  </div>
                )}
                {selectedSub.company && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Company / Organization</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">{selectedSub.company}</span>
                  </div>
                )}

                {selectedSub.industryPreference && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Industry Preference</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">{selectedSub.industryPreference}</span>
                  </div>
                )}

                {selectedSub.consultationTopic && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Consultation Topic</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">{selectedSub.consultationTopic}</span>
                  </div>
                )}
                {selectedSub.preferredSchedule && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Preferred Schedule</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">{selectedSub.preferredSchedule}</span>
                  </div>
                )}

                {/* Technical Assistance Form fields */}
                {selectedSub.systemProductName && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">System/Product Name</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">{selectedSub.systemProductName}</span>
                  </div>
                )}
                {selectedSub.deviceInformation && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Device Information</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">{selectedSub.deviceInformation}</span>
                  </div>
                )}
                {selectedSub.contactDetails && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Contact Details</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">{selectedSub.contactDetails}</span>
                  </div>
                )}
                {selectedSub.phone && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Phone Number</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">{selectedSub.phone}</span>
                  </div>
                )}
                {selectedSub.technicalIssue && (
                  <div className="col-span-2">
                    <span className="font-bold text-gray-400 block uppercase">Technical Issue</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5 bg-white p-2.5 rounded-xl border border-gray-150 whitespace-pre-wrap leading-relaxed">{selectedSub.technicalIssue}</span>
                  </div>
                )}
                {selectedSub.errorScreenshot && (
                  <div className="col-span-2 border-t border-gray-150 pt-3">
                    <span className="font-bold text-gray-400 block uppercase mb-2">Error Screenshot</span>
                    {selectedSub.errorScreenshot.startsWith('data:image/') ? (
                      <img src={selectedSub.errorScreenshot} alt="Error Screenshot" className="max-w-full max-h-64 rounded-xl border border-gray-200 shadow-md" />
                    ) : (
                      <div className="bg-white p-3 rounded-xl border border-gray-100 font-mono text-xs text-gray-500 break-all">
                        {selectedSub.errorScreenshot}
                      </div>
                    )}
                  </div>
                )}

                {selectedSub.jobTitle && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Desired Job Title</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">{selectedSub.jobTitle}</span>
                  </div>
                )}
                {selectedSub.employeeCount && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Employee Count</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">{selectedSub.employeeCount}</span>
                  </div>
                )}

                {selectedSub.service && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Service Interest</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">{selectedSub.service}</span>
                  </div>
                )}
                {selectedSub.budget && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Project Budget</span>
                    <span className="font-extrabold text-blue-600 block mt-0.5">{selectedSub.budget}</span>
                  </div>
                )}

                {selectedSub.subject && (
                  <div className="col-span-2">
                    <span className="font-bold text-gray-400 block uppercase">Subject Context</span>
                    <span className="font-extrabold text-gray-800 block mt-0.5">{selectedSub.subject}</span>
                  </div>
                )}

                {/* Vendor Company Name */}
                {(selectedSub.companyName || (selectedSub.details && selectedSub.details.companyName)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Vendor Company Name</span>
                    <span className="font-extrabold text-gray-850 text-sm block mt-0.5">
                      {selectedSub.companyName || selectedSub.details.companyName}
                    </span>
                  </div>
                )}

                {/* Vendor Name */}
                {(selectedSub.vendorName || (selectedSub.details && selectedSub.details.vendorName)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Vendor Name</span>
                    <span className="font-extrabold text-gray-850 text-sm block mt-0.5">
                      {selectedSub.vendorName || selectedSub.details.vendorName}
                    </span>
                  </div>
                )}

                {/* Vendor Contact Number */}
                {(selectedSub.vendorContact || (selectedSub.details && selectedSub.details.vendorContact)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Vendor Contact Number</span>
                    <span className="font-extrabold text-gray-800 text-sm block mt-0.5">
                      {selectedSub.vendorContact || selectedSub.details.vendorContact}
                    </span>
                  </div>
                )}

                {/* GST Number */}
                {(selectedSub.gstNumber || (selectedSub.details && selectedSub.details.gstNumber)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">GST Number</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5 uppercase font-mono">
                      {selectedSub.gstNumber || selectedSub.details.gstNumber}
                    </span>
                  </div>
                )}

                {/* PAN Number */}
                {(selectedSub.panNumber || (selectedSub.details && selectedSub.details.panNumber)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">PAN Number</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5 uppercase font-mono">
                      {selectedSub.panNumber || selectedSub.details.panNumber}
                    </span>
                  </div>
                )}

                {/* Contact Person */}
                {(selectedSub.contactPerson || (selectedSub.details && selectedSub.details.contactPerson)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Contact Person</span>
                    <span className="font-extrabold text-gray-700 block mt-0.5">
                      {selectedSub.contactPerson || selectedSub.details.contactPerson}
                    </span>
                  </div>
                )}

                {/* Company Type */}
                {(selectedSub.companyType || (selectedSub.details && selectedSub.details.companyType)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Company Type</span>
                    <span className="font-extrabold text-violet-700 text-sm block mt-0.5">
                      {selectedSub.companyType || selectedSub.details.companyType}
                    </span>
                  </div>
                )}

                {/* Authorized Signatory */}
                {(selectedSub.authorizedDirectorName || (selectedSub.details && selectedSub.details.authorizedDirectorName)) && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Authorized Signatory</span>
                    <span className="font-extrabold text-gray-800 text-sm block mt-0.5">
                      {selectedSub.authorizedDirectorName || selectedSub.details.authorizedDirectorName}
                    </span>
                  </div>
                )}

                {/* Authorization Details */}
                {(selectedSub.authorizationDetails || (selectedSub.details && selectedSub.details.authorizationDetails)) && (
                  <div className="col-span-2">
                    <span className="font-bold text-gray-400 block uppercase">Authorization Details</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">
                      {selectedSub.authorizationDetails || selectedSub.details.authorizationDetails}
                    </span>
                  </div>
                )}

                {/* Directors/Owners Details List */}
                {((selectedSub.directors && selectedSub.directors.length > 0) || (selectedSub.details && selectedSub.details.directors && selectedSub.details.directors.length > 0)) && (
                  <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-2">Directors & Owners List</span>
                    <div className="space-y-2">
                      {((selectedSub.directors || selectedSub.details.directors)).map((dir, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs border-b border-gray-200/50 pb-1.5 last:border-b-0 last:pb-0">
                          <span className="font-extrabold text-gray-800">{dir.name}</span>
                          <span className="text-gray-500 font-semibold">{dir.contactNumber} | {dir.email}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services / Products Offered */}
                {(selectedSub.servicesOffered || (selectedSub.details && selectedSub.details.servicesOffered)) && (
                  <div className="col-span-2">
                    <span className="font-bold text-gray-400 block uppercase">Services Offered</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">
                      {selectedSub.servicesOffered || selectedSub.details.servicesOffered}
                    </span>
                  </div>
                )}

                {/* Business Address */}
                {(selectedSub.businessAddress || (selectedSub.details && selectedSub.details.businessAddress)) && (
                  <div className="col-span-2">
                    <span className="font-bold text-gray-400 block uppercase">Business Address</span>
                    <span className="font-extrabold text-gray-750 block mt-0.5">
                      {selectedSub.businessAddress || selectedSub.details.businessAddress}
                    </span>
                  </div>
                )}

                {/* Bank Details */}
                {(selectedSub.bankDetails || (selectedSub.details && selectedSub.details.bankDetails)) && (
                  <div className="col-span-2 bg-violet-50/50 p-3 rounded-xl border border-violet-100/50">
                    <span className="font-bold text-violet-700 block uppercase text-[10px] tracking-wider mb-1">Bank payout Details</span>
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-gray-700">
                      <div>
                        <span className="text-[10px] text-gray-400 block">BANK NAME</span>
                        <span className="font-extrabold">{(selectedSub.bankDetails?.bankName || selectedSub.details?.bankDetails?.bankName) || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">ACCOUNT NUMBER</span>
                        <span className="font-extrabold font-mono">{(selectedSub.bankDetails?.accountNumber || selectedSub.details?.bankDetails?.accountNumber) || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">IFSC CODE</span>
                        <span className="font-extrabold font-mono">{(selectedSub.bankDetails?.ifscCode || selectedSub.details?.bankDetails?.ifscCode) || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Download Link */}
                {((selectedSub.documents && typeof selectedSub.documents === 'object') || (selectedSub.details && selectedSub.details.documents && typeof selectedSub.details.documents === 'object')) && (
                  <div className="col-span-2 border-t border-gray-150 pt-3">
                    <span className="font-bold text-gray-400 block uppercase mb-2">Uploaded Business Documents (Multi-Files)</span>
                    <div className="flex flex-wrap gap-2">
                      {((selectedSub.documents?.gstCertificate || selectedSub.details?.documents?.gstCertificate)) && (
                        <a
                          href={selectedSub.documents?.gstCertificate || selectedSub.details?.documents?.gstCertificate}
                          download={`gst-certificate-${selectedSub._id || 'file'}`}
                          className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-755 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
                        >
                          <Download size={12} /> GST Certificate
                        </a>
                      )}
                      {((selectedSub.documents?.panCard || selectedSub.details?.documents?.panCard)) && (
                        <a
                          href={selectedSub.documents?.panCard || selectedSub.details?.documents?.panCard}
                          download={`pan-card-${selectedSub._id || 'file'}`}
                          className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-755 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
                        >
                          <Download size={12} /> PAN Card
                        </a>
                      )}
                      {((selectedSub.documents?.cancelledCheque || selectedSub.details?.documents?.cancelledCheque)) && (
                        <a
                          href={selectedSub.documents?.cancelledCheque || selectedSub.details?.documents?.cancelledCheque}
                          download={`cancelled-cheque-${selectedSub._id || 'file'}`}
                          className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-755 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
                        >
                          <Download size={12} /> Cancelled Cheque
                        </a>
                      )}
                      {((selectedSub.documents?.authorizationLetter || selectedSub.details?.documents?.authorizationLetter)) && (
                        <a
                          href={selectedSub.documents?.authorizationLetter || selectedSub.details?.documents?.authorizationLetter}
                          download={`authorization-letter-${selectedSub._id || 'file'}`}
                          className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-755 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
                        >
                          <Download size={12} /> Authorization Letter
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {(selectedSub.documents && typeof selectedSub.documents === 'string') && (
                  <div className="col-span-2 border-t border-gray-150 pt-3">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Uploaded Business Documents</span>
                    <a
                      href={selectedSub.documents}
                      download={`vendor-documents-${selectedSub._id || 'file'}`}
                      className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-755 text-white font-bold py-2 px-4 rounded-lg text-xs transition"
                    >
                      <Download size={14} /> Download Document Attachment
                    </a>
                  </div>
                )}

                {selectedSub.message && (
                  <div className="col-span-2 border-t border-gray-150 pt-3 mt-1">
                    <span className="font-bold text-gray-400 block uppercase mb-1">User Message Content</span>
                    <p className="text-gray-750 font-bold whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-xl border border-gray-100">{selectedSub.message}</p>
                  </div>
                )}

                {selectedSub.description && (
                  <div className="col-span-2 border-t border-gray-150 pt-3 mt-1">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Description Description</span>
                    <p className="text-gray-750 font-bold whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-xl border border-gray-100">{selectedSub.description}</p>
                  </div>
                )}

                {(selectedSub.whitepaperId || selectedSub.details?.whitepaperId) && (
                  <div className="col-span-2 font-semibold">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Requested Whitepaper</span>
                    <span className="font-extrabold text-gray-800 block mt-0.5 bg-white p-2.5 rounded-xl border border-gray-150">
                      {(selectedSub.whitepaperId?.title || selectedSub.details?.whitepaperId?.title) || 'N/A'} (ID: {(selectedSub.whitepaperId?._id || selectedSub.details?.whitepaperId?._id) || 'N/A'})
                    </span>
                  </div>
                )}
                {(selectedSub.reportId || selectedSub.details?.reportId) && (
                  <div className="col-span-2 font-semibold">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Requested Report</span>
                    <span className="font-extrabold text-gray-800 block mt-0.5 bg-white p-2.5 rounded-xl border border-gray-150">
                      {(selectedSub.reportId?.title || selectedSub.details?.reportId?.title) || 'N/A'} (ID: {(selectedSub.reportId?._id || selectedSub.details?.reportId?._id) || 'N/A'})
                    </span>
                  </div>
                )}
                {selectedSub.coverLetter && (
                  <div className="col-span-2 border-t border-gray-150 pt-3 mt-1">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Cover Letter Message</span>
                    <p className="text-gray-750 font-bold whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-xl border border-gray-100">{selectedSub.coverLetter}</p>
                  </div>
                )}
              </div>

              {/* Recruiter operations & updates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Assign Lead Owner</label>
                  <select
                    value={staffInput}
                    onChange={(e) => setStaffInput(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-xl text-xs font-semibold text-gray-700 focus:bg-white"
                  >
                    <option value="">Unassigned</option>
                    <option value="System Administrator">System Administrator</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Operations Administrator">Operations Coordinator</option>
                    <option value="CRM Executive">CRM Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Lead Status State</label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-255 rounded-xl text-xs font-extrabold text-gray-800 focus:bg-white"
                  >
                    {getStatusOptions(activeSubTab).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Internal Operation Notes</label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Enter details of candidate callback, audit notes, next steps or comments..."
                  className="w-full p-3 border border-gray-250 bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 outline-none focus:ring-1 focus:ring-[#1e5cdc] focus:bg-white"
                />
              </div>

            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 font-semibold">
              <button type="button" onClick={() => setDetailModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition">Close</button>
              <button type="button" onClick={saveDetailNotes} disabled={submitting} className="px-5 py-2 bg-[#1e5cdc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 transition shadow-xs">
                {submitting ? 'Saving...' : 'Save Record Changes'}
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
