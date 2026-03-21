import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-white text-2xl font-black">{value ?? '—'}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      .then(r => r.json()).then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back, {admin?.name} 👋</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard icon="👥" label="Total Users"    value={stats?.totalUsers}    color="bg-blue-900/40 text-blue-400" />
            <StatCard icon="✉️"  label="Contact Forms"  value={stats?.totalContacts}  color="bg-purple-900/40 text-purple-400" />
            <StatCard icon="👁️"  label="Site Visitors"  value={stats?.totalVisitors}  color="bg-green-900/40 text-green-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Recent Users */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 text-sm">🆕 Recent Users</h3>
              {stats?.recentUsers?.length ? (
                <div className="space-y-3">
                  {stats.recentUsers.map(u => (
                    <div key={u._id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-sm font-medium truncate">{u.name}</p>
                        <p className="text-gray-500 text-xs truncate">{u.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.role === 'admin' ? 'bg-red-900/40 text-red-400' : 'bg-gray-800 text-gray-400'}`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-600 text-sm">No users yet.</p>}
            </div>

            {/* Recent Contacts */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 text-sm">📬 Recent Contact Submissions</h3>
              {stats?.recentContacts?.length ? (
                <div className="space-y-3">
                  {stats.recentContacts.map(c => (
                    <div key={c._id} className="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-white text-sm font-medium">{c.name}</p>
                        <span className="text-gray-600 text-xs shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-500 text-xs truncate">{c.subject}</p>
                      <p className="text-gray-400 text-xs">{c.email}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-600 text-sm">No contact forms yet.</p>}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
