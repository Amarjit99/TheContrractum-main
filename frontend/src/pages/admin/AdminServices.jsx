import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Trash2, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialServices = [
  { _id: 'static-1', title: "GIS Solutions", category: "Business Solutions", inquiries: 145, status: "Active" },
  { _id: 'static-2', title: "IT & Consulting", category: "Business Solutions", inquiries: 89, status: "Active" },
  { _id: 'static-3', title: "E-Commerce Platforms", category: "Digital Solutions", inquiries: 234, status: "Active" },
  { _id: 'static-4', title: "HR Tech Solutions", category: "Digital Solutions", inquiries: 56, status: "Active" },
  { _id: 'static-5', title: "Telecommunication Infrastructure", category: "Connectivity", inquiries: 112, status: "Active" },
  { _id: 'static-6', title: "Cloud Integration", category: "Connectivity", inquiries: 198, status: "Active" },
];

export default function AdminServices() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newService, setNewService] = useState({ title: '', category: 'Digital Solutions' });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/cms/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const allServices = [...services, ...initialServices];
  const filteredServices = allServices.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if (typeof id === 'string' && id.startsWith('static-')) return alert("Cannot delete demo data.");
    if(window.confirm("Are you sure you want to delete this service offering?")) {
      try {
         const res = await fetch(`${API}/api/cms/services/${id}`, { method: 'DELETE', headers });
         if(res.ok) fetchServices();
      } catch (err) { console.error(err); }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if(!newService.title) return alert("Please fill service title");
    
    try {
      const res = await fetch(`${API}/api/cms/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...newService, inquiries: 0, status: 'Active' })
      });
      if(res.ok) {
        fetchServices();
        setIsModalOpen(false);
        setNewService({ title: '', category: 'Digital Solutions' });
      } else {
         alert("Failed to publish service");
      }
    } catch(err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Services Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">Manage public service offerings and details</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add Service
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f8fafc] border-b border-gray-100 text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4 hidden sm:table-cell">Category</th>
                <th className="px-6 py-4 text-center">Inquiries</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading services...</td></tr>
              ) : filteredServices.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No services found.</td></tr>
              ) : (
                filteredServices.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{s.title}</td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{s.category}</td>
                    <td className="px-6 py-4 text-center font-semibold text-[#1e5cdc]">{s.inquiries || 0}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(s._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Add New Service</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title</label>
                <input required type="text" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. SEO Audit" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Parent</label>
                <select value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Digital Solutions</option><option>Business Solutions</option><option>Connectivity</option>
                </select>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Publish Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
