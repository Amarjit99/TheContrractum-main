import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { ShieldAlert, Search, RefreshCw, Activity, User, Monitor } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminAuditLogs() {
  const { admin } = useAdminAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/audit-logs`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } else {
        toast.error('Failed to fetch audit logs');
        setLogs([]);
      }
    } catch (err) {
      toast.error('Error fetching audit logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [admin]);

  const filteredLogs = logs.filter(log => 
    (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.entity || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.details || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shrink-0">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <ShieldAlert className="text-[#1e5cdc]" size={28} />
              System Audit Logs
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Monitor administrative actions, security events, and system changes.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <button
              onClick={fetchLogs}
              className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-[#1e5cdc] transition-all shadow-sm group"
              title="Refresh Logs"
            >
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
          <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Total Logs Tracked</p>
              <p className="text-2xl font-black text-gray-900">{logs.length}</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Active Admins</p>
              <p className="text-2xl font-black text-gray-900">{[...new Set(logs.map(l => l.performedBy?.name || l.adminName))].filter(Boolean).length}</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Monitor size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Monitored Entities</p>
              <p className="text-2xl font-black text-gray-900">{[...new Set(logs.map(l => l.entity))].length}</p>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date & Time</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Admin User</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Action / Entity</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Details</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400 font-medium">
                      <div className="flex flex-col items-center justify-center">
                        <RefreshCw className="animate-spin text-[#1e5cdc] mb-2" size={24} />
                        Loading secure audit trail...
                      </div>
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400 font-medium">
                      No logs match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-6 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-800">{new Date(log.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {(log.performedBy?.name || log.adminName || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-700">{log.performedBy?.name || log.adminName || 'System User'}</p>
                            <p className="text-[10px] text-gray-400">{log.performedBy?.email || 'Unknown Email'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                          log.action === 'Create' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          log.action === 'Update' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          log.action === 'Delete' ? 'bg-red-50 text-red-600 border-red-100' :
                          log.action === 'Login' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {log.action}
                        </span>
                        <span className="ml-2 text-xs font-semibold text-gray-600">{log.entity}</span>
                      </td>
                      <td className="py-3 px-6">
                        <p className="text-sm text-gray-600 max-w-xs truncate" title={log.details}>
                          {log.details || 'No additional details provided'}
                        </p>
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        <span className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          {log.ipAddress || '127.0.0.1'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
