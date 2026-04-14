import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, CheckCircle, Upload, Award, FileText, Filter, Eye, Palette, QrCode, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const THEME_COLORS = [
  { id: 'classic', name: 'Classical Gold', primary: '#bb9539', bg: '#fffdf5', accent: '#8c6d1f' },
  { id: 'modern', name: 'Modern Tech', primary: '#1e5cdc', bg: '#f0f7ff', accent: '#1648b0' },
  { id: 'minimal', name: 'Minimalist Sleek', primary: '#18181b', bg: '#fafafa', accent: '#3f3f46' },
  { id: 'emerald', name: 'Emerald Success', primary: '#059669', bg: '#f0fdf4', accent: '#047857' },
  { id: 'navy', name: 'Deep Ocean', primary: '#1e3a8a', bg: '#f8fafc', accent: '#1d4ed8' },
  { id: 'sunset', name: 'Sunset Horizon', primary: '#f97316', bg: '#fff7ed', accent: '#c2410c' },
  { id: 'lavender', name: 'Lavender Mist', primary: '#8b5cf6', bg: '#f5f3ff', accent: '#6d28d9' },
  { id: 'forest', name: 'Forest Peak', primary: '#15803d', bg: '#f0fdf4', accent: '#166534' },
  { id: 'slate', name: 'Midnight Slate', primary: '#334155', bg: '#f8fafc', accent: '#1e293b' },
  { id: 'rose', name: 'Rose Quartz', primary: '#db2777', bg: '#fdf2f8', accent: '#be185d' },
  { id: 'royal', name: 'Royal Purple', primary: '#7c3aed', bg: '#f5f3ff', accent: '#5b21b6' },
  { id: 'crimson', name: 'Crimson Elite', primary: '#dc2626', bg: '#fef2f2', accent: '#991b1b' },
  { id: 'charcoal', name: 'Charcoal Grey', primary: '#4b5563', bg: '#f9fafb', accent: '#1f2937' },
  { id: 'earth', name: 'Earth Tone', primary: '#92400e', bg: '#fffbeb', accent: '#78350f' }
];

export default function AdminCertificates() {
  const { admin } = useAdminAuth();
  const certRef = useRef(null);
  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState('internship');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'internship',
    issueDate: new Date().toISOString().split('T')[0],
    certificateId: '',
    designation: '',
    details: '',
    recipientEmail: '',
    themeId: 'classic',
    file: null
  });

  useEffect(() => {
    fetchCertificates();
  }, [activeTab]);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/certificates?type=${activeTab}`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      setCertificates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
    }
    setLoading(false);
  };

  const filteredCerts = certificates.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.certificateId.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: activeTab,
      issueDate: new Date().toISOString().split('T')[0],
      certificateId: 'TC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      designation: '',
      details: '',
      recipientEmail: '',
      themeId: 'classic',
      file: null
    });
    setFilePreview(null);
    setEditingCert(null);
    setPreviewMode(false);
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      type: cert.type,
      issueDate: new Date(cert.issueDate).toISOString().split('T')[0],
      certificateId: cert.certificateId,
      designation: cert.designation || '',
      details: cert.details || '',
      recipientEmail: cert.recipientEmail || '',
      themeId: cert.themeId || 'classic',
      file: null
    });
    setFilePreview(cert.fileUrl.endsWith('.pdf') ? null : `${API}${cert.fileUrl}`);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate record?")) {
      try {
        const res = await fetch(`${API}/api/certificates/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchCertificates();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      let fileToUpload = formData.file;

      // Generate image from HIDDEN template to avoid UI scaling/interference
      if (previewMode) {
          try {
            const hiddenEl = document.getElementById('certificate-template-hidden');
            if (!hiddenEl) throw new Error("Capture template not found.");
            
            const canvas = await html2canvas(hiddenEl, { 
                scale: 2, 
                useCORS: true,
                allowTaint: false,
                logging: false,
                backgroundColor: "#ffffff"
            });
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.95));
            if (!blob) throw new Error("Failed to generate certificate image.");
            fileToUpload = new File([blob], `${formData.certificateId}.png`, { type: 'image/png' });
          } catch (canvasErr) {
            console.error("Canvas Error:", canvasErr);
            alert("Error generating certificate image. Please try again or upload a custom file.");
            setIsProcessing(false);
            return;
          }
      }

      const data = new FormData();
      data.append('name', formData.name);
      data.append('type', formData.type);
      data.append('issueDate', formData.issueDate);
      data.append('certificateId', formData.certificateId);
      data.append('designation', formData.designation);
      data.append('details', formData.details);
      data.append('recipientEmail', formData.recipientEmail);
      data.append('themeId', formData.themeId);
      
      if (fileToUpload) {
        data.append('file', fileToUpload);
      } else if (!editingCert) {
        alert("Please preview the certificate or upload a file first.");
        setIsProcessing(false);
        return;
      }

      const url = editingCert ? `${API}/api/certificates/${editingCert._id}` : `${API}/api/certificates`;
      const method = editingCert ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        await fetchCertificates();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          resetForm();
          setIsProcessing(false);
        }, 1500);
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save certificate.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred. Please check your connection.");
      setIsProcessing(false);
    }
  };

  const selectedTheme = THEME_COLORS.find(t => t.id === formData.themeId) || THEME_COLORS[0];

  const tabs = [
    { id: 'internship', label: 'Internships', icon: <Award size={18}/> },
    { id: 'hackathon', label: 'Hackathons', icon: <Filter size={18}/> },
    { id: 'other', label: 'Other', icon: <FileText size={18}/> }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Certificate Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, Preview and Track Certificates</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add Certificate
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-[#1e5cdc] text-[#1e5cdc]' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Recipient Name</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Certificate ID</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden md:table-cell">Type</th>
                <th className="text-right text-gray-500 font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading records...</td></tr>
              ) : filteredCerts.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No certificates found in this category.</td></tr>
              ) : (
                filteredCerts.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{c.name}</span>
                        <span className="text-xs text-gray-400">{c.designation || 'No designation'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{c.certificateId}</span></td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell uppercase text-[10px] font-bold tracking-widest">{c.type}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/verify/${c._id}`} target="_blank" className="inline-flex items-center justify-center p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors mt-10" title="View Public Verification"><ExternalLink size={16}/></Link>
                        <a href={`${API}${c.fileUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-md transition-colors" title="View Certificate File"><FileText size={16}/></a>
                        <button onClick={() => handleEdit(c)} className="inline-flex items-center justify-center p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors" title="Edit Certificate"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(c._id)} className="inline-flex items-center justify-center p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Certificate"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh] animate-in fade-in zoom-in duration-200">
            
            {/* Form Section */}
            {!previewMode ? (
            <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-gray-800">{editingCert ? 'Edit Certificate' : 'Add New Certificate'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                </button>
                </div>
                
                <form onSubmit={(e) => {e.preventDefault(); setPreviewMode(true)}} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Name *</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Jane Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Designation / Role *</label>
                            <input required type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Web Developer Intern" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Certificate ID *</label>
                            <input required type="text" value={formData.certificateId} onChange={e => setFormData({...formData, certificateId: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] font-mono" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                            <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]">
                                <option value="internship">Internship</option>
                                <option value="hackathon">Hackathon</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Date *</label>
                            <input required type="date" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Email (Optional)</label>
                            <input type="email" value={formData.recipientEmail} onChange={e => setFormData({...formData, recipientEmail: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="jane@example.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Details / Project Description</label>
                        <textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" rows={2} placeholder="Briefly describe achievement..." />
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Certificate Theme</label>
                        <div className="flex flex-wrap gap-3">
                            {THEME_COLORS.map(theme => (
                                <button
                                    key={theme.id}
                                    type="button"
                                    onClick={() => setFormData({...formData, themeId: theme.id})}
                                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${formData.themeId === theme.id ? 'border-[#1e5cdc] bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="w-12 h-8 rounded shadow-inner" style={{ backgroundColor: theme.primary }}></div>
                                    <span className="text-[10px] font-bold">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3 mt-4 border-t border-gray-100 pb-6">
                        <div className="flex flex-col">
                            <label className="inline-flex items-center gap-2 cursor-pointer group">
                                <input type="file" className="hidden" onChange={handleFileChange} />
                                <Upload size={16} className="text-[#1e5cdc]" />
                                <span className="text-xs font-bold text-[#1e5cdc] group-hover:underline">Upload Custom File Instead</span>
                            </label>
                            {formData.file && <span className="text-[10px] text-emerald-600 font-bold ml-6 mt-1">✓ {formData.file.name} attached</span>}
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-all shadow-sm inline-flex items-center gap-2">
                                <Eye size={16} /> Preview Certificate
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            ) : (
            /* Preview & Template Generation Section */
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8 overflow-y-auto relative min-h-0">
                <button onClick={() => setPreviewMode(false)} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 transition-all z-50">
                    <X size={24} />
                </button>
                
                {success ? (
                    <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle size={40} className="text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Certificate Processed!</h3>
                        <p className="text-gray-500 mt-2">The record has been saved and theme generated.</p>
                    </div>
                ) : (
                    <>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Award size={18} /> Live Theme Preview
                    </h3>

                    {/* SCALING WRAPPER */}
                    <div className="w-full flex items-center justify-center overflow-auto" style={{ maxHeight: 'calc(100% - 120px)' }}>
                        <div style={{ transform: 'scale(0.8)', transformOrigin: 'center center', width: '800px', height: '580px', flexShrink: 0 }}>
                            {/* THE CERTIFICATE TEMPLATE */}
                            <div 
                                ref={certRef} 
                                className="w-[800px] h-[580px] bg-white shadow-2xl relative flex flex-col items-center p-12 overflow-hidden border-[16px]"
                                style={{ borderColor: selectedTheme.primary, backgroundColor: selectedTheme.bg }}
                            >
                        {/* Background Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 opacity-10" style={{ backgroundColor: selectedTheme.primary, borderRadius: '0 0 100% 0' }}></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: selectedTheme.primary, borderRadius: '100% 0 0 0' }}></div>
                        <div className="absolute inset-0 border-[1px] border-dashed m-4 pointer-events-none" style={{ borderColor: selectedTheme.primary + '33' }}></div>

                        {/* Top Logo / Branding */}
                        <div className="text-center z-10 mb-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-1" style={{ color: selectedTheme.primary }}>Official Recognition</h4>
                            <div className="text-2xl font-black italic tracking-tighter uppercasem" style={{ color: selectedTheme.primary }}>
                                The Contrractum
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="text-center z-10 flex-1 flex flex-col items-center justify-center w-full">
                            <h1 className="text-5xl font-serif font-bold italic mb-2" style={{ color: selectedTheme.accent }}>Certificate</h1>
                            <h2 className="text-lg font-bold tracking-[0.3em] uppercase mb-8" style={{ color: selectedTheme.primary }}>Of Achievement</h2>
                            
                            <p className="text-sm text-gray-500 font-medium mb-1">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
                            <div className="w-2/3 h-[2px] mb-2" style={{ backgroundColor: selectedTheme.primary }}></div>
                            <h2 className="text-4xl font-serif font-bold uppercase mb-2" style={{ color: selectedTheme.primary }}>{formData.name || 'Recipient Name'}</h2>
                            <div className="w-2/3 h-[2px] mb-8" style={{ backgroundColor: selectedTheme.primary }}></div>

                            <p className="text-sm text-gray-600 max-w-lg leading-relaxed mb-6">
                                For successful completion of the <span className="font-bold underline" style={{ color: selectedTheme.accent }}>{formData.designation || 'Program/Role Name'}</span> track under the <span className="font-bold uppercase">{formData.type}</span> initiative. This recognition is awarded for demonstrating exceptional dedication and professional excellence.
                            </p>

                            <div className="grid grid-cols-2 w-full max-w-md gap-12 mt-4">
                                <div className="text-center">
                                    <div className="h-0.5 w-full mb-2 bg-gray-300"></div>
                                    <p className="text-xs font-bold uppercase" style={{ color: selectedTheme.primary }}>Authorized Signature</p>
                                    <p className="text-[9px] text-gray-400">Head of Operations</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold mb-0.5" style={{ color: selectedTheme.primary }}>{new Date(formData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    <div className="h-0.5 w-full mb-2 bg-gray-300"></div>
                                    <p className="text-xs font-bold uppercase" style={{ color: selectedTheme.primary }}>Date of Issue</p>
                                </div>
                            </div>
                        </div>

                        {/* QR Code & ID Footer */}
                        <div className="absolute bottom-12 left-12 flex items-center gap-4 z-10 bg-white/50 p-2 rounded-lg border border-gray-100">
                           <QRCodeSVG 
                            value={`${window.location.origin}/#/verify/${formData.certificateId}`} 
                            size={50} 
                            fgColor={selectedTheme.primary}
                            level="H"
                            includeMargin={false}
                           />
                           <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Verify Authenticity</span>
                                <span className="text-[10px] font-bold font-mono" style={{ color: selectedTheme.primary }}>{formData.certificateId}</span>
                           </div>
                        </div>

                                <Award 
                                    className="absolute -right-12 -top-12 w-48 h-48 opacity-5" 
                                    style={{ color: selectedTheme.primary }} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Static Hidden Template for reliable capture */}
                    <div className="fixed top-0 left-[-2000px] z-[-100] scale-100 origin-top-left">
                         <CertificateTemplate formData={formData} selectedTheme={selectedTheme} id="certificate-template-hidden" />
                    </div>

                    <div className="flex gap-4 mt-8 w-full max-w-sm">
                        <button 
                            onClick={() => setPreviewMode(false)} 
                            disabled={isProcessing}
                            className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                        >
                            Edit Details
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            disabled={isProcessing}
                            className={`flex-1 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`} 
                            style={{ backgroundColor: selectedTheme.primary }}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={18} /> Confirm & Save
                                </>
                            )}
                        </button>
                    </div>
                    </>
                )}
            </div>
            )}
            
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// SHARED TEMPLATE COMPONENT FOR DRY
function CertificateTemplate({ formData, selectedTheme, id }) {
  return (
    <div 
        id={id}
        className="w-[800px] h-[580px] bg-white relative flex flex-col items-center p-12 overflow-hidden border-[16px]"
        style={{ borderColor: selectedTheme.primary, backgroundColor: selectedTheme.bg }}
    >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10" style={{ backgroundColor: selectedTheme.primary, borderRadius: '0 0 100% 0' }}></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: selectedTheme.primary, borderRadius: '100% 0 0 0' }}></div>
        <div className="absolute inset-0 border-[1px] border-dashed m-4 pointer-events-none" style={{ borderColor: selectedTheme.primary + '33' }}></div>

        {/* Top Logo / Branding */}
        <div className="text-center z-10 mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-1" style={{ color: selectedTheme.primary }}>Official Recognition</h4>
            <div className="text-2xl font-black italic tracking-tighter uppercase" style={{ color: selectedTheme.primary }}>
                The Contrractum
            </div>
        </div>

        {/* Main Title */}
        <div className="text-center z-10 flex-1 flex flex-col items-center justify-center w-full">
            <h1 className="text-5xl font-serif font-bold italic mb-2" style={{ color: selectedTheme.accent }}>Certificate</h1>
            <h2 className="text-lg font-bold tracking-[0.3em] uppercase mb-8" style={{ color: selectedTheme.primary }}>Of Achievement</h2>
            
            <p className="text-sm font-medium mb-1" style={{ color: '#6b7280' }}>THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
            <div className="w-2/3 h-[2px] mb-2" style={{ backgroundColor: selectedTheme.primary }}></div>
            <h2 className="text-4xl font-serif font-bold uppercase mb-2" style={{ color: selectedTheme.primary }}>{formData.name || 'Recipient Name'}</h2>
            <div className="w-2/3 h-[2px] mb-8" style={{ backgroundColor: selectedTheme.primary }}></div>

            <p className="text-sm max-w-lg leading-relaxed mb-6 px-4" style={{ color: '#4b5563' }}>
                For successful completion of the <span className="font-bold underline" style={{ color: selectedTheme.accent }}>{formData.designation || 'Program/Role Name'}</span> track under the <span className="font-bold uppercase">{formData.type}</span> initiative. This recognition is awarded for demonstrating exceptional dedication and professional excellence.
            </p>

            <div className="grid grid-cols-2 w-full max-w-md gap-12 mt-4">
                <div className="text-center">
                    <div className="h-0.5 w-full mb-2" style={{ backgroundColor: '#d1d5db' }}></div>
                    <p className="text-xs font-bold uppercase" style={{ color: selectedTheme.primary }}>Authorized Signature</p>
                    <p className="text-[9px]" style={{ color: '#9ca3af' }}>Head of Operations</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-bold mb-0.5" style={{ color: selectedTheme.primary }}>{new Date(formData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <div className="h-0.5 w-full mb-2" style={{ backgroundColor: '#d1d5db' }}></div>
                    <p className="text-xs font-bold uppercase" style={{ color: selectedTheme.primary }}>Date of Issue</p>
                </div>
            </div>
        </div>

        {/* QR Code & ID Footer */}
        <div className="absolute bottom-12 left-12 flex items-center gap-4 z-10 p-2 rounded-lg border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: '#f3f4f6' }}>
            <QRCodeSVG 
            value={`${window.location.origin}/#/verify/${formData.certificateId}`} 
            size={50} 
            fgColor={selectedTheme.primary}
            level="H"
            includeMargin={false}
            />
            <div className="flex flex-col text-left">
                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Verify Authenticity</span>
                <span className="text-[10px] font-bold font-mono" style={{ color: selectedTheme.primary }}>{formData.certificateId}</span>
            </div>
        </div>

        <Award 
            className="absolute -right-12 -top-12 w-48 h-48 opacity-5 mr-8 mt-8 shrink-0" 
            style={{ color: selectedTheme.primary }} 
        />
    </div>
  );
}
