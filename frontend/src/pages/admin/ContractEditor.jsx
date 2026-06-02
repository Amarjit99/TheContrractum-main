import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  ArrowLeft, Save, Send, User as UserIcon, Calendar,
  FileText, ClipboardList, Info, Eye, EyeOff, RefreshCw,
  CheckCircle, LayoutTemplate, ChevronDown, Upload
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CONTRACT_TYPES = ['Employee', 'Intern', 'Freelancer', 'Vendor'];

const TYPE_BADGE = {
  Employee:   'bg-blue-100 text-blue-700 border-blue-200',
  Intern:     'bg-purple-100 text-purple-700 border-purple-200',
  Freelancer: 'bg-amber-100 text-amber-700 border-amber-200',
  Vendor:     'bg-teal-100 text-teal-700 border-teal-200',
};

export default function ContractEditor() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading]     = useState(false);
  const [users, setUsers]         = useState([]);
  const [templates, setTemplates] = useState([]);
  const [preview, setPreview]     = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [designationFilter, setDesignationFilter] = useState('');

  const [formData, setFormData] = useState({
    employeeId: '',
    title:      '',
    description:'',
    type:       'Employee',
    content:    '',
    status:     'Draft',
    validFrom:  '',
    validUntil: ''
  });

  const token = localStorage.getItem('adminToken') || admin?.token;

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/users?t=${new Date().getTime()}`, { 
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-cache'
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch { console.error('Failed to fetch users'); }
  }, [token]);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/contracts/templates`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (Array.isArray(data)) setTemplates(data);
    } catch { console.error('Failed to fetch templates'); }
  }, [token]);

  const fetchContract = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/contracts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          employeeId:  data.employeeId?._id || data.employeeId || '',
          title:       data.title || '',
          description: data.description || '',
          type:        data.type || 'Employee',
          content:     data.content || '',
          status:      data.status || 'Draft',
          validFrom:   data.validFrom ? data.validFrom.slice(0, 10) : '',
          validUntil:  data.validUntil ? data.validUntil.slice(0, 10) : '',
        });
      }
    } catch { console.error('Failed to fetch contract'); }
  }, [id, token]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchUsers();
      fetchTemplates();
      if (isEdit) fetchContract();
    });
  }, [fetchUsers, fetchTemplates, fetchContract, isEdit]);

  const replacePlaceholders = (contentText, userId) => {
    if (!contentText) return '';
    const user = users.find(u => u._id === userId);
    let newContent = contentText;
    
    const replacements = {
      '{{employee_name}}': user ? (user.name || `${user.firstName || ''} ${user.lastName || ''}`).trim() : '{{employee_name}}',
      '{{position}}': user?.jobTitle || 'Employee',
      '{{department}}': user?.department || '{{department}}',
      '{{company_name}}': 'The Contractum Private Limited',
      '{{company_address}}': 'India',
      '{{start_date}}': formData.validFrom ? new Date(formData.validFrom).toLocaleDateString() : '{{start_date}}',
      '{{end_date}}': formData.validUntil ? new Date(formData.validUntil).toLocaleDateString() : '{{end_date}}',
      '{{salary}}': 'TBD',
      '{{employee_address}}': user ? `${user.city || ''}, ${user.country || ''}`.replace(/^, /, '').trim() : '{{employee_address}}',
      '{{company_city}}': 'India'
    };

    Object.keys(replacements).forEach(key => {
      newContent = newContent.replace(new RegExp(key, 'g'), replacements[key] || '');
    });
    return newContent;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      let loadedContent = event.target.result;
      if (formData.employeeId) {
        loadedContent = replacePlaceholders(loadedContent, formData.employeeId);
      }
      setFormData(prev => ({ ...prev, content: loadedContent }));
      toast.success('Custom contract file loaded successfully!');
    };
    reader.onerror = () => toast.error('Failed to read file');
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };

  const applyTemplate = (templateId) => {
    const template = templates.find(t => t._id === templateId);
    if (template) {
      let populatedContent = template.content;
      if (formData.employeeId) {
        populatedContent = replacePlaceholders(template.content, formData.employeeId);
      }
      setFormData(prev => ({ ...prev, content: populatedContent, type: template.type }));
      setTemplateOpen(false);
      toast.success(`Template "${template.name}" applied`);
    }
  };

  const handleAutoFill = () => {
    if (!formData.content) {
      toast.error('Template content is empty!');
      return;
    }
    const newContent = replacePlaceholders(formData.content, formData.employeeId);
    setFormData(prev => ({ ...prev, content: newContent }));
    toast.success('Placeholders auto-filled based on selected details!');
  };

  const handleSubmit = async (submitForApproval = false) => {
    if (!formData.employeeId || !formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields: employee, title, and contract content.');
      return;
    }

    setLoading(true);
    try {
      const sanitized = { ...formData };
      if (!sanitized.validFrom)  delete sanitized.validFrom;
      if (!sanitized.validUntil) delete sanitized.validUntil;

      const payload = { ...sanitized, status: submitForApproval ? 'Pending_Manager' : 'Draft' };

      const method = isEdit ? 'PUT' : 'POST';
      const url    = isEdit ? `${API}/api/contracts/${id}` : `${API}/api/contracts`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(submitForApproval ? 'Contract submitted for approval!' : 'Contract saved as draft.');
        navigate('/admin/contracts');
      } else {
        toast.error(data.error || data.message || 'Failed to save contract');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
    setLoading(false);
  };

  const selectedUser = users.find(u => u._id === formData.employeeId);
  const uniqueDesignations = [...new Set(users.map(u => u.jobTitle || 'Employee').filter(Boolean))];
  const filteredUsers = designationFilter ? users.filter(u => (u.jobTitle || 'Employee') === designationFilter) : users;

  return (
    <AdminLayout>
      {/* ── Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/contracts')}
            className="p-2.5 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isEdit ? 'Edit Contract' : 'Create Contract'}
            </h1>
            <p className="text-gray-500 font-medium text-sm mt-0.5">
              {isEdit ? 'Update existing contract details and content.' : 'Draft a new contract and assign it to a user.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setPreview(p => !p)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all ${preview ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'}`}
          >
            {preview ? <EyeOff size={16} /> : <Eye size={16} />}
            {preview ? 'Edit Mode' : 'Preview'}
          </button>
          <button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-sm disabled:opacity-50"
          >
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 text-sm disabled:opacity-50"
          >
            <Send size={16} /> Submit for Approval
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Editor / Preview ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-8 py-4 bg-gray-50/70 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-600" />
                <span className="font-bold text-gray-700 text-sm">{preview ? 'Contract Preview' : 'Contract Editor'}</span>
                {formData.type && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${TYPE_BADGE[formData.type]}`}>
                    {formData.type}
                  </span>
                )}
              </div>
              {!preview && (
                <span className="text-[10px] text-gray-400 font-medium">
                  {formData.content.length.toLocaleString()} chars
                </span>
              )}
            </div>

            <div className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Contract Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Employment Agreement – John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-gray-900 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Internal Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short note for internal reference (not shown in contract)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm text-gray-700"
                />
              </div>

              {/* Content / Preview */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                  <span>
                    Contract Content <span className="text-red-400">*</span>
                    {!preview && <span className="text-blue-400 font-medium normal-case tracking-normal ml-2">(HTML supported)</span>}
                  </span>
                  {!preview && (
                    <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-colors">
                      <Upload size={14} /> Upload Custom File
                      <input type="file" accept=".txt,.html" className="hidden" onChange={handleFileUpload} />
                    </label>
                  )}
                </label>
                {preview ? (
                  <div
                    className="w-full min-h-[500px] p-8 bg-white border border-gray-100 rounded-2xl shadow-inner prose prose-sm max-w-none"
                    style={{ fontFamily: 'Georgia, serif', lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">No content to preview.</p>' }}
                  />
                ) : (
                  <textarea
                    rows={22}
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder={`Enter the full contract text here.\n\nYou can use HTML tags for formatting:\n  <h2>SECTION TITLE</h2>\n  <p>Paragraph text...</p>\n  <ul><li>List item</li></ul>\n\nAvailable placeholders:\n  {{employee_name}}, {{position}}, {{department}}\n  {{start_date}}, {{end_date}}, {{salary}}\n  {{company_name}}, {{company_address}}`}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-mono text-xs leading-relaxed text-gray-700 resize-none"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">
          {/* Template Picker */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5">
            <h3 className="text-sm font-black text-blue-800 mb-3 flex items-center gap-2">
              <LayoutTemplate size={16} /> Apply Template
            </h3>
            <p className="text-xs text-blue-600 mb-3 leading-relaxed">Select a professional template to auto-populate the editor.</p>
            <div className="relative">
              <button
                onClick={() => setTemplateOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm font-bold text-blue-700 hover:border-blue-400 transition-all"
              >
                <span>Choose a template…</span>
                <ChevronDown size={16} className={`transition-transform ${templateOpen ? 'rotate-180' : ''}`} />
              </button>
              {templateOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-blue-100 shadow-xl z-10 overflow-hidden max-h-56 overflow-y-auto">
                  {templates.length === 0 ? (
                    <div className="px-4 py-3 text-xs text-gray-400 font-medium">No templates available</div>
                  ) : (
                    templates.map(t => (
                      <button
                        key={t._id}
                        onClick={() => applyTemplate(t._id)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <p className="text-sm font-bold text-gray-900">{t.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{t.type} · {t.description || 'No description'}</p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <ClipboardList size={16} className="text-blue-600" /> Configuration
            </h3>

            {/* Assign Employee */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Filter by Designation
                </label>
                <select
                  value={designationFilter}
                  onChange={e => {
                    setDesignationFilter(e.target.value);
                    setFormData({ ...formData, employeeId: '' }); // reset selected user when filter changes
                  }}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700"
                >
                  <option value="">All Designations</option>
                  {uniqueDesignations.map((desig, idx) => (
                    <option key={idx} value={desig}>{desig}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Assign to Employee <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.employeeId}
                  onChange={e => {
                    const newUserId = e.target.value;
                    let newContent = formData.content;
                    if (newUserId && formData.content) {
                      newContent = replacePlaceholders(formData.content, newUserId);
                    }
                    setFormData({ ...formData, employeeId: newUserId, content: newContent });
                  }}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700"
                >
                  <option value="">Select user…</option>
                  {filteredUsers.map(u => (
                    <option key={u._id} value={u._id}>
                      {u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim()} - {(u.jobTitle || 'Employee')} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              {selectedUser && (
                <div className="mt-2 flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-[10px] uppercase shrink-0">
                    {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-800">{selectedUser.firstName} {selectedUser.lastName}</p>
                    <p className="text-[10px] text-blue-500">{selectedUser.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contract Type */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Type</label>
              <div className="grid grid-cols-2 gap-2">
                {CONTRACT_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, type })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      formData.type === type
                        ? `${TYPE_BADGE[type]} ring-2 ring-offset-1 ring-blue-400`
                        : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Validity Period */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <Calendar size={11} className="inline mr-1" /> Validity Period
              </label>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">From</label>
                  <input
                    type="date"
                    value={formData.validFrom}
                    onChange={e => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Until</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={e => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Approval Workflow Info */}
          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 flex items-start gap-3">
            <Info className="text-amber-500 mt-0.5 shrink-0" size={18} />
            <div>
              <h4 className="font-bold text-amber-900 text-sm mb-1.5">Approval Workflow</h4>
              <div className="space-y-1">
                {['Manager Review', 'HR Review', 'Legal Review', 'Final Approval', 'Pending Signature'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-[9px] font-black shrink-0">{i + 1}</span>
                    <span className="text-amber-700 text-[11px] font-medium">{step}</span>
                  </div>
                ))}
              </div>
              <p className="text-amber-600 text-[10px] mt-2 leading-relaxed">
                Once submitted, the contract moves through all 5 stages before reaching the employee for signing.
              </p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-500" /> Helpful Placeholders
              </h4>
              <button
                onClick={handleAutoFill}
                className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-emerald-600 transition-colors"
              >
                Auto-Fill All
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                ['{{employee_name}}', 'Full name of the employee'],
                ['{{position}}', 'Job title / role'],
                ['{{department}}', 'Department'],
                ['{{start_date}}', 'Contract start date'],
                ['{{salary}}', 'Agreed salary / stipend'],
                ['{{company_name}}', 'The Contractum'],
              ].map(([ph, desc]) => (
                <div key={ph} className="flex items-start gap-2">
                  <code className="text-[10px] bg-white border border-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono shrink-0">{ph}</code>
                  <span className="text-[10px] text-emerald-600 leading-tight">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
