import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminContacts() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}` };

  const [data, setData] = useState({ contacts: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchContacts(); }, [page]);

  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/admin/contacts?page=${page}&limit=10`, { headers });
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact submission?')) return;
    const res = await fetch(`${API}/api/admin/contacts/${id}`, { method: 'DELETE', headers });
    if (res.ok) { setMsg('Deleted!'); setTimeout(() => setMsg(''), 3000); fetchContacts(); }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">Contact Submissions</h1>
        <p className="text-gray-500 text-sm">{data.total} total submissions</p>
      </div>

      {msg && <div className="mb-4 p-2 bg-green-900/40 border border-green-700 text-green-400 rounded-xl text-sm text-center">{msg}</div>}

      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data.contacts?.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center text-gray-600">
            No contact submissions yet.
          </div>
        ) : data.contacts.map(c => (
          <div key={c._id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div
              className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-800/30 transition"
              onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-semibold text-sm">{c.name}</span>
                  <span className="text-gray-500 text-xs">{c.email}</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{c.subject}</span>
                </div>
                <p className="text-gray-600 text-xs mt-0.5">
                  {new Date(c.createdAt).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <button onClick={e => { e.stopPropagation(); deleteContact(c._id); }}
                  className="px-2.5 py-1 text-xs font-semibold bg-red-950 text-red-500 border border-red-900 rounded-lg hover:bg-red-900 transition">
                  Delete
                </button>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${expanded === c._id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            {expanded === c._id && (
              <div className="border-t border-gray-800 px-5 py-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Message</p>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-gray-500 font-semibold mb-0.5">From</p><p className="text-gray-300">{c.name}</p></div>
                  <div><p className="text-gray-500 font-semibold mb-0.5">Email</p><p className="text-gray-300">{c.email}</p></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.pages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button disabled={page <= 1} onClick={() => setPage(p => p-1)}
            className="px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-800 rounded-xl disabled:opacity-40 hover:bg-gray-700 transition">
            ← Prev
          </button>
          <span className="text-gray-500 text-sm">Page {page} of {data.pages}</span>
          <button disabled={page >= data.pages} onClick={() => setPage(p => p+1)}
            className="px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-800 rounded-xl disabled:opacity-40 hover:bg-gray-700 transition">
            Next →
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
