import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Trash2, X, CheckCircle, Upload, Eye, IdCard as IdCardIcon, Download, Share2, Edit2, Mail, Linkedin, MessageCircle, Loader2 } from 'lucide-react';
// No html2canvas import needed — we draw via Canvas 2D API

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = [
  '#1e5cdc', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', 
  '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', 
  '#ef4444', '#f43f5e', '#ec4899', '#d946ef', '#a855f7', 
  '#8b5cf6', '#6366f1', '#475569', '#334155', '#18181b'
];

// ── Helper: load an image from a src (base64 or URL) ──
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ── Helper: draw a rounded rect ──
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── Core: Generate the ID card image on a Canvas ──
async function generateCardCanvas(data) {
  const W = 700, H = 1120; // 2x for hi-res
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const color = data.cardColor || '#1e5cdc';

  // Background
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 0, 0, W, H, 28);
  ctx.fill();
  ctx.save();
  roundRect(ctx, 0, 0, W, H, 28);
  ctx.clip();

  // ── Header gradient ──
  const hdrH = 320;
  const grad = ctx.createLinearGradient(0, 0, W, hdrH);
  grad.addColorStop(0, color);
  grad.addColorStop(1, color + 'dd');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, hdrH);

  // ── Wave curve ──
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0, hdrH - 60);
  ctx.bezierCurveTo(W * 0.25, hdrH - 20, W * 0.5, hdrH + 10, W * 0.75, hdrH - 30);
  ctx.bezierCurveTo(W * 0.9, hdrH - 50, W, hdrH - 10, W, hdrH - 40);
  ctx.lineTo(W, hdrH);
  ctx.lineTo(0, hdrH);
  ctx.closePath();
  ctx.fill();

  // ── Company name ──
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('THE CONTRACTUM', W / 2, 80);

  // ── Profile photo (circular) ──
  const photoR = 110;
  const photoCX = W / 2;
  const photoCY = hdrH - 60;
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoR + 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoR, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  if (data.photo) {
    try {
      const img = await loadImage(data.photo);
      ctx.drawImage(img, photoCX - photoR, photoCY - photoR, photoR * 2, photoR * 2);
    } catch {
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(photoCX - photoR, photoCY - photoR, photoR * 2, photoR * 2);
    }
  } else {
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(photoCX - photoR, photoCY - photoR, photoR * 2, photoR * 2);
  }
  ctx.restore();

  // ── Category badge ──
  const badgeY = photoCY + photoR + 30;
  const badgeText = (data.category || 'Employee').toUpperCase();
  ctx.font = 'bold 20px Arial, sans-serif';
  const badgeW = ctx.measureText(badgeText).width + 36;
  roundRect(ctx, W / 2 - badgeW / 2, badgeY - 14, badgeW, 32, 16);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(badgeText, W / 2, badgeY + 8);

  // ── Name ──
  let curY = badgeY + 60;
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((data.name || '').toUpperCase(), W / 2, curY);

  // ── Designation ──
  curY += 44;
  ctx.fillStyle = color;
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText((data.designation || '').toUpperCase(), W / 2, curY);

  // ── Department ──
  curY += 34;
  ctx.fillStyle = '#6b7280';
  ctx.font = '22px Arial, sans-serif';
  ctx.fillText(data.department || '', W / 2, curY);

  // ── Details table ──
  curY += 50;
  const tableX = 60, tableW = W - 120;
  roundRect(ctx, tableX, curY, tableW, data.bloodGroup ? 180 : 130, 16);
  ctx.fillStyle = '#f9fafb';
  ctx.fill();
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  ctx.stroke();

  const rowH = data.bloodGroup ? 55 : 60;
  let rowY = curY + 38;

  // ID row
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('ID No.', tableX + 20, rowY);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText((data.employeeId || '').toUpperCase(), tableX + tableW - 20, rowY);

  // Divider
  rowY += 12;
  ctx.strokeStyle = '#e5e7eb';
  ctx.beginPath();
  ctx.moveTo(tableX + 16, rowY);
  ctx.lineTo(tableX + tableW - 16, rowY);
  ctx.stroke();

  // Blood group row
  if (data.bloodGroup) {
    rowY += rowH - 12;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('Blood Group', tableX + 20, rowY);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText(data.bloodGroup, tableX + tableW - 20, rowY);
    rowY += 12;
    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(tableX + 16, rowY);
    ctx.lineTo(tableX + tableW - 16, rowY);
    ctx.stroke();
  }

  // Valid till row
  rowY += rowH - 12;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('Valid Till', tableX + 20, rowY);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 22px Arial, sans-serif';
  const validStr = data.validUntil ? new Date(data.validUntil).toLocaleDateString() : 'N/A';
  ctx.fillText(validStr, tableX + tableW - 20, rowY);

  // ── Footer bar ──
  const footH = 40;
  const footGrad = ctx.createLinearGradient(0, H - footH, W, H - footH);
  footGrad.addColorStop(0, color);
  footGrad.addColorStop(1, color + 'aa');
  ctx.fillStyle = footGrad;
  ctx.fillRect(0, H - footH, W, footH);

  ctx.restore();
  return canvas;
}

export default function AdminIdCards() {
  const { admin } = useAdminAuth();
  const [idCards, setIdCards] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
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
    setEditingId(null);
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
      
      const url = editingId ? `${API}/api/id-cards/${editingId}` : `${API}/api/id-cards`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
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
        alert(errData.message || "Failed to process ID Card.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Download: uses pure Canvas 2D ──
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = await generateCardCanvas(formData);
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `ID_Card_${formData.employeeId || 'card'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try again.');
    }
    setDownloading(false);
  };

  // ── Share: uses pure Canvas 2D ──
  const handleShare = async () => {
    setSharing(true);
    try {
      const canvas = await generateCardCanvas(formData);
      canvas.toBlob(async (blob) => {
        if (!blob) { setSharing(false); return; }
        const file = new File([blob], `${formData.employeeId}-IDCard.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `${formData.name} ID Card`,
              text: `ID Card for ${formData.name} (${formData.employeeId})`,
              files: [file]
            });
          } catch (e) {
            console.warn('Native share cancelled or failed', e);
            fallbackShare(canvas);
          }
        } else {
          fallbackShare(canvas);
        }
        setSharing(false);
      }, 'image/png');
    } catch (err) {
      console.error('Share failed:', err);
      setSharing(false);
    }
  };

  const fallbackShare = (canvas) => {
    // Download the image + copy text
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `ID_Card_${formData.employeeId || 'card'}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const shareText = `ID Card Details:\nName: ${formData.name}\nID: ${formData.employeeId}\nDesignation: ${formData.designation}\nDepartment: ${formData.department}`;
    navigator.clipboard.writeText(shareText).catch(() => {});
    alert('The ID Card image has been downloaded. Card details copied to clipboard — paste them in your message!');
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
    setEditingId(card._id);
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
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-all shadow-sm inline-flex items-center gap-2">
                            <IdCardIcon size={16} /> Preview Card
                        </button>
                    </div>
                </form>
            </div>
            ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 border-l border-gray-100 p-4 sm:p-8 overflow-y-auto max-h-[calc(100vh-2rem)] relative">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all p-2 bg-white rounded-full shadow-sm border border-gray-100 z-50">
                        <X size={20} />
                    </button>

                    {success ? (
                        /* ── SUCCESS STATE ── */
                        <div className="flex flex-col items-center justify-center text-center w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
                                                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-100">
                                <CheckCircle size={52} className="text-emerald-500" strokeWidth={1.8} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">ID Card Generated!</h3>
                            <p className="text-gray-500 text-sm mb-8">The record has been stored successfully.<br/>You can now download or share the ID card.</p>

                            {/* Generated card thumbnail (small) */}
                            <div className="w-[220px] h-[352px] bg-white rounded-xl shadow-xl relative overflow-hidden flex flex-col justify-between border border-gray-200 mb-8 opacity-90 scale-95">
                                <div className="h-[94px] relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${formData.cardColor}, ${formData.cardColor}dd)` }}>
                                    <div className="absolute inset-0 opacity-10 bg-white/10"></div>
                                    <div className="absolute top-4 text-white font-black text-[0.8rem] tracking-wider uppercase z-10 w-full text-center px-2 leading-tight drop-shadow-md">The Contractum</div>
                                    <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 320" style={{ transform: "rotateY(180deg) rotateZ(180deg)" }}>
                                        <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                    </svg>
                                </div>
                                <div className="flex flex-col items-center -mt-12 z-20">
                                    <img src={formData.photo || 'https://via.placeholder.com/150'} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                                    <span className="mt-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white rounded-full" style={{ backgroundColor: formData.cardColor }}>{formData.category}</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center pt-1 px-4 text-center">
                                    <h1 className="text-sm font-bold text-gray-900 leading-tight uppercase">{formData.name}</h1>
                                    <p className="font-semibold text-[10px] mt-0.5 uppercase tracking-wide" style={{ color: formData.cardColor }}>{formData.designation}</p>
                                    <p className="text-gray-500 text-[9px] font-medium">{formData.department}</p>
                                    <div className="w-full mt-2 flex flex-col gap-0.5 text-[9px] text-left bg-gray-50 p-2 rounded-lg border border-gray-100">
                                        <div className="flex justify-between border-b border-gray-200 pb-0.5"><span className="text-gray-500 font-semibold">ID No.</span><span className="font-bold text-gray-800">{formData.employeeId.toUpperCase()}</span></div>
                                        {formData.bloodGroup && <div className="flex justify-between border-b border-gray-200 py-0.5"><span className="text-gray-500 font-semibold">Blood</span><span className="font-bold text-red-600">{formData.bloodGroup}</span></div>}
                                        <div className="flex justify-between pt-0.5"><span className="text-gray-500 font-semibold">Valid</span><span className="font-bold text-gray-800">{formData.validUntil ? new Date(formData.validUntil).toLocaleDateString() : ''}</span></div>
                                    </div>
                                </div>
                                <div className="h-4 mt-auto" style={{ background: `linear-gradient(to right, ${formData.cardColor}, ${formData.cardColor}aa)` }}></div>
                            </div>

                            <div className="flex flex-col gap-3 w-full print:hidden">
                                <div className="flex gap-3 w-full">
                                    <button onClick={handleDownload} disabled={downloading} className={`flex-1 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2 ${downloading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                        {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} Download
                                    </button>
                                    <button onClick={handleShare} disabled={sharing} className={`flex-1 py-3 text-sm font-bold text-white bg-[#1e5cdc] rounded-xl hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 ${sharing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                        {sharing ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />} Share
                                    </button>
                                </div>
                                
                                <div className="flex gap-3 w-full">
                                    <button onClick={() => { setSuccess(false); setPreviewMode(false); }} className="flex-1 py-3 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-100">
                                        <Edit2 size={18} /> Edit Details
                                    </button>
                                    <button onClick={() => { setIsModalOpen(false); resetForm(); setSuccess(false); }} className="flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 flex items-center justify-center gap-2">
                                        <X size={16} /> Close
                                    </button>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Share</p>
                                    <div className="flex justify-center gap-4">
                                        <a 
                                            href={`https://wa.me/?text=${encodeURIComponent(`ID Card for ${formData.name}\nID: ${formData.employeeId}\nDesignation: ${formData.designation}\nDownload it here: ${window.location.origin}`)}`} 
                                            target="_blank" rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                                            title="Share on WhatsApp"
                                        >
                                            <MessageCircle size={20} />
                                        </a>
                                        <a 
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(`Generated ID Card for ${formData.name}`)}`} 
                                            target="_blank" rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                                            title="Share on LinkedIn"
                                        >
                                            <Linkedin size={20} />
                                        </a>
                                        <a 
                                            href={`mailto:?subject=ID Card Generated - ${formData.name}&body=The ID card for ${formData.name} (${formData.employeeId}) has been generated.`}
                                            className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                                            title="Share via Email"
                                        >
                                            <Mail size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ── PREVIEW STATE ── */
                        <div className="flex flex-col items-center w-full max-w-sm mt-4">
                            <h3 className="text-lg text-gray-500 font-medium mb-6 uppercase tracking-widest flex items-center gap-2">
                                <IdCardIcon /> Card Preview
                            </h3>
                            
                            {/* THE ID CARD DESIGN */}
                            <div className="w-[300px] h-[480px] bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between border border-gray-200">
                                {/* Header / Top Shape */}
                                <div className="h-32 relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${formData.cardColor}, ${formData.cardColor}dd)` }}>
                                    <div className="absolute inset-0 opacity-10 bg-white/10"></div>
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
                                    <span className="mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full" style={{ backgroundColor: formData.cardColor }}>
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

                            <div className="flex gap-4 mt-8 mb-4 w-full print:hidden">
                                <button onClick={() => setPreviewMode(false)} className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    Edit Details
                                </button>
                                <button onClick={handleSubmit} className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
                                    <CheckCircle size={18} /> Confirm & Generate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
