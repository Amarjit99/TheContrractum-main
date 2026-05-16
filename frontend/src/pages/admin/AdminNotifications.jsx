import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { Bell, Trash2, CheckCircle, Clock } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminNotifications() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const headers = { Authorization: `Bearer ${admin?.token}` };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Fetch up to 100 notifications for the full page
      const res = await fetch(`${API}/api/admin/notifications?limit=100`, { headers });
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch notifications failed", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(`${API}/api/admin/notifications/mark-read`, {
        method: 'PUT',
        headers
      });
      if (res.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        setMsg("All notifications marked as read.");
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this notification?")) return;
    try {
      const res = await fetch(`${API}/api/admin/notifications/${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        setNotifications(notifications.filter(n => n._id !== id));
        setMsg("Notification deleted.");
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = (notif) => {
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AdminLayout>
      <div className="mb-6 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Bell size={24} className="text-[#1e5cdc] sm:w-7 sm:h-7" />
            Notifications Center
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">View and manage system alerts, new leads, and submissions.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#1e5cdc] hover:border-[#1e5cdc] px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-sm shrink-0 text-sm"
            >
              <CheckCircle size={18} /> Mark All as Read
            </button>
          )}
        </div>
      </div>

      {msg && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-bold animate-fade-in">
          {msg}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 text-gray-400 flex flex-col items-center">
            <Bell size={48} className="text-gray-200 mb-3" />
            <p className="font-bold">No notifications found.</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map(notif => (
              <div
                key={notif._id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center cursor-pointer transition-colors hover:bg-gray-50 dark:bg-gray-700 ${
                  !notif.isRead ? 'bg-blue-50/30 border-l-4 border-l-[#1e5cdc]' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#1e5cdc] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">
                      {notif.type}
                    </span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                  <h3 className={`text-sm sm:text-base mb-1 truncate ${!notif.isRead ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-semibold text-gray-800 dark:text-gray-200'}`}>
                    {notif.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                    {notif.message}
                  </p>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-2 sm:mt-0 shrink-0">
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                    <Clock size={12} /> {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={(e) => handleDelete(notif._id, e)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                    title="Delete Notification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
