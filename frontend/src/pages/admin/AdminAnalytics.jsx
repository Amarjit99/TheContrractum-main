import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LabelList, BarChart, Bar, Legend
} from 'recharts';
import { Activity, Users, MousePointer2, Target, TrendingUp, Calendar, ShieldAlert, RefreshCw, Search } from 'lucide-react';
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

  const [scanLogs, setScanLogs] = useState([]);
  const [loadingScanLogs, setLoadingScanLogs] = useState(true);

  const fetchScanLogs = async () => {
    setLoadingScanLogs(true);
    try {
      const res = await fetch(`${API}/api/certificates/logs`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
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
  };

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

  const [detailedStats, setDetailedStats] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      .then(r => r.json()).then(setStats).finally(() => setLoading(false));
    
    fetch(`${API}/api/admin/detailed-stats`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      .then(r => r.json()).then(setDetailedStats);

    fetchLogs();
    fetchScanLogs();
  }, [admin]);

  const filteredLogs = logs.filter(log => 
    (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.entity || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.targetType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.adminName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff'}}
                  itemStyle={{fontSize: '12px', fontWeight: 800}}
                />
                <Area type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                <Area type="monotone" dataKey="pageViews" stroke="#93c5fd" strokeWidth={2} fillOpacity={0} />
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
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 800, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)', radius: 8}} contentStyle={{borderRadius: '12px', border: 'none', backgroundColor: '#fff'}} />
                <Bar dataKey="value" fill="#1e5cdc" radius={[0, 10, 10, 0]} barSize={32}>
                  <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} style={{fontSize: '12px', fontWeight: 800, fill: '#94a3b8'}} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-gray-400 font-medium text-center">Data represents engagement distribution across site categories</p>
        </div>
      </div>


      {/* Certificate Analytics Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6">Certificate Lifecycle Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-6 uppercase tracking-wider">Category Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detailedStats?.categoryDistribution || []}>
                  <XAxis dataKey="_id" fontSize={10} tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="count" fill="#1e5cdc" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-6 uppercase tracking-wider">Department Volume</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detailedStats?.deptDistribution || []} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="_id" type="category" fontSize={10} width={80} tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issuance Trends */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-6 uppercase tracking-wider">Monthly Issuance Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={detailedStats?.monthlyTrends?.map(t => ({ month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][t._id-1], count: t.count })) || []}>
                  <XAxis dataKey="month" fontSize={10} tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#colorCount)" strokeWidth={3} />
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table (Integrated below charts) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
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
              <RefreshCw size={16} />
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
