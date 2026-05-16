import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { Search, CheckCircle, Clock, Edit3, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminUsers() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [data, setData] = useState({ users: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', role: '', password: '' });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { fetchUsers(); }, [debouncedSearch, page]);

  const fetchUsers = async () => {
    setLoading(true);
    // Fetch all users
    const res = await fetch(`${API}/api/admin/users?search=${debouncedSearch}&page=${page}&limit=10`, { headers });
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  const deleteUser = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`${API}/api/admin/users/${id}`, { method: 'DELETE', headers });
    if (res.ok) { showMsg('User deleted.'); fetchUsers(); } else showMsg('Failed to delete user');
  };

  const verifyUser = async (id, name, currentRole) => {
    if (!confirm(`Verify user "${name}"?`)) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ role: currentRole || 'user', isApproved: true })
      });
      if (res.ok) {
        showMsg('User verified successfully!');
        fetchUsers();
      } else {
        showMsg('Failed to verify user');
      }
    } catch (err) {
      showMsg('Error verifying user');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      const res = await fetch(`${API}/api/admin/users/${editingUser._id}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        showMsg('User updated successfully!');
        setEditingUser(null);
        fetchUsers();
      } else {
        const err = await res.json();
        showMsg(err.message || 'Failed to update user');
      }
    } catch (err) {
      showMsg('Error updating user');
    }
  };

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">User & Employee Management</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">{data.total} total registered users</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent w-full sm:w-72 shadow-sm transition-all bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      {msg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-medium shadow-sm animate-fade-in">
          {msg}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 uppercase tracking-wider text-[10px] sm:text-xs">User Name</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 uppercase tracking-wider text-[10px] sm:text-xs hidden md:table-cell">Joined Date</th>
                <th className="text-center text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 uppercase tracking-wider text-[10px] sm:text-xs hidden sm:table-cell">Role</th>
                <th className="text-center text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 uppercase tracking-wider text-[10px] sm:text-xs">Status</th>
                <th className="text-right text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 uppercase tracking-wider text-[10px] sm:text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400 font-medium">Loading user data...</td></tr>
              ) : !data.users || data.users.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400 font-medium">{data.message || 'No users found.'}</td></tr>
              ) : data.users.map(u => (
                <tr key={u._id} className="hover:bg-gray-50 dark:bg-gray-700/80 transition-colors">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-100 text-[#1e5cdc] flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border border-blue-200">
                        {u.avatar
                          ? <img src={u.avatar} className="w-full h-full object-cover rounded-full" alt="" />
                          : u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 font-semibold text-xs sm:text-sm">{u.name}</p>
                        <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 truncate max-w-[100px] sm:max-w-none">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 text-xs sm:text-sm hidden md:table-cell whitespace-nowrap">
                    {new Date(u.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap hidden sm:table-cell">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      u.role === 'super-admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                      u.role === 'admin' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-gray-100 text-gray-500 border-gray-200 dark:border-gray-700'
                    }`}>
                      {u.role ? u.role.toUpperCase().replace('-', ' ') : 'USER'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
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
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      {!u.isApproved && (
                        <button onClick={() => verifyUser(u._id, u.name, u.role)}
                          className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md hover:bg-emerald-600 hover:text-white transition-colors">
                          Verify
                        </button>
                      )}
                      <button onClick={() => {
                        setEditingUser(u);
                        setFormData({ 
                          name: u.name || '',
                          email: u.email || '',
                          mobile: u.mobile || u.phone || '',
                          role: u.role || 'user', 
                          password: '' 
                        });
                      }}
                        className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
                        Edit
                      </button>
                      {u.role !== 'super-admin' && (
                        <button onClick={() => deleteUser(u._id, u.name)}
                          className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-md hover:bg-red-600 hover:text-white transition-colors">
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.pages > 1 && (
          <div className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-700 transition-colors shadow-sm">
              Previous
            </button>
            <span className="text-gray-500 text-sm font-medium">Page {page} of {data.pages}</span>
            <button disabled={page >= data.pages} onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-700 transition-colors shadow-sm">
              Next Step
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" style={{ maxHeight: 'calc(100vh - 1rem)' }}>
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-700/50">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">Update User</h2>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600 dark:text-gray-400 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Update Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={editingUser?.role === 'super-admin'}
                  className={`w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all ${editingUser?.role === 'super-admin' ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
                {editingUser?.role === 'super-admin' && (
                  <p className="text-[10px] text-gray-400 mt-1.5 font-medium">Super Admin role cannot be modified.</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all"
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-700 flex gap-2 sm:gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 py-3 text-sm font-bold text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-white dark:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="flex-[2] py-3 text-sm font-bold text-white bg-[#1e5cdc] rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
