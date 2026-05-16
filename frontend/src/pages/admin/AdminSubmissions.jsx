import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  FileText, Users, Eye, ExternalLink, Copy, Check, Search, ClipboardList, Filter
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FORM_DETAILS = [
  { id: 'contact', name: 'Contact Us Form', path: '/contact/touch', adminPath: '/admin/contacts', category: 'General' },
  { id: 'jobs', name: 'Job Application', path: '/careers/jobs', adminPath: '/admin/careers', category: 'HR' },
  { id: 'partners', name: 'Partner Application', path: '/join/become-partner', adminPath: '/admin/partners', category: 'Business' },
  { id: 'advisors', name: 'Advisor Application', path: '/team/become-advisor', adminPath: '/admin/dashboard', category: 'HR' },
  { id: 'demo', name: 'Request Demo', path: '/contact/request-demo', adminPath: '/admin/contacts', category: 'Sales' },
  { id: 'expert', name: 'Expert Consultation', path: '/team/connect-experts', adminPath: '/admin/contacts', category: 'Sales' },
  { id: 'quote', name: 'Request A Quote', path: '/contact/quote', adminPath: '/admin/contacts', category: 'Sales' },
  { id: 'support', name: 'Support Ticket', path: '/contact/support', adminPath: '/admin/contacts', category: 'Support' },
  { id: 'newsletter', name: 'Newsletter Subscription', path: '/', adminPath: '/admin/dashboard', category: 'Marketing' },
  { id: 'interns', name: 'Internship Application', path: '/careers/internships', adminPath: '/admin/student-interns', category: 'HR' },
  { id: 'affiliate', name: 'Affiliate Marketing', path: '/join/affiliate', adminPath: '/admin/affiliates', category: 'Business' },
  { id: 'survey', name: 'Awareness Survey', path: '/events', adminPath: '/admin/dashboard', category: 'Marketing' },
  { id: 'referral', name: 'Employee Referral', path: '/join/referral', adminPath: '/admin/referrals', category: 'HR' },
  { id: 'staff-requests', name: 'Staff Registration', path: '/admin/login', adminPath: '/admin/staff-management', category: 'Admin' },
  { id: 'rsvps', name: 'Event RSVPs', path: '/events', adminPath: '/admin/mini-events', category: 'Community' },
  { id: 'feedback', name: 'User Feedback', path: '/contact/feedback', adminPath: '/admin/dashboard', category: 'Support' },
  { id: 'volunteer', name: 'Volunteer Application', path: '/join/volunteer', adminPath: '/admin/dashboard', category: 'Community' },
];

export default function AdminSubmissions() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!admin?.token) return;

    fetch(`${API}/api/admin/form-stats`, { 
      headers: { Authorization: `Bearer ${admin.token}` } 
    })
      .then(async r => {
        if (!r.ok) {
          const err = await r.json();
          throw new Error(err.message || 'Failed to fetch');
        }
        return r.json();
      })
      .then(data => {
        if (!data.stats) return;
        const merged = FORM_DETAILS.map(detail => {
          const stat = data.stats.find(s => s.name.toLowerCase().includes(detail.id) || 
                                           (detail.id === 'contact' && s.name === 'Contact Us') ||
                                           (detail.id === 'jobs' && s.name === 'Job Apps') ||
                                           (detail.id === 'partners' && s.name === 'Partner Apps') ||
                                           (detail.id === 'advisors' && s.name === 'Advisor Apps') ||
                                           (detail.id === 'demo' && s.name === 'Demo Requests') ||
                                           (detail.id === 'expert' && s.name === 'Expert Consults') ||
                                           (detail.id === 'quote' && s.name === 'Quote Apps') ||
                                           (detail.id === 'support' && s.name === 'Support Tickets') ||
                                           (detail.id === 'newsletter' && s.name === 'Newsletters') ||
                                           (detail.id === 'interns' && s.name === 'Intern Apps') ||
                                           (detail.id === 'staff-requests' && s.name === 'Staff Requests') ||
                                           (detail.id === 'rsvps' && s.name === 'Event RSVPs') ||
                                           (detail.id === 'feedback' && s.name === 'User Feedback') ||
                                           (detail.id === 'volunteer' && s.name === 'Volunteer Apps')
                                          );
          return { ...detail, count: stat ? stat.count : 0 };
        });
        setStats(merged);
      })
      .catch(err => {
        console.error('Error fetching form stats:', err);
        setStats(FORM_DETAILS.map(d => ({ ...d, count: 0 })));
      })
      .finally(() => setLoading(false));
  }, [admin, API]);

  const handleCopy = (id, path) => {
    const fullUrl = `${window.location.origin}/#${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredStats = stats.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-8 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-1">
            <span className="p-2 bg-purple-100 text-purple-600 rounded-lg hidden sm:block">
                <ClipboardList size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">Form Submissions</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium">Overview of all active forms and their response counts across the platform.</p>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Filter forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-64 shadow-sm transition-all"
            />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black text-gray-800 dark:text-gray-200 uppercase tracking-tight">Available Forms List</h2>
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">{filteredStats.length} FormsFound</span>
                <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 hover:text-purple-600 transition-colors shadow-sm">
                    <Filter size={16} />
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-12">
            {filteredStats.map(form => (
                <div key={form.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4 hover:border-purple-200 transition-all group hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">{form.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[8px] sm:text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100">Active</span>
                                    <span className="text-[8px] sm:text-[9px] font-black text-purple-500 uppercase tracking-widest bg-purple-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-purple-100">{form.category}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                            <div>
                                <span className="text-sm font-black text-gray-800 dark:text-gray-200 block leading-none">{form.count}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Responses</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-2 text-gray-300 border border-gray-100 dark:border-gray-700">
                                <Users size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <code className="text-[9px] sm:text-[10px] text-gray-500 truncate max-w-[200px] sm:max-w-[250px]">
                            {`${window.location.origin}/#${form.path}`}
                        </code>
                        <button 
                          onClick={() => handleCopy(form.id, form.path)}
                          className={`p-2 rounded-lg transition ${copiedId === form.id ? 'bg-emerald-500 text-white' : 'hover:bg-gray-200 text-gray-400'}`}
                        >
                            {copiedId === form.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <a href={`/#${form.path}`} target="_blank" rel="noreferrer" className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 text-gray-700 dark:text-gray-300 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition border border-gray-100 dark:border-gray-700 text-center leading-tight">
                            <ExternalLink size={14} className="hidden sm:block" /> Preview
                        </a>
                        <button 
                            onClick={() => window.location.href = `/#${form.adminPath}`}
                            className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition shadow-lg shadow-blue-100 text-center leading-tight"
                        >
                            <Eye size={14} className="hidden sm:block" /> View Data
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
