import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  ArrowLeft, Save, Send, User as UserIcon, Calendar,
  FileText, ClipboardList, Info, Eye, EyeOff, RefreshCw,
  CheckCircle, LayoutTemplate, ChevronDown, Upload, XCircle, Pencil,
  Mail
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CONTRACT_CATEGORIES } from '../../utils/contractConstants';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TYPE_BADGE = {
  Employee:   'bg-blue-100 text-blue-700 border-blue-200',
  Intern:     'bg-purple-100 text-purple-700 border-purple-200',
  Freelancer: 'bg-amber-100 text-amber-700 border-amber-200',
  Vendor:     'bg-teal-100 text-teal-700 border-teal-200',
  'Employment & HR Contracts': 'bg-blue-100 text-blue-700 border-blue-200',
  'Business & Corporate Agreements': 'bg-purple-100 text-purple-700 border-purple-200',
  'Software & IT Contracts': 'bg-amber-100 text-amber-700 border-amber-200',
  'Marketing & Media Agreements': 'bg-teal-100 text-teal-700 border-teal-200',
  'Financial & Legal Agreements': 'bg-rose-100 text-rose-700 border-rose-200',
  'Sales & Client Agreements': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Real Estate & Infrastructure Agreements': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Educational & Training Agreements': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Project Management & Operations Contracts': 'bg-violet-100 text-violet-700 border-violet-200',
  'Intellectual Property Agreements': 'bg-sky-100 text-sky-700 border-sky-200'
};

const CLAUSES_CONFIG = [
  { key: 'scopeOfWork',         label: 'Scope of Work',         placeholder: 'Detailed description of services, duties, and responsibilities...' },
  { key: 'paymentTerms',        label: 'Payment Terms',        placeholder: 'Compensation details, billing cycles, invoices, and payment schedule...' },
  { key: 'deliverables',        label: 'Deliverables',        placeholder: 'List of specific deliverables, reports, software code, or outputs...' },
  { key: 'timelineMilestones',  label: 'Timeline & Milestones',  placeholder: 'Expected start/end dates for key stages and delivery dates...' },
  { key: 'confidentiality',     label: 'Confidentiality',     placeholder: 'Non-disclosure obligations regarding proprietary information...' },
  { key: 'ipRights',            label: 'Intellectual Property',  placeholder: 'Ownership of designs, code, assets, and transfer of rights...' },
  { key: 'termination',         label: 'Termination',         placeholder: 'Notice period, grounds for termination, and post-termination actions...' },
  { key: 'penalty',             label: 'Penalty & Damages',    placeholder: 'Late delivery penalties, breach of contract clauses, and interest fees...' },
  { key: 'disputeResolution',   label: 'Dispute Resolution',   placeholder: 'Arbitration process, mediation, and resolution steps...' },
  { key: 'governingLaw',        label: 'Governing Law',        placeholder: 'Jurisdiction and laws governing this contract (e.g. State of Maharashtra, India)...' },
  { key: 'liability',           label: 'Liability & Indemnity',placeholder: 'Limitations on liability, indemnification of claims and damages...' },
  { key: 'forceMajeure',        label: 'Force Majeure',        placeholder: 'Events beyond control (acts of God, war, pandemic) and suspension rights...' },
  { key: 'renewal',             label: 'Renewal & Extension',  placeholder: 'Auto-renewal terms, mutual agreement for extension, and pricing review...' }
];

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
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'clauses'

  const [formData, setFormData] = useState({
    employeeId: '',
    title:      '',
    description:'',
    category:   'Employment & HR Contracts',
    type:       'Employment Agreement',
    content:    '',
    status:     'Draft',
    validFrom:  '',
    validUntil: '',
    clauses: {
      scopeOfWork: '',
      paymentTerms: '',
      deliverables: '',
      timelineMilestones: '',
      confidentiality: '',
      ipRights: '',
      termination: '',
      penalty: '',
      disputeResolution: '',
      governingLaw: '',
      liability: '',
      forceMajeure: '',
      renewal: ''
    }
  });

  const [forceEdit, setForceEdit] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const isDraftOrRejected = !isEdit || ['Draft', 'Rejected'].includes(formData.status);
  const isEditable = isDraftOrRejected || forceEdit;

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
        const formObj = {
          employeeId:  data.employeeId?._id || data.employeeId || '',
          title:       data.title || '',
          description: data.description || '',
          category:    data.category || 'Employment & HR Contracts',
          type:        data.type || 'Employment Agreement',
          content:     data.content || '',
          status:      data.status || 'Draft',
          validFrom:   data.validFrom ? data.validFrom.slice(0, 10) : '',
          validUntil:  data.validUntil ? data.validUntil.slice(0, 10) : '',
          clauses:     {
            scopeOfWork: data.clauses?.scopeOfWork || '',
            paymentTerms: data.clauses?.paymentTerms || '',
            deliverables: data.clauses?.deliverables || '',
            timelineMilestones: data.clauses?.timelineMilestones || '',
            confidentiality: data.clauses?.confidentiality || '',
            ipRights: data.clauses?.ipRights || '',
            termination: data.clauses?.termination || '',
            penalty: data.clauses?.penalty || '',
            disputeResolution: data.clauses?.disputeResolution || '',
            governingLaw: data.clauses?.governingLaw || '',
            liability: data.clauses?.liability || '',
            forceMajeure: data.clauses?.forceMajeure || '',
            renewal: data.clauses?.renewal || '',
          }
        };
        setFormData(formObj);
        setOriginalData(formObj);
      }
    } catch { console.error('Failed to fetch contract'); }
  }, [id, token]);

  const canApproveReject = useCallback(() => {
    if (!admin || !formData.status) return false;
    const subRole = (admin.adminSubRole || '').toLowerCase().trim();
    const isManager = subRole.includes('manager') || admin.role === 'manager';
    const isHR = subRole.includes('hr') || subRole.startsWith('hr ');
    const isLegal = subRole.includes('legal') || subRole.includes('compliance');
    const isSuper = admin.role === 'super-admin';

    return (
      (formData.status === 'Pending_Manager' && isManager) ||
      (formData.status === 'Pending_HR' && isHR) ||
      (formData.status === 'Pending_Legal' && isLegal) ||
      (formData.status === 'Pending_Final' && isSuper)
    );
  }, [admin, formData.status]);

  const handleApprove = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/contracts/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comments: 'Approved via view page' })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Contract approved!');
        navigate('/admin/contracts');
      } else {
        toast.error(data.message || 'Action not allowed');
      }
    } catch {
      toast.error('Failed to approve');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Reject this contract?')) return;
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/contracts/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comments: 'Rejected via view page' })
      });
      if (res.ok) {
        toast.success('Contract rejected');
        navigate('/admin/contracts');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to reject');
      }
    } catch {
      toast.error('Failed to reject');
    } finally {
      setLoading(false);
    }
  };

  const [sendingEmail, setSendingEmail] = useState(false);

  const handleSendEmail = async () => {
    if (!formData.employeeId) {
      toast.error('No employee assigned to this contract.');
      return;
    }
    const emp = users.find(u => u._id === formData.employeeId);
    const email = emp?.email || 'the employee';
    if (!window.confirm(`Send contract "${formData.title}" directly to ${email}?`)) return;
    
    setSendingEmail(true);
    try {
      const res = await fetch(`${API}/api/contracts/${id}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Contract emailed successfully!');
      } else {
        toast.error(data.error ? `${data.message}: ${data.error}` : (data.message || 'Failed to send email.'));
      }
    } catch {
      toast.error('Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!formData.employeeId || !formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields: employee, title, and contract content.');
      return;
    }
    setLoading(true);
    try {
      const sanitized = { ...formData };
      if (!sanitized.validFrom)  delete sanitized.validFrom;
      if (!sanitized.validUntil) delete sanitized.validUntil;

      const res = await fetch(`${API}/api/contracts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(sanitized)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Contract updated successfully!');
        setForceEdit(false);
        setOriginalData(sanitized);
        fetchContract();
      } else {
        toast.error(data.error || data.message || 'Failed to update contract');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

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
      setFormData(prev => ({ 
        ...prev, 
        content: populatedContent, 
        category: template.category || 'Employment & HR Contracts',
        type: template.type || 'Employment Agreement' 
      }));
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

  const handleAutoGenerate = () => {
    // 1. Gather employee and company details
    const user = users.find(u => u._id === formData.employeeId);
    const empName = user ? (user.name || `${user.firstName || ''} ${user.lastName || ''}`).trim() : '__________________';
    const empEmail = user?.email || '__________________';
    const empTitle = user?.jobTitle || '__________________';
    const empDept = user?.department || '__________________';
    const validFromStr = formData.validFrom ? new Date(formData.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '__________________';
    const validUntilStr = formData.validUntil ? new Date(formData.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '__________________';

    // 2. Generate clauses HTML
    let clausesHtml = '';
    let sectionNum = 1;
    CLAUSES_CONFIG.forEach(clause => {
      const value = formData.clauses[clause.key]?.trim();
      if (value) {
        clausesHtml += `
          <div style="margin-bottom: 24px; page-break-inside: avoid;">
            <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
              Section ${sectionNum}. ${clause.label}
            </h3>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; text-align: justify; white-space: pre-line;">${value}</p>
          </div>
        `;
        sectionNum++;
      }
    });

    if (!clausesHtml) {
      toast.error('Please fill out at least one clause in the Agreement Clauses tab before generating.');
      return;
    }

    // 3. Compile the full HTML document
    const compiledHtml = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Inter', system-ui, sans-serif; color: #1e293b;">
        <!-- Header Banner -->
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px double #1e5cdc; padding-bottom: 20px;">
          <h1 style="color: #1e5cdc; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">
            ${formData.title || 'MUTUAL CONTRACT AGREEMENT'}
          </h1>
          <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; tracking: 0.1em; margin: 0;">
            ${formData.category} &bull; ${formData.type}
          </p>
        </div>

        <!-- Agreement Intro Preamble -->
        <div style="margin-bottom: 32px; font-size: 14px; line-height: 1.6; color: #334155;">
          <p style="margin: 0 0 16px 0; text-align: justify;">
            This ${formData.type} (hereinafter referred to as the <strong>"Agreement"</strong>) is entered into and made effective as of <strong>${validFromStr}</strong>, by and between:
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; background: #f8fafc; padding: 16px; rounded: 12px; border: 1px solid #f1f5f9;">
            <div>
              <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">FIRST PARTY (EMPLOYER):</h4>
              <p style="margin: 0; font-size: 13px; color: #475569;">
                <strong>The Contractum Private Limited</strong><br />
                Address: India
              </p>
            </div>
            <div>
              <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">SECOND PARTY (RECIPIENT):</h4>
              <p style="margin: 0; font-size: 13px; color: #475569;">
                <strong>${empName}</strong><br />
                Title: ${empTitle}<br />
                Department: ${empDept}<br />
                Email: ${empEmail}
              </p>
            </div>
          </div>
          <p style="margin: 0; text-align: justify;">
            WHEREAS, the First Party desires to retain the services of the Second Party, and the Second Party agrees to perform such services under the terms and conditions set forth below.
          </p>
        </div>

        <!-- Clauses Container -->
        <div style="margin-bottom: 40px;">
          ${clausesHtml}
        </div>

        <!-- Term & Expiry -->
        <div style="margin-bottom: 40px; background: #f8fafc; padding: 16px; border-left: 4px solid #1e5cdc; font-size: 13px; color: #475569;">
          <strong>AGREEMENT TERM:</strong> This Agreement shall commence on <strong>${validFromStr}</strong> and shall continue in full force and effect until <strong>${validUntilStr}</strong>, unless terminated earlier in accordance with the termination provision herein.
        </div>

        <!-- Signatures Blocks -->
        <div style="margin-top: 60px; font-size: 13px; color: #334155; page-break-inside: avoid;">
          <p style="margin-bottom: 30px; text-align: justify;">
            IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.
          </p>
          <table style="width: 100%; border-collapse: collapse; border: none;">
            <tr>
              <td style="width: 45%; vertical-align: top; border: none; padding: 0;">
                <p style="margin: 0 0 40px 0; font-weight: 700;">For: The Contractum Private Limited</p>
                <div style="border-bottom: 1px solid #94a3b8; width: 80%; margin-bottom: 6px;"></div>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Authorized Signatory</p>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Title: Compliance Officer</p>
              </td>
              <td style="width: 10%; border: none;"></td>
              <td style="width: 45%; vertical-align: top; border: none; padding: 0;">
                <p style="margin: 0 0 40px 0; font-weight: 700;">For: ${empName}</p>
                <div style="border-bottom: 1px solid #94a3b8; width: 80%; margin-bottom: 6px;"></div>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Second Party / Recipient Signature</p>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Date: __________________</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    `;

    setFormData(prev => ({ ...prev, content: compiledHtml }));
    setActiveTab('editor'); // Switch back to editor to let them see and review the compiled document
    toast.success('Document compiled from clauses successfully!');
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
          {isEdit && (
            <button
              onClick={handleSendEmail}
              disabled={sendingEmail || loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all text-sm disabled:opacity-50 shadow-sm"
            >
              {sendingEmail ? <RefreshCw size={16} className="animate-spin" /> : <Mail size={16} />}
              Send Email
            </button>
          )}
          {isEdit && !forceEdit && canApproveReject() && (
            <>
              <button
                onClick={handleReject}
                disabled={loading}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/25 disabled:opacity-50"
              >
                <XCircle size={16} /> Reject
              </button>
              <button
                onClick={handleApprove}
                disabled={loading}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
              >
                <CheckCircle size={16} /> Approve
              </button>
            </>
          )}
          {isDraftOrRejected ? (
            <>
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
            </>
          ) : (
            <>
              {!forceEdit ? (
                <button
                  onClick={() => setForceEdit(true)}
                  className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25"
                >
                  <Pencil size={16} /> Edit Contract
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (originalData) {
                        setFormData(originalData);
                      }
                      setForceEdit(false);
                      toast.success('Restored previous content');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25 text-sm disabled:opacity-50"
                  >
                    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Read-Only Warning Banner */}
      {!isEditable && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <span className="text-xl">ℹ️</span>
             <div>
                <p className="text-sm font-bold">Read-Only Mode</p>
                <p className="text-xs text-blue-600 font-medium">This contract is currently in <strong>{formData.status.replace('_', ' ')}</strong> status and cannot be edited.</p>
             </div>
          </div>
        </div>
      )}

      {/* Editing Mode Banner */}
      {forceEdit && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <span className="text-xl">⚠️</span>
             <div>
                <p className="text-sm font-bold">Editing In-Review Contract</p>
                <p className="text-xs text-amber-600 font-medium">You are making changes to a contract that is currently in <strong>{formData.status.replace('_', ' ')}</strong> status.</p>
             </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Editor / Preview ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-8 py-4 bg-gray-50/70 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-600" />
                <span className="font-bold text-gray-700 text-sm">{preview ? 'Contract Preview' : 'Contract Editor'}</span>
                {formData.category && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${TYPE_BADGE[formData.category]}`}>
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

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/30 px-8">
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-3 px-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'editor' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                Contract Body
              </button>
              <button
                onClick={() => setActiveTab('clauses')}
                className={`py-3 px-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'clauses' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                Agreement Clauses ({Object.values(formData.clauses || {}).filter(Boolean).length}/13)
              </button>
            </div>

            {activeTab === 'editor' ? (
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
                    disabled={!isEditable}
                    placeholder="e.g. Employment Agreement – John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-gray-900 text-sm disabled:opacity-60"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Internal Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isEditable}
                    placeholder="Short note for internal reference (not shown in contract)"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm text-gray-700 disabled:opacity-60"
                  />
                </div>

                {/* Content / Preview */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                    <span>
                      Contract Content <span className="text-red-400">*</span>
                      {!preview && <span className="text-blue-400 font-medium normal-case tracking-normal ml-2">(HTML supported)</span>}
                    </span>
                    {!preview && isEditable && (
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
                      disabled={!isEditable}
                      placeholder={`Enter the full contract text here.\n\nYou can use HTML tags for formatting:\n  <h2>SECTION TITLE</h2>\n  <p>Paragraph text...</p>\n  <ul><li>List item</li></ul>\n\nAvailable placeholders:\n  {{employee_name}}, {{position}}, {{department}}\n  {{start_date}}, {{end_date}}, {{salary}}\n  {{company_name}}, {{company_address}}`}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-mono text-xs leading-relaxed text-gray-700 resize-none disabled:opacity-70"
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                  <div className="pr-4">
                    <h4 className="text-sm font-bold text-blue-900">Custom Clause-Based Generator</h4>
                    <p className="text-xs text-blue-700 mt-0.5">Fill in the clauses below, then click generate to compile a formatted document.</p>
                  </div>
                  {isEditable && (
                    <button
                      onClick={handleAutoGenerate}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-200 shrink-0"
                    >
                      Auto-Generate Document
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {CLAUSES_CONFIG.map(clause => (
                    <div key={clause.key} className="space-y-2">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{clause.label}</label>
                      <textarea
                        rows={4}
                        value={formData.clauses[clause.key] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            clauses: {
                              ...prev.clauses,
                              [clause.key]: val
                            }
                          }));
                        }}
                        disabled={!isEditable}
                        placeholder={clause.placeholder}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-xs leading-relaxed text-gray-700 resize-none disabled:opacity-60"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">
          {/* Template Picker */}
          {isEditable && (
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
          )}

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
                  disabled={!isEditable}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
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
                  disabled={!isEditable}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
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

            {/* Contract Category */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Category *</label>
              <select
                value={formData.category}
                onChange={e => {
                  const newCat = e.target.value;
                  const firstType = CONTRACT_CATEGORIES[newCat]?.[0] || '';
                  setFormData(prev => ({ ...prev, category: newCat, type: firstType }));
                }}
                disabled={!isEditable}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
              >
                {Object.keys(CONTRACT_CATEGORIES).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Contract Type */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Type *</label>
              <select
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                disabled={!isEditable}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
              >
                {(CONTRACT_CATEGORIES[formData.category] || []).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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
                    disabled={!isEditable}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 mt-1 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Until</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={e => setFormData({ ...formData, validUntil: e.target.value })}
                    disabled={!isEditable}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 mt-1 disabled:opacity-60"
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
