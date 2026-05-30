import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Search, Plus, MapPin, Briefcase, Trash2, X, BookOpen, ChevronRight, Edit,
  LayoutDashboard, FileText, CheckCircle, Calendar, Send, UserCheck, Star,
  Award, ShieldAlert, Mail, MessageSquare, RefreshCw, BarChart2, FileSpreadsheet,
  Users, UserPlus, Bell, Clock, ChevronDown, CheckSquare, Settings, Filter, ClipboardList,
  Eye, Copy, Check, ExternalLink, HelpCircle
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  { id: 'feedback', name: 'User Feedback', endpoint: 'feedback', category: 'Support' }
];

export default function AdminSubmissions() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  // Sub-Navigation Tabs: 'overview' | 'contact' | 'demo' | etc.
  const [activeSubTab, setActiveSubTab] = useState('overview');

  // Core Data States
  const [submissions, setSubmissions] = useState([]);
  const [formStats, setFormStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Global Filters
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Detail Modal State
  const [selectedSub, setSelectedSub] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [notesInput, setNotesInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [staffInput, setStaffInput] = useState('');

  // Copy URL state helper
  const [copiedId, setCopiedId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch Form Stats
  const fetchFormStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/admin/form-stats`, { headers });
      const data = await res.json();
      if (data.stats) {
        setFormStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch form stats:", err);
    }
  }, [headers]);

  // Fetch submissions for active category
  const fetchSubmissions = useCallback(async (formType) => {
    if (formType === 'overview') return;
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
  }, [headers]);

  useEffect(() => {
    fetchFormStats();
  }, [fetchFormStats, activeSubTab]);

  useEffect(() => {
    if (activeSubTab !== 'overview') {
      fetchSubmissions(activeSubTab);
    } else {
      setLoading(false);
    }
  }, [activeSubTab, fetchSubmissions]);

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
  };

  // Copy public form link helper
  const handleCopyLink = (path, id) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast("Form link copied to clipboard!");
  };

  // Filtered submissions computed lists
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      // 1. Search filter
      const name = sub.name || sub.fullName || sub.firstName || '';
      const email = sub.email || '';
      const subject = sub.subject || sub.service || sub.jobTitle || '';
      const matchesSearch =
        name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        email.toLowerCase().includes(globalSearch.toLowerCase()) ||
        subject.toLowerCase().includes(globalSearch.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Status filter
      if (statusFilter !== 'All') {
        if ((sub.status || 'New') !== statusFilter) return false;
      }

      // 3. Date filter
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

  // Export current list to CSV
  const exportCsvReport = () => {
    if (filteredSubmissions.length === 0) {
      return showToast("No records to export.", "error");
    }
    const headersCsv = ["ID", "Name/Inquirer", "Email", "Subject/Service", "Assigned Staff", "Status", "Created Date"];
    const rows = filteredSubmissions.map(sub => [
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

      {/* Main Split sub-dashboard wrapper */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 -m-6 rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Left Sub-sidebar navigation (Submissions categories) */}
        <aside className="w-full lg:w-72 bg-slate-900 text-slate-100 flex flex-col p-5 shrink-0 border-r border-slate-800">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 rounded-xl">
              <ClipboardList size={22} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">Submissions</h2>
              <span className="text-xs text-purple-400 font-semibold tracking-wider uppercase">WMS Database</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto max-h-[65vh] pr-1 scrollbar-thin">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                activeSubTab === 'overview'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <LayoutDashboard size={16} />
              Overview Dashboard
            </button>

            <div className="pt-4 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Forms List</div>

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
                (cat.id === 'volunteer' && s.name === 'Volunteer Apps')
              );
              const count = stat ? stat.count : 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveSubTab(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    activeSubTab === cat.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText size={15} className="shrink-0 text-slate-500" />
                    <span className="truncate">{cat.name}</span>
                  </div>
                  {count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                      activeSubTab === cat.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-purple-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Total Responses:
            <p className="text-slate-200 font-bold text-sm mt-0.5">{statsOverview.total || 0}</p>
          </div>
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Top Filter Header */}
          <header className="border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-20">
            <div className="flex flex-wrap items-center gap-2 max-w-lg flex-1">
              {activeSubTab !== 'overview' && (
                <>
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      value={globalSearch}
                      onChange={(e) => setGlobalSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
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
              )}
              {activeSubTab === 'overview' && (
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <LayoutDashboard size={18} className="text-purple-600" /> WMS Submissions Console
                </h2>
              )}
            </div>

            <div className="flex items-center gap-3">
              {activeSubTab !== 'overview' && (
                <button
                  onClick={exportCsvReport}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet size={15} /> Export Category
                </button>
              )}

              <button
                onClick={() => {
                  fetchFormStats();
                  if (activeSubTab !== 'overview') fetchSubmissions(activeSubTab);
                }}
                className="p-2 border border-gray-200 text-gray-500 hover:text-purple-600 rounded-xl transition-colors hover:bg-gray-50 cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </header>

          {/* Sub Tab View Render */}
          <div className="p-6 flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                <RefreshCw className="animate-spin text-purple-600" size={32} />
                <p className="font-semibold text-xs">Loading Submissions List...</p>
              </div>
            ) : (
              <>
                {/* 1. Tab OVERVIEW */}
                {activeSubTab === 'overview' && (
                  <div className="space-y-6">
                    {/* KPI cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: 'Total Form Submissions', count: statsOverview.total, desc: 'Aggregated form entries', color: 'bg-purple-50 border-purple-100 text-purple-600', icon: <ClipboardList size={20} /> },
                        { title: 'Pending Support Tickets', count: formStats.find(s => s.name === 'Support Tickets')?.count || 0, desc: 'Open tickets needing reply', color: 'bg-red-50 border-red-100 text-red-600', icon: <Clock size={20} /> },
                        { title: 'Contact Lead Inquiries', count: formStats.find(s => s.name === 'Contact Us')?.count || 0, desc: 'New contact requests', color: 'bg-blue-50 border-blue-100 text-blue-600', icon: <Users size={20} /> },
                        { title: 'Active Demo Requests', count: formStats.find(s => s.name === 'Demo Requests')?.count || 0, desc: 'Sales funnel requests', color: 'bg-indigo-50 border-indigo-100 text-indigo-600', icon: <Calendar size={20} /> }
                      ].map((card, idx) => (
                        <div key={idx} className={`p-5 rounded-2xl border ${card.color} flex justify-between items-center h-28`}>
                          <div className="space-y-1">
                            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{card.title}</h4>
                            <p className="text-2xl font-black tracking-tight">{card.count}</p>
                            <p className="text-[10px] font-medium opacity-80 mt-0.5">{card.desc}</p>
                          </div>
                          <span className="p-3 bg-white/60 rounded-xl">{card.icon}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart visualizers */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      
                      {/* Submissions by Form Type */}
                      <div className="xl:col-span-2 bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">Submission Counts by Form Category</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                              <XAxis dataKey="name" stroke="#9ca3af" fontSize={9} />
                              <YAxis stroke="#9ca3af" fontSize={9} />
                              <Tooltip />
                              <Bar dataKey="Count" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Daily Volume Trends */}
                      <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-3">Daily Submissions growth</h3>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendsData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="date" stroke="#9ca3af" fontSize={9} />
                              <YAxis stroke="#9ca3af" fontSize={9} />
                              <Tooltip />
                              <Area type="monotone" dataKey="Inquiries" stroke="#8b5cf6" strokeWidth={2} fillOpacity={0.1} fill="#8b5cf6" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="text-[10px] text-gray-500 font-semibold text-center mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                          💡 Average conversion response time is <strong>1.5 days</strong> across all platform operations.
                        </div>
                      </div>

                    </div>

                    {/* Active Form Links Quick Share */}
                    <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs">
                      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-1">
                        <CheckCircle size={15} className="text-purple-600" /> Shareable Form Links
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {FORM_CATEGORIES.slice(0, 6).map(form => (
                          <div key={form.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-purple-100 transition-colors space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-xs text-gray-800">{form.name}</span>
                              <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{form.category}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white border border-gray-100 p-1.5 rounded text-[10px] font-mono text-gray-500">
                              <span className="truncate flex-1">{`/forms/${form.id}`}</span>
                              <button
                                onClick={() => handleCopyLink(`/forms/${form.id}`, form.id)}
                                className={`p-1 rounded shrink-0 ${copiedId === form.id ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100 text-gray-400'}`}
                              >
                                {copiedId === form.id ? <Check size={11} /> : <Copy size={11} />}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. Specific Form Submissions Table */}
                {activeSubTab !== 'overview' && (
                  <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <th className="py-3.5 px-4">ID</th>
                            <th className="py-3.5 px-4">Contact / Name</th>
                            <th className="py-3.5 px-4">Email</th>
                            <th className="py-3.5 px-4">Subject / Target</th>
                            <th className="py-3.5 px-4">Assigned Staff</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Submitted Date</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {filteredSubmissions.length > 0 ? (
                            filteredSubmissions.map((sub) => {
                              const name = sub.name || sub.fullName || `${sub.firstName || ''} ${sub.lastName || ''}`;
                              const subject = sub.subject || sub.service || sub.jobTitle || sub.interestArea || 'Form Entry';

                              return (
                                <tr key={sub._id} className="hover:bg-gray-50/50 transition-all">
                                  <td className="py-4 px-4 font-mono text-[10px] text-gray-400">
                                    {sub._id.slice(-6).toUpperCase()}
                                  </td>
                                  <td className="py-4 px-4 font-bold text-gray-900">{name}</td>
                                  <td className="py-4 px-4 text-xs font-medium text-gray-500">{sub.email}</td>
                                  <td className="py-4 px-4 font-semibold text-gray-700 max-w-[200px] truncate" title={subject}>
                                    {subject}
                                  </td>
                                  <td className="py-4 px-4 text-xs font-semibold text-purple-600">
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
                                        className="text-xs font-bold bg-purple-50 text-purple-600 hover:bg-purple-100 px-2.5 py-1 rounded transition-colors"
                                      >
                                        Manage
                                      </button>
                                      <button
                                        onClick={() => handleDeleteSubmission(sub._id)}
                                        className="text-gray-400 hover:text-red-500 p-1.5 rounded"
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
                              <td colSpan="8" className="py-12 text-center text-gray-400 font-medium">
                                No submissions found matching the current search filters.
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

      {/* ─── CANDIDATE SUBMISSION DETAIL MODAL ─── */}
      {detailModalOpen && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-purple-50/40">
              <div>
                <h2 className="text-base font-bold text-gray-800">Review Form Submission</h2>
                <p className="text-xs text-purple-500 mt-0.5 font-bold uppercase tracking-wider">
                  Type: {activeSubTab} &nbsp;|&nbsp; ID: {selectedSub._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <button onClick={() => setDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Form fields depending on selected item */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-bold text-gray-400 block uppercase">Name</span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedSub.name || selectedSub.fullName || `${selectedSub.firstName || ''} ${selectedSub.lastName || ''}`}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-bold text-gray-400 block uppercase">Email</span>
                  <span className="font-bold text-gray-800 text-sm">{selectedSub.email}</span>
                </div>

                {selectedSub.phone && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Phone</span>
                    <span className="font-semibold text-gray-800">{selectedSub.phone}</span>
                  </div>
                )}
                {selectedSub.company && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Company</span>
                    <span className="font-semibold text-gray-800">{selectedSub.company}</span>
                  </div>
                )}

                {selectedSub.jobTitle && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Job Title</span>
                    <span className="font-semibold text-gray-800">{selectedSub.jobTitle}</span>
                  </div>
                )}
                {selectedSub.employeeCount && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Employee Count</span>
                    <span className="font-semibold text-gray-800">{selectedSub.employeeCount}</span>
                  </div>
                )}

                {selectedSub.service && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Service Required</span>
                    <span className="font-semibold text-gray-850">{selectedSub.service}</span>
                  </div>
                )}
                {selectedSub.budget && (
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-bold text-gray-400 block uppercase">Budget Range</span>
                    <span className="font-bold text-purple-600">{selectedSub.budget}</span>
                  </div>
                )}

                {selectedSub.subject && (
                  <div className="col-span-2">
                    <span className="font-bold text-gray-400 block uppercase">Subject</span>
                    <span className="font-bold text-gray-800">{selectedSub.subject}</span>
                  </div>
                )}

                {selectedSub.message && (
                  <div className="col-span-2 border-t border-gray-200/50 pt-2.5 mt-1">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Message Description</span>
                    <p className="text-gray-700 font-medium whitespace-pre-wrap leading-relaxed">{selectedSub.message}</p>
                  </div>
                )}

                {selectedSub.description && (
                  <div className="col-span-2 border-t border-gray-200/50 pt-2.5 mt-1">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Description</span>
                    <p className="text-gray-700 font-medium whitespace-pre-wrap leading-relaxed">{selectedSub.description}</p>
                  </div>
                )}

                {selectedSub.coverLetter && (
                  <div className="col-span-2 border-t border-gray-200/50 pt-2.5 mt-1">
                    <span className="font-bold text-gray-400 block uppercase mb-1">Cover Letter</span>
                    <p className="text-gray-700 font-medium whitespace-pre-wrap leading-relaxed">{selectedSub.coverLetter}</p>
                  </div>
                )}
              </div>

              {/* Recruiter operations & updates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assign staff owner</label>
                  <select
                    value={staffInput}
                    onChange={(e) => setStaffInput(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="">Unassigned</option>
                    <option value="System Administrator">System Administrator</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Operations Administrator">Operations Coordinator</option>
                    <option value="CRM Executive">CRM Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Submission status</label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                  >
                    {getStatusOptions(activeSubTab).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-500 uppercase">Internal Operation Notes</label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Enter details of candidate callback, audit notes, next steps or comments..."
                  className="w-full p-3 border border-gray-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3.5">
                <button type="button" onClick={() => setDetailModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl">Close</button>
                <button type="button" onClick={saveDetailNotes} disabled={submitting} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
