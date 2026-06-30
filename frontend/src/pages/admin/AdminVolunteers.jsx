import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, CheckCircle, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminVolunteers() {
  const { admin } = useAdminAuth();
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    batchYear: new Date().getFullYear().toString(),
    image: null
  });

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/volunteer-stories?t=${Date.now()}`);
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error('Failed to fetch volunteer stories:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const filteredStories = stories.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', quote: '', batchYear: new Date().getFullYear().toString(), image: null });
    setImagePreview(null);
    setEditingStory(null);
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setFormData({
      name: story.name,
      role: story.role,
      quote: story.quote,
      batchYear: story.batchYear || new Date().getFullYear().toString(),
      image: null
    });
    setImagePreview(story.image && story.image.includes('/uploads/') ? `${API}${story.image}` : story.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer story?")) {
      try {
        const res = await fetch(`${API}/api/volunteer-stories/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchStories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingStory && !formData.image) {
      toast.error("Please select a profile image.");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('quote', formData.quote);
    data.append('batchYear', formData.batchYear);
    if (formData.image) data.append('image', formData.image);

    try {
      const url = editingStory ? `${API}/api/volunteer-stories/${editingStory._id}` : `${API}/api/volunteer-stories`;
      const method = editingStory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        fetchStories();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          resetForm();
        }, 1500);
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to save volunteer story.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Volunteer Stories</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage volunteer stories shown on the public site</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search volunteers..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white"
            />
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0 cursor-pointer">
            <Plus size={16} /> Add Story
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4">Name</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">Role</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Quote</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">Batch</th>
                <th className="text-right text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading Stories...</td></tr>
              ) : filteredStories.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No stories found.</td></tr>
              ) : (
                filteredStories.map(i => (
                  <tr key={i._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={i.image && i.image.includes('/uploads/') ? `${API}${i.image}` : i.image} alt={i.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                        <span className="font-semibold text-gray-800">{i.name}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-medium hidden sm:table-cell">{i.role}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden md:table-cell max-w-xs truncate">{i.quote}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden sm:table-cell">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">{i.batchYear || new Date().getFullYear().toString()}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(i)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(i._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{editingStory ? 'Edit Story' : 'Add New Story'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"><X size={20} /></button>
            </div>
            {success ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <CheckCircle size={48} className="text-emerald-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">Saved Successfully!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Rahul Singh" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                    <input required type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Tech Volunteer" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Quote</label>
                    <textarea required value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" rows={3} placeholder="Their volunteer experience..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Batch Year</label>
                    <select required value={formData.batchYear} onChange={e => setFormData({ ...formData, batchYear: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white">
                      {[...Array(41)].map((_, i) => {
                        const year = 2040 - i;
                        return <option key={year} value={year.toString()}>{year}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Image</label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <Upload size={24} className="text-gray-400" />}
                    </div>
                    <div className="flex-1">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="volunteer-image-upload" />
                      <label htmlFor="volunteer-image-upload" className="cursor-pointer bg-blue-50 text-[#1e5cdc] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors inline-block">Choose Image</label>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or WebP. Max 5MB.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer">{editingStory ? 'Update Story' : 'Save Story'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
