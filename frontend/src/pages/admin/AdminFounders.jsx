import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, CheckCircle, Upload, Briefcase, Award, Target, Rocket, GraduationCap, QuoteIcon, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminFounders() {
  const { admin } = useAdminAuth();
  const [founders, setFounders] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFounder, setEditingFounder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    type: 'director', // 'founder' or 'director'
    background: '',
    focusArea: '',
    contribution: '',
    bio: '',
    expertise: '',
    achievements: '',
    image: null
  });

  const fetchFounders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/founders`);
      const data = await res.json();
      setFounders(data);
    } catch (err) {
      console.error('Failed to fetch founders:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchFounders();
    });
  }, [fetchFounders]);

  const filteredFounders = founders.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = (type = 'director') => {
    setFormData({
      name: '',
      role: '',
      type,
      background: '',
      focusArea: '',
      contribution: '',
      bio: '',
      expertise: '',
      achievements: '',
      image: null
    });
    setImagePreview(null);
    setEditingFounder(null);
  };

  const handleEdit = (founder) => {
    setEditingFounder(founder);
    setFormData({
      name: founder.name,
      role: founder.role,
      type: founder.type || 'director',
      background: founder.background || '',
      focusArea: founder.focusArea || '',
      contribution: founder.contribution || '',
      bio: founder.bio || '',
      expertise: founder.expertise ? (Array.isArray(founder.expertise) ? founder.expertise.join(', ') : founder.expertise) : '',
      achievements: founder.achievements ? (Array.isArray(founder.achievements) ? founder.achievements.join(', ') : founder.achievements) : '',
      image: null
    });
    setImagePreview(founder.image && founder.image.includes('/uploads/') ? `${API}${founder.image}` : founder.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this founder/director?")) {
      try {
        const res = await fetch(`${API}/api/founders/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchFounders();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingFounder && !formData.image) {
      toast.error("Profile Image is required.");
      return;
    }
    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('type', formData.type);

    if (formData.type === 'director') {
      data.append('background', formData.background);
      data.append('focusArea', formData.focusArea);
      data.append('contribution', formData.contribution);
    } else {
      data.append('bio', formData.bio);
      data.append('expertise', formData.expertise);
      data.append('achievements', formData.achievements);
    }

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const url = editingFounder ? `${API}/api/founders/${editingFounder._id}` : `${API}/api/founders`;
      const method = editingFounder ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        fetchFounders();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          resetForm();
        }, 1500);
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to save data.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Founders & Directors</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage the profiles shown on the Founder page</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-48 bg-white"
            />
          </div>
          <button onClick={() => { resetForm('founder'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add Founders
          </button>
          <button onClick={() => { resetForm('director'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add Founders & Directors
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Name</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell text-xs sm:text-sm">Role</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Type</th>
                <th className="text-right text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading data...</td></tr>
              ) : filteredFounders.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No data found.</td></tr>
              ) : (
                filteredFounders.map(f => (
                  <tr key={f._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={f.image && f.image.startsWith('/') ? `${API}${f.image}` : f.image} alt={f.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-100" />
                        <div>
                          <span className="font-semibold text-gray-800 text-xs sm:text-sm">{f.name}</span>
                          <p className="text-[10px] text-gray-400 sm:hidden mt-0.5">{f.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-medium hidden sm:table-cell text-xs sm:text-sm">{f.role}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${f.type === 'founder' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {f.type === 'founder' ? 'Founder' : 'Director'}
                      </span>
                    </td>
                    {/* founder permantes */}
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button onClick={() => handleEdit(f)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(f._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxHeight: 'calc(100vh - 1rem)' }}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{editingFounder ? 'Edit' : 'Add'} {formData.type === 'founder' ? 'Founder' : 'Founder/Director'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {success ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <CheckCircle size={48} className="text-emerald-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">Successfully Saved!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Rajesh Kumar" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                    <input required type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Founder & CEO" />
                  </div>
                </div>

                {formData.type === 'founder' ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Bio (Description)</label>
                      <textarea required rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="Tell us about the founder..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Core Expertise <span className="text-[10px] text-gray-400 font-normal">(separate by commas)</span></label>
                        <div className="relative">
                          <CheckCircle size={16} className="absolute left-3 top-3 text-gray-400" />
                          <textarea rows={2} value={formData.expertise} onChange={e => setFormData({ ...formData, expertise: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Strategic Vision, Technology Innovation" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Key Achievements <span className="text-[10px] text-gray-400 font-normal">(separate by commas)</span></label>
                        <div className="relative">
                          <Award size={16} className="absolute left-3 top-3 text-gray-400" />
                          <textarea rows={2} value={formData.achievements} onChange={e => setFormData({ ...formData, achievements: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Led company to IPO, Recognized as Industry Leader" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Background</label>
                        <div className="relative">
                          <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required type="text" value={formData.background} onChange={e => setFormData({ ...formData, background: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="Strategy, Operations..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Focus Area</label>
                        <div className="relative">
                          <Target size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input required type="text" value={formData.focusArea} onChange={e => setFormData({ ...formData, focusArea: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="Company Strategy, Expansion..." />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Contribution</label>
                      <div className="relative">
                        <Award size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="text" value={formData.contribution} onChange={e => setFormData({ ...formData, contribution: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="Visionary leadership..." />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Image</label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
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
                        id="founder-image-upload"
                      />
                      <label htmlFor="founder-image-upload" className="cursor-pointer bg-blue-50 text-[#1e5cdc] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors inline-block">
                        Choose Image from Computer
                      </label>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or WebP. Max 5MB.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className={`px-4 py-2 text-sm font-semibold text-white ${formData.type === 'founder' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#1e5cdc] hover:bg-blue-700'} rounded-lg transition-all shadow-sm inline-flex items-center gap-2`}>
                    <Rocket size={16} />
                    {editingFounder ? 'Update Details' : 'Save Details'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
