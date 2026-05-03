import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, CheckCircle, Upload, GraduationCap } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminStudentInterns() {
  const { admin } = useAdminAuth();
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntern, setEditingIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    collegeName: '',
    description: '',
    image: null,
    tags: ''
  });

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/interns?t=${Date.now()}`);
      const data = await res.json();
      setInterns(data);
    } catch (err) {
      console.error('Failed to fetch interns:', err);
    }
    setLoading(false);
  };

  const filteredInterns = interns.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.role.toLowerCase().includes(search.toLowerCase()) ||
    i.collegeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      collegeName: '',
      description: '',
      image: null,
      tags: ''
    });
    setImagePreview(null);
    setEditingIntern(null);
  };

  const handleEdit = (intern) => {
    setEditingIntern(intern);
    setFormData({
      name: intern.name,
      role: intern.role,
      collegeName: intern.collegeName,
      description: intern.description,
      image: null,
      tags: intern.tags ? intern.tags.join(', ') : ''
    });
    setImagePreview(`${API}${intern.image}`);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this intern?")) {
      try {
        const res = await fetch(`${API}/api/interns/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchInterns();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingIntern && !formData.image) {
      alert("Please select a profile image.");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('collegeName', formData.collegeName);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }
    
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    data.append('tags', JSON.stringify(tagsArray));

    try {
      const url = editingIntern ? `${API}/api/interns/${editingIntern._id}` : `${API}/api/interns`;
      const method = editingIntern ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        fetchInterns();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          resetForm();
        }, 1500);
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to save intern.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving. Please check the console.");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Interns</h1>
          <p className="text-gray-500 text-sm mt-1">Manage intern profiles shown on the public team page</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search interns..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add Intern
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Intern</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Role</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden md:table-cell">College</th>
                <th className="text-right text-gray-500 font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading interns...</td></tr>
              ) : filteredInterns.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No interns found.</td></tr>
              ) : (
                filteredInterns.map(i => (
                  <tr key={i._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={`${API}${i.image}`} alt={i.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                        <span className="font-semibold text-gray-800">{i.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{i.role}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{i.collegeName}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(i)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(i._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16}/></button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{editingIntern ? 'Edit Intern' : 'Add New Intern'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {success ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <CheckCircle size={48} className="text-emerald-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">Intern Saved Successfully!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Rahul Singh" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                    <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Software Developer Intern" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">College Name</label>
                  <div className="relative">
                    <GraduationCap size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. IIT Bombay" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description / Quote</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" rows={3} placeholder="What should people know about their work?" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Skills (comma separated)</label>
                  <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. React, Node.js, MongoDB" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Image</label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
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
                        id="intern-image-upload"
                      />
                      <label htmlFor="intern-image-upload" className="cursor-pointer bg-blue-50 text-[#1e5cdc] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors inline-block">
                        Choose Image
                      </label>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or WebP. Max 5MB.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                    {editingIntern ? 'Update Intern' : 'Save Intern'}
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
