import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  FileText, Plus, Search, CheckCircle, Clock, XCircle, 
  Send, Eye, ArrowRight, User as UserIcon, Calendar, ClipboardList,
  Trash2, LayoutTemplate, RefreshCw, TrendingUp, Shield, FilePlus2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const STATUS_CONFIG = {
  Active:            { label: 'Active',            color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Draft:             { label: 'Draft',             color: 'bg-gray-100 text-gray-600 border-gray-200',          dot: 'bg-gray-400' },
  Pending_Manager:   { label: 'Pending Manager',   color: 'bg-amber-100 text-amber-700 border-amber-200',       dot: 'bg-amber-500' },
  Pending_HR:        { label: 'Pending HR',        color: 'bg-blue-100 text-blue-700 border-blue-200',          dot: 'bg-blue-500' },
  Pending_Legal:     { label: 'Pending Legal',     color: 'bg-purple-100 text-purple-700 border-purple-200',    dot: 'bg-purple-500' },
  Pending_Final:     { label: 'Pending Final',     color: 'bg-indigo-100 text-indigo-700 border-indigo-200',    dot: 'bg-indigo-500' },
  Pending_Signature: { label: 'Pending Signature', color: 'bg-cyan-100 text-cyan-700 border-cyan-200',          dot: 'bg-cyan-500' },
  Rejected:          { label: 'Rejected',          color: 'bg-red-100 text-red-700 border-red-200',             dot: 'bg-red-500' },
  Expired:           { label: 'Expired',           color: 'bg-rose-100 text-rose-700 border-rose-200',          dot: 'bg-rose-400' },
};

const FILTERS = ['All', 'Draft', 'Pending_Manager', 'Pending_HR', 'Pending_Legal', 'Pending_Final', 'Pending_Signature', 'Active', 'Rejected'];

export default function AdminContracts() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setContracts(data);
    } catch (err) {
      console.error('Failed to fetch contracts:', err);
      toast.error('Failed to load contracts');
    }
    setLoading(false);
  };

  useEffect(() => { fetchContracts(); }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API}/api/contracts/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` },
        body: JSON.stringify({ comments: 'Approved' })
      });
      const data = await res.json();
      if (res.ok) { toast.success('Contract approved!'); fetchContracts(); }
      else toast.error(data.message || 'Action not allowed');
    } catch { toast.error('Failed to approve'); }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this contract?')) return;
    try {
      const res = await fetch(`${API}/api/contracts/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` },
        body: JSON.stringify({ comments: 'Rejected by admin' })
      });
      if (res.ok) { toast.success('Contract rejected'); fetchContracts(); }
    } catch { toast.error('Failed to reject'); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete contract "${title}"? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/api/contracts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` }
      });
      if (res.ok) { toast.success('Contract deleted'); fetchContracts(); }
      else { const d = await res.json(); toast.error(d.message || 'Delete failed'); }
    } catch { toast.error('Failed to delete'); }
    setDeleting(null);
  };

  const filteredContracts = contracts.filter(c => {
    const matchSearch = 
      (c.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.employeeId?.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.employeeId?.lastName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.type || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: 'Total Contracts',    count: contracts.length,                                         icon: <FileText className="text-blue-500" size={22} />,    bg: 'bg-blue-50',    border: 'border-blue-100' },
    { label: 'Active',            count: contracts.filter(c => c.status === 'Active').length,       icon: <CheckCircle className="text-emerald-500" size={22} />, bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Pending Signature', count: contracts.filter(c => c.status === 'Pending_Signature').length, icon: <Clock className="text-cyan-500" size={22} />,   bg: 'bg-cyan-50',    border: 'border-cyan-100' },
    { label: 'In Review Flow',    count: contracts.filter(c => c.status.startsWith('Pending_') && c.status !== 'Pending_Signature').length, icon: <ClipboardList className="text-amber-500" size={22} />, bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Rejected',          count: contracts.filter(c => c.status === 'Rejected').length,     icon: <XCircle className="text-red-500" size={22} />,      bg: 'bg-red-50',     border: 'border-red-100' },
    { label: 'Expiring (30d)',    count: contracts.filter(c => {
      if (!c.validUntil || c.status !== 'Active') return false;
      const diff = (new Date(c.validUntil) - new Date()) / 86400000;
      return diff > 0 && diff <= 30;
    }).length,                                                                                        icon: <TrendingUp className="text-rose-500" size={22} />,   bg: 'bg-rose-50',    border: 'border-rose-100' },
  ];

  const canApproveReject = (c) => {
    if (!admin) return false;
    return (
      (c.status === 'Pending_Manager' && admin.adminSubRole === 'Manager') ||
      (c.status === 'Pending_HR' && admin.adminSubRole === 'HR') ||
      (c.status === 'Pending_Legal' && admin.adminSubRole === 'Legal') ||
      (c.status === 'Pending_Final' && admin.role === 'super-admin')
    );
  };

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span className="p-2 bg-blue-100 rounded-xl text-blue-600"><Shield size={24} /></span>
              Contract Management
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Lifecycle tracking · Multi-stage approvals · Digital signatures
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/contracts/templates')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
            >
              <LayoutTemplate size={17} /> Templates
            </button>
            <button
              onClick={() => navigate('/admin/contracts/create')}
              className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25"
            >
              <FilePlus2 size={17} /> New Contract
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-tight">{s.label}</p>
              {s.icon}
            </div>
            <p className="text-2xl font-black text-gray-900">{s.count}</p>
          </div>
        ))}
      </div>

      {/* ── Main Table Card ── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-5 border-b border-gray-50 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by title, employee, type…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar flex-1">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                  filter === f
                    ? 'bg-[#1e5cdc] text-white border-[#1e5cdc] shadow-sm shadow-blue-200'
                    : 'bg-white text-gray-500 border-gray-100 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {STATUS_CONFIG[f]?.label || f}
              </button>
            ))}
          </div>
          <button
            onClick={fetchContracts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-100 bg-white text-gray-500 hover:bg-gray-50 transition-all shrink-0"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Contract</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">Employee</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Duration</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-24">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="animate-spin text-blue-500" size={28} />
                      <p className="text-gray-400 font-medium text-sm">Loading contracts…</p>
                    </div>
                  </td>
                </tr>
              ) : filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-24">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <FileText size={28} />
                      </div>
                      <p className="text-gray-500 font-bold text-sm">No contracts found</p>
                      <p className="text-gray-400 text-xs">Try adjusting your filters or create a new contract</p>
                      <button
                        onClick={() => navigate('/admin/contracts/create')}
                        className="mt-2 flex items-center gap-2 bg-[#1e5cdc] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                      >
                        <Plus size={16} /> Create Contract
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContracts.map(c => {
                  const sc = STATUS_CONFIG[c.status] || STATUS_CONFIG.Draft;
                  return (
                    <tr key={c._id} className="hover:bg-blue-50/30 transition-colors group">
                      {/* Contract Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-[#1e5cdc] group-hover:text-white transition-colors shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-900 group-hover:text-[#1e5cdc] transition-colors text-sm truncate max-w-[160px] lg:max-w-xs">{c.title}</h4>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">{c.type} Contract</p>
                            {/* Mobile employee */}
                            <div className="sm:hidden flex items-center gap-1.5 mt-1.5 text-gray-500">
                              <UserIcon size={10} />
                              <span className="text-[10px] font-medium truncate max-w-[110px]">
                                {c.employeeId?.firstName} {c.employeeId?.lastName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Employee */}
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-[11px] uppercase shrink-0">
                            {c.employeeId?.firstName?.[0]}{c.employeeId?.lastName?.[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{c.employeeId?.firstName} {c.employeeId?.lastName}</p>
                            <p className="text-[11px] text-gray-400 font-medium truncate max-w-[130px]">{c.employeeId?.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${sc.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-[11px] font-bold">
                            {c.validFrom ? new Date(c.validFrom).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                          </span>
                          <ArrowRight size={10} className="text-gray-300" />
                          <span className="text-[11px] font-bold">
                            {c.validUntil ? new Date(c.validUntil).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {canApproveReject(c) && (
                            <>
                              <button
                                onClick={() => handleApprove(c._id)}
                                title="Approve"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <CheckCircle size={17} />
                              </button>
                              <button
                                onClick={() => handleReject(c._id)}
                                title="Reject"
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <XCircle size={17} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => navigate(`/admin/contracts/view/${c._id}`)}
                            title="View / Edit"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye size={17} />
                          </button>
                          {(c.status === 'Draft' || c.status === 'Rejected') && (
                            <button
                              onClick={() => handleDelete(c._id, c.title)}
                              disabled={deleting === c._id}
                              title="Delete"
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                            >
                              <Trash2 size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && filteredContracts.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium bg-gray-50/30">
            <span>Showing <strong className="text-gray-600">{filteredContracts.length}</strong> of <strong className="text-gray-600">{contracts.length}</strong> contracts</span>
            <span>Last refreshed: {new Date().toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Workflow Guide */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5">
        <h3 className="text-sm font-black text-gray-700 mb-3 flex items-center gap-2">
          <Send size={16} className="text-blue-500" /> Approval Workflow
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-600">
          {['Draft', 'Manager Review', 'HR Review', 'Legal Review', 'Final Approval', 'Pending Signature', 'Active'].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 shadow-sm">{step}</span>
              {i < arr.length - 1 && <ArrowRight size={14} className="text-blue-300" />}
            </span>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
