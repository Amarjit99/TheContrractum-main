import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { Search } from 'lucide-react';

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

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { fetchUsers(); }, [debouncedSearch, page]);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/admin/users?search=${debouncedSearch}&page=${page}&limit=10`, { headers });
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  const updateRole = async (id, role) => {
    const res = await fetch(`${API}/api/admin/users/${id}/role`, { method: 'PUT', headers, body: JSON.stringify({ role }) });
    if (res.ok) { showMsg('Role updated!'); fetchUsers(); } else showMsg('Failed to update role');
  };

  const deleteUser = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`${API}/api/admin/users/${id}`, { method: 'DELETE', headers });
    if (res.ok) { showMsg('User deleted.'); fetchUsers(); } else showMsg('Failed to delete user');
  };

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">{data.total} total registered users</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            value={search} 
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search users..."
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
                <th className="text-left text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">User Name</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs hidden md:table-cell">Joined Date</th>
                <th className="text-center text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Role</th>
                <th className="text-right text-gray-500 font-semibold px-6 py-4 uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="py-12 text-center text-gray-400 font-medium">Loading user data...</td></tr>
              ) : data.users?.length === 0 ? (
                <tr><td colSpan={4} className="py-12 text-center text-gray-400 font-medium">No users found.</td></tr>
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
                        <p className="text-gray-500 text-xs mt-0.5">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell whitespace-nowrap">
                    {new Date(u.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      u.role === 'admin' 
                        ? 'bg-blue-50 text-[#1e5cdc] border border-blue-200' 
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {u.role === 'user' ? (
                        <button onClick={() => updateRole(u._id, 'admin')}
                          className="px-3 py-1.5 text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:bg-[#1e5cdc] hover:text-white hover:border-[#1e5cdc] transition-colors">
                          Make Admin
                        </button>
                      ) : (
                        <button onClick={() => updateRole(u._id, 'user')}
                          className="px-3 py-1.5 text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors">
                          Demote
                        </button>
                      )}
                      <button onClick={() => deleteUser(u._id, u.name)}
                        className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 border border-red-100 rounded-md hover:bg-red-600 hover:text-white transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.pages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button disabled={page <= 1} onClick={() => setPage(p => p-1)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm">
              Previous
            </button>
            <span className="text-gray-500 text-sm font-medium">Page {page} of {data.pages}</span>
            <button disabled={page >= data.pages} onClick={() => setPage(p => p+1)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm">
              Next Step
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
