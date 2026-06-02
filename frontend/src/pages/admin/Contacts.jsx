import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { ChevronDown, ChevronUp, Trash2, Mail, Calendar, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export default function AdminContacts() {
  const { admin } = useAdminAuth();

  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');
  
  // Parse URL tab parameter or default to 'general'
  const queryParams = new URLSearchParams(window.location.search);
  const tabParam = queryParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    ['general', 'demo', 'quote', 'support'].includes(tabParam) ? tabParam : 'general'
  );

  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  // Sync tab active state with changes to window search location
  useEffect(() => {
    const qParams = new URLSearchParams(window.location.search);
    const tParam = qParams.get('tab');
    if (tParam && ['general', 'demo', 'quote', 'support'].includes(tParam)) {
      setActiveTab(tParam);
    }
  }, [window.location.search]);

  const fetchItems = useCallback(async () => {
    if (!admin?.token) return;
    setLoading(true);
    let endpoint = 'contacts';
    if (activeTab === 'demo') endpoint = 'demo-requests';
    else if (activeTab === 'quote') endpoint = 'quote-requests';
    else if (activeTab === 'support') endpoint = 'support-tickets';

    try {
      const res = await fetch(`${API}/api/admin/${endpoint}?page=${page}&limit=10`, { headers });
      const d = await res.json();
      
      let itemsList = [];
      if (activeTab === 'general') itemsList = d.contacts || [];
      else if (activeTab === 'demo') itemsList = d.demoRequests || [];
      else if (activeTab === 'quote') itemsList = d.quoteRequests || [];
      else if (activeTab === 'support') itemsList = d.supportTickets || [];

      setData({
        items: itemsList,
        total: d.total || 0,
        pages: d.pages || 1
      });
    } catch (err) {
      console.error("Error fetching admin items:", err);
      setData({ items: [], total: 0, pages: 1 });
    } finally {
      setLoading(false);
    }
  }, [page, activeTab, admin?.token, headers]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const totalCount = data.total || 0;

  const filteredItems = (data.items || []).filter(c => {
    const searchLower = (search || '').toLowerCase();
    if (activeTab === 'general') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.subject || '').toLowerCase().includes(searchLower)
      );
    } else if (activeTab === 'demo') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.companyName || '').toLowerCase().includes(searchLower) ||
        (c.productInterested || '').toLowerCase().includes(searchLower)
      );
    } else if (activeTab === 'quote') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.company || '').toLowerCase().includes(searchLower) ||
        (c.serviceRequired || '').toLowerCase().includes(searchLower)
      );
    } else if (activeTab === 'support') {
      return (
        (c.name || '').toLowerCase().includes(searchLower) || 
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.ticketSubject || '').toLowerCase().includes(searchLower) ||
        (c.category || '').toLowerCase().includes(searchLower)
      );
    }
    return false;
  });

  const deleteItem = async (id) => {
    if (typeof id === 'string' && id.startsWith('mock-')) return toast.success("Cannot delete demo data.");
    let itemTypeName = 'contact submission';
    let endpoint = 'contacts';
    if (activeTab === 'demo') {
      itemTypeName = 'demo request';
      endpoint = 'demo-requests';
    } else if (activeTab === 'quote') {
      itemTypeName = 'quote request';
      endpoint = 'quote-requests';
    } else if (activeTab === 'support') {
      itemTypeName = 'support ticket';
      endpoint = 'support-tickets';
    }

    if (!confirm(`Delete this ${itemTypeName}?`)) return;
    const res = await fetch(`${API}/api/admin/${endpoint}/${id}`, { method: 'DELETE', headers });
    if (res.ok) { 
      setMsg(`${itemTypeName.charAt(0).toUpperCase() + itemTypeName.slice(1)} deleted successfully.`); 
      setTimeout(() => setMsg(''), 3000); 
      fetchItems(); 
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Leads & Contacts</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">{totalCount.toLocaleString()} total submissions received</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => { setActiveTab('general'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'general' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          General Contacts
        </button>
        <button
          onClick={() => { setActiveTab('demo'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'demo' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Demo Requests
        </button>
        <button
          onClick={() => { setActiveTab('quote'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'quote' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Quote Requests
        </button>
        <button
          onClick={() => { setActiveTab('support'); setPage(1); setExpanded(null); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'support' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Support Tickets
        </button>
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
        ) : filteredItems.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
            No submissions found.
          </div>
        ) : filteredItems.map(c => (
          <div key={c._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === c._id ? null : c._id)}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
                  <span className="text-gray-800 font-bold text-sm sm:text-base">{c.name}</span>
                  <span className="text-gray-400 text-sm hidden sm:inline-block">•</span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm truncate"><Mail size={14}/> {c.email}</span>
                  <span className="sm:ml-auto text-[10px] sm:text-xs font-semibold bg-blue-50 text-[#1e5cdc] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-blue-100 self-start sm:self-auto mt-1 sm:mt-0">
                    {activeTab === 'general' && c.subject}
                    {activeTab === 'demo' && (c.productInterested || '').replace('-', ' ')}
                    {activeTab === 'quote' && c.serviceRequired}
                    {activeTab === 'support' && `${c.category} - ${c.priority}`}
                  </span>
                </div>
                <p className="flex items-center gap-1.5 text-gray-400 text-xs mt-2 font-medium">
                  <Calendar size={12} />
                  {new Date(c.createdAt).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' })}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-2 sm:ml-4">
                <button onClick={e => { e.stopPropagation(); deleteItem(c._id); }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Submission">
                  <Trash2 size={18} />
                </button>
                <div className="text-gray-400 p-1">
                  {expanded === c._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </div>
            {expanded === c._id && activeTab === 'general' && (
              <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Lead Details</h4>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {c.companyName && (
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Company Name</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.companyName}</span>
                      </div>
                    )}
                    {c.phone && (
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.phone}</span>
                      </div>
                    )}
                    {c.country && (
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Country</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.country}</span>
                      </div>
                    )}
                    {c.preferredContactMethod && (
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Preferred Contact Method</span>
                        <span className="text-gray-700 text-sm font-semibold">{c.preferredContactMethod}</span>
                      </div>
                    )}
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.subject}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Message Content</span>
                    <div className="bg-slate-50 p-3 rounded border border-gray-100 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {c.message}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {expanded === c._id && activeTab === 'demo' && (
              <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Demo Lead Details</h4>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Company Name</span>
                    <span className="text-gray-700 text-sm font-semibold">{c.companyName}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                    <span className="text-gray-700 text-sm font-semibold">{c.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Product/Service Interested</span>
                    <span className="text-gray-700 text-sm font-semibold capitalize">{(c.productInterested || '').replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Preferred Demo Date</span>
                    <span className="text-gray-700 text-sm font-semibold">
                      {c.preferredDate ? new Date(c.preferredDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {expanded === c._id && activeTab === 'quote' && (
              <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quote Request Details</h4>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Company</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.company}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.phone}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Service Required</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.serviceRequired}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Budget Estimate</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.budgetEstimate}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Expected Timeline</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.timeline || 'N/A'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Project Scope</span>
                    <div className="bg-slate-50 p-3 rounded border border-gray-100 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {c.projectScope}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {expanded === c._id && activeTab === 'support' && (
              <div className="border-t border-gray-100 px-3 sm:px-6 py-3 sm:py-5 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Support Ticket Details</h4>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Ticket Subject</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.ticketSubject || c.subject}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.phoneNumber || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Issue Category</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.category}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Priority Level</span>
                      <span className="text-gray-700 text-sm font-semibold">{c.priority}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Status</span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-md mt-1 ${
                        c.status === 'Open' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                        c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        'bg-slate-50 text-slate-600 border border-slate-100'
                      }`}>{c.status || 'Open'}</span>
                    </div>
                  </div>
                  {c.attachment && (
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Attachment</span>
                      {c.attachment.startsWith('data:') ? (
                        <div className="mt-1">
                          <a href={c.attachment} download={`attachment_${c._id}.png`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e5cdc] hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                            View / Download Attached File
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-700 text-sm">{c.attachment}</span>
                      )}
                    </div>
                  )}
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Description</span>
                    <div className="bg-slate-50 p-3 rounded border border-gray-100 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {c.description}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.pages > 1 && (
        <div className="flex justify-between items-center mt-6 p-2">
          <button disabled={page <= 1} onClick={() => setPage(p => p-1)}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm">
            Previous
          </button>
          <span className="text-gray-500 text-sm font-semibold">Page {page} of {data.pages}</span>
          <button disabled={page >= data.pages} onClick={() => setPage(p => p+1)}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm">
            Next Page
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
