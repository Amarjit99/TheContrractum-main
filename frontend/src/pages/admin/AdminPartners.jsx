import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Trash2, X, Edit, ToggleLeft, ToggleRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';



export default function AdminPartners() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [newPartner, setNewPartner] = useState({ name: '', type: 'Technology', tier: 'Associate', pointOfContact: '', status: 'Active' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => { fetchPartners(); }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/cms/partners`);
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredPartners = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.pointOfContact?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this partner?")) {
      try {
        const res = await fetch(`${API}/api/cms/partners/${id}`, { method: 'DELETE', headers });
        if(res.ok) fetchPartners();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleStatus = async (partner) => {
    const newStatus = partner.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const res = await fetch(`${API}/api/cms/partners/${partner._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchPartners();
        showToast(`${partner.name} is now ${newStatus}`, 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to update status', 'error');
    }
  };


  const openEditModal = (partner) => {
    setEditingId(partner._id);
    setNewPartner({
      name: partner.name,
      type: partner.type || 'Technology',
      tier: partner.tier || 'Associate',
      pointOfContact: partner.pointOfContact || '',
      status: partner.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newPartner.name || !newPartner.pointOfContact) return showToast('Please fill all required fields.', 'error');
    setSubmitting(true);
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API}/api/cms/partners/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(newPartner)
        });
      } else {
        res = await fetch(`${API}/api/cms/partners`, {
          method: 'POST',
          headers,
          body: JSON.stringify(newPartner)
        });
      }
      if (res.ok) {
        await fetchPartners();
        setIsModalOpen(false);
        setEditingId(null);
        setNewPartner({ name: '', type: 'Technology', tier: 'Associate', pointOfContact: '', status: 'Active' });
        showToast(editingId ? `Partner "${newPartner.name}" updated!` : `Partner "${newPartner.name}" enrolled!`, 'success');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(errData.message || 'Failed to enroll partner. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please check your connection.', 'error');
    }
    setSubmitting(false);
  };

  return (
    <AdminLayout>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <span>{toast.type === 'success' ? '✓' : '✗'}</span>
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Partner Network</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage enterprise, channel, and technology partners</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search network..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
          <button onClick={() => { setEditingId(null); setNewPartner({ name: '', type: 'Technology', tier: 'Associate', pointOfContact: '', status: 'Active' }); setIsModalOpen(true); }} className="flex items-center justify-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> <span className="hidden xs:inline">Add</span> Partner
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f8fafc] border-b border-gray-100 text-gray-500 font-semibold">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Partner Name</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell text-xs sm:text-sm">Type & Tier</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm">Point of Contact</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">Status</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading partners...</td></tr>
              ) : filteredPartners.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No partners found.</td></tr>
              ) : (
                filteredPartners.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <p className="font-bold text-gray-800 text-xs sm:text-sm">{p.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Joined {p.joined}</p>
                      <p className="text-[10px] text-[#1e5cdc] font-semibold mt-0.5 sm:hidden">{p.type} • {p.tier}</p>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                      <p className="text-gray-700 font-medium text-xs sm:text-sm">{p.type}</p>
                      <p className="text-xs text-[#1e5cdc] font-semibold mt-0.5">{p.tier} Tier</p>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 hidden lg:table-cell text-xs sm:text-sm">{p.pointOfContact || "Unassigned"}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                      <button
                        onClick={() => toggleStatus(p)}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold cursor-pointer transition-all duration-200 hover:shadow-md ${
                          p.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
                        }`}
                        title={`Click to ${p.status === 'Active' ? 'deactivate' : 'activate'}`}
                      >
                        {p.status === 'Active' ? <ToggleRight size={12} className="sm:w-3.5 sm:h-3.5" /> : <ToggleLeft size={12} className="sm:w-3.5 sm:h-3.5" />}
                        <span className="hidden xs:inline">{p.status === 'Active' ? 'Active' : 'Inactive'}</span>
                        <span className="xs:hidden">{p.status === 'Active' ? '✓' : '✗'}</span>
                      </button>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button onClick={() => openEditModal(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors" title="Edit"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(p._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxHeight: 'calc(100vh - 1rem)' }}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{editingId ? 'Edit Partner' : 'Enroll New Partner'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                <input required type="text" value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="E.g. Acme Corp" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Partner Type</label>
                  <select value={newPartner.type} onChange={e => setNewPartner({...newPartner, type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Technology</option><option>Enterprise</option><option>Reseller</option><option>Channel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Tier Level</label>
                  <select value={newPartner.tier} onChange={e => setNewPartner({...newPartner, tier: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Associate</option><option>Premier</option><option>Elite</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Point of Contact</label>
                <input required type="text" value={newPartner.pointOfContact} onChange={e => setNewPartner({...newPartner, pointOfContact: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="E.g. Jane Doe" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select value={newPartner.status} onChange={e => setNewPartner({...newPartner, status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="Active">✅ Active</option>
                  <option value="Inactive">❌ Inactive</option>
                  <option value="Pending Review">⏳ Pending Review</option>
                </select>
              </div>
              <div className="pt-3 sm:pt-4 flex items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); setNewPartner({ name: '', type: 'Technology', tier: 'Associate', pointOfContact: '', status: 'Active' }); }} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2">
                  {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span> Saving...</> : (editingId ? 'Save Changes' : 'Enroll Now')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
