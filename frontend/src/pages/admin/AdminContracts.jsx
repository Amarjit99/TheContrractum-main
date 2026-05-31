import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  FileText, Plus, Search, CheckCircle, Clock, XCircle, 
  Send, Eye, ArrowRight, User as UserIcon, Calendar, ClipboardList,
  Trash2, LayoutTemplate, RefreshCw, TrendingUp, Shield, FilePlus2,
  Mail, Download, AlertTriangle, X, Users, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [sendingEmail, setSendingEmail] = useState(null);
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [showExpiry, setShowExpiry] = useState(true);
  // Bulk Generate State
  const [showBulk, setShowBulk] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [bulkForm, setBulkForm] = useState({ templateId: '', employeeIds: [], validFrom: '', validUntil: '', type: 'Employee' });
  const [bulkLoading, setBulkLoading] = useState(false);

  const token = localStorage.getItem('adminToken') || admin?.token;
  const headers = { Authorization: `Bearer ${token}` };
  const jsonHeaders = { ...headers, 'Content-Type': 'application/json' };

  const fetchContracts = useCallback(async () => {
    setLoading(true);
    try {
      const authHeaders = { Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` };
      const res = await fetch(`${API}/api/contracts`, { headers: authHeaders });
      const data = await res.json();
      if (Array.isArray(data)) setContracts(data);
    } catch {
      toast.error('Failed to load contracts');
    }
    setLoading(false);
  }, [admin]);

  const fetchExpiryAlerts = useCallback(async () => {
    try {
      const authHeaders = { Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` };
      const res = await fetch(`${API}/api/contracts/expiry-alerts?days=30`, { headers: authHeaders });
      const data = await res.json();
      if (data.expiring) setExpiryAlerts(data.expiring);
    } catch (e) {
      console.error(e);
    }
  }, [admin]);

  const fetchTemplatesAndUsers = useCallback(async () => {
    try {
      const authHeaders = { Authorization: `Bearer ${localStorage.getItem('adminToken') || admin?.token}` };
      const [tRes, uRes] = await Promise.all([
        fetch(`${API}/api/contracts/templates`, { headers: authHeaders }),
        fetch(`${API}/api/users`, { headers: authHeaders, cache: 'no-cache' })
      ]);
      const [tData, uData] = await Promise.all([tRes.json(), uRes.json()]);
      if (Array.isArray(tData)) setTemplates(tData);
      if (Array.isArray(uData)) setAllUsers(uData);
    } catch (e) {
      console.error(e);
    }
  }, [admin]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchContracts();
      fetchExpiryAlerts();
    });
  }, [fetchContracts, fetchExpiryAlerts]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API}/api/contracts/${id}/approve`, {
        method: 'PUT', headers: jsonHeaders,
        body: JSON.stringify({ comments: 'Approved' })
      });
      const data = await res.json();
      if (res.ok) { toast.success('Contract approved!'); fetchContracts(); }
      else toast.error(data.message || 'Action not allowed');
    } catch { toast.error('Failed to approve'); }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this contract?')) return;
    try {
      const res = await fetch(`${API}/api/contracts/${id}/reject`, {
        method: 'PUT', headers: jsonHeaders,
        body: JSON.stringify({ comments: 'Rejected by admin' })
      });
      if (res.ok) { toast.success('Contract rejected'); fetchContracts(); }
    } catch { toast.error('Failed to reject'); }
  };

  const handleSendEmail = async (c) => {
    if (!window.confirm(`Send contract "${c.title}" to ${c.employeeId?.email}?`)) return;
    setSendingEmail(c._id);
    try {
      const res = await fetch(`${API}/api/contracts/${c._id}/send-email`, { method: 'POST', headers: jsonHeaders });
      const data = await res.json();
      if (res.ok) toast.success(data.message);
      else toast.error(data.message || 'Email failed');
    } catch { toast.error('Failed to send email'); }
    setSendingEmail(null);
  };

  const handleDownloadPDF = async (c) => {
    const toastId = toast.loading('Generating PDF…');
    try {
      const div = document.createElement('div');
      div.style.cssText = 'width:794px;padding:40px;font-family:Georgia,serif;background:white;position:fixed;left:-9999px;top:0;';
      div.innerHTML = c.content || '<p>No content</p>';
      document.body.appendChild(div);
      const canvas = await html2canvas(div, { scale: 2, useCORS: true, logging: false });
      document.body.removeChild(div);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let y = 0;
      while (y < imgHeight) {
        if (y > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, -y, imgWidth, imgHeight);
        y += 297;
      }
      pdf.save(`${(c.title || 'Contract').replace(/[^a-z0-9]/gi, '_')}.pdf`);
      toast.success('PDF downloaded!', { id: toastId });
    } catch {
      toast.error('PDF generation failed', { id: toastId });
    }
  };

  const handleBulkGenerate = async () => {
    if (!bulkForm.templateId || !bulkForm.employeeIds.length) {
      toast.error('Select a template and at least one employee'); return;
    }
    setBulkLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts/bulk-generate`, {
        method: 'POST', headers: jsonHeaders, body: JSON.stringify(bulkForm)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message); setShowBulk(false);
        setBulkForm({ templateId: '', employeeIds: [], validFrom: '', validUntil: '', type: 'Employee' });
        fetchContracts();
      } else toast.error(data.message || 'Bulk generation failed');
    } catch { toast.error('Bulk generation failed'); }
    setBulkLoading(false);
  };

  const toggleEmployee = (id) => {
    setBulkForm(prev => ({
      ...prev,
      employeeIds: prev.employeeIds.includes(id)
        ? prev.employeeIds.filter(e => e !== id)
        : [...prev.employeeIds, id]
    }));
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
    const empName = c.employeeId?.name || `${c.employeeId?.firstName || ''} ${c.employeeId?.lastName || ''}`.trim();
    const matchSearch =
      (c.title || '').toLowerCase().includes(search.toLowerCase()) ||
      empName.toLowerCase().includes(search.toLowerCase()) ||
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
      {/* Expiry Alerts Banner */}
      {showExpiry && expiryAlerts.length > 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-amber-800">⚠️ {expiryAlerts.length} contract{expiryAlerts.length > 1 ? 's' : ''} expiring within 30 days</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {expiryAlerts.map(c => (
                <span key={c._id} className="text-[11px] bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                  {c.title} – {new Date(c.validUntil).toLocaleDateString('en-IN', {day:'2-digit',month:'short'})}
                </span>
              ))}
            </div>
          </div>
          <button onClick={() => setShowExpiry(false)} className="text-amber-400 hover:text-amber-600"><X size={16} /></button>
        </div>
      )}

      {/* Bulk Generate Modal */}
      {showBulk && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-gray-900">Bulk Generate Contracts</h2>
                <p className="text-xs text-gray-400 mt-0.5">Generate draft contracts for multiple employees at once</p>
              </div>
              <button onClick={() => setShowBulk(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Template *</label>
                <select value={bulkForm.templateId} onChange={e => setBulkForm({...bulkForm, templateId: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none">
                  <option value="">Choose template…</option>
                  {templates.map(t => <option key={t._id} value={t._id}>{t.name} ({t.type})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Valid From</label>
                  <input type="date" value={bulkForm.validFrom} onChange={e => setBulkForm({...bulkForm, validFrom: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Valid Until</label>
                  <input type="date" value={bulkForm.validUntil} onChange={e => setBulkForm({...bulkForm, validUntil: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Employees * ({bulkForm.employeeIds.length} selected)</label>
                <div className="max-h-48 overflow-y-auto space-y-1.5 border border-gray-100 rounded-xl p-3 bg-gray-50">
                  {allUsers.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No employees loaded</p>
                  ) : allUsers.map(u => {
                    const name = u.name || `${u.firstName||''} ${u.lastName||''}`.trim();
                    const checked = bulkForm.employeeIds.includes(u._id);
                    return (
                      <label key={u._id} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer ${checked ? 'bg-blue-50 border border-blue-100' : 'hover:bg-white'}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggleEmployee(u._id)} />
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold shrink-0">{name[0]?.toUpperCase()}</div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{name}</p>
                          <p className="text-[10px] text-gray-400">{u.jobTitle || 'Employee'} • {u.email}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-5 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
              <button onClick={() => setShowBulk(false)} className="flex-1 py-3 text-sm font-bold border border-gray-200 rounded-xl text-gray-600">Cancel</button>
              <button onClick={handleBulkGenerate} disabled={bulkLoading}
                className="flex-[2] py-3 text-sm font-bold bg-[#1e5cdc] text-white rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                {bulkLoading ? <RefreshCw size={15} className="animate-spin" /> : <Users size={15} />}
                {bulkLoading ? 'Generating…' : `Generate ${bulkForm.employeeIds.length || ''} Contracts`}
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate('/admin/contracts/templates')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
            >
              <LayoutTemplate size={17} /> Templates
            </button>
            <button
              onClick={() => { setShowBulk(true); fetchTemplatesAndUsers(); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all shadow-sm"
            >
              <Users size={17} /> Bulk Generate
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
                              <button onClick={() => handleApprove(c._id)} title="Approve"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                <CheckCircle size={17} />
                              </button>
                              <button onClick={() => handleReject(c._id)} title="Reject"
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <XCircle size={17} />
                              </button>
                            </>
                          )}
                          {/* Download PDF */}
                          <button onClick={() => handleDownloadPDF(c)} title="Download PDF"
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Download size={17} />
                          </button>
                          {/* Send Email */}
                          <button onClick={() => handleSendEmail(c)} title="Email to Employee"
                            disabled={sendingEmail === c._id}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40">
                            {sendingEmail === c._id ? <RefreshCw size={17} className="animate-spin" /> : <Mail size={17} />}
                          </button>
                          <button onClick={() => navigate(`/admin/contracts/view/${c._id}`)} title="View / Edit"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={17} />
                          </button>
                          {(c.status === 'Draft' || c.status === 'Rejected') && (
                            <button onClick={() => handleDelete(c._id, c.title)} disabled={deleting === c._id}
                              title="Delete" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40">
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
