import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { ChevronDown, ChevronUp, Trash2, Mail, Calendar, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export default function AdminContacts() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}` };

  const [data, setData] = useState({ contacts: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchContacts(); }, [page]);

  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/admin/contacts?page=${page}&limit=10`, { headers });
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  const allContacts = data.contacts || [];
  const totalCount = data.total || 0;

  const filteredContacts = allContacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  const deleteContact = async (id) => {
    if (typeof id === 'string' && id.startsWith('mock-')) return toast.success("Cannot delete demo data.");
    if (!confirm('Delete this contact submission?')) return;
    const res = await fetch(`${API}/api/admin/contacts/${id}`, { method: 'DELETE', headers });
    if (res.ok) { setMsg('Lead deleted successfully.'); setTimeout(() => setMsg(''), 3000); fetchContacts(); }
  };

  return (
    <AdminLayout>
      <div className="mb-6 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Leads & Contacts</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">{totalCount.toLocaleString()} total submissions received</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white dark:bg-gray-800" 
            />
          </div>
        </div>
      </div>

      {msg && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-medium shadow-sm animate-fade-in">
          {msg}
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
            No contact submissions or leads found.
          </div>
        ) : filteredContacts.map(c => (
          <div key={c._id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:bg-gray-700 transition-colors"
              onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
                  <span className="text-gray-800 dark:text-gray-200 font-bold text-sm sm:text-base">{c.name}</span>
                  <span className="text-gray-400 text-sm hidden sm:inline-block">•</span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm truncate"><Mail size={14}/> {c.email}</span>
                  <span className="sm:ml-auto text-[10px] sm:text-xs font-semibold bg-blue-50 text-[#1e5cdc] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-blue-100 self-start sm:self-auto mt-1 sm:mt-0">
                    {c.subject}
                  </span>
                </div>
                <p className="flex items-center gap-1.5 text-gray-400 text-xs mt-2 font-medium">
                  <Calendar size={12} />
                  {new Date(c.createdAt).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' })}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-2 sm:ml-4">
                <button onClick={e => { e.stopPropagation(); deleteContact(c._id); }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Lead">
                  <Trash2 size={18} />
                </button>
                <div className="text-gray-400 p-1">
                  {expanded === c._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </div>
            {expanded === c._id && (
              <div className="border-t border-gray-100 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50 dark:bg-gray-700/50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Message Content</h4>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.pages > 1 && (
        <div className="flex justify-between items-center mt-6 p-2">
          <button disabled={page <= 1} onClick={() => setPage(p => p-1)}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-700 transition-colors shadow-sm">
            Previous
          </button>
          <span className="text-gray-500 text-sm font-semibold">Page {page} of {data.pages}</span>
          <button disabled={page >= data.pages} onClick={() => setPage(p => p+1)}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-gray-700 transition-colors shadow-sm">
            Next Page
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
