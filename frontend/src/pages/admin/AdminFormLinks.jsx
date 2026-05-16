import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { 
  Link as LinkIcon, Copy, Check, ExternalLink, 
  FileText, ClipboardCheck, Users, BarChart3, 
  Plus, Eye, Filter
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

const COLORS = ['#1e5cdc', '#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#f59e0b', '#10b981', '#6b7280', '#475569'];

export default function AdminFormLinks() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetch(`${API}/api/admin/form-stats`, { 
      headers: { Authorization: `Bearer ${admin?.token}` } 
    })
      .then(r => r.json())
      .then(data => {
        // Merge detail info with count stats
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
        setStats({ ...data, merged });
      })
      .catch(err => console.error('Error fetching form stats:', err))
      .finally(() => setLoading(false));
  }, [admin]);

  const handleCopy = (id, path) => {
    const fullUrl = `${window.location.origin}/#${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const SummaryCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 transition-all hover:shadow-md">
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 mt-0.5">{value}</h3>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-8 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="p-2 bg-blue-100 text-[#1e5cdc] rounded-lg">
                <LinkIcon size={20} />
            </span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Form Builder & Links</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium">Create Google Form-like applications. Share links to collect candidate data seamlessly.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1e5cdc] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          <Plus size={20} /> Create New Form
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard title="Total Forms" value={stats?.totalForms || 0} icon={<FileText size={24} />} color="bg-blue-500" />
            <SummaryCard title="Active Forms" value={stats?.totalForms || 0} icon={<ClipboardCheck size={24} />} color="bg-emerald-500" />
            <SummaryCard title="Total Responses" value={stats?.totalResponses || 0} icon={<Users size={24} />} color="bg-purple-500" />
            <SummaryCard title="Avg. Responses" value={stats?.totalForms ? Math.round(stats.totalResponses / stats.totalForms) : 0} icon={<BarChart3 size={24} />} color="bg-amber-500" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-black text-gray-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <BarChart3 size={16} className="text-blue-500" /> Response Distribution
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats?.merged?.filter(f => f.count > 0) || []} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="id" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                                {stats?.merged?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <h3 className="font-black text-gray-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Filter size={16} className="text-purple-500" /> Category Share
                </h3>
                <div className="flex-1 h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats?.merged || []}
                                dataKey="count"
                                nameKey="id"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                            >
                                {stats?.merged?.map((entry, index) => (
                                    <Cell key={`cellpie-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {['General', 'HR', 'Business', 'Sales', 'Support', 'Marketing'].map((cat, i) => (
                        <div key={cat} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">{cat}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
          
          {/* Form Links Section */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <LinkIcon size={18} className="text-[#1e5cdc]" />
                Available Form Links
              </h2>
            </div>
            
            <div className="divide-y divide-gray-50">
              {stats?.merged?.map((form) => (
                <div key={form.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-gray-900 truncate">{form.name}</h3>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#1e5cdc] bg-blue-50 px-2 py-0.5 rounded-full">
                        {form.category}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <p className="flex items-center gap-1">
                        <span className="font-semibold text-gray-700">Responses:</span> 
                        <span className="bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-700">{form.count || 0}</span>
                      </p>
                      <p className="hidden sm:block text-gray-300">•</p>
                      <p className="text-gray-400 truncate max-w-xs md:max-w-md xl:max-w-xl">/{form.path}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 shrink-0">
                    <button 
                      onClick={() => handleCopy(form.id, form.path)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        copiedId === form.id 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:text-[#1e5cdc] hover:border-[#1e5cdc]'
                      }`}
                    >
                      {copiedId === form.id ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
                    </button>
                    <a 
                      href={`/#${form.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-gray-50 text-gray-500 hover:text-[#1e5cdc] rounded-lg transition-colors border border-transparent hover:border-blue-100"
                      title="Preview Form"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </AdminLayout>
  );
}
