import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Trash2, X, CheckCircle, Upload, Eye, IdCard as IdCardIcon, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = [
  '#1e5cdc', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', 
  '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', 
  '#ef4444', '#f43f5e', '#ec4899', '#d946ef', '#a855f7', 
  '#8b5cf6', '#6366f1', '#475569', '#334155', '#18181b'
];

export default function AdminIdCards() {
  const { admin } = useAdminAuth();
  const [idCards, setIdCards] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const cardRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    category: 'Employee',
    department: '',
    designation: '',
    bloodGroup: '',
    contactNumber: '',
    email: '',
    photo: '', // base64
    validUntil: '',
    cardColor: '#1e5cdc'
  });

  useEffect(() => {
    fetchIdCards();
  }, []);

  const fetchIdCards = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/id-cards`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setIdCards(data);
    } catch (err) {
      console.error('Failed to fetch ID Cards:', err);
    }
    setLoading(false);
  };

  const filteredCards = idCards.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      name: '',
      category: 'Employee',
      department: '',
      designation: '',
      bloodGroup: '',
      contactNumber: '',
      email: '',
      photo: '',
      validUntil: '',
      cardColor: '#1e5cdc'
    });
    setImagePreview(null);
    setPreviewMode(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ID Card?")) {
      try {
        const res = await fetch(`${API}/api/id-cards/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchIdCards();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreviewMode(true);
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, status: 'Generated' };
      
      const res = await fetch(`${API}/api/id-cards`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${admin?.token}` 
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        fetchIdCards();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to generate ID Card.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true });
      const link = document.createElement('a');
      link.download = `${formData.employeeId}-IDCard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true });
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `${formData.employeeId}-IDCard.png`, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${formData.name} ID Card`,
              text: 'Check out this generated ID Card!',
              files: [file]
            });
          } else {
            alert("Your browser doesn't support sharing files directly. Please download the card instead.");
          }
        }, 'image/png');
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleView = (card) => {
    setFormData({
      employeeId: card.employeeId || '',
      name: card.name || '',
      category: card.category || 'Employee',
      department: card.department || '',
      designation: card.designation || '',
      bloodGroup: card.bloodGroup || '',
      contactNumber: card.contactNumber || '',
      email: card.email || '',
      photo: card.photo || '',
      validUntil: card.validUntil ? new Date(card.validUntil).toISOString().split('T')[0] : '',
      cardColor: card.cardColor || '#1e5cdc'
    });
    setPreviewMode(true);
    setSuccess(true); // Already generated
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">ID Card Management</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">Generate and manage identity cards</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search ID/Name..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-48 bg-white transition-all" 
            />
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center justify-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Generate New ID
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Employee ID</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Name</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm hidden sm:table-cell">Category</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Status</th>
                <th className="text-right text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading data...</td></tr>
              ) : filteredCards.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No ID Cards generated yet.</td></tr>
              ) : (
                filteredCards.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono font-medium text-gray-700 text-xs sm:text-sm">{c.employeeId}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={c.photo} alt={c.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-200 shrink-0" />
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{c.name}</span>
                      </div>
                      <div className="sm:hidden text-[10px] text-gray-500 mt-1">{c.category}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-medium text-xs sm:text-sm hidden sm:table-cell">{c.category}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 whitespace-nowrap">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleView(c)} className="p-1.5 text-[#1e5cdc] hover:bg-blue-50 rounded-md transition-colors" title="View & Download Card"><Eye size={16} className="sm:w-5 sm:h-5" /></button>
                        <button onClick={() => handleDelete(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} className="sm:w-5 sm:h-5" /></button>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh] animate-in fade-in zoom-in duration-200">
            
            {/* Form Section */}
            {!previewMode ? (
            <div className="flex-1 flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Generate ID Card</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                </button>
                </div>
                
                <form onSubmit={handlePreview} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Employee ID *</label>
                            <input required type="text" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-gray-50 uppercase font-mono" placeholder="EMP-001" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                            <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]">
                                <option>Employee</option>
                                <option>Student</option>
                                <option>Intern</option>
                                <option>Visitor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Department *</label>
                            <input required type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="IT, HR, Engineering..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Designation *</label>
                            <input required type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="Software Engineer" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Group</label>
                            <input type="text" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="O+" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number *</label>
                            <input required type="text" value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="+1 234 567 890" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="john@company.com" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Valid Until *</label>
                            <input required type="date" value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ID Card Theme Color</label>
                        <div className="flex flex-wrap gap-2 p-1">
                            {COLORS.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({...formData, cardColor: color})}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${formData.cardColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Photo Upload *</label>
                        <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Upload size={24} className="text-gray-400" />
                            )}
                            </div>
                            <div className="flex-1">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange}
                                className="hidden" 
                                id="id-photo-upload"
                                required={!formData.photo}
                            />
                            <label htmlFor="id-photo-upload" className="cursor-pointer bg-blue-50 text-[#1e5cdc] px-4 py-2.5 sm:py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors block sm:inline-block text-center w-full sm:w-auto">
                                Upload Face Photo
                            </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 mt-4 border-t border-gray-100 pb-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className={`px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-all shadow-sm inline-flex items-center gap-2`}>
                            <Eye size={16} /> Preview Card
                        </button>
                    </div>
                </form>
            </div>
            ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 border-l border-gray-100 p-4 sm:p-8 overflow-y-auto max-h-[calc(100vh-2rem)] relative">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all p-2 bg-white rounded-full shadow-sm border border-gray-100 z-50">
                        <X size={20} />
                    </button>
                    <div className="flex flex-col items-center w-full max-w-sm mt-4">
                        {success ? (
                            <h3 className="text-lg text-emerald-600 font-bold mb-6 flex items-center gap-2">
                                <CheckCircle size={20} /> Card Generated
                            </h3>
                        ) : (
                            <h3 className="text-lg text-gray-500 font-medium mb-6 uppercase tracking-widest flex items-center gap-2">
                                <IdCardIcon /> Card Preview
                            </h3>
                        )}
                        
                        {/* THE ID CARD DESIGN */}
                        <div ref={cardRef} className="w-[300px] h-[480px] bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between border border-gray-200">
                            {/* Header / Top Shape */}
                            <div className="h-32 relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${formData.cardColor}, ${formData.cardColor}dd)` }}>
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                <div className="absolute top-6 text-white font-black text-[1.1rem] tracking-wider uppercase z-10 w-full text-center px-4 leading-tight drop-shadow-md">
                                    The Contractum
                                </div>
                                {/* Wave SVG overlay maybe */}
                                <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 320" style={{ transform: "rotateY(180deg) rotateZ(180deg)" }}>
                                    <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>
                            </div>

                            {/* Photo & Category */}
                            <div className="flex flex-col items-center -mt-16 z-20">
                                <img src={formData.photo || 'https://via.placeholder.com/150'} alt="Profile" className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                                <span className={`mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full`} style={{ backgroundColor: formData.cardColor }}>
                                    {formData.category}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col items-center pt-2 px-6 text-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight uppercase">{formData.name}</h1>
                                <p className="font-semibold text-sm mt-0.5 uppercase tracking-wide" style={{ color: formData.cardColor }}>{formData.designation}</p>
                                <p className="text-gray-500 text-xs font-medium">{formData.department}</p>
                                
                                <div className="w-full mt-4 flex flex-col gap-1 text-xs text-left bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="flex justify-between border-b border-gray-200 pb-1">
                                        <span className="text-gray-500 font-semibold">ID No.</span>
                                        <span className="font-bold text-gray-800">{formData.employeeId.toUpperCase()}</span>
                                    </div>
                                    {formData.bloodGroup && (
                                    <div className="flex justify-between border-b border-gray-200 py-1">
                                        <span className="text-gray-500 font-semibold">Blood Group</span>
                                        <span className="font-bold text-red-600">{formData.bloodGroup}</span>
                                    </div>
                                    )}
                                    <div className="flex justify-between pt-1">
                                        <span className="text-gray-500 font-semibold">Valid Till</span>
                                        <span className="font-bold text-gray-800">{formData.validUntil ? new Date(formData.validUntil).toLocaleDateString() : ''}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer Bar */}
                            <div className="h-6 mt-auto" style={{ background: `linear-gradient(to right, ${formData.cardColor}, ${formData.cardColor}aa)` }}></div>
                        </div>

                        {success ? (
                            <div className="flex flex-col gap-3 mt-8 mb-4 w-full print:hidden">
                                <div className="flex gap-4 w-full">
                                    <button onClick={handleDownload} className="flex-1 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2">
                                        <Download size={18} /> Download
                                    </button>
                                    <button onClick={handleShare} className="flex-1 py-3 text-sm font-bold text-white bg-[#1e5cdc] rounded-xl hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                                        <Share2 size={18} /> Share
                                    </button>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                                    Cancel / Close
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4 mt-8 mb-4 w-full print:hidden">
                                <button onClick={() => setPreviewMode(false)} className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    Edit Details
                                </button>
                                <button onClick={handleSubmit} className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30">
                                    Confirm & Generate
                                </button>
                            </div>
                        )}
                    </div>
            </div>
            )}
            
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
