import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { Search, UserCheck, ShieldCheck, Edit3, Trash2, X, CheckCircle, Clock } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminAdmins() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [data, setData] = useState({ users: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState('');

  // Edit Modal State
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    adminSubRole: '',
    adminPermissions: 'view',
    joiningDate: '',
    isApproved: true
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { fetchAdmins(); }, [debouncedSearch, page]);

  const fetchAdmins = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/admin/users?search=${debouncedSearch}&page=${page}&limit=10&role=admin`, { headers });
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  const handleEdit = (u) => {
    setEditingAdmin(u);
    setFormData({
      adminSubRole: u.adminSubRole || '',
      adminPermissions: u.adminPermissions || 'view',
      joiningDate: u.joiningDate || new Date().toISOString().split('T')[0],
      isApproved: u.isApproved !== undefined ? u.isApproved : true
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API}/api/admin/users/${editingAdmin._id}/admin-details`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showMsg('Admin details updated successfully!');
        setEditingAdmin(null);
        fetchAdmins();
      } else {
        showMsg('Failed to update admin details');
      }
    } catch (err) {
      showMsg('Error updating admin');
    }
  };

  const deleteAdmin = async (id, name) => {
    if (!confirm(`Delete admin "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`${API}/api/admin/users/${id}`, { method: 'DELETE', headers });
    if (res.ok) { showMsg('Admin deleted.'); fetchAdmins(); } else showMsg('Failed to delete admin');
  };

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="text-[#1e5cdc]" size={28} />
            Administrator Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">{data.total} total administrators</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search admins..."
            className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent w-full sm:w-72 shadow-sm transition-all bg-white"
          />
        </div>
      </div>

      {msg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-medium shadow-sm animate-fade-in">
          {msg}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Admin</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Role / Dept</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Joining Date</th>
                <th className="text-center text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Permissions</th>
                <th className="text-center text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Status</th>
                <th className="text-right text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400 font-medium">Loading admin data...</td></tr>
              ) : data.users?.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400 font-medium">No administrators found.</td></tr>
              ) : data.users.map(u => (
                <tr key={u._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1e5cdc] flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200">
                        {u.avatar
                          ? <img src={u.avatar} className="w-full h-full object-cover rounded-full" alt="" />
                          : u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">{u.name}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 font-medium text-xs bg-gray-100 px-2 py-1 rounded">
                      {u.adminSubRole || 'Not Assigned'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                    {u.joiningDate || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${u.adminPermissions === 'view-delete-edit' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                        u.adminPermissions === 'view-delete' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                          'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                      {u.adminPermissions?.replace(/-/g, ' & ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {u.isApproved ? (
                      <span className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <CheckCircle size={14} /> VERIFIED
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1 text-amber-500 font-bold text-[11px]">
                        <Clock size={14} /> PENDING
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(u)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Admin">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => deleteAdmin(u._id, u.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Admin">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">Admin Setup</h2>
              <button onClick={() => setEditingAdmin(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Role Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Role</label>
                <select
                  value={formData.adminSubRole}
                  onChange={(e) => setFormData({ ...formData, adminSubRole: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all"
                >
                  <option value="">Select a Role</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="TR">TR</option>
                  <option value="Support Manager">Support Manager</option>
                </select>
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Joining Date</label>
                <input
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all"
                />
              </div>

              {/* Permissions Radio */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Permissions Level</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input
                      type="radio"
                      name="permissions"
                      checked={formData.adminPermissions === 'view'}
                      onChange={() => setFormData({ ...formData, adminPermissions: 'view' })}
                      className="w-4 h-4 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">Only See</span>
                      <span className="text-[10px] text-gray-400">View-only access to dashboard data</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input
                      type="radio"
                      name="permissions"
                      checked={formData.adminPermissions === 'view-delete'}
                      onChange={() => setFormData({ ...formData, adminPermissions: 'view-delete' })}
                      className="w-4 h-4 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">See and Delete</span>
                      <span className="text-[10px] text-gray-400">Can view and remove existing records</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input
                      type="radio"
                      name="permissions"
                      checked={formData.adminPermissions === 'view-delete-edit'}
                      onChange={() => setFormData({ ...formData, adminPermissions: 'view-delete-edit' })}
                      className="w-4 h-4 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">See, Delete and Edit</span>
                      <span className="text-[10px] text-gray-400">Full management control including updates</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Approval status check */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  id="approve-check"
                  type="checkbox"
                  checked={formData.isApproved}
                  onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                  className="w-5 h-5 text-emerald-600 rounded-md focus:ring-emerald-500 border-gray-300"
                />
                <label htmlFor="approve-check" className="text-sm font-bold text-gray-700 cursor-pointer">
                  Approve and Verify Account
                </label>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setEditingAdmin(null)}
                className="flex-1 py-3 text-sm font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-[2] py-3 text-sm font-bold text-white bg-[#1e5cdc] rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
