import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  ArrowLeft, Save, Send, User as UserIcon, Calendar, 
  FileText, ClipboardList, Info, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ContractEditor() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    title: '',
    description: '',
    type: 'Employee',
    content: '',
    status: 'Draft',
    validFrom: '',
    validUntil: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchTemplates();
    if (isEdit) fetchContract();
  }, [id]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/api/users`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) { console.error(err); }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${API}/api/contracts/templates`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setTemplates(data);
    } catch (err) { console.error(err); }
  };

  const fetchContract = async () => {
    // Logic to fetch single contract... but for now we focus on creation
  };

  const handleTemplateChange = (templateId) => {
    const template = templates.find(t => t._id === templateId);
    if (template) {
      setFormData({ ...formData, content: template.content, type: template.type });
    }
  };

  const handleSubmit = async (submitForApproval = false) => {
    // Basic validation
    if (!formData.employeeId || !formData.title || !formData.content) {
      toast.error("Please select an employee and provide a title and contract content.");
      return;
    }

    setLoading(true);
    try {
      // Sanitize dates: if they are empty strings, don't send them or send as null
      const sanitizedData = { ...formData };
      if (!sanitizedData.validFrom) delete sanitizedData.validFrom;
      if (!sanitizedData.validUntil) delete sanitizedData.validUntil;

      const payload = { 
        ...sanitizedData, 
        status: submitForApproval ? 'Pending_Manager' : 'Draft' 
      };

      const res = await fetch(`${API}/api/contracts`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}` 
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/admin/contracts');
      } else {
        toast.error(data.error || 'Failed to save contract');
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred while saving.');
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/contracts')} className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{isEdit ? 'Edit Contract' : 'Create Contract'}</h1>
            <p className="text-gray-500 font-medium">Draft and assign contracts to users.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Save size={18} /> Save as Draft
          </button>
          <button 
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Send size={18} /> Submit for Approval
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Employment Contract - John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 focus:bg-white transition-all font-bold text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Content</label>
                <textarea 
                  rows="20"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the contract text here. You can use HTML tags for formatting."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 focus:bg-white transition-all font-mono text-sm leading-relaxed text-gray-700 h-[600px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ClipboardList size={20} className="text-[#1e5cdc]" /> Configuration
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 text-blue-600">Apply Template</label>
                <select 
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-blue-700"
                >
                  <option value="">Select a template...</option>
                  {templates.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                </select>
                <p className="mt-2 text-xs text-blue-400 font-medium leading-relaxed">Selecting a template will populate the editor above.</p>
              </div>

              <hr className="border-gray-50" />

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Assign to Employee</label>
                <select 
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 text-sm font-bold text-gray-700"
                >
                  <option value="">Select User...</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.firstName} {u.lastName} ({u.email})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 text-sm font-bold text-gray-700"
                >
                  <option>Employee</option>
                  <option>Intern</option>
                  <option>Freelancer</option>
                  <option>Vendor</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Valid From</label>
                  <input 
                    type="date" 
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 text-sm font-bold text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Valid Until</label>
                  <input 
                    type="date" 
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]/20 text-sm font-bold text-gray-700" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-3xl border border-amber-100 p-6 flex items-start gap-4">
            <Info className="text-amber-500 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Approval Workflow</h4>
              <p className="text-amber-700 text-xs mt-1 leading-relaxed">Once submitted, this contract will move through <strong>Manager</strong>, <strong>HR</strong>, and <strong>Legal</strong> steps for validation before being sent to the employee.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
