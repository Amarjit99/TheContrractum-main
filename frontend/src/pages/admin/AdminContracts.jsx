import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  FileText, Plus, Search, Filter, CheckCircle, Clock, XCircle, 
  Send, Eye, ArrowRight, User as UserIcon, Calendar, ClipboardList
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminContracts() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setContracts(data);
    } catch (err) {
      console.error('Failed to fetch contracts:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleApprove = async (id, comments = 'Approved') => {
    try {
      const res = await fetch(`${API}/api/contracts/${id}/approve`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}` 
        },
        body: JSON.stringify({ comments })
      });
      if (res.ok) fetchContracts();
      else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id, comments = 'Rejected') => {
    if (!window.confirm("Are you sure you want to reject this contract?")) return;
    try {
      const res = await fetch(`${API}/api/contracts/${id}/reject`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}` 
        },
        body: JSON.stringify({ comments })
      });
      if (res.ok) fetchContracts();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Pending_Signature': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.employeeId?.firstName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Contract Management</h1>
          <p className="text-gray-500 font-medium">Lifecycle tracking, approvals, and digital signatures.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/contracts/create')}
          className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} /> Create New Contract
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total active', count: contracts.filter(c => c.status === 'Active').length, icon: <CheckCircle className="text-emerald-500" />, color: 'bg-emerald-50' },
          { label: 'Pending Signature', count: contracts.filter(c => c.status === 'Pending_Signature').length, icon: <Clock className="text-blue-500" />, color: 'bg-blue-50' },
          { label: 'In Approval Flow', count: contracts.filter(c => c.status.startsWith('Pending_') && c.status !== 'Pending_Signature').length, icon: <ClipboardList className="text-amber-500" />, color: 'bg-amber-50' },
          { label: 'Expiring Soon', count: contracts.filter(c => {
            if (!c.validUntil || c.status !== 'Active') return false;
            const expiry = new Date(c.validUntil);
            const now = new Date();
            const daysDiff = (expiry - now) / (1000 * 60 * 60 * 24);
            return daysDiff > 0 && daysDiff <= 30;
          }).length, icon: <XCircle className="text-red-500" />, color: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-5 rounded-2xl border border-white/50 flex items-center justify-between shadow-sm`}>
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.count}</h3>
            </div>
            <div className="p-3 bg-white/80 rounded-xl shadow-sm">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        {/* Filters */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search contracts or employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Pending_Manager', 'Pending_HR', 'Pending_Legal', 'Pending_Signature', 'Active'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${filter === f ? 'bg-[#1e5cdc] text-white border-[#1e5cdc]' : 'bg-white text-gray-500 border-gray-100 hover:border-[#1e5cdc]'}`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Contract Info</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-20 text-gray-400 font-medium">Loading contracts...</td></tr>
              ) : filteredContracts.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-20 text-gray-400 font-medium">No contracts found.</td></tr>
              ) : (
                filteredContracts.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-[#1e5cdc] rounded-xl group-hover:bg-[#1e5cdc] group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-[#1e5cdc] transition-colors">{c.title}</h4>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">{c.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                          {c.employeeId?.firstName[0]}{c.employeeId?.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{c.employeeId?.firstName} {c.employeeId?.lastName}</p>
                          <p className="text-xs text-gray-400 font-medium">{c.employeeId?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(c.status)}`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-xs font-bold">
                          {c.validFrom ? new Date(c.validFrom).toLocaleDateString() : 'N/A'}
                        </span>
                        <ArrowRight size={12} className="text-gray-300" />
                        <span className="text-xs font-bold">
                          {c.validUntil ? new Date(c.validUntil).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Contextual actions based on status and user role */}
                        {((c.status === 'Pending_Manager' && admin.adminSubRole === 'Manager') ||
                          (c.status === 'Pending_HR' && admin.adminSubRole === 'HR') ||
                          (c.status === 'Pending_Legal' && admin.adminSubRole === 'Legal') ||
                          (c.status === 'Pending_Final' && admin.role === 'super-admin')) && (
                          <>
                            <button onClick={() => handleApprove(c._id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                              <CheckCircle size={18} />
                            </button>
                            <button onClick={() => handleReject(c._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button onClick={() => navigate(`/admin/contracts/view/${c._id}`)} className="p-2 text-gray-400 hover:text-[#1e5cdc] hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
