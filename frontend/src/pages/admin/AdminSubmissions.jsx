import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  FileText, Users, Eye, ExternalLink, Copy, Check, Search, ClipboardList, Filter,
  ArrowUpRight, ArrowDownRight, Download, Plus, MoreHorizontal, Calendar, Mail, Phone,
  Activity, Clock, ChevronLeft, ChevronRight, BarChart2, PieChart as PieIcon, MapPin, Globe, Sparkles, Building
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
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

// Mapping Forms to Categories
const FORM_DETAILS = [
  { id: 'contact', name: 'Contact Us Form', category: 'General Communication' },
  { id: 'jobs', name: 'Job Application', category: 'Careers & Recruitment' },
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
  { id: 'volunteer', name: 'Volunteer Application', category: 'CSR & Community Programs' }
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

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormType, setSelectedFormType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');

  // Data States
  const [dashboardData, setDashboardData] = useState(null);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Submission Modal Detail View
  const [selectedSubDetail, setSelectedSubDetail] = useState(null);

  // Fetch all aggregated submissions & dashboard metrics
  const fetchDashboardData = () => {
    if (!admin?.token) return;
    setLoading(true);

    fetch(`${API}/api/admin/submissions-dashboard`, {
      headers: { Authorization: `Bearer ${admin.token}` }
    })
      .then(async r => {
        if (!r.ok) {
          throw new Error('Failed to fetch submissions');
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
  };

  useEffect(() => {
    fetchDashboardData();
  }, [admin]);

  // Apply filters on submissions list
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
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.companyName.toLowerCase().includes(q)
      );
    }

    // Status Filter
    if (statusFilter !== 'all') {
      list = list.filter(s => s.status === statusFilter);
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
      const limitDate = new Date(now.setDate(now.getDate() - 7));
      list = list.filter(s => new Date(s.createdAt) >= limitDate);
    } else if (dateRange === '30days') {
      const limitDate = new Date(now.setDate(now.getDate() - 30));
      list = list.filter(s => new Date(s.createdAt) >= limitDate);
    }

    setFilteredSubmissions(list);
    setCurrentPage(1); // reset to first page when filtering
  }, [dashboardData, selectedCategory, selectedFormType, searchTerm, statusFilter, priorityFilter, assignedFilter, dateRange]);

  // Copy details helper
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // CSV Exporter
  const handleExport = () => {
    if (filteredSubmissions.length === 0) return;
    const headers = ['Submission ID', 'Applicant Name', 'Email', 'Phone', 'Company Name', 'Form Type', 'Category', 'Assigned To', 'Status', 'Priority', 'Submitted Date'];
    const csvRows = [
      headers.join(','),
      ...filteredSubmissions.map(s => [
        s.id,
        `"${s.name.replace(/"/g, '""')}"`,
        s.email,
        s.phone,
        `"${s.companyName.replace(/"/g, '""')}"`,
        `"${s.formType}"`,
        `"${s.category}"`,
        `"${s.assignedTo}"`,
        s.status,
        s.priority,
        new Date(s.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Submissions_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage) || 1;

  // Filter dynamic subcategories when a category is selected
  const availableSubcategories = selectedCategory === 'all'
    ? FORM_DETAILS
    : FORM_DETAILS.filter(f => f.category === selectedCategory);

  // Quick statistics specifically computed for the CURRENT filtered subset of submissions
  const currentStats = {
    total: filteredSubmissions.length,
    active: filteredSubmissions.filter(s => ['New Submission', 'Under Review', 'Assigned to Department', 'Processing'].includes(s.status)).length,
    pending: filteredSubmissions.filter(s => ['Under Review', 'Assigned to Department'].includes(s.status)).length,
    responsesSent: filteredSubmissions.filter(s => ['Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated'].includes(s.status)).length,
    staffCount: new Set(filteredSubmissions.map(s => s.assignedTo)).size * 8 || 12,
    conversionRate: filteredSubmissions.length > 0
      ? ((filteredSubmissions.filter(s => ['Approved / Rejected / Completed', 'Notification Sent', 'Archived & Report Generated'].includes(s.status)).length / filteredSubmissions.length) * 100).toFixed(1)
      : '0.0'
  };

  // Pie chart COLORS
  const PIE_COLORS = ['#1e5cdc', '#10b981', '#8b5cf6', '#3b82f6', '#f59e0b', '#ec4899', '#ef4444', '#06b6d4'];
  const STATUS_COLORS = {
    'New Submission': '#3b82f6',
    'Under Review': '#f59e0b',
    'Assigned to Department': '#8b5cf6',
    'Processing': '#f97316',
    'Approved / Rejected / Completed': '#10b981',
    'Notification Sent': '#06b6d4',
    'Archived & Report Generated': '#64748b'
  };

  // Dynamic Pie / Donut distributions
  const categoryChartData = dashboardData?.categoryDistribution || [];
  const statusChartData = dashboardData?.statusDistribution || [];
  const trendLineData = dashboardData?.trendOverview || [];

  // Contact analytics reports (available when Contact Us form filtered)
  const contactReports = dashboardData?.contactReports || {
    countryReport: [],
    contactMethodReport: [],
    subjectReport: [],
    domainReport: []
  };

  return (
    <AdminLayout>
      {/* Outer Flex Container for Dashboard Grid + Local Subsidebar */}
      <div className="flex flex-col xl:flex-row gap-6 mt-4 pb-16 min-h-screen">

        {/* Left Side Category Sub-Sidebar */}
        <div className="w-full xl:w-64 shrink-0 bg-white border border-gray-150 rounded-2xl p-4 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <ClipboardList className="text-[#1e5cdc]" size={18} />
            <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">Submission Categories</h3>
          </div>
          <div className="space-y-1.5">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedFormType('all'); // reset subcategory on category change
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${isActive
                      ? 'bg-[#1e5cdc] text-white shadow-md shadow-blue-100 font-bold scale-[1.02]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: isActive ? '#fff' : cat.color }}
                    />
                    <span className="truncate">{cat.name}</span>
                  </div>
                  {dashboardData?.submissions && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                      {cat.id === 'all'
                        ? dashboardData.submissions.length
                        : dashboardData.submissions.filter(s => s.category === cat.id).length
                      }
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area (Main Dashboard Layout) */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* Top Control Filter Row */}
          <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Subcategory/Form Selector */}
              <div>
                <select
                  value={selectedFormType}
                  onChange={(e) => setSelectedFormType(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] cursor-pointer"
                >
                  <option value="all">All Form Sources</option>
                  {availableSubcategories.map(form => (
                    <option key={form.id} value={form.name}>{form.name}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter selector */}
              <div>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] cursor-pointer"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              {/* Filters Clear Button */}
              {(selectedCategory !== 'all' || selectedFormType !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all' || assignedFilter !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedFormType('all');
                    setStatusFilter('all');
                    setPriorityFilter('all');
                    setAssignedFilter('all');
                    setSearchTerm('');
                  }}
                  className="text-xs font-bold text-[#1e5cdc] hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search input field */}
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Search applicants, emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full md:w-64 font-medium"
                />
              </div>

              {/* Add Task Button */}
              <button
                onClick={() => navigate('/admin/tasks')}
                className="bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-100 transition-all shrink-0 cursor-pointer"
              >
                <Plus size={14} /> Add / Create Task
              </button>
            </div>
          </div>

          {/* loading animation */}
          {loading ? (
            <div className="bg-white border border-gray-100 rounded-2xl h-96 flex items-center justify-center shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 font-bold text-sm tracking-wide">Aggregating live platform leads...</span>
              </div>
            </div>
          ) : (
            <>
              {/* High-Fidelity Dynamic Metric Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

                {/* Metric Card 1: Total Submissions */}
                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all group">
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
                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all group">
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
                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-amber-250 transition-all group">
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
                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-purple-200 transition-all group">
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
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mt-0.5">Assigned Staff</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                    <Sparkline data={[2, 3, 5, 5, 8, 10, 12, 12, 15]} color="#8b5cf6" />
                  </div>
                </div>

                {/* Metric Card 5: Responses Sent */}
                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-cyan-200 transition-all group">
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
                <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-rose-200 transition-all group">
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

              {/* Dynamic Recharts Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. Submissions by Category (Pie/Donut Chart) */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-sm">Submissions by Category</h4>
                  </div>
                  <div className="flex-1 relative h-48">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                      <span className="text-2xl font-black text-gray-800">{currentStats.total}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Leads</span>
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
                        <Tooltip formatter={(value) => [`${value} Leads`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend listing */}
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

                {/* 2. Submission Trend Overview (Line Chart) */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">Submission Trend Overview</h4>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-0.5 bg-[#1e5cdc]"></span>
                        <span>This Week</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-0.5 border-t border-dashed border-gray-300"></span>
                        <span>Last Week</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full text-[10px] font-semibold">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendLineData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="This Week" stroke="#1e5cdc" strokeWidth={3} dot={{ r: 3, fill: '#1e5cdc' }} activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Last Week" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 3. Submissions by Status (Pie/Donut Chart) */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-sm">Submissions by Status</h4>
                  </div>
                  <div className="flex-1 relative h-48">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                      <span className="text-2xl font-black text-gray-800">{currentStats.total}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total</span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusChartData}
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {statusChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#64748b'} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} Submissions`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend listing */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] font-semibold text-gray-500 max-h-[70px] overflow-y-auto custom-scrollbar">
                    {statusChartData.map((entry, idx) => (
                      <div key={entry.name} className="flex items-center gap-1 truncate">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[entry.name] || '#64748b' }}></span>
                        <span className="truncate">{entry.name}</span>
                        <span className="text-gray-400 font-bold shrink-0">({entry.value})</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* SPECIAL CONTACT US DEDICATED USER REPORTING PANEL */}
              {/* Only shown if General Communication (category) or Contact Us Form (subcategory) is selected */}
              {(selectedCategory === 'General Communication' || selectedFormType === 'Contact Us Form') && (
                <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/30 border border-blue-100 rounded-3xl p-6 shadow-sm space-y-6">

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-100/50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 text-[#1e5cdc] rounded-2xl shadow-sm">
                        <BarChart2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                          Contact Us Form Lead Reports
                          <span className="text-[10px] font-black bg-blue-500 text-white uppercase tracking-widest px-2 py-0.5 rounded-full">User Inputs Insights</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">Dynamic analytical reports compiled directly from user-submitted form details.</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#1e5cdc] uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full shrink-0">
                      {contactReports.totalContacts} Submissions Loaded
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Country distribution */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col h-[280px]">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#1e5cdc]" /> Geographical Sources
                      </h4>
                      <div className="flex-1 overflow-y-auto space-y-3.5 custom-scrollbar pr-1 pt-1">
                        {contactReports.countryReport.map((c, idx) => {
                          const maxVal = Math.max(...contactReports.countryReport.map(r => r.value));
                          const percent = maxVal > 0 ? (c.value / maxVal) * 100 : 0;
                          return (
                            <div key={c.name} className="space-y-1">
                              <div className="flex justify-between text-[11px] font-bold text-gray-600">
                                <span>{c.name}</span>
                                <span>{c.value} Leads</span>
                              </div>
                              <div className="w-full bg-gray-50 rounded-full h-1.5 border border-gray-100">
                                <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col h-[280px]">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Globe size={14} className="text-emerald-500" /> Preferred Contact Method
                      </h4>
                      <div className="flex-1 relative h-36">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={contactReports.contactMethodReport}
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {contactReports.contactMethodReport.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#1e5cdc' : '#10b981'} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 mt-2 text-[10px] font-bold text-gray-500">
                        {contactReports.contactMethodReport.map((entry, idx) => (
                          <div key={entry.name} className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: idx === 0 ? '#1e5cdc' : '#10b981' }}></span>
                            <span>{entry.name} ({entry.value})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top Subjects */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col h-[280px]">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-purple-500" /> Lead Subjects (Top 5)
                      </h4>
                      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                        {contactReports.subjectReport.slice(0, 5).map((s, idx) => (
                          <div key={s.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50">
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[10px] font-black bg-purple-50 text-purple-600 w-5 h-5 flex items-center justify-center rounded-lg">{idx + 1}</span>
                              <span className="text-[11px] font-bold text-gray-700 truncate max-w-[120px]">{s.name}</span>
                            </div>
                            <span className="text-[10px] font-extrabold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{s.value} Leads</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Email Domains / Companies */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col h-[280px]">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Building size={14} className="text-cyan-500" /> Key Corporate Leads
                      </h4>
                      <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
                        {contactReports.domainReport.map((d, idx) => (
                          <div key={d.name} className="flex items-center justify-between p-2 hover:bg-cyan-50/50 rounded-xl transition-colors border border-cyan-50">
                            <div className="flex items-center gap-2 truncate">
                              <div className="w-6 h-6 rounded-lg bg-cyan-50 text-cyan-600 text-xs font-black flex items-center justify-center shrink-0">@</div>
                              <span className="text-[11px] font-bold text-gray-700 truncate">{d.name}</span>
                            </div>
                            <span className="text-[10px] font-extrabold text-cyan-600 shrink-0">{d.value} Leads</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* Main Content Split Area: Submissions Table (Left) + Sidebar (Right) */}
              <div className="flex flex-col lg:flex-row gap-6">

                {/* 1. Recent Submissions Table Area (Width 3/4) */}
                <div className="flex-1 bg-white border border-gray-150 rounded-2xl shadow-sm overflow-hidden flex flex-col">

                  {/* Table Control Header */}
                  <div className="p-4 sm:p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
                    <div>
                      <h3 className="font-extrabold text-gray-800 text-sm uppercase tracking-wider">Recent Submissions</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Showing {currentSubmissions.length} of {filteredSubmissions.length} matching entries.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">

                      {/* Priority selector */}
                      <select
                        value={priorityFilter}
                        onChange={e => setPriorityFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[10px] font-extrabold text-gray-500 uppercase focus:outline-none cursor-pointer"
                      >
                        <option value="all">Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>

                      {/* Status Selector */}
                      <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-[10px] font-extrabold text-gray-500 uppercase focus:outline-none cursor-pointer"
                      >
                        <option value="all">Status</option>
                        <option value="New Submission">New Submission</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Assigned to Department">Assigned to Department</option>
                        <option value="Processing">Processing</option>
                        <option value="Approved / Rejected / Completed">Approved / Rejected / Completed</option>
                        <option value="Notification Sent">Notification Sent</option>
                        <option value="Archived & Report Generated">Archived & Report Generated</option>
                      </select>

                      {/* Export Button */}
                      <button
                        onClick={handleExport}
                        disabled={filteredSubmissions.length === 0}
                        className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:text-[#1e5cdc] hover:border-[#1e5cdc] px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-gray-500 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Download size={12} /> Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Table Element wrapper */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                          <th className="py-3 px-5">ID</th>
                          <th className="py-3 px-4">Applicant Name</th>
                          <th className="py-3 px-4">Form Type (Subcat)</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Contact</th>
                          <th className="py-3 px-4">Assigned To</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-600">
                        {currentSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-gray-400 font-medium bg-white">
                              No matching form submissions found. Try adjusting filters.
                            </td>
                          </tr>
                        ) : (
                          currentSubmissions.map((sub) => {
                            const isContactForm = sub.formType === 'Contact Us Form';
                            return (
                              <tr key={sub._id} className="hover:bg-blue-50/10 transition-colors">
                                <td className="py-3.5 px-5">
                                  <span className="font-bold text-[#1e5cdc]">{sub.id}</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-gray-800">
                                  <div className="truncate max-w-[130px]" title={sub.name}>{sub.name}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-gray-500 truncate max-w-[140px] block" title={sub.formType}>{sub.formType}</span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${sub.category === 'Careers & Recruitment' ? 'bg-emerald-50 text-emerald-600' :
                                      sub.category === 'Client Acquisition & Sales' ? 'bg-blue-50 text-blue-600' :
                                        sub.category === 'Partnerships & Business Network' ? 'bg-purple-50 text-purple-600' :
                                          sub.category === 'Customer Support Services' ? 'bg-amber-50 text-amber-600' :
                                            'bg-gray-100 text-gray-500'
                                    }`}>
                                    {sub.category}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="text-[10px] space-y-0.5 font-medium">
                                    <div className="text-gray-700 truncate max-w-[140px] flex items-center gap-1">
                                      <Mail size={10} className="text-gray-300" /> {sub.email}
                                    </div>
                                    <div className="text-gray-400 flex items-center gap-1">
                                      <Phone size={10} className="text-gray-300" /> {sub.phone}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e5cdc]"></span>
                                    <span className="text-gray-700 font-bold">{sub.assignedTo}</span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md" style={{
                                    backgroundColor:
                                      sub.status === 'New Submission' ? '#eff6ff' :
                                        sub.status === 'Under Review' ? '#fef3c7' :
                                          sub.status === 'Assigned to Department' ? '#f3e8ff' :
                                            sub.status === 'Processing' ? '#ffedd5' :
                                              sub.status === 'Approved / Rejected / Completed' ? '#ecfdf5' :
                                                sub.status === 'Notification Sent' ? '#ecfeff' :
                                                  '#f1f5f9',
                                    color:
                                      sub.status === 'New Submission' ? '#2563eb' :
                                        sub.status === 'Under Review' ? '#d97706' :
                                          sub.status === 'Assigned to Department' ? '#7c3aed' :
                                            sub.status === 'Processing' ? '#ea580c' :
                                              sub.status === 'Approved / Rejected / Completed' ? '#059669' :
                                                sub.status === 'Notification Sent' ? '#0891b2' :
                                                  '#475569',
                                    border: `1px solid ${sub.status === 'New Submission' ? '#dbeafe' :
                                        sub.status === 'Under Review' ? '#fde68a' :
                                          sub.status === 'Assigned to Department' ? '#e9d5ff' :
                                            sub.status === 'Processing' ? '#fed7aa' :
                                              sub.status === 'Approved / Rejected / Completed' ? '#a7f3d0' :
                                                sub.status === 'Notification Sent' ? '#cffafe' :
                                                  '#e2e8f0'
                                      }`
                                  }}>
                                    {sub.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => setSelectedSubDetail(sub)}
                                      className="p-1.5 text-gray-400 hover:text-[#1e5cdc] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                      title="View Submission Details"
                                    >
                                      <Eye size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleCopy(sub._id, `${sub.id} - ${sub.name} (${sub.email})`)}
                                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${copiedId === sub._id ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'
                                        }`}
                                      title="Copy Quick Info"
                                    >
                                      {copiedId === sub._id ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination control footer bar */}
                  {totalPages > 1 && (
                    <div className="px-5 py-4 border-t border-gray-150 flex items-center justify-between bg-gray-50/50 mt-auto">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-45 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
                      >
                        <ChevronLeft size={14} className="inline mr-1" /> Previous
                      </button>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-45 disabled:cursor-not-allowed shadow-sm transition-all cursor-pointer"
                      >
                        Next <ChevronRight size={14} className="inline ml-1" />
                      </button>
                    </div>
                  )}

                </div>

                {/* 2. Side Panel Cards (Width 1/4) */}
                <div className="w-full lg:w-80 shrink-0 space-y-6">

                  {/* Widget A: Upcoming Follow-Ups */}
                  <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={14} className="text-amber-500" /> Upcoming Follow-Ups
                      </h4>
                      <span className="text-[10px] font-bold text-[#1e5cdc] hover:underline cursor-pointer">View All</span>
                    </div>
                    <div className="space-y-3">
                      {filteredSubmissions.filter(s => ['In Progress', 'Under Review', 'New'].includes(s.status) && s.priority === 'High').slice(0, 4).map(sub => (
                        <div key={sub._id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer" onClick={() => setSelectedSubDetail(sub)}>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-[#1e5cdc]">{sub.id}</span>
                            <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-md">High</span>
                          </div>
                          <h5 className="font-bold text-gray-800 text-xs mt-1 truncate">{sub.name}</h5>
                          <span className="text-[10px] text-gray-500 block truncate mt-0.5">{sub.formType}</span>
                          <span className="text-[9px] text-gray-400 font-medium block mt-1.5 flex items-center gap-1">
                            <Calendar size={10} /> {new Date(sub.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      ))}
                      {filteredSubmissions.filter(s => ['In Progress', 'Under Review', 'New'].includes(s.status) && s.priority === 'High').length === 0 && (
                        <div className="py-6 text-center text-xs text-gray-400 font-semibold bg-gray-50/50 rounded-xl border border-dashed border-gray-150">
                          No pending follow-ups found.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Widget B: Recent Activities */}
                  <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Activity size={14} className="text-[#1e5cdc]" /> Recent Activities
                      </h4>
                      <span className="text-[10px] font-bold text-[#1e5cdc] hover:underline cursor-pointer">View All</span>
                    </div>
                    <div className="space-y-4">
                      {filteredSubmissions.slice(0, 4).map((sub, idx) => {
                        const activities = [
                          `assigned ${sub.id} to ${sub.assignedTo}`,
                          `updated status for ${sub.id} to ${sub.status}`,
                          `replied to ${sub.id} query`,
                          `submitted new form for ${sub.formType}`
                        ];
                        const logTime = [`10 mins ago`, `25 mins ago`, `1 hour ago`, `2 hours ago`][idx];
                        const operator = [`John Admin`, `${sub.assignedTo}`, `Support Team`, `User Guest`][idx];
                        return (
                          <div key={`act-${idx}`} className="flex gap-2.5 text-[11px] font-semibold text-gray-600 leading-tight">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1e5cdc] shrink-0 mt-1.5"></div>
                            <div>
                              <span>
                                <strong className="text-gray-800 font-bold">{operator}</strong> {activities[idx]}
                              </span>
                              <span className="text-[9px] text-gray-400 block mt-1">{logTime}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Widget C: Top Performing Categories */}
                  <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <BarChart2 size={14} className="text-emerald-500" /> Top Performing Categories
                      </h4>
                    </div>
                    <div className="space-y-3.5 pt-1">
                      {categoryChartData.slice(0, 5).map((cat, idx) => (
                        <div key={cat.name} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-gray-600">
                            <span className="truncate max-w-[180px]">{cat.name}</span>
                            <span>{cat.value} Leads</span>
                          </div>
                          <div className="w-full bg-gray-50 rounded-full h-1.5 border border-gray-100">
                            <div className="bg-[#1e5cdc] h-1.5 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </>
          )}

        </div>

      </div>

      {/* DETAILED VIEW SUBMISSION DETAILS MODAL */}
      {selectedSubDetail && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-150 flex flex-col">

            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white bg-[#1e5cdc] px-3 py-1 rounded-xl shadow-md shadow-blue-100">
                  {selectedSubDetail.id}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100">
                  {selectedSubDetail.formType}
                </span>
              </div>
              <button
                onClick={() => setSelectedSubDetail(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-150 flex items-center justify-center text-gray-400 hover:text-gray-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">

              {/* Profile Block */}
              <div className="flex items-center gap-4 p-4 bg-blue-50/40 rounded-2xl border border-blue-100/50">
                <img
                  src={`https://ui-avatars.com/api/?name=${selectedSubDetail.name}&background=1e5cdc&color=fff&size=80`}
                  alt={selectedSubDetail.name}
                  className="w-16 h-16 rounded-2xl border border-white shadow-sm shrink-0"
                />
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg leading-tight">{selectedSubDetail.name}</h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1 flex items-center gap-1"><Mail size={12} /> {selectedSubDetail.email}</p>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5 flex items-center gap-1"><Phone size={12} /> {selectedSubDetail.phone}</p>
                </div>
              </div>

              {/* Submission Metadata Details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-600">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Category</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.category}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Assigned To</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.assignedTo}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Status</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.status}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-0.5">Priority</span>
                  <span className="text-gray-800 font-bold block">{selectedSubDetail.priority}</span>
                </div>
              </div>

              {/* Dynamic User Input Fields Loop */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider border-b border-gray-100 pb-2">Submitted User Inputs</h4>
                <div className="bg-white rounded-2xl border border-gray-150 p-5 space-y-4 text-xs font-semibold text-gray-600">
                  {Object.keys(selectedSubDetail.details || {}).map((key) => {
                    const val = selectedSubDetail.details[key];
                    if (
                      ['_id', 'createdAt', 'updatedAt', '__v', 'id', 'name', 'fullName', 'email', 'phone', 'phoneNumber', 'mobile', 'status', 'priority'].includes(key) ||
                      typeof val === 'object' ||
                      !val
                    ) return null;

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
                className="px-4 py-2 bg-[#1e5cdc] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition cursor-pointer"
              >
                Copy Full Data
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
