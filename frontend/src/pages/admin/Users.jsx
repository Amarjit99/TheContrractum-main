import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-black text-white">Users</h1>
          <p className="text-gray-500 text-sm">{data.total} total users</p>
        </div>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name or email…"
          className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64" />
      </div>

      {msg && <div className="mb-4 p-2 bg-green-900/40 border border-green-700 text-green-400 rounded-xl text-sm text-center">{msg}</div>}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="text-left text-gray-400 font-semibold px-4 py-3">User</th>
                <th className="text-left text-gray-400 font-semibold px-4 py-3 hidden md:table-cell">Joined</th>
                <th className="text-left text-gray-400 font-semibold px-4 py-3">Role</th>
                <th className="text-right text-gray-400 font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-600">Loading…</td></tr>
              ) : data.users?.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-600">No users found.</td></tr>
              ) : data.users.map(u => (
                <tr key={u._id} className="border-b border-gray-800 hover:bg-gray-800/30 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {u.avatar
                          ? <img src={u.avatar} className="w-full h-full object-cover rounded-full" alt="" />
                          : u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-gray-500 text-xs">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                    {new Date(u.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${u.role === 'admin' ? 'bg-red-900/40 text-red-400 border border-red-800' : 'bg-gray-800 text-gray-400'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {u.role === 'user' ? (
                        <button onClick={() => updateRole(u._id, 'admin')}
                          className="px-2.5 py-1 text-xs font-semibold bg-red-900/30 text-red-400 border border-red-800 rounded-lg hover:bg-red-900/60 transition">
                          Make Admin
                        </button>
                      ) : (
                        <button onClick={() => updateRole(u._id, 'user')}
                          className="px-2.5 py-1 text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
                          Demote
                        </button>
                      )}
                      <button onClick={() => deleteUser(u._id, u.name)}
                        className="px-2.5 py-1 text-xs font-semibold bg-red-950 text-red-500 border border-red-900 rounded-lg hover:bg-red-900 transition">
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
          <div className="flex justify-between items-center px-4 py-3 border-t border-gray-800">
            <button disabled={page <= 1} onClick={() => setPage(p => p-1)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-800 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition">
              ← Prev
            </button>
            <span className="text-gray-500 text-xs">Page {page} of {data.pages}</span>
            <button disabled={page >= data.pages} onClick={() => setPage(p => p+1)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-800 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition">
              Next →
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
