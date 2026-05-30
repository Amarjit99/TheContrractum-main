import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutTemplate, Plus, Search, Pencil, Trash2, Eye, X, Save,
  CheckCircle, RefreshCw, Tag, AlignLeft, ArrowLeft, Upload
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TYPE_COLORS = {
  Employee:   'bg-blue-100 text-blue-700 border-blue-200',
  Intern:     'bg-purple-100 text-purple-700 border-purple-200',
  Freelancer: 'bg-amber-100 text-amber-700 border-amber-200',
  Vendor:     'bg-teal-100 text-teal-700 border-teal-200',
};

const EMPTY = { name: '', description: '', type: 'Employee', content: '', isActive: true };

export default function AdminContractTemplates() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [modal, setModal] = useState(null);   // null | 'create' | 'edit' | 'preview'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const token = localStorage.getItem('adminToken') || admin?.token;

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts/templates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setTemplates(data);
    } catch { toast.error('Failed to load templates'); }
    setLoading(false);
  };

  useEffect(() => { fetchTemplates(); }, []);

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setForm(prev => ({ ...prev, content: event.target.result }));
      toast.success('Template file loaded successfully!');
    };
    reader.onerror = () => toast.error('Failed to read file');
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };
  const openEdit = (t) => { setSelected(t); setForm({ name: t.name, description: t.description || '', type: t.type, content: t.content, isActive: t.isActive }); setModal('edit'); };
  const openPreview = (t) => { setSelected(t); setModal('preview'); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.content.trim()) {
      toast.error('Template name and content are required');
      return;
    }
    setSaving(true);
    try {
      const method = modal === 'edit' ? 'PUT' : 'POST';
      const url = modal === 'edit'
        ? `${API}/api/contracts/templates/${selected._id}`
        : `${API}/api/contracts/templates`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(modal === 'edit' ? 'Template updated!' : 'Template created!');
        setModal(null);
        fetchTemplates();
      } else {
        toast.error(data.error || data.message || 'Save failed');
      }
    } catch { toast.error('An error occurred'); }
    setSaving(false);
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete template "${t.name}"?`)) return;
    setDeleting(t._id);
    try {
      const res = await fetch(`${API}/api/contracts/templates/${t._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { toast.success('Template deleted'); fetchTemplates(); }
      else { const d = await res.json(); toast.error(d.message || 'Delete failed'); }
    } catch { toast.error('Delete failed'); }
    setDeleting(null);
  };

  const filtered = templates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || t.type === typeFilter;
    return matchSearch && matchType;
  });

  const FormPanel = () => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <h2 className="text-xl font-black text-gray-900">
            {modal === 'edit' ? 'Edit Template' : 'New Contract Template'}
          </h2>
          <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Template Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Standard Employment Contract"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Type *</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-700"
              >
                {['Employee', 'Intern', 'Freelancer', 'Vendor'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Status</label>
              <select
                value={form.isActive ? 'Active' : 'Inactive'}
                onChange={e => setForm({ ...form, isActive: e.target.value === 'Active' })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-700"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of this template's purpose"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm text-gray-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                <span>Template Content * <span className="text-blue-500 font-medium normal-case tracking-normal ml-1">(HTML supported)</span></span>
                <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-colors">
                  <Upload size={14} /> Upload HTML/TXT
                  <input type="file" accept=".txt,.html" className="hidden" onChange={handleFileUpload} />
                </label>
              </label>
              <textarea
                rows={20}
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Enter the contract body here. You can use HTML tags and placeholders like {{employee_name}}, {{start_date}}, {{position}}, etc."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-mono text-xs leading-relaxed text-gray-700 resize-none"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
          <button onClick={() => setModal(null)} className="px-6 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-200 text-sm disabled:opacity-50"
          >
            {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving…' : 'Save Template'}
          </button>
        </div>
      </div>
    </div>
  );

  const PreviewPanel = () => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-black text-gray-900">{selected?.name}</h2>
            <span className={`mt-1 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${TYPE_COLORS[selected?.type]}`}>
              {selected?.type}
            </span>
          </div>
          <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
            dangerouslySetInnerHTML={{ __html: selected?.content || '<p>No content.</p>' }}
          />
        </div>
        <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl shrink-0">
          <button onClick={() => setModal(null)} className="px-6 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all text-sm">Close</button>
          <button onClick={() => openEdit(selected)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all text-sm">
            <Pencil size={15} /> Edit Template
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {(modal === 'create' || modal === 'edit') && <FormPanel />}
      {modal === 'preview' && selected && <PreviewPanel />}

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/contracts')}
            title="Back to Contracts"
            className="p-2.5 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-100 rounded-xl text-indigo-600"><LayoutTemplate size={24} /></span>
              Contract Templates
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Manage reusable contract templates with professional content for all types.
            </p>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25 self-start sm:self-auto"
        >
          <Plus size={17} /> New Template
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Employee', 'Intern', 'Freelancer', 'Vendor'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border ${
                typeFilter === t ? 'bg-[#1e5cdc] text-white border-[#1e5cdc]' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button onClick={fetchTemplates} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-100 bg-white text-gray-500 hover:bg-gray-50 shrink-0">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Template Grid */}
      {loading ? (
        <div className="py-24 flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-blue-500" size={32} />
          <p className="text-gray-400 font-medium">Loading templates…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-24 flex flex-col items-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
            <LayoutTemplate size={28} />
          </div>
          <p className="text-gray-600 font-bold">No templates found</p>
          <button onClick={openCreate} className="flex items-center gap-2 bg-[#1e5cdc] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
            <Plus size={16} /> Create First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(t => (
            <div key={t._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col overflow-hidden">
              {/* Card top accent */}
              <div className={`h-1.5 w-full ${t.type === 'Employee' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : t.type === 'Intern' ? 'bg-gradient-to-r from-purple-500 to-violet-500' : t.type === 'Freelancer' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-teal-400 to-cyan-500'}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-[#1e5cdc] transition-colors">{t.name}</h3>
                    {t.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">{t.description}</p>}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0 ${TYPE_COLORS[t.type]}`}>
                    {t.type}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><AlignLeft size={11} /> {Math.round((t.content || '').length / 100) * 100}+ chars</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle size={11} className={t.isActive ? 'text-emerald-500' : 'text-gray-400'} />
                    {t.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Tag size={11} />
                    {new Date(t.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => openPreview(t)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all text-xs font-bold border border-gray-100 hover:border-blue-100"
                  >
                    <Eye size={13} /> Preview
                  </button>
                  <button
                    onClick={() => openEdit(t)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all text-xs font-bold border border-gray-100 hover:border-indigo-100"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
                    disabled={deleting === t._id}
                    className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all border border-gray-100 hover:border-red-100 disabled:opacity-40"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!loading && (
        <p className="mt-6 text-center text-xs text-gray-400 font-medium">
          {filtered.length} template{filtered.length !== 1 ? 's' : ''} · {templates.filter(t => t.isActive).length} active
        </p>
      )}
    </AdminLayout>
  );
}
