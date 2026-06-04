import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LabelList, BarChart, Bar
} from 'recharts';
import { Activity, Users, MousePointer2, Target, TrendingUp, Calendar, ShieldAlert, RefreshCw, Search, Award, Building2, Fingerprint, Clock, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const visitorData = [
  { day: 'Mon', visitors: 400, pageViews: 2400 },
  { day: 'Tue', visitors: 300, pageViews: 1398 },
  { day: 'Wed', visitors: 200, pageViews: 9800 },
  { day: 'Thu', visitors: 278, pageViews: 3908 },
  { day: 'Fri', visitors: 189, pageViews: 4800 },
  { day: 'Sat', visitors: 239, pageViews: 3800 },
  { day: 'Sun', visitors: 349, pageViews: 4300 },
];

export default function AdminAnalytics() {
  const { admin } = useAdminAuth();
  const token = admin?.token;

  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [scanLogs, setScanLogs] = useState([]);
  const [loadingScanLogs, setLoadingScanLogs] = useState(true);

  const [detailedStats, setDetailedStats] = useState(null);
  const [stats, setStats] = useState(null);
  const [formStats, setFormStats] = useState(null);

  const fetchScanLogs = useCallback(async () => {
    if (!token) return;
    setLoadingScanLogs(true);
    try {
      const res = await fetch(`${API}/api/certificates/logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setScanLogs(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch scan logs', err);
    } finally {
      setLoadingScanLogs(false);
    }
  }, [token]);

  const fetchLogs = useCallback(async () => {
    if (!token) return;
    setLoadingLogs(true);
    try {
      const res = await fetch(`${API}/api/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } else {
        toast.error('Failed to fetch audit logs');
        setLogs([]);
      }
    } catch {
      toast.error('Error fetching audit logs');
      setLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    
    fetch(`${API}/api/admin/detailed-stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setDetailedStats)
      .catch(() => {});

    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});

    fetch(`${API}/api/admin/form-stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setFormStats)
      .catch(() => {});

    fetchLogs();
    fetchScanLogs();
  }, [token, fetchLogs, fetchScanLogs]);

  const filteredLogs = logs.filter(log => 
    (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.entity || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.targetType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.adminName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.details || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic processed form response statistics
  const processedFormStats = formStats?.stats && formStats.stats.some(s => s.count > 0)
    ? formStats.stats.map(s => ({ name: s.name, value: s.count })).sort((a, b) => b.value - a.value).slice(0, 8)
    : [
        { name: 'Contact Us', value: 15 },
        { name: 'Job Apps', value: 8 },
        { name: 'Demo Requests', value: 4 },
        { name: 'Support Tickets', value: 6 },
        { name: 'Newsletters', value: 12 },
      ];

  // Dynamic credential locations stats
  const processedLocationData = detailedStats?.locationDistribution && detailedStats.locationDistribution.length > 0
    ? detailedStats.locationDistribution.map(l => ({ name: l._id || 'Unknown', count: l.count }))
    : [
        { name: 'Delhi', count: 12 },
        { name: 'Mumbai', count: 8 },
        { name: 'Bangalore', count: 9 },
        { name: 'Pune', count: 4 },
        { name: 'Chennai', count: 3 }
      ];

  // Dynamic certificate category distribution fallback
  const processedCategoryDistribution = detailedStats?.categoryDistribution && detailedStats.categoryDistribution.length > 0
    ? detailedStats.categoryDistribution
    : [
        { _id: 'Internship', count: 25 },
        { _id: 'Experience', count: 18 },
        { _id: 'Excellence', count: 7 },
        { _id: 'Appreciation', count: 5 }
      ];

  // Dynamic department volume fallback
  const processedDeptDistribution = detailedStats?.deptDistribution && detailedStats.deptDistribution.length > 0
    ? detailedStats.deptDistribution
    : [
        { _id: 'Engineering', count: 35 },
        { _id: 'Marketing', count: 15 },
        { _id: 'Operations', count: 5 }
      ];

  // Dynamic monthly issuance trends fallback
  const processedMonthlyTrends = detailedStats?.monthlyTrends && detailedStats.monthlyTrends.length > 0
    ? detailedStats.monthlyTrends.map(t => ({ 
        month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][t._id-1] || `M${t._id}`, 
        count: t.count 
      }))
    : [
        { month: 'Jan', count: 5 },
        { month: 'Feb', count: 10 },
        { month: 'Mar', count: 18 },
        { month: 'Apr', count: 12 },
        { month: 'May', count: 22 },
        { month: 'Jun', count: 30 }
      ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Advanced Analytics Ledger</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium">Deep dive into Website Engagement and Corporate Operations metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-600">
            <Calendar size={16} className="text-[#1e5cdc]" /> Last 30 Days
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* WEBSITE MANAGEMENT SYSTEM (WMS) ANALYTICS */}
      {/* ========================================================================= */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-[#1e5cdc]"></span>
        <h2 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wider">Website Management System (WMS)</h2>
        <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full uppercase">Traffic & Engagement</span>
      </div>

      {/* WMS Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Bounce Rate</span>
            <div className="p-2 bg-blue-50 text-[#1e5cdc] rounded-xl"><Activity size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">24.5%</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 2.1%</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Session</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Clock size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">4m 12s</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 15s</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Pages / Visit</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><MousePointer2 size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">3.8</h3>
            <span className="text-[10px] sm:text-xs font-bold text-red-500 flex items-center gap-0.5">▼ 0.2</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Goal Conversions</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Target size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">89</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 12</span>
          </div>
        </div>
      </div>

      {/* WMS Content Assets Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] sm:text-xs font-bold text-blue-500 uppercase tracking-wider">Founders & Directors</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-2">{stats?.totalFounders || "0"}</h3>
          <p className="text-[10px] text-blue-700/70 font-semibold mt-1">Core Board Members</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-5 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] sm:text-xs font-bold text-indigo-500 uppercase tracking-wider">Student Interns</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mt-2">{stats?.totalInterns || "0"}</h3>
          <p className="text-[10px] text-indigo-700/70 font-semibold mt-1">Active Program Trainees</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] sm:text-xs font-bold text-emerald-500 uppercase tracking-wider">Blog Posts</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-2">{stats?.totalBlogs || "0"}</h3>
          <p className="text-[10px] text-emerald-700/70 font-semibold mt-1">Published Articles</p>
        </div>
      </div>

      {/* WMS Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Main Traffic Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">Website Traffic trends</h3>
              <p className="text-xs text-gray-400 font-medium">Daily visitor volume and page views</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
               <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-[#1e5cdc]"></span> Visitors
               </span>
               <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span> Pageviews
               </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 600, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 600, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff'}}
                  itemStyle={{fontSize: '12px', fontWeight: 800}}
                />
                <Area type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                <Area type="monotone" dataKey="pageViews" stroke="#93c5fd" strokeWidth={2} fillOpacity={1} fill="url(#colorPageViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Website Form Submissions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Website Form Responses</h3>
            <p className="text-xs text-gray-400 font-medium mb-6">Total inquiries processed across interactive channels</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedFormStats} layout="vertical" margin={{ left: 10 }}>
                <defs>
                  <linearGradient id="barGradientPop" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e5cdc" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 600, fill: '#94a3b8'}} width={100} />
                <Tooltip cursor={{fill: 'rgba(30, 92, 220, 0.03)', radius: 4}} contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" fill="url(#barGradientPop)" radius={[0, 6, 6, 0]} barSize={20}>
                  <LabelList dataKey="value" position="right" style={{fontSize: '11px', fontWeight: 700, fill: '#64748b'}} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COMPANY MANAGEMENT SYSTEM (CMS) ANALYTICS */}
      {/* ========================================================================= */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-emerald-600"></span>
        <h2 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wider">Company Management System (CMS)</h2>
        <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full uppercase">Credentials & Operations</span>
      </div>

      {/* CMS Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Members</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Users size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats?.totalUsers ?? '-'}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 flex items-center gap-0.5">Active profiles</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Careers Ingested</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Briefcase size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats?.totalApplications ?? '-'}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 flex items-center gap-0.5">Applications received</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Active Partners</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Building2 size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats?.totalPartners ?? '-'}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 flex items-center gap-0.5">Corporate nodes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Issued Credentials</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Award size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats?.totalCertificates ?? '-'}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 flex items-center gap-0.5">Verified certificates</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Secure Passes</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Fingerprint size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats?.totalIdCards ?? '-'}</h3>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 flex items-center gap-0.5">Active ID Cards</span>
          </div>
        </div>
      </div>

      {/* CMS Certificate Insights Grid (2x2 Grid of 4 charts) */}
      <div className="mb-12">
        <div className="bg-gray-50 border border-gray-100 p-4 sm:p-6 rounded-2xl">
          <h3 className="text-xs sm:text-sm font-black text-gray-700 uppercase tracking-wider mb-6">Certificate & Credential Lifecycle Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Category Distribution</h4>
                <p className="text-[10px] text-gray-400 font-medium mb-4">Quantity by credential type</p>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processedCategoryDistribution}>
                    <defs>
                      <linearGradient id="barGradientCat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e5cdc" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="_id" fontSize={9} tick={{fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <YAxis fontSize={9} tick={{fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(30, 92, 220, 0.02)'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="count" fill="url(#barGradientCat)" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department Volume */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Department Volume</h4>
                <p className="text-[10px] text-gray-400 font-medium mb-4">Quantity across business units</p>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processedDeptDistribution} layout="vertical">
                    <defs>
                      <linearGradient id="barGradientDept" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="_id" type="category" fontSize={9} width={80} tick={{fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(16, 185, 129, 0.02)'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="count" fill="url(#barGradientDept)" radius={[0, 4, 4, 0]} barSize={14}>
                      <LabelList dataKey="count" position="right" style={{fontSize: '9px', fontWeight: 700, fill: '#64748b'}} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Credential Location Split */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Credential Location Split</h4>
                <p className="text-[10px] text-gray-400 font-medium mb-4">Distribution by city / region</p>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processedLocationData} layout="vertical">
                    <defs>
                      <linearGradient id="barGradientLoc" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" fontSize={9} width={80} tick={{fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(245, 158, 11, 0.02)'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="count" fill="url(#barGradientLoc)" radius={[0, 4, 4, 0]} barSize={14}>
                      <LabelList dataKey="count" position="right" style={{fontSize: '9px', fontWeight: 700, fill: '#64748b'}} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Issuance Trend */}
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Monthly Issuance Trend</h4>
                <p className="text-[10px] text-gray-400 font-medium mb-4">Month-over-month volume</p>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={processedMonthlyTrends}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={9} tick={{fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <YAxis fontSize={9} tick={{fill: '#94a3b8', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#colorCount)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SYSTEM OPERATIONS & AUDIT LOGS */}
      {/* ========================================================================= */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-slate-600 bg-slate-600"></span>
        <h2 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wider">System Security & Operational Logs</h2>
        <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-full uppercase">Security Ledger</span>
      </div>

      {/* Audit Log Table (Integrated below charts) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12 animate-fade-in">
        <div className="px-6 py-5 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#f8fafc] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-[#1e5cdc] rounded-xl hidden sm:flex">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">System Audit Ledger</h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Monitor administrative actions and security events.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] shadow-sm placeholder-gray-400"
              />
            </div>
            <button
              onClick={fetchLogs}
              className="p-2 border border-gray-200 text-gray-600 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm flex-shrink-0"
              title="Refresh Logs"
            >
              <RefreshCw size={16} className={loadingLogs ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Administrator</th>
                <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">IP Address</th>
                <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loadingLogs ? (
                <tr><td colSpan="5" className="text-center py-12 text-gray-400 italic">Synchronizing audit data...</td></tr>
              ) : filteredLogs.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-12 text-gray-400 italic">No audit records found.</td></tr>
              ) : filteredLogs.map(log => (
                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-xs font-bold text-gray-800">{new Date(log.createdAt).toLocaleDateString()}</p>
                    <p className="text-[10px] text-gray-500">{new Date(log.createdAt).toLocaleTimeString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-xs font-bold text-gray-800">{log.performedBy?.name || log.adminName || 'System User'}</p>
                    <p className="text-[10px] font-black text-blue-500 uppercase">
                      {log.adminRole || log.performedBy?.role || 'Admin'} • {log.performedBy?.email || 'Unknown Email'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {log.ipAddress || '127.0.0.1'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                      log.action === 'Create' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      log.action === 'Update' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      log.action === 'Delete' ? 'bg-red-50 text-red-600 border-red-100' :
                      log.action === 'Login' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      log.action === 'Logout' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      log.action === 'Export' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                      log.action === 'Status Change' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                      (log.action === 'Notification Sent' || log.action === 'Notify') ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                      'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {log.action}
                    </span>
                    {log.entity && log.entity !== 'Unknown' && log.entity !== 'System' && (
                      <span className="ml-2 text-[10px] font-bold text-gray-500 uppercase">{log.entity}</span>
                    )}
                    {(log.targetId || log.certificateId || log.employeeId) && (
                      <span className="ml-2 font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        {log.targetId || log.certificateId || log.employeeId}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600 max-w-xs truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Activity Section (Ported from Certificates) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="px-6 py-5 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#f8fafc] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl hidden sm:flex">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Recent Certificate Verifications</h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Live feed of public certificate authenticity checks.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={fetchScanLogs}
              className="p-2 border border-gray-200 text-gray-600 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm flex-shrink-0"
              title="Refresh Logs"
            >
              <RefreshCw size={16} className={loadingScanLogs ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient</th>
                <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Cert ID</th>
                <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loadingScanLogs ? (
                <tr><td colSpan="4" className="text-center py-12 text-gray-400 italic">Synchronizing verification data...</td></tr>
              ) : scanLogs.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-12 text-gray-400 italic">No verification records found.</td></tr>
              ) : scanLogs.slice(0, 10).map(log => (
                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-xs font-bold text-gray-800">{new Date(log.scannedAt).toLocaleDateString()}</p>
                    <p className="text-[10px] text-gray-500">{new Date(log.scannedAt).toLocaleTimeString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-800 uppercase">{log.employeeName || log.recipientName || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-mono font-bold text-blue-600">{log.employeeId || log.certificateId || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {log.ipAddress || '127.0.0.1'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
