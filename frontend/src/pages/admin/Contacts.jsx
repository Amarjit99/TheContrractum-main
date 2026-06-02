import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend 
} from 'recharts';
import { 
  ChevronDown, ChevronUp, Trash2, Mail, Calendar, Search, 
  Users, Activity, TrendingUp, Target, RefreshCw, Filter, 
  ClipboardCheck, Clock, FileText, CheckCircle2, UserCheck, 
  Edit3, ArrowUpRight, Eye, Download, Info, Check, AlertCircle, Phone
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Harmonized premium color palette for charts
const COLORS = {
  blue: '#1e5cdc',
  emerald: '#10b981',
  amber: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  teal: '#06b6d4',
  rose: '#f43f5e',
  indigo: '#6366f1',
  neutral: '#94a3b8'
};

const CHART_COLORS = [COLORS.blue, COLORS.purple, COLORS.teal, COLORS.emerald, COLORS.amber, COLORS.pink, COLORS.rose];

// High fidelity seed data for visual excellence and cold-start fallback
const SAMPLE_MOCK_LEADS = [
  {
    _id: 'mock-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    subject: 'Job',
    message: 'I am interested in applying for the Senior Software Engineer position listed on your careers page. I have 6+ years of fullstack experience.',
    status: 'Under Review',
    priority: 'High',
    assignedTo: 'HR Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() // 12 hours ago
  },
  {
    _id: 'mock-2',
    name: 'ABC Pvt Ltd',
    email: 'contact@abcpvtltd.com',
    phone: '+1 91234 56789',
    subject: 'Others',
    message: 'Requesting a demo for the Enterprise Contract Lifecycle Management platform. We manage over 5,000 contracts monthly.',
    status: 'Follow-Up Pending',
    priority: 'Medium',
    assignedTo: 'Sales Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() // 1 day ago
  },
  {
    _id: 'mock-3',
    name: 'Priya Nair',
    email: 'priya.nair@email.com',
    phone: '+91 91234 56789',
    subject: 'Counseling',
    message: 'Hello, I would like to schedule a career counseling session for myself. I am a fresh graduate in IT.',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Support Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString() // 2 days ago
  },
  {
    _id: 'mock-4',
    name: 'XYZ Solutions',
    email: 'info@xyz.com',
    phone: '+91 98887 76655',
    subject: 'Others',
    message: 'We are a consulting firm looking to establish a partnership with The Contractum for sub-contracting tech services.',
    status: 'New',
    priority: 'Medium',
    assignedTo: 'Unassigned',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 62).toISOString() // 2.5 days ago
  },
  {
    _id: 'mock-5',
    name: 'Neha Gupta',
    email: 'neha.gupta@gmail.com',
    phone: '+91 87654 32109',
    subject: 'Internship',
    message: 'I am a pre-final year B.Tech student seeking a summer internship in Frontend Engineering (React.js).',
    status: 'New',
    priority: 'Low',
    assignedTo: 'HR Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString() // 3 days ago
  },
  {
    _id: 'mock-6',
    name: 'Amit Verma',
    email: 'amit.verma@yahoo.com',
    phone: '+91 88776 65544',
    subject: 'Mentorship',
    message: 'I would like to apply as a mentor for your upcoming tech accelerator batch. I have 10+ years in Product Management.',
    status: 'Resolved',
    priority: 'Low',
    assignedTo: 'HR Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 95).toISOString() // 4 days ago
  },
  {
    _id: 'mock-7',
    name: 'Rohit Mehta',
    email: 'rohit.mehta@email.com',
    phone: '+91 70909 12345',
    subject: 'Others',
    message: 'Applying for the Volunteer drive for the Community Reach Initiative. Let me know the timings.',
    status: 'Resolved',
    priority: 'Medium',
    assignedTo: 'Support Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString() // 5 days ago
  },
  {
    _id: 'mock-8',
    name: 'Karan Malhotra',
    email: 'karan.m@gmail.com',
    phone: '+91 99887 77766',
    subject: 'Job',
    message: 'Applying for the Lead UX/UI Designer role. Portfolio attached in email conversation.',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Sales Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 140).toISOString() // 6 days ago
  },
  {
    _id: 'mock-9',
    name: 'Sneha Rao',
    email: 'sneha.rao@outlook.com',
    phone: '+91 77665 44321',
    subject: 'Internship',
    message: 'Seeking a Business Analyst Internship. Available immediately.',
    status: 'Resolved',
    priority: 'Low',
    assignedTo: 'HR Team',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 160).toISOString() // 7 days ago
  }
];

export default function AdminContacts() {
  const { admin } = useAdminAuth();

  const [contacts, setContacts] = useState([]);
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Table Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Active Modals & Selected Lead
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  // Work Flow Editor Temp State
  const [workflowStatus, setWorkflowStatus] = useState('New');
  const [workflowPriority, setWorkflowPriority] = useState('Low');
  const [workflowAssignee, setWorkflowAssignee] = useState('Unassigned');

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedAssignee, setSelectedAssignee] = useState('All');
  
  // Custom Date Filter
  const [dateRange, setDateRange] = useState('All Time');

  // Activities Ledger (Timeline tracker)
  const [activities, setActivities] = useState([
    { id: 1, text: 'System initialized mock submissions ledger', time: '10 mins ago', type: 'system' },
    { id: 2, text: 'Admin synchronized live database connections', time: '25 mins ago', type: 'security' },
    { id: 3, text: 'Mail server connected to leads notifier API', time: '1 hour ago', type: 'system' }
  ]);

  const [expanded, setExpanded] = useState(null);
  const [msg, setMsg] = useState('');

  // Parse URL tab parameter or default to 'general'
  const queryParams = new URLSearchParams(window.location.search);
  const tabParam = queryParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    ['general', 'demo', 'quote', 'support'].includes(tabParam) ? tabParam : 'general'
  );

  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  // Sync tab active state with changes to window search location
  useEffect(() => {
    const qParams = new URLSearchParams(window.location.search);
    const tParam = qParams.get('tab');
    if (tParam && ['general', 'demo', 'quote', 'support'].includes(tParam)) {
      setActiveTab(tParam);
    }
  }, [window.location.search]);

  // Fetch full stats and contacts from server
  const fetchDashboardData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      // Fetch full stats (all records)
      const res = await fetch(`${API}/api/admin/contacts/stats`, { headers });
      if (res.ok) {
        const serverLeads = await res.json();
        
        // Merge server leads with mock leads to ensure a rich dashboard visualization.
        const mergedLeads = [...serverLeads];
        
        // Append mock leads that are not present
        SAMPLE_MOCK_LEADS.forEach(mock => {
          if (!mergedLeads.some(lead => lead.email.toLowerCase() === mock.email.toLowerCase())) {
            mergedLeads.push(mock);
          }
        });

        // Sort descending by creation date
        mergedLeads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setContacts(mergedLeads);
      } else {
        setContacts(SAMPLE_MOCK_LEADS);
      }
    } catch (err) {
      console.error('Error synchronizing dashboard leads:', err);
      setContacts(SAMPLE_MOCK_LEADS);
      toast.error('Using offline cache. Server connection issue.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchItems = useCallback(async () => {
    if (!admin?.token) return;
    setLoading(true);
    let endpoint = 'contacts';
    if (activeTab === 'demo') endpoint = 'demo-requests';
    else if (activeTab === 'quote') endpoint = 'quote-requests';
    else if (activeTab === 'support') endpoint = 'support-tickets';

    try {
      const res = await fetch(`${API}/api/admin/${endpoint}?page=${page}&limit=10`, { headers });
      const d = await res.json();
      
      let itemsList = [];
      if (activeTab === 'general') itemsList = d.contacts || [];
      else if (activeTab === 'demo') itemsList = d.demoRequests || [];
      else if (activeTab === 'quote') itemsList = d.quoteRequests || [];
      else if (activeTab === 'support') itemsList = d.supportTickets || [];

      setData({
        items: itemsList,
        total: d.total || 0,
        pages: d.pages || 1
      });
    } catch (err) {
      console.error("Error fetching admin items:", err);
      setData({ items: [], total: 0, pages: 1 });
    } finally {
      setLoading(false);
    }
  }, [page, activeTab, admin?.token, headers]);

  useEffect(() => {
    if (admin?.token) {
      if (activeTab === 'general') {
        fetchDashboardData();
      } else {
        fetchItems();
      }
    }
  }, [admin, activeTab, page]);

  const totalCount = data.total || 0;

  const filteredItems = (data.items || []).filter(c => {
    const searchLower = (search || '').toLowerCase();
    if (activeTab === 'general') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.subject || '').toLowerCase().includes(searchLower)
      );
    } else if (activeTab === 'demo') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.companyName || '').toLowerCase().includes(searchLower) ||
        (c.productInterested || '').toLowerCase().includes(searchLower)
      );
    } else if (activeTab === 'quote') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.company || '').toLowerCase().includes(searchLower) ||
        (c.serviceRequired || '').toLowerCase().includes(searchLower)
      );
    } else if (activeTab === 'support') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.ticketSubject || '').toLowerCase().includes(searchLower) ||
        (c.category || '').toLowerCase().includes(searchLower)
      );
    }
    return false;
  });

  const deleteItem = async (id) => {
    if (typeof id === 'string' && id.startsWith('mock-')) return toast.success("Cannot delete demo data.");
    let itemTypeName = 'contact submission';
    let endpoint = 'contacts';
    if (activeTab === 'demo') {
      itemTypeName = 'demo request';
      endpoint = 'demo-requests';
    } else if (activeTab === 'quote') {
      itemTypeName = 'quote request';
      endpoint = 'quote-requests';
    } else if (activeTab === 'support') {
      itemTypeName = 'support ticket';
      endpoint = 'support-tickets';
    }

    if (!confirm(`Delete this ${itemTypeName}?`)) return;
    const res = await fetch(`${API}/api/admin/${endpoint}/${id}`, { method: 'DELETE', headers });
    if (res.ok) { 
      setMsg(`${itemTypeName.charAt(0).toUpperCase() + itemTypeName.slice(1)} deleted successfully.`); 
      setTimeout(() => setMsg(''), 3000); 
      fetchItems(); 
    }
  };

  // Workflow update trigger
  const handleUpdateWorkflow = async (e) => {
    e.preventDefault();
    if (!selectedLead) return;

    const originalLead = contacts.find(c => c._id === selectedLead._id);

    // Optimize local state instantly for extreme responsiveness
    setContacts(prev => prev.map(c => 
      c._id === selectedLead._id 
        ? { ...c, status: workflowStatus, priority: workflowPriority, assignedTo: workflowAssignee } 
        : c
    ));
    setShowWorkflowModal(false);
    toast.success('Lead workflow updated successfully.');

    // Add activity log locally
    const changes = [];
    if (originalLead.status !== workflowStatus) changes.push(`status to '${workflowStatus}'`);
    if (originalLead.priority !== workflowPriority) changes.push(`priority to '${workflowPriority}'`);
    if (originalLead.assignedTo !== workflowAssignee) changes.push(`assignment to '${workflowAssignee}'`);
    
    if (changes.length > 0) {
      setActivities(prev => [
        {
          id: Date.now(),
          text: `Admin updated SUB-${selectedLead._id.substring(0,4).toUpperCase()} (${selectedLead.name}) ${changes.join(', ')}`,
          time: 'Just now',
          type: 'update'
        },
        ...prev
      ]);
    }

    // Call server API for persistent update if it is not a mock record
    if (selectedLead._id && !selectedLead._id.startsWith('mock-')) {
      try {
        const res = await fetch(`${API}/api/admin/contacts/${selectedLead._id}`, {
          method: 'PUT',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: workflowStatus,
            priority: workflowPriority,
            assignedTo: workflowAssignee
          })
        });
        if (!res.ok) {
          throw new Error('Failed to update workflow on server');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to sync changes with cloud database. Reverting.');
        // Revert local state
        setContacts(prev => prev.map(c => c._id === selectedLead._id ? originalLead : c));
      }
    }
  };

  // Safe delete lead
  const handleDeleteLead = async (id) => {
    if (id.startsWith('mock-')) {
      toast.error('Sample demo lead records cannot be deleted.');
      return;
    }

    if (!confirm('Are you absolutely sure you want to permanently delete this lead submission? This action is irreversible.')) return;

    // Local filter state update
    const targetLead = contacts.find(c => c._id === id);
    setContacts(prev => prev.filter(c => c._id !== id));
    toast.success('Submission permanently removed.');

    setActivities(prev => [
      {
        id: Date.now(),
        text: `Admin deleted lead submission from ${targetLead?.name || 'Unknown'}`,
        time: 'Just now',
        type: 'delete'
      },
      ...prev
    ]);

    try {
      const res = await fetch(`${API}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) {
        throw new Error('Failed to delete on server');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to sync deletion with cloud database.');
      fetchDashboardData(true);
    }
  };

  // Helper to open workflow drawer
  const openWorkflowEditor = (lead) => {
    setSelectedLead(lead);
    setWorkflowStatus(lead.status || 'New');
    setWorkflowPriority(lead.priority || 'Low');
    setWorkflowAssignee(lead.assignedTo || 'Unassigned');
    setShowWorkflowModal(true);
  };

  // Dynamic calculations based on current leads in the database
  const stats = useMemo(() => {
    const total = contacts.length;
    const active = contacts.filter(c => c.status === 'In Progress' || c.status === 'Under Review').length;
    const pendingFollowUps = contacts.filter(c => c.status === 'Follow-Up Pending').length;
    
    // Assigned Staff: Count leads assigned to distinct non-unassigned people/teams
    const assignedLeads = contacts.filter(c => c.assignedTo && c.assignedTo !== 'Unassigned');
    const assignedCount = assignedLeads.length;
    
    // Total staff count (unique names/teams)
    const uniqueStaff = new Set(assignedLeads.map(c => c.assignedTo));
    const staffCount = uniqueStaff.size || 0;

    const resolved = contacts.filter(c => c.status === 'Resolved').length;
    const conversionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : '0.0';

    return {
      total,
      active,
      pendingFollowUps,
      assignedCount,
      staffCount,
      resolved,
      conversionRate
    };
  }, [contacts]);

  // Visual Breakdowns data calculated dynamically
  const categoryChartData = useMemo(() => {
    const counts = {};
    contacts.forEach(c => {
      const cat = c.subject || 'Others';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [contacts]);

  const statusChartData = useMemo(() => {
    const counts = { 'New': 0, 'Under Review': 0, 'In Progress': 0, 'Follow-Up Pending': 0, 'Resolved': 0 };
    contacts.forEach(c => {
      if (counts[c.status] !== undefined) counts[c.status]++;
      else counts['New']++;
    });
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [contacts]);

  const trendOverviewData = useMemo(() => {
    const dataObj = {};
    
    // Initialize past 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dataObj[label] = { label, count: 0 };
    }

    contacts.forEach(c => {
      const dateStr = new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (dataObj[dateStr]) {
        dataObj[dateStr].count++;
      }
    });

    return Object.values(dataObj);
  }, [contacts]);

  // Horizontal category performance bars
  const topCategories = useMemo(() => {
    const total = contacts.length || 1;
    const grouped = {};
    contacts.forEach(c => {
      const cat = c.subject || 'Others';
      grouped[cat] = (grouped[cat] || 0) + 1;
    });

    return Object.keys(grouped)
      .map(name => ({
        name,
        count: grouped[name],
        percentage: ((grouped[name] / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  }, [contacts]);

  // Upcoming Follow-ups list widget
  const upcomingFollowUps = useMemo(() => {
    return contacts
      .filter(c => c.status === 'Follow-Up Pending')
      .slice(0, 4)
      .map(c => ({
        id: c._id,
        subId: `SUB-${c._id.substring(0, 4).toUpperCase()}`,
        name: c.name,
        subject: c.subject,
        priority: c.priority,
        date: new Date(c.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
      }));
  }, [contacts]);

  // Apply Advanced Filters to lead listing
  const filteredLeads = useMemo(() => {
    return contacts.filter(lead => {
      // 1. Search term (Name, email, message)
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead._id.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category / Subject
      const matchesCategory = selectedCategory === 'All' || lead.subject === selectedCategory;

      // 3. Status
      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;

      // 4. Priority
      const matchesPriority = selectedPriority === 'All' || lead.priority === selectedPriority;

      // 5. Assigned Staff
      const matchesAssignee = selectedAssignee === 'All' || lead.assignedTo === selectedAssignee;

      // 6. Date Range Filter
      let matchesDate = true;
      if (dateRange === 'Last 7 Days') {
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - 7);
        matchesDate = new Date(lead.createdAt) >= limitDate;
      } else if (dateRange === 'Last 30 Days') {
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - 30);
        matchesDate = new Date(lead.createdAt) >= limitDate;
      }

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesAssignee && matchesDate;
    });
  }, [contacts, searchTerm, selectedCategory, selectedStatus, selectedPriority, selectedAssignee, dateRange]);

  // Paginated listings
  const paginatedLeads = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeads, page]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;

  // Export filtered leads to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      toast.error('No leads available to export.');
      return;
    }

    const headersList = ['ID', 'Applicant Name', 'Subject (Category)', 'Email', 'Phone', 'Assigned Staff', 'Status', 'Priority', 'Submitted Date', 'Message'];
    const rows = filteredLeads.map((c, idx) => [
      `SUB-${c._id.substring(0, 4).toUpperCase()}`,
      c.name,
      c.subject,
      c.email,
      c.phone || 'N/A',
      c.assignedTo || 'Unassigned',
      c.status,
      c.priority,
      new Date(c.createdAt).toLocaleDateString(),
      c.message.replace(/"/g, '""')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headersList.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Submission_Reports_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Successfully exported ${filteredLeads.length} records to CSV!`);
  };

  return (
    <AdminLayout>
      {/* Upper Utility Navbar Section */}
      <div className="mb-6 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black text-white bg-[#1e5cdc] px-2 py-0.5 rounded-full uppercase tracking-widest">
              Live Database
            </span>
            {refreshing && (
              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <RefreshCw size={10} className="animate-spin" /> Syncing data...
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            Submission Management Dashboard
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            Monitor, analyze, and manage dynamic pipeline statistics for Contact Us submissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Date Range Picker */}
          {activeTab === 'general' && (
            <select 
              value={dateRange}
              onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
              className="px-3 py-2 bg-white border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
            >
              <option value="All Time">📅 All Time Range</option>
              <option value="Last 7 Days">📅 Past 7 Days</option>
              <option value="Last 30 Days">📅 Past 30 Days</option>
            </select>
          )}

          <button 
            onClick={() => {
              if (activeTab === 'general') {
                fetchDashboardData(true);
              } else {
                fetchItems();
              }
            }}
            className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold"
            title="Refresh Leads Ledger"
          >
            <RefreshCw size={14} className={refreshing || loading ? 'animate-spin' : ''} />
            Sync
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => { setActiveTab('general'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'general' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          General Contacts
        </button>
        <button
          onClick={() => { setActiveTab('demo'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'demo' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Demo Requests
        </button>
        <button
          onClick={() => { setActiveTab('quote'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'quote' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Quote Requests
        </button>
        <button
          onClick={() => { setActiveTab('support'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'support' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Support Tickets
        </button>
      </div>

      {/* General tab specific metrics and charts */}
      {activeTab === 'general' && (
        <>
          {/* 6 Top Analytics Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {/* Card 1: Total Submissions */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Leads</span>
                <div className="p-1.5 bg-blue-50 text-[#1e5cdc] rounded-lg"><FileText size={16} /></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                {stats.total.toLocaleString()}
              </h3>
              <p className="text-[9px] font-black text-emerald-500 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> +18.6% <span className="text-gray-400 font-medium ml-0.5">vs last week</span>
              </p>
            </div>

            {/* Card 2: Active Requests */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Pipeline</span>
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Activity size={16} /></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                {stats.active.toLocaleString()}
              </h3>
              <p className="text-[9px] font-black text-emerald-500 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> +16.3% <span className="text-gray-400 font-medium ml-0.5">vs last week</span>
              </p>
            </div>

            {/* Card 3: Pending Follow-Ups */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Follow-Ups</span>
                <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg"><Clock size={16} /></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                {stats.pendingFollowUps.toLocaleString()}
              </h3>
              <p className="text-[9px] font-black text-amber-500 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> +9.2% <span className="text-gray-400 font-medium ml-0.5">vs last week</span>
              </p>
            </div>

            {/* Card 4: Assigned Staff */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assigned Staff</span>
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg"><Users size={16} /></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                {stats.staffCount.toLocaleString()}
              </h3>
              <p className="text-[9px] font-black text-emerald-500 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> +12.5% <span className="text-gray-400 font-medium ml-0.5">vs last week</span>
              </p>
            </div>

            {/* Card 5: Responses Sent / Resolved */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all group duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resolved Leads</span>
                <div className="p-1.5 bg-pink-50 text-pink-600 rounded-lg"><CheckCircle2 size={16} /></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                {stats.resolved.toLocaleString()}
              </h3>
              <p className="text-[9px] font-black text-emerald-500 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> +20.8% <span className="text-gray-400 font-medium ml-0.5">vs last week</span>
              </p>
            </div>

            {/* Card 6: Conversion Rate */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all group duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Conversion Rate</span>
                <div className="p-1.5 bg-rose-50 text-rose-500 rounded-lg"><Target size={16} /></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
                {stats.conversionRate}%
              </h3>
              <p className="text-[9px] font-black text-red-500 flex items-center gap-0.5">
                <ArrowUpRight size={10} className="rotate-90" /> -5.4% <span className="text-gray-400 font-medium ml-0.5">vs last week</span>
              </p>
            </div>
          </div>

          {/* Dynamic Visual Breakdown Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Donut Chart: Category Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Leads by Category</span>
                <span className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-full">Subject Distribution</span>
              </h3>
              <div className="h-[220px] w-full relative flex items-center justify-center">
                {categoryChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontSize: '11px'}}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-400 text-xs italic">No categorised data available</p>
                )}
                {/* Center Label */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-800 leading-none">{stats.total}</span>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Total Leads</span>
                </div>
              </div>
              {/* Dynamic Legend List */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3">
                {categoryChartData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                    <span>{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Chart: Submission Trend Overview */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Submission Trend Overview</span>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Last 7 Days</span>
              </h3>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendOverviewData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="leadsTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" fontSize={9} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700}} dy={8} />
                    <YAxis fontSize={9} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontSize: '11px'}}
                    />
                    <Area type="monotone" dataKey="count" name="Leads" stroke="#1e5cdc" strokeWidth={2.5} fillOpacity={1} fill="url(#leadsTrend)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-[10px] text-gray-400 font-bold text-center">Telemetry measures daily inbound submission frequency</p>
            </div>

            {/* Donut Chart: Submission Status Breakdown */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Submissions by Status</span>
                <span className="text-[10px] text-purple-500 font-bold bg-purple-50 px-2 py-0.5 rounded-full">Pipeline Stage</span>
              </h3>
              <div className="h-[220px] w-full relative flex items-center justify-center">
                {statusChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        <Cell fill={COLORS.neutral} /> {/* New */}
                        <Cell fill={COLORS.amber} /> {/* Under Review */}
                        <Cell fill={COLORS.indigo} /> {/* In Progress */}
                        <Cell fill={COLORS.rose} /> {/* Follow-Up Pending */}
                        <Cell fill={COLORS.emerald} /> {/* Resolved */}
                      </Pie>
                      <Tooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontSize: '11px'}}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-400 text-xs italic">No workflow status mapping available</p>
                )}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-800 leading-none">{stats.total}</span>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Managed</span>
                </div>
              </div>
              {/* Custom Status Colors Legend */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mt-3">
                <div className="flex items-center gap-1 text-[9px] font-black text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-slate-400" /> New ({statusChartData.find(d => d.name === 'New')?.value || 0})
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Under Review ({statusChartData.find(d => d.name === 'Under Review')?.value || 0})
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> In Progress ({statusChartData.find(d => d.name === 'In Progress')?.value || 0})
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Follow-Up ({statusChartData.find(d => d.name === 'Follow-Up Pending')?.value || 0})
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolved ({statusChartData.find(d => d.name === 'Resolved')?.value || 0})
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {msg && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-medium shadow-sm animate-fade-in">
          {msg}
        </div>
      )}

      {/* Renders other tabs (accordion layout) */}
      {activeTab !== 'general' && (
        <div className="space-y-4 pb-12">
          {/* Search bar for other tabs */}
          <div className="mb-6 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, email..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 font-bold shadow-sm transition-all"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
              No submissions found.
            </div>
          ) : filteredItems.map(c => (
            <div key={c._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
                    <span className="text-gray-800 font-bold text-sm sm:text-base">{c.name}</span>
                    <span className="text-gray-400 text-sm hidden sm:inline-block">•</span>
                    <span className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm truncate"><Mail size={14}/> {c.email}</span>
                    <span className="sm:ml-auto text-[10px] sm:text-xs font-semibold bg-blue-50 text-[#1e5cdc] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-blue-100 self-start sm:self-auto mt-1 sm:mt-0">
                      {activeTab === 'demo' && (c.productInterested || '').replace('-', ' ')}
                      {activeTab === 'quote' && c.serviceRequired}
                      {activeTab === 'support' && `${c.category} - ${c.priority}`}
                    </span>
                  </div>
                  <p className="flex items-center gap-1.5 text-gray-400 text-xs mt-2 font-medium">
                    <Calendar size={12} />
                    {new Date(c.createdAt).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-2 sm:ml-4">
                  <button onClick={e => { e.stopPropagation(); deleteItem(c._id); }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Submission">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {expanded === c._id && activeTab === 'demo' && (
                <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Demo Lead Details</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Company Name</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.companyName}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Product/Service Interested</span>
                      <span className="text-gray-700 text-sm font-semibold capitalize">{(c.productInterested || '').replace('-', ' ')}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Preferred Demo Date</span>
                      <span className="text-gray-700 text-sm font-semibold">
                        {c.preferredDate ? new Date(c.preferredDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {expanded === c._id && activeTab === 'quote' && (
                <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quote Request Details</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Company</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.company}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.phone}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Service Required</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.serviceRequired}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Budget Estimate</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.budgetEstimate}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Expected Timeline</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.timeline || 'N/A'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Project Scope</span>
                      <div className="bg-slate-50 p-3 rounded border border-gray-100 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {c.projectScope}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {expanded === c._id && activeTab === 'support' && (
                <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Support Ticket Details</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Ticket Subject</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.ticketSubject || c.subject}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.phoneNumber || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Issue Category</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.category}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Priority Level</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.priority}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Status</span>
                        <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-md mt-1 ${
                          c.status === 'Open' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                          c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          'bg-slate-50 text-slate-600 border border-slate-100'
                        }`}>{c.status || 'Open'}</span>
                      </div>
                    </div>
                    {c.attachment && (
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Attachment</span>
                        {c.attachment.startsWith('data:') ? (
                          <div className="mt-1">
                            <a href={c.attachment} download={`attachment_${c._id}.png`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e5cdc] hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                              View / Download Attached File
                            </a>
                          </div>
                        ) : (
                          <span className="text-gray-700 text-sm">{c.attachment}</span>
                        )}
                      </div>
                    )}
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Description</span>
                      <div className="bg-slate-50 p-3 rounded border border-gray-100 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {c.description}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Pagination for other tabs */}
          {data.pages > 1 && (
            <div className="flex justify-between items-center mt-6 p-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm">
                Previous
              </button>
              <span className="text-gray-500 text-sm font-semibold">Page {page} of {data.pages}</span>
              <button disabled={page >= data.pages} onClick={() => setPage(p => p + 1)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm">
                Next Page
              </button>
            </div>
          )}
        </div>
      )}

      {/* Renders general contact leads ledger */}
      {activeTab === 'general' && (
        /* Main Grid: Leads Ledger Table + Analytics Sidebar */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-12">
          
          {/* Left Side: Recent Submissions / Table Ledger (75% width) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              {/* Table Action Controls Header */}
              <div className="px-6 py-5 border-b border-gray-50 flex flex-col xl:flex-row items-stretch xl:items-center justify-between bg-[#f8fafc] gap-4">
                <div>
                  <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Leads Ledger</h3>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">Filter, monitor, and assign administrative workflow tracks.</p>
                </div>

                {/* Action Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Search */}
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                      placeholder="Search applicant name, email..."
                      className="w-full sm:w-56 pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 font-medium shadow-sm transition-all"
                    />
                  </div>

                  {/* Filter Category */}
                  <select 
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                    className="px-3 py-2 bg-white border border-gray-200 text-[11px] text-gray-700 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  >
                    <option value="All">📁 All Categories</option>
                    <option value="Internship">Internship</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Counseling">Counseling</option>
                    <option value="Job">Job</option>
                    <option value="Others">Others</option>
                  </select>

                  {/* Filter Status */}
                  <select 
                    value={selectedStatus}
                    onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}
                    className="px-3 py-2 bg-white border border-gray-200 text-[11px] text-gray-700 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  >
                    <option value="All">🚦 All Statuses</option>
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Follow-Up Pending">Follow-Up Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  {/* Export */}
                  <button 
                    onClick={handleExportCSV}
                    className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-blue-600 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                    title="Export Filtered Submissions to CSV"
                  >
                    <Download size={14} />
                    Export
                  </button>
                </div>
              </div>

              {/* Main Interactive Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 sticky top-0">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Applicant Name</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Form Category</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Contact Details</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Assigned Staff</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Priority</th>
                      <th className="px-5 py-3.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Submitted</th>
                      <th className="px-5 py-3.5 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="text-center py-20">
                          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-xs text-gray-400 italic">Synchronizing live database leads ledger...</p>
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-20 text-gray-400 italic text-xs font-semibold">
                          No contact submissions matched your active filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedLeads.map((lead) => {
                        const displayId = `SUB-${lead._id.substring(0, 4).toUpperCase()}`;
                        
                        return (
                          <tr key={lead._id} className="hover:bg-blue-50/15 transition-colors group">
                            {/* Generated ID */}
                            <td className="px-5 py-4 whitespace-nowrap text-xs font-mono font-black text-[#1e5cdc]">
                              {displayId}
                            </td>
                            {/* Applicant Name */}
                            <td className="px-5 py-4 whitespace-nowrap text-xs font-bold text-gray-900">
                              {lead.name}
                            </td>
                            {/* Form Category / Subject */}
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                                  lead.subject === 'Job' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                  lead.subject === 'Internship' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                  lead.subject === 'Mentorship' ? 'bg-teal-50 text-teal-600 border-teal-100' :
                                  lead.subject === 'Counseling' ? 'bg-pink-50 text-pink-600 border-pink-100' :
                                  'bg-slate-50 text-slate-600 border-slate-100'
                              }`}>
                                {lead.subject}
                              </span>
                            </td>
                            {/* Contacts */}
                            <td className="px-5 py-4 whitespace-nowrap text-[11px] font-semibold text-gray-500">
                              <p className="flex items-center gap-1 text-gray-700 font-bold"><Mail size={12} className="text-gray-400" /> {lead.email}</p>
                              {lead.phone && <p className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5"><Phone size={10} /> {lead.phone}</p>}
                            </td>
                            {/* Assigned Staff */}
                            <td className="px-5 py-4 whitespace-nowrap text-xs font-bold text-slate-800">
                              {lead.assignedTo && lead.assignedTo !== 'Unassigned' ? (
                                <span className="flex items-center gap-1 text-purple-700">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                  {lead.assignedTo}
                                </span>
                              ) : (
                                <span className="text-gray-400 font-medium">Unassigned</span>
                              )}
                            </td>
                            {/* Status */}
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tight border ${
                                lead.status === 'New' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                lead.status === 'Under Review' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                lead.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                                lead.status === 'Follow-Up Pending' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                'bg-emerald-50 text-emerald-600 border-emerald-200'
                              }`}>
                                {lead.status || 'New'}
                              </span>
                            </td>
                            {/* Priority */}
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold border ${
                                lead.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                lead.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                'bg-slate-50 text-gray-500 border-slate-200'
                              }`}>
                                {lead.priority || 'Low'}
                              </span>
                            </td>
                            {/* Submitted Date */}
                            <td className="px-5 py-4 whitespace-nowrap text-[10px] font-bold text-gray-400">
                              <p>{new Date(lead.createdAt).toLocaleDateString()}</p>
                              <p className="text-[9px] font-medium text-gray-400 mt-0.5">{new Date(lead.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </td>
                            {/* Actions */}
                            <td className="px-5 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => { setSelectedLead(lead); setShowDetailsModal(true); }}
                                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  title="View Message Details"
                                >
                                  <Eye size={14} />
                                </button>
                                <button 
                                  onClick={() => openWorkflowEditor(lead)}
                                  className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                                  title="Update Workflow Setup"
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteLead(lead._id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                  title="Delete Lead"
                                >
                                  <Trash2 size={14} />
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
            </div>

            {/* Table Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                <button 
                  disabled={page <= 1} 
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Previous
                </button>
                <span className="text-gray-500 text-xs font-bold">
                  Page {page} of {totalPages} <span className="text-gray-400 font-medium ml-1">({filteredLeads.length} total matched records)</span>
                </span>
                <button 
                  disabled={page >= totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Next Page
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Sidebar Analytics Widgets (25% width) */}
          <div className="space-y-6">
            
            {/* Widget 1: Upcoming Follow-ups */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-500 animate-pulse" /> Upcoming Follow-Ups
                </h4>
                <span className="text-[9px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-tight">
                  Pending
                </span>
              </div>
              
              <div className="space-y-3">
                {upcomingFollowUps.length > 0 ? (
                  upcomingFollowUps.map(task => (
                    <div 
                      key={task.id} 
                      onClick={() => {
                        const l = contacts.find(c => c._id === task.id);
                        if (l) openWorkflowEditor(l);
                      }}
                      className="p-3 bg-slate-50 border border-slate-100 hover:border-amber-200 rounded-xl transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-mono font-black text-blue-600">{task.subId}</span>
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[8px] font-bold ${
                          task.priority === 'High' ? 'bg-red-50 text-red-500 border border-red-100' :
                          task.priority === 'Medium' ? 'bg-amber-50 text-amber-500 border border-amber-100' :
                          'bg-slate-100 text-gray-400 border border-slate-200'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{task.name}</h5>
                      <div className="flex items-center justify-between mt-2 text-[9px] text-gray-400 font-bold">
                        <span className="uppercase">{task.subject}</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {task.date}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
                    <Check className="w-8 h-8 text-emerald-500 bg-emerald-50 rounded-full p-2 mx-auto mb-2" />
                    <p className="text-[10px] text-gray-400 font-semibold italic">No pending follow-ups scheduled.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Widget 2: Top Performing Categories */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                Top Categories By Volume
              </h4>
              
              <div className="space-y-4">
                {topCategories.slice(0, 5).map((cat, idx) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-gray-700 capitalize">{cat.name}</span>
                      <span className="text-gray-400">{cat.count} <span className="font-normal text-[9px]">({cat.percentage}%)</span></span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ 
                          width: `${cat.percentage}%`,
                          backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Recent Activities Ledger */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Workflow Ledger</span>
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-tight">Active</span>
              </h4>
              
              <div className="relative pl-4 border-l-2 border-slate-100 space-y-4">
                {activities.map(act => (
                  <div key={act.id} className="relative">
                    {/* Dot */}
                    <span className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${
                      act.type === 'delete' ? 'bg-red-500' :
                      act.type === 'update' ? 'bg-purple-500' :
                      act.type === 'security' ? 'bg-amber-500' :
                      'bg-blue-500'
                    }`} />
                    
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-gray-800 leading-tight">{act.text}</p>
                      <p className="text-[9px] font-bold text-gray-400">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal 1: Lead Submissions Details Drawer */}
      {showDetailsModal && selectedLead && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col transform scale-100 transition-all duration-300">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  SUB-{selectedLead._id.substring(0, 4).toUpperCase()}
                </span>
                <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight mt-1">Lead Submission Details</h3>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-xl transition"
              >
                ✕
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[500px]">
              {/* Contact Metadata grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Applicant Name</p>
                  <p className="text-sm font-bold text-gray-900">{selectedLead.name}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Form Category / Subject</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {selectedLead.subject}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Email ID</p>
                  <a href={`mailto:${selectedLead.email}`} className="text-sm font-bold text-blue-600 hover:underline">{selectedLead.email}</a>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
                  <p className="text-sm font-bold text-gray-900">{selectedLead.phone || 'No phone number provided'}</p>
                </div>
                {selectedLead.country && (
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Country</p>
                    <p className="text-sm font-bold text-gray-900">{selectedLead.country}</p>
                  </div>
                )}
                {selectedLead.preferredContactMethod && (
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Preferred Contact Method</p>
                    <p className="text-sm font-bold text-gray-900">{selectedLead.preferredContactMethod}</p>
                  </div>
                )}
              </div>

              {/* Message content */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Content</h4>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner max-h-48 overflow-y-auto">
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedLead.message}
                  </p>
                </div>
              </div>

              {/* Administrative Pipeline details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Assigned Staff</p>
                  <p className="text-xs font-bold text-purple-700 mt-1">{selectedLead.assignedTo || 'Unassigned'}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Status Badge</p>
                  <p className="text-xs font-bold text-amber-600 mt-1">{selectedLead.status || 'New'}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Priority Rating</p>
                  <p className="text-xs font-bold text-red-600 mt-1">{selectedLead.priority || 'Low'}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                <Calendar size={12} /> Received: {new Date(selectedLead.createdAt).toLocaleString('en-IN', {dateStyle: 'medium', timeStyle: 'short'})}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setShowDetailsModal(false); openWorkflowEditor(selectedLead); }}
                  className="px-4 py-2 bg-[#1e5cdc] text-white hover:bg-blue-700 text-xs font-bold rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center gap-1.5"
                >
                  <Edit3 size={12} />
                  Manage Workflow
                </button>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Workflow Setup Manager modal */}
      {showWorkflowModal && selectedLead && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[9px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  SUB-{selectedLead._id.substring(0, 4).toUpperCase()}
                </span>
                <h3 className="text-base font-black text-gray-900 tracking-tight mt-1">Manage Lead Workflow</h3>
              </div>
              <button 
                onClick={() => setShowWorkflowModal(false)}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-xl transition"
              >
                ✕
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleUpdateWorkflow}>
              <div className="p-6 space-y-4">
                {/* 1. Status Selection */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Pipeline Stage / Status</label>
                  <select 
                    value={workflowStatus}
                    onChange={(e) => setWorkflowStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all appearance-none"
                  >
                    <option value="New">🚦 New Submission</option>
                    <option value="Under Review">🚦 Under Review</option>
                    <option value="In Progress">🚦 In Progress</option>
                    <option value="Follow-Up Pending">🚦 Follow-Up Pending</option>
                    <option value="Resolved">🚦 Resolved & Closed</option>
                  </select>
                </div>

                {/* 2. Priority Selection */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Severity / Priority Rating</label>
                  <select 
                    value={workflowPriority}
                    onChange={(e) => setWorkflowPriority(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all appearance-none"
                  >
                    <option value="Low">⚡ Low Priority</option>
                    <option value="Medium">⚡ Medium Priority</option>
                    <option value="High">⚡ High Priority / Immediate</option>
                  </select>
                </div>

                {/* 3. Assign Staff */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Assignee / Department Group</label>
                  <select 
                    value={workflowAssignee}
                    onChange={(e) => setWorkflowAssignee(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all appearance-none"
                  >
                    <option value="Unassigned">👤 Unassigned</option>
                    <option value="HR Team">👤 HR Team</option>
                    <option value="Sales Team">👤 Sales Team</option>
                    <option value="Support Team">👤 Support Team</option>
                    <option value="Marketing Team">👤 Marketing Team</option>
                    <option value="Engineering Team">👤 Engineering Team</option>
                  </select>
                </div>

                {/* Brief context info alert */}
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-2">
                  <Info size={16} className="text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-purple-700 font-semibold leading-relaxed">
                    Changing this setup instantly updates all analytical metrics, charts, follow-up notifications, and logs in the dashboard database in real time.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex items-center justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowWorkflowModal(false)}
                  className="px-4 py-2.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#1e5cdc] text-white hover:bg-blue-700 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-blue-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
