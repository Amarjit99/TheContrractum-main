import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Trash2, Mail, ExternalLink, Globe, Layout } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminAffiliates() {
    const { admin } = useAdminAuth();
    const token = admin?.token;
    
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        if (token) fetchApplications();
    }, [token]);

    const fetchApplications = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/affiliate-applications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch applications');
            }
            setApplications(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching affiliate applications:', err);
            showToast(err.message || 'Failed to load applications', 'error');
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                const res = await fetch(`${API}/api/affiliate-applications/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    showToast('Application deleted successfully');
                    setApplications(applications.filter(app => app._id !== id));
                } else {
                    showToast('Failed to delete application', 'error');
                }
            } catch (err) {
                console.error('Error deleting application:', err);
                showToast('Server error during deletion', 'error');
            }
        }
    };

    const filteredApplications = applications.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
                    toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    <span>{toast.type === 'success' ? '✓' : '✗'}</span>
                    {toast.message}
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3">
                        <span className="p-1.5 sm:p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <Layout size={20} className="sm:w-6 sm:h-6" />
                        </span>
                        Affiliate Program Applications
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">Review and manage marketers applying for your affiliate program.</p>
                </div>
                
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-64 shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-500">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#f8fafc] border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 sm:py-4">Applicant Info</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">Website / Platform</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Promo Methods</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Submitted At</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center">
                                        <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-400 mt-2 font-medium">Fetching applications...</p>
                                    </td>
                                </tr>
                            ) : filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                                        No affiliate applications found.
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-purple-50/30 transition-colors group">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                                            <div className="flex flex-col">
                                                <span className="font-black text-gray-900 text-sm sm:text-base">{app.name}</span>
                                                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 mt-0.5">
                                                    <Mail size={12} className="text-purple-400 shrink-0" />
                                                    <span className="text-[10px] sm:text-xs font-semibold truncate max-w-[120px] sm:max-w-none">{app.email}</span>
                                                </div>
                                                <span className="text-[10px] sm:text-xs text-slate-400 font-bold mt-1">{app.contact}</span>
                                                <a 
                                                    href={app.website.startsWith('http') ? app.website : `https://${app.website}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-blue-500 font-bold hover:underline flex items-center gap-1 sm:hidden mt-2 text-[10px]"
                                                >
                                                    <Globe size={10} className="text-blue-400" />
                                                    <span className="truncate max-w-[100px]">{app.website}</span>
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                            <div className="flex items-center gap-2">
                                                <Globe size={14} className="text-blue-400" />
                                                <a 
                                                    href={app.website.startsWith('http') ? app.website : `https://${app.website}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-blue-500 font-bold hover:underline flex items-center gap-1"
                                                >
                                                    {app.website}
                                                    <ExternalLink size={10} />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 max-w-xs hidden md:table-cell">
                                            <p className="text-[10px] sm:text-xs text-gray-600 font-medium line-clamp-2 italic">
                                                "{app.promotionalMethods}"
                                            </p>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                            <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-tighter">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                                            <div className="flex justify-end gap-1.5 sm:gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a 
                                                    href={`mailto:${app.email}`}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    title="Email Applicant"
                                                >
                                                    <Mail size={16} />
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(app._id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Delete Application"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
