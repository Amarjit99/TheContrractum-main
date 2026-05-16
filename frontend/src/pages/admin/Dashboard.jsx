import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { TrendingUp, TrendingDown, ChevronRight, Link as LinkIcon } from 'lucide-react';

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

const StatCardItem = ({ title, value, trendParams, trendIcon, trendColor, trendText }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
    <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</p>
    <div className="flex items-end justify-between mt-2 sm:mt-3">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
      <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${trendColor}`}>
        {trendText} {trendIcon}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      .then(r => r.json()).then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Welcome, Admin!</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Manage your website efficiently.</p>
        </div>
        <button
          onClick={() => navigate('/admin/form-links')}
          className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#1e5cdc] hover:border-[#1e5cdc] px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm group w-full sm:w-auto"
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

          {/* Top Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            <StatCardItem
              title="Total Leads"
              value={stats?.totalContacts ? (1245 + stats.totalContacts).toLocaleString() : "1,245"}
              trendColor="text-emerald-500"
              trendText="▲ 12%"
              trendIcon={<TrendingUp size={16} />}
            />
            <StatCardItem
              title="Active Partners"
              value={stats?.totalPartners ? (stats.totalPartners + 4) : "4"}
              trendColor="text-emerald-500"
              trendText="1 Pending"
              trendIcon={<TrendingUp size={16} />}
            />
            <StatCardItem
              title="Job Applications"
              value={stats?.totalApplications ? (121 + stats.totalApplications).toLocaleString() : "121"}
              trendColor="text-emerald-500"
              trendText={`${stats?.totalApplications || 0} New`}
              trendIcon={<TrendingUp size={16} />}
            />
            <StatCardItem
              title="Blog Posts"
              value={stats?.totalBlogs || "12"}
              trendColor="text-emerald-500"
              trendText="Live"
              trendIcon={<TrendingUp size={16} />}
            />
            <StatCardItem
              title="Certificates"
              value={stats?.totalCertificates || "0"}
              trendColor="text-emerald-500"
              trendText="Issued"
              trendIcon={<TrendingUp size={16} />}
            />
            <StatCardItem
              title="ID Cards"
              value={stats?.totalIdCards || "0"}
              trendColor="text-emerald-500"
              trendText="Active"
              trendIcon={<TrendingUp size={16} />}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Website Traffic Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Website Traffic</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 bg-blue-50 px-3 py-1.5 rounded-full font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e5cdc]"></span> Visitors
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 border border-gray-100 dark:border-gray-700 rounded-full font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span> Page Views
                  </span>
                </div>
              </div>

              <div className="h-48 sm:h-64 w-full mt-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} dot={{ r: 4, fill: '#1e5cdc', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="pageViews" stroke="#93c5fd" strokeWidth={3} dot={{ r: 4, fill: '#93c5fd', strokeWidth: 2, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center">
                <button onClick={() => navigate('/admin/analytics')} className="bg-[#1e5cdc] text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition">View Report</button>
              </div>
            </div>

            {/* Lead Conversion Rate Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col relative">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Lead Conversion Rate</h3>
              </div>
              <div className="h-40 sm:h-52 w-full mt-auto">
                {/* Custom tooltip-like label for the highest bar */}
                <div className="absolute top-10 right-[15%] bg-[#1a3b5c] text-white text-sm font-bold px-3 py-1 rounded-md mb-2 shadow-lg z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#1a3b5c]">
                  12.5%
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <Tooltip cursor={{ fill: '#f3f4f6' }} />
                    <Bar dataKey="rate" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => navigate('/admin/analytics')} className="text-gray-500 hover:text-[#1e5cdc] text-sm font-medium flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md">View All <ChevronRight size={14} /></button>
              </div>
            </div>

          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Leads */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Live Feedback Loops</h3>
                <span className="text-xs font-bold text-gray-400">CONTACTS & APPS</span>
              </div>
              <div className="p-2 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
                {/* Applications first then contacts */}
                {stats?.recentApplications?.map((app, i) => (
                  <div key={`app-${i}`} className="flex flex-col py-2.5 px-3 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-50 last:border-0 relative group">
                    <span className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW APP</span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate max-w-[200px]">{app.fullName}</span>
                      <span className="text-[10px] text-gray-400 shrink-0">{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">{app.jobTitle}</span>
                  </div>
                ))}
                {[...(stats?.recentContacts || []), ...mockContacts].slice(0, 5).map((c, i) => (
                  <div key={`contact-${i}`} className="flex flex-col py-2.5 px-3 hover:bg-blue-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-[#1e5cdc] truncate max-w-[200px]">{c.name}</span>
                      <span className="text-xs text-gray-400 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="text-xs text-gray-500 truncate italic">{c.subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Blog Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Latest Blog Posts</h3>
                <button onClick={() => navigate('/admin/blogs')} className="text-[#1e5cdc] hover:text-blue-700 text-xs font-semibold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md">
                  View All <ChevronRight size={12} />
                </button>
              </div>
              <div className="px-5 py-3 border-b border-gray-50 flex justify-between text-xs text-gray-500 font-medium tracking-wide">
                <span>Title</span>
                <span>Status</span>
              </div>
              <div className="p-2 flex-1">
                {mockBlogs.map(b => (
                  <div key={b.id} className="flex justify-between items-center py-2.5 px-3 hover:bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span className="text-sm text-[#1e5cdc] font-medium truncate max-w-[200px] sm:max-w-[300px]">{b.title}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${b.status === 'Published' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'}`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Open Positions</h3>
                <div className="flex flex-col gap-2">
                  {mockJobs.map((job, idx) => (
                    <span key={job.id} className={`text-xs font-semibold px-3 py-1.5 rounded ${idx === 0 ? 'bg-[#1e5cdc] text-white' : 'bg-blue-50 text-[#1e5cdc] border border-blue-100'}`}>{job.title}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <div className="w-6 h-6 rounded bg-gray-100"></div>
                <div className="w-6 h-6 rounded bg-gray-100"></div>
              </div>
            </div>

            {/* Partner Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-6">Partner Requests</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-amber-500">1</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pending Approval</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </AdminLayout>
  );
}
