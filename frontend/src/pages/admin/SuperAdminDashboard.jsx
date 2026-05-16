import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import SuperAdminLayout from '../../components/admin/SuperAdminLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Link as LinkIcon, ChevronRight, UserPlus, CheckCircle2, Clock, Trash2, Mail, ShieldAlert } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

const StatCardItem = ({ title, value, trendIcon, trendColor, trendText }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <p className="text-sm font-semibold text-gray-500 mb-3">{title}</p>
    <div className="flex items-center justify-between">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      <div className={`flex items-center gap-1 text-[13px] font-bold ${trendColor} bg-emerald-50/50 px-2 py-1 rounded-lg`}>
        {trendText} {trendIcon}
      </div>
    </div>
  </div>
);

export default function SuperAdminDashboard() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [isApproving, setIsApproving] = useState(null);

  const fetchDashboardData = async () => {
    if (!admin?.token) return;
    try {
      const [statsRes, pendingRes] = await Promise.all([
        fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin?.token}` } }),
        fetch(`${API}/api/admin/pending-registrations`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      ]);

      const statsData = await statsRes.json();
      const pendingData = await pendingRes.json();

      setStats(statsRes.ok ? statsData : null);
      setPendingAdmins(Array.isArray(pendingData) ? pendingData : []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [admin]);

  const handleApprove = async (id) => {
    if (!confirm('Approve this administrator registration?')) return;
    setIsApproving(id);
    try {
      const res = await fetch(`${API}/api/admin/approve-registration/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        toast.success('Admin approved successfully!');
        fetchDashboardData(); // Refresh both stats and list
      } else {
        toast.error('Failed to approve registration');
      }
    } catch (err) {
      toast.error('Error during approval');
    } finally {
      setIsApproving(null);
    }
  };

  return (
    <SuperAdminLayout>
      <div className="mb-8 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Welcome, SuperAdmin</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">Manage your website efficiently.</p>
        </div>
        <button
          onClick={() => navigate('/admin/form-links')}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:text-[#1e5cdc] hover:border-[#1e5cdc] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md w-full sm:w-auto mt-2 sm:mt-0 group"
        >
          <LinkIcon size={18} className="text-gray-400 group-hover:text-[#1e5cdc] transition-colors" />
          Form Links
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <StatCardItem
              title="Total Users"
              value={stats?.totalUsers || "245"}
              trendColor="text-emerald-500"
              trendText="Active"
              trendIcon={<TrendingUp size={14} className="rotate-45" />}
            />
            <StatCardItem
              title="System Analytics"
              value="Live"
              trendColor="text-blue-500"
              trendText="Tracking"
              trendIcon={<TrendingUp size={14} className="rotate-45" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h3 className="font-bold text-gray-800">Website Traffic</h3>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-[11px] text-gray-600 bg-blue-50/50 px-3 py-1.5 rounded-full font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e5cdc]"></span> Visitors
                  </span>
                  <span className="flex items-center gap-2 text-[11px] text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span> Page Views
                  </span>
                </div>
              </div>

              <div className="h-64 w-full mt-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 600 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} dot={{ r: 4, fill: '#1e5cdc', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="pageViews" stroke="#93c5fd" strokeWidth={3} dot={{ r: 4, fill: '#93c5fd', strokeWidth: 2, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center">
                <button onClick={() => navigate('/admin/analytics')} className="bg-[#1e5cdc] text-white text-sm font-bold px-8 py-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all">View Report</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-visible">
              <div className="flex justify-between items-center mb-6 sm:mb-10">
                <h3 className="font-bold text-gray-800">Lead Conversion Rate</h3>
              </div>
              <div className="h-56 w-full mt-auto relative overflow-visible">
                <div className="absolute top-[-30px] right-[40px] bg-[#1a335a] text-white text-[12px] font-black px-2.5 py-1.5 rounded-lg shadow-xl z-20 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[#1a335a]">
                  12.5%
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 600 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* System Overview Section */}
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-xl shadow-blue-900/5 border border-blue-50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-50/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl sm:blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10 relative z-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                  <UserPlus size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-800 uppercase tracking-tight">New Admin Registrations</h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-0.5">Verification Queue</p>
                </div>
              </div>
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse mr-2"></span>
                <span className="text-[11px] font-black text-blue-700 uppercase tracking-wider">{pendingAdmins.length} Applications Pending</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
              {pendingAdmins.length === 0 ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <ShieldAlert size={48} className="text-gray-200 mb-4" />
                  <p className="text-gray-400 font-bold text-sm tracking-tight">No pending registrations available</p>
                </div>
              ) : (
                pendingAdmins.map((reg) => (
                  <div key={reg._id} className="group bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                    <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-blue-100 shrink-0">
                        {(reg.firstName || reg.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-gray-800 text-sm sm:text-base truncate leading-none mb-1">
                          {reg.firstName ? `${reg.firstName} ${reg.lastName}` : (reg.name || 'Admin User')}
                        </h4>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Mail size={12} className="shrink-0" />
                          <span className="text-[10px] sm:text-[11px] font-bold truncate tracking-tight">{reg.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Role</span>
                        <span className="text-[11px] font-black text-blue-700 bg-blue-100/50 px-2.5 py-1 rounded-lg uppercase">{reg.adminSubRole}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Apply Date</span>
                        <span className="text-[11px] font-black text-gray-700">{new Date(reg.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleApprove(reg._id)}
                      disabled={isApproving === reg._id}
                      className="w-full bg-[#1e5cdc] text-white font-black uppercase tracking-widest py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 disabled:bg-blue-200 pointer-events-auto text-xs sm:text-sm"
                    >
                      {isApproving === reg._id ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          Approve Admin
                        </>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </SuperAdminLayout>
  );
}
