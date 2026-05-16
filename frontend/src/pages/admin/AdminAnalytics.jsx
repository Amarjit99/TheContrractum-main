import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LabelList, BarChart, Bar, Legend
} from 'recharts';
import { Activity, Users, MousePointer2, Target, TrendingUp, Calendar, ShieldAlert, RefreshCw, User, Monitor, Search } from 'lucide-react';
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

const categoryData = [
  { name: 'Technology', value: 45 },
  { name: 'Business', value: 30 },
  { name: 'Innovation', value: 15 },
  { name: 'Others', value: 10 },
];

export default function AdminAnalytics() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch(`${API}/api/audit-logs`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } else {
        toast.error('Failed to fetch audit logs');
        setLogs([]);
      }
    } catch (err) {
      toast.error('Error fetching audit logs');
      setLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      .then(r => r.json()).then(setStats).finally(() => setLoading(false));
    fetchLogs();
  }, [admin]);

  const filteredLogs = logs.filter(log => 
    (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.entity || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.details || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Advanced Analytics</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium italic">Deep dive into your traffic and conversion metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-600">
            <Calendar size={16} /> Last 7 Days
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Bounce Rate</span>
            <div className="p-2 bg-blue-50 text-[#1e5cdc] rounded-xl"><Activity size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">24.5%</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 2.1%</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Avg. Session</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">4m 12s</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 15s</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Page / Visit</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><MousePointer2 size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">3.8</h3>
            <span className="text-[10px] sm:text-xs font-bold text-red-500 flex items-center gap-0.5">▼ 0.2</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Goal Conversions</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Target size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">89</h3>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 12</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Traffic Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Live Traffic Telemetry</h3>
            <div className="flex flex-wrap items-center gap-4">
               <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-[#1e5cdc]"></span> Visitors
               </span>
               <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-500 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-blue-200"></span> Pageviews
               </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontSize: '12px', fontWeight: 800}}
                />
                <Area type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                <Area type="monotone" dataKey="pageViews" stroke="#bfdbfe" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Breakdown Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Content Popularity Index</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 800, fill: '#1e293b'}} />
                <Tooltip cursor={{fill: '#f8fafc', radius: 8}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Bar dataKey="value" fill="#1e5cdc" radius={[0, 10, 10, 0]} barSize={32}>
                  <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} style={{fontSize: '12px', fontWeight: 800, fill: '#64748b'}} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-gray-400 font-medium text-center">Data represents engagement distribution across site categories</p>
        </div>
      </div>

      {/* Audit Logs Section */}
      <div className="mt-12 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="text-[#1e5cdc]" size={24} />
              System Audit Logs
            </h2>
            <p className="text-sm text-gray-500 mt-1">Monitor administrative actions and security events.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] shadow-sm"
              />
            </div>
            <button
              onClick={fetchLogs}
              className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Date & Time</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Admin User</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Details</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loadingLogs ? (
                  <tr><td colSpan={5} className="py-10 text-center text-gray-400">Loading audit trail...</td></tr>
                ) : filteredLogs.length === 0 ? (
                  <tr><td colSpan={5} className="py-10 text-center text-gray-400">No logs match your search.</td></tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log._id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-800">{new Date(log.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-700">{log.performedBy?.name || log.adminName || 'System User'}</p>
                        <p className="text-[10px] text-gray-400">{log.performedBy?.email || 'Unknown Email'}</p>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          log.action === 'Create' ? 'bg-emerald-50 text-emerald-600' :
                          log.action === 'Update' ? 'bg-blue-50 text-blue-600' :
                          log.action === 'Delete' ? 'bg-red-50 text-red-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {log.action}
                        </span>
                        <span className="ml-2 text-xs font-semibold text-gray-600">{log.entity}</span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600 truncate max-w-xs">{log.details}</p>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          {log.ipAddress || '127.0.0.1'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

