import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { TrendingUp, TrendingDown, ChevronRight, Link as LinkIcon, Plus, CheckCircle2, Clock, AlertCircle, Calendar, Flag, X, Bell, Users, Check, FileText, Mail, Award, Globe } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Mock Data for Charts
const trafficData = [
  { name: '10/16', visitors: 10, pageViews: 5 },
  { name: '', visitors: 15, pageViews: 10 },
  { name: 'This Month', visitors: 50, pageViews: 20 },
  { name: '', visitors: 45, pageViews: 30 },
  { name: 'Last Month', visitors: 80, pageViews: 25 },
  { name: '', visitors: 40, pageViews: 45 },
  { name: '0/28', visitors: 80, pageViews: 40 },
];

const conversionData = [
  { name: 'Jan', rate: 45 },
  { name: 'Feb', rate: 70 },
  { name: 'Mar', rate: 50 },
  { name: 'Apr', rate: 75 },
  { name: 'May', rate: 80 },
  { name: 'Jun ', rate: 100 },
  { name: 'Jun', rate: 70 },
];

const mockBlogs = [
  { id: 1, title: "Artificial Intelligence: Transforming Business Operations", status: "Published" },
  { id: 2, title: "Cloud Computing: The Backbone of Modern Infrastructure", status: "Published" },
  { id: 3, title: "Strategic Innovation: Staying Ahead in a Competitive Market", status: "Draft" },
];
const mockJobs = [
  { id: 1, title: "Senior Full Stack Engineer" },
  { id: 2, title: "Machine Learning Architect" },
];

const mockContacts = [
  { _id: 'mock-1', name: "Alice Johnson", email: "alice@example.com", subject: "Enterprise Pricing Inquiry", createdAt: new Date(Date.now() - 100000000).toISOString() },
  { _id: 'mock-2', name: "Bob Smith", email: "bob@startup.io", subject: "API Integration Help", createdAt: new Date(Date.now() - 500000000).toISOString() },
  { _id: 'mock-3', name: "Carol Davis", email: "carol@design.co", subject: "UI/UX Services", createdAt: new Date(Date.now() - 1000000000).toISOString() },
  { _id: 'mock-4', name: "David Wilson", email: "david@marketing.org", subject: "Partnership Opportunity", createdAt: new Date(Date.now() - 2000000000).toISOString() }
];

const StatCardItem = ({ title, value, trendIcon, trendColor, trendText, icon, borderClass }) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border-t-4 ${borderClass || 'border-t-blue-500'} border-x border-b border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group`}>
    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-125 transition-transform duration-300 opacity-40 -z-0"></div>
    <div className="flex justify-between items-start z-10">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">{value}</h3>
      </div>
      {icon && (
        <span className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-[#1e5cdc] transition-colors shrink-0">
          {icon}
        </span>
      )}
    </div>
    <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold z-10">
      <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 font-bold ${trendColor}`}>
        {trendText} {trendIcon}
      </span>
      <span className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">vs last month</span>
    </div>
  </div>
);

export default function Dashboard() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [formStats, setFormStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [quickTaskTitle, setQuickTaskTitle] = useState('');

  const fetchDashboardData = async () => {
    if (!admin?.token) return;
    try {
      const [statsData, tasksData, formStatsData, notificationsData] = await Promise.all([
        fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin.token}` } }).then(r => r.json()),
        fetch(`${API}/api/tasks`, { headers: { Authorization: `Bearer ${admin.token}` } }).then(r => r.json()),
        fetch(`${API}/api/admin/form-stats`, { headers: { Authorization: `Bearer ${admin.token}` } }).then(r => r.json()),
        fetch(`${API}/api/admin/notifications?limit=8`, { headers: { Authorization: `Bearer ${admin.token}` } }).then(r => r.json())
      ]);
      setStats(statsData);
      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setFormStats(formStatsData);
      setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin?.role === 'super-admin') {
      navigate('/admin/super-dashboard', { replace: true });
      return;
    }
    fetchDashboardData();
  }, [admin, navigate]);

  const handleToggleTask = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}`
        },
        body: JSON.stringify({ status: currentStatus === 'Completed' ? 'Pending' : 'Completed' })
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQuickTask = async (e) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;
    try {
      const res = await fetch(`${API}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}`
        },
        body: JSON.stringify({
          title: quickTaskTitle.trim(),
          assignedTo: admin._id || admin.id,
          priority: 'Medium',
          dueDate: new Date(Date.now() + 86400000).toISOString()
        })
      });
      if (res.ok) {
        setQuickTaskTitle('');
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome, Admin</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Manage your website efficiently.</p>
        </div>
        <button
          onClick={() => navigate('/admin/form-links')}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:text-[#1e5cdc] hover:border-[#1e5cdc] px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm group w-full sm:w-auto"
        >
          <LinkIcon size={16} className="text-gray-400 group-hover:text-[#1e5cdc] transition-colors" />
          Form Links
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">

          {/* Website Management (WMS) Metrics */}
          <div className="space-y-3">
            <h2 className="text-xs font-black text-blue-600 bg-blue-50/80 border border-blue-100/50 px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
              Website Management (WMS) Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <StatCardItem
                title="Total Leads"
                value={stats?.totalContacts ? (1245 + stats.totalContacts).toLocaleString() : "1,245"}
                trendColor="text-emerald-600 bg-emerald-50 border border-emerald-100"
                trendText="▲ 12%"
                trendIcon={<TrendingUp size={12} />}
                icon={<Mail size={16} />}
                borderClass="border-t-blue-500"
              />
              <StatCardItem
                title="Blog Posts"
                value={stats?.totalBlogs || "12"}
                trendColor="text-emerald-600 bg-emerald-50 border border-emerald-100"
                trendText="Live"
                trendIcon={<TrendingUp size={12} />}
                icon={<FileText size={16} />}
                borderClass="border-t-emerald-500"
              />
              <StatCardItem
                title="Founders & Directors"
                value={stats?.totalFounders || "0"}
                trendColor="text-blue-600 bg-blue-50 border border-blue-100"
                trendText="Core"
                trendIcon={<TrendingUp size={12} />}
                icon={<Users size={16} />}
                borderClass="border-t-indigo-500"
              />
              <StatCardItem
                title="Student Interns"
                value={stats?.totalInterns || "0"}
                trendColor="text-amber-600 bg-amber-50 border border-amber-100"
                trendText="Active"
                trendIcon={<TrendingUp size={12} />}
                icon={<Users size={16} />}
                borderClass="border-t-amber-500"
              />
              <StatCardItem
                title="Total Visitors"
                value={stats?.totalVisitors ? stats.totalVisitors.toLocaleString() : "0"}
                trendColor="text-teal-600 bg-teal-50 border border-teal-100"
                trendText="Live"
                trendIcon={<TrendingUp size={12} />}
                icon={<Globe size={16} />}
                borderClass="border-t-teal-500"
              />
            </div>
          </div>

          {/* Company Management (CMS) Metrics */}
          <div className="space-y-3">
            <h2 className="text-xs font-black text-indigo-600 bg-indigo-50/80 border border-indigo-100/50 px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
              Company Management (CMS) Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <StatCardItem
                title="Total Users"
                value={stats?.totalUsers ? stats.totalUsers.toLocaleString() : "0"}
                trendColor="text-emerald-600 bg-emerald-50 border border-emerald-100"
                trendText="Active"
                trendIcon={<TrendingUp size={12} />}
                icon={<Users size={16} />}
                borderClass="border-t-blue-600"
              />
              <StatCardItem
                title="Active Partners"
                value={stats?.totalPartners ? (stats.totalPartners + 4) : "4"}
                trendColor="text-amber-600 bg-amber-50 border border-amber-100"
                trendText="1 Pending"
                trendIcon={<TrendingUp size={12} />}
                icon={<Users size={16} />}
                borderClass="border-t-indigo-600"
              />
              <StatCardItem
                title="Job Applications"
                value={stats?.totalApplications ? (121 + stats.totalApplications).toLocaleString() : "121"}
                trendColor="text-emerald-600 bg-emerald-50 border border-emerald-100"
                trendText={`${stats?.totalApplications || 0} New`}
                trendIcon={<TrendingUp size={12} />}
                icon={<FileText size={16} />}
                borderClass="border-t-purple-600"
              />
              <StatCardItem
                title="Certificates"
                value={stats?.totalCertificates || "0"}
                trendColor="text-emerald-600 bg-emerald-50 border border-emerald-100"
                trendText="Issued"
                trendIcon={<TrendingUp size={12} />}
                icon={<Award size={16} />}
                borderClass="border-t-teal-600"
              />
              <StatCardItem
                title="ID Cards"
                value={stats?.totalIdCards || "0"}
                trendColor="text-emerald-600 bg-emerald-50 border border-emerald-100"
                trendText="Active"
                trendIcon={<TrendingUp size={12} />}
                icon={<FileText size={16} />}
                borderClass="border-t-pink-600"
              />
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Website Traffic Chart */}
            <div className="bg-white rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Website Traffic</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e5cdc]"></span> Visitors
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 border border-gray-100 rounded-full font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span> Page Views
                  </span>
                </div>
              </div>

              <div className="h-48 sm:h-64 w-full mt-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" dot={{ r: 4, fill: '#1e5cdc', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    <Area type="monotone" dataKey="pageViews" stroke="#93c5fd" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" dot={{ r: 4, fill: '#93c5fd', strokeWidth: 2, stroke: '#fff' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center">
                <button onClick={() => navigate('/admin/analytics')} className="bg-[#1e5cdc] text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition">View Report</button>
              </div>
            </div>

            {/* Lead Conversion Rate Bar Chart */}
            <div className="bg-white rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 flex flex-col relative">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Lead Conversion Rate</h3>
              </div>
              <div className="h-40 sm:h-52 w-full mt-auto">
                {/* Custom tooltip-like label for the highest bar */}
                <div className="absolute top-10 right-[15%] bg-[#1a3b5c] text-white text-sm font-bold px-3 py-1 rounded-md mb-2 shadow-lg z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#1a3b5c]">
                  12.5%
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e5cdc" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="rate" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => navigate('/admin/analytics')} className="text-gray-500 hover:text-[#1e5cdc] text-sm font-medium flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-md">View All <ChevronRight size={14} /></button>
              </div>
            </div>

          </div>

          {/* Bottom Activities Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* WMS Operations Column */}
            <div className="space-y-4">
              <h2 className="text-xs font-black text-blue-600 bg-blue-50/80 border border-blue-100/50 px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
                WMS Operations & Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Live Feedback Loop */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:col-span-1">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 text-sm">Live Feedback Loop</h3>
                    <span className="text-[10px] font-bold text-gray-400">CONTACT RESPONSES</span>
                  </div>
                  <div className="p-2 flex-1 overflow-y-auto max-h-[200px] custom-scrollbar">
                    {[...(stats?.recentContacts || []), ...mockContacts].slice(0, 5).map((c, i) => (
                      <div key={`contact-${i}`} className="flex flex-col py-2 px-3 hover:bg-blue-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-[#1e5cdc] truncate max-w-[180px]">{c.name}</span>
                          <span className="text-[9px] text-gray-400 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="text-xs text-gray-500 truncate italic">{c.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Blog Posts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:col-span-1">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 text-sm">Latest Blog Posts</h3>
                    <button onClick={() => navigate('/admin/blogs')} className="text-[#1e5cdc] hover:text-blue-700 text-[10px] font-semibold flex items-center gap-0.5 bg-blue-50 px-2 py-1 rounded">
                      View All <ChevronRight size={10} />
                    </button>
                  </div>
                  <div className="p-2 flex-1">
                    {mockBlogs.map(b => (
                      <div key={b.id} className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                          <span className="text-xs text-[#1e5cdc] font-medium truncate max-w-[100px] sm:max-w-[140px]">{b.title}</span>
                        </div>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${b.status === 'Published' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'}`}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Submissions Quick Stats */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:col-span-2">
                  <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
                    <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                      <FileText size={16} className="text-blue-600" /> Web Requests Overview
                    </h3>
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {formStats?.totalResponses || 0} Submissions
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto max-h-[140px] custom-scrollbar pr-1">
                    {formStats?.stats ? (
                      formStats.stats.slice(0, 9).map((form, i) => (
                        <div key={i} className="p-2 bg-gray-50/50 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors flex flex-col">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider truncate block">{form.name}</span>
                          <span className="text-sm font-black text-gray-800 mt-0.5 block">{form.count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-xs text-center py-6 italic col-span-3">No stats loaded</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* CMS Operations Column */}
            <div className="space-y-4">
              <h2 className="text-xs font-black text-indigo-600 bg-indigo-50/80 border border-indigo-100/50 px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
                CMS Operations & Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* My Tasks Manager Widget */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:col-span-2">
                  <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
                    <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-indigo-600" /> Active Tasks
                    </h3>
                    <button 
                      onClick={() => navigate('/admin/tasks')} 
                      className="text-[10px] font-bold text-indigo-600 hover:underline bg-indigo-50 px-2 py-0.5 rounded"
                    >
                      Kanban Board →
                    </button>
                  </div>
                  
                  {/* Quick Add Form */}
                  <form onSubmit={handleAddQuickTask} className="flex gap-2 mb-2">
                    <input 
                      value={quickTaskTitle}
                      onChange={e => setQuickTaskTitle(e.target.value)}
                      type="text" 
                      placeholder="Quick add task..." 
                      className="flex-1 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white text-xs outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center justify-center gap-1 transition-colors shrink-0">
                      <Plus size={12} /> Add
                    </button>
                  </form>

                  <div className="space-y-1.5 overflow-y-auto max-h-[140px] custom-scrollbar pr-1">
                    {tasks.length === 0 ? (
                      <p className="text-gray-400 text-xs text-center py-6 italic">No active tasks</p>
                    ) : (
                      tasks.filter(t => t.status !== 'Completed').slice(0, 4).map(task => {
                        return (
                          <div key={task._id} className="flex items-start gap-2 p-1.5 bg-gray-50/50 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100/50">
                            <button 
                              type="button"
                              onClick={() => handleToggleTask(task._id, task.status)}
                              className="w-3.5 h-3.5 rounded border border-gray-300 hover:border-gray-400 bg-white flex items-center justify-center transition-all mt-0.5 shrink-0"
                            >
                              <Check size={10} className="text-white hover:text-gray-200" strokeWidth={3} />
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-800 truncate">
                                {task.title}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Partner Requests */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between md:col-span-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">Partner Requests</h3>
                    <button onClick={() => navigate('/admin/partners')} className="text-indigo-600 hover:text-indigo-700 text-[10px] font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                      Manage Partners
                    </button>
                  </div>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold text-amber-500 leading-none">1</span>
                    <span className="text-xs font-medium text-gray-600 mb-0.5">Application Pending Approval</span>
                  </div>
                </div>

                {/* Staff Registration Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between md:col-span-1">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Corporate Registrations</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Configure user accounts and staff access permissions.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/admin/registration')} 
                    className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition shrink-0"
                  >
                    Add Staff
                  </button>
                </div>

                {/* Active Credentials Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 grid grid-cols-2 gap-4 md:col-span-1">
                  <div className="border-r border-gray-100 pr-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">ID Cards Created</span>
                    <span className="text-xl font-black text-gray-800 mt-1 block">{stats?.totalIdCards || 0}</span>
                  </div>
                  <div className="pl-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Certificates Issued</span>
                    <span className="text-xl font-black text-gray-800 mt-1 block">{stats?.totalCertificates || 0}</span>
                  </div>
                </div>

                {/* Open Positions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between md:col-span-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">Open Positions</h3>
                  </div>
                  <div className="flex flex-col gap-1.5 my-2">
                    {mockJobs.map((job) => (
                      <span key={job.id} className="text-[10px] font-semibold px-2 py-1 rounded bg-blue-50 text-[#1e5cdc] border border-blue-100 truncate">{job.title}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/admin/careers')}
                    className="text-xs font-bold text-gray-500 hover:text-[#1e5cdc] transition-colors mt-auto text-left"
                  >
                    Manage Openings →
                  </button>
                </div>

                {/* Latest Job Applications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:col-span-2">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 text-sm">Latest Job Applications</h3>
                    <span className="text-[10px] font-bold text-gray-400">APPLICATIONS</span>
                  </div>
                  <div className="p-2 flex-1 overflow-y-auto max-h-[200px] custom-scrollbar">
                    {stats?.recentApplications && stats.recentApplications.length > 0 ? (
                      stats.recentApplications.map((app, i) => (
                        <div key={`app-${i}`} className="flex flex-col py-2 px-3 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-50 last:border-0 relative group">
                          <span className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded">NEW APP</span>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{app.fullName}</span>
                            <span className="text-[9px] text-gray-400 shrink-0">{new Date(app.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className="text-xs text-emerald-600 font-medium">{app.jobTitle}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-8">No recent job applications</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:col-span-2">
              <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                  <Bell size={16} className="text-blue-600" /> Recent System Activities
                </h3>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live Notifications
                </span>
              </div>
              <div className="space-y-2.5 overflow-y-auto max-h-[220px] custom-scrollbar pr-1">
                {notifications.length === 0 ? (
                  <p className="text-gray-400 text-xs text-center py-8 italic">No recent system activities</p>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif._id} className="flex gap-3 p-3 bg-gray-50/50 hover:bg-gray-50 rounded-xl transition-all border border-gray-100">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                        notif.type === 'auth' || notif.type === 'admin' ? 'bg-red-500' :
                        notif.type === 'submission' || notif.type === 'contact' ? 'bg-blue-500' :
                        notif.type === 'certificate' ? 'bg-teal-500' : 'bg-indigo-500'
                      }`}>
                        {(notif.type || 'S').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{notif.type || 'System'}</span>
                          <span className="text-[9px] text-gray-400 font-bold">{new Date(notif.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-bold text-gray-950 text-xs truncate">{notif.title}</h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1 leading-relaxed">{notif.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      )}
    </AdminLayout>
  );
}
