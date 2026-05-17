import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import logo from '../../assets/main-logo.jpg';
import {
  LayoutDashboard, FileText, FileEdit, Briefcase, Handshake,
  UsersRound, Users, BarChart3, Settings,
  Search, Bell, ChevronDown, ChevronRight, Menu, X, Link as LinkIcon, ClipboardCheck, Newspaper, IdCard, Gift, FolderKanban, Award, Calendar, ShieldAlert, User, LogOut, Activity
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { id: 'services', to: '/admin/services', icon: <FileText size={20} />, label: 'Services' },
  { id: 'blogs', to: '/admin/blogs', icon: <FileEdit size={20} />, label: 'Blog Posts' },
  { id: 'news', to: '/admin/news', icon: <Newspaper size={20} />, label: 'News' },
  { id: 'projects', to: '/admin/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
  { id: 'careers', to: '/admin/careers', icon: <Briefcase size={20} />, label: 'Careers' },
  { id: 'founders', to: '/admin/founders', icon: <Users size={20} />, label: 'Founders & Directors' },
  { id: 'partners', to: '/admin/partners', icon: <Handshake size={20} />, label: 'Partners' },
  { id: 'affiliates', to: '/admin/affiliates', icon: <LayoutDashboard size={20} />, label: 'Affiliate Program' },
  { id: 'interns', to: '/admin/student-interns', icon: <UsersRound size={20} />, label: 'Student Interns' },
  { id: 'leads', to: '/admin/contacts', icon: <UsersRound size={20} />, label: 'Leads' },
  { id: 'users', to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
  { id: 'analytics', to: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  { id: 'form-links', to: '/admin/form-links', icon: <LinkIcon size={20} />, label: 'Form Links' },
  { id: 'submissions', to: '/admin/submissions', icon: <ClipboardCheck size={20} />, label: 'Submissions' },
  { id: 'surveys', to: '/admin/surveys', icon: <ClipboardCheck size={20} />, label: 'Surveys' },
  { id: 'contracts', to: '/admin/contracts', icon: <FileText size={20} />, label: 'Contract Management' },
  { id: 'certificates', to: '/admin/certificates', icon: <Award size={20} />, label: 'Certificates' },
  { id: 'events', to: '/admin/events', icon: <Calendar size={20} />, label: 'Events Management' },
  { id: 'event-registrations', to: '/admin/event-registrations', icon: <Users size={20} />, label: 'Event Registrations' },
  { id: 'id-cards', to: '/admin/id-cards', icon: <IdCard size={20} />, label: 'ID Cards' },
  { id: 'referrals', to: '/admin/referrals', icon: <Gift size={20} />, label: 'Referrals' },
  { id: 'tasks', to: '/admin/tasks', icon: <FolderKanban size={20} />, label: 'Tasks' },
  { id: 'settings', to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/notifications?limit=5`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    if (!admin) return;
    fetchUnreadCount();
    // Poll every 60 seconds
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, [admin]);

  useEffect(() => {
    if (!admin) navigate('/admin/login', { replace: true });
  }, [admin, navigate]);

  if (!admin) return null;

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const toggleSubmenu = (e, id) => {
    e.preventDefault();
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGlobalSearch = (e) => {
    if (e.key === 'Enter' && globalSearch.trim()) {
      const query = globalSearch.trim().toLowerCase();
      // Intelligent redirection based on keywords
      if (query.includes('blog') || query.includes('post') || query.includes('article')) navigate(`/admin/blogs`);
      else if (query.includes('job') || query.includes('career') || query.includes('hire')) navigate(`/admin/careers`);
      else if (query.includes('partner')) navigate(`/admin/partners`);
      else if (query.includes('lead') || query.includes('contact')) navigate(`/admin/contacts`);
      else if (query.includes('user')) navigate(`/admin/users`);
      else if (query.includes('analyt') || query.includes('stat') || query.includes('chart')) navigate(`/admin/analytics`);
      else if (query.includes('set') || query.includes('config')) navigate(`/admin/settings`);
      else if (query.includes('serv')) navigate(`/admin/services`);
      else {
        // Default to dashboard or just keep the value
        navigate(`/admin/dashboard`);
      }
      setGlobalSearch('');
    }
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-[#1e5cdc] text-white">
      {/* Brand area */}
      <div className="px-6 py-5 flex items-center gap-3 bg-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1e5cdc]/5 rounded-full blur-2xl"></div>
        <img src={logo} alt="The Contractum Logo" className="h-10 w-auto object-contain z-10" />
        <div className="z-10">
          <p className="text-[#1e5cdc] text-xs font-bold">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map(item => {
          const isActive = location.pathname === item.to || (item.id === 'dashboard' && location.pathname === '/admin');
          const isOpen = openMenus[item.id];

          return (
            <div key={item.id}>
              <Link
                to={item.to}
                onClick={(e) => {
                  if (item.hasSubmenu) toggleSubmenu(e, item.id);
                  else setSidebarOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white text-[#1e5cdc]' : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? 'text-[#1e5cdc]' : 'text-blue-200'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                {item.hasSubmenu && (
                  <span className="opacity-70">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </Link>

              {/* Fake Submenu contents for visual purpose */}
              {item.hasSubmenu && isOpen && (
                <div className="pl-12 pr-4 py-2 space-y-3 mt-1 text-sm text-blue-200">
                  <div className="hover:text-white cursor-pointer transition-colors">Overview</div>
                  <div className="hover:text-white cursor-pointer transition-colors">Manage</div>
                  <div className="hover:text-white cursor-pointer transition-colors">Add New</div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-blue-500/30">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-700/50 hover:bg-blue-800 text-blue-100 transition-colors text-sm font-medium shadow-sm border border-blue-500/20">
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-full shadow-xl z-20">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 z-50 lg:hidden shadow-2xl transition-transform transform translate-x-0">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Row */}
        <div className="h-16 bg-[#f0f4f8] shrink-0 flex items-center justify-between px-4 lg:px-8 z-10">

          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-gray-800 bg-white rounded-lg shadow-sm">
              <Menu size={20} />
            </button>

            {/* Search Bar - hidden on very small screens, shown as icon, but let's do standard */}
            <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 min-w-[350px] focus-within:ring-2 focus-within:ring-[#1e5cdc]/20 transition-all">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                onKeyDown={handleGlobalSearch}
                type="text"
                placeholder="Search menu or data (press Enter)..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-gray-400 hover:text-gray-600">
              <Search size={20} className="md:hidden" />
            </button>


            <div className="relative">
              <button
                onClick={async () => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) fetchNotifications();

                  if (unreadCount > 0) {
                    setUnreadCount(0);
                    try {
                      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/notifications/mark-read`, {
                        method: 'PUT',
                        headers: { Authorization: `Bearer ${admin.token}` }
                      });
                    } catch (err) { console.error(err); }
                  }
                }}
                className={`text-gray-500 hover:text-[#1e5cdc] transition-colors relative p-2 rounded-full ${showNotifications ? 'bg-gray-100 text-[#1e5cdc]' : ''}`}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-[#f0f4f8]">
                    {unreadCount > 10 ? '10+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                    <span className="text-[10px] font-black text-[#1e5cdc] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">Recent Activity</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          onClick={() => {
                            setShowNotifications(false);
                            if (notif.link) navigate(notif.link);
                          }}
                          className="px-5 py-4 hover:bg-blue-50/50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors group"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">{notif.type}</span>
                            <span className="text-[9px] font-bold text-gray-400">{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-[#1e5cdc] transition-colors">{notif.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center">
                        <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                          <Bell size={20} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">No recent notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                      onClick={() => { setShowNotifications(false); navigate('/admin/notifications'); }}
                      className="text-xs font-bold text-gray-500 hover:text-[#1e5cdc] transition-colors"
                    >
                      View All Activity
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div 
                className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false); // Close notifications if open
                }}
              >
                <img src={`https://ui-avatars.com/api/?name=${admin?.name || 'Admin'}&background=1e5cdc&color=fff`} alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
                <div className="hidden sm:flex items-center gap-1 font-medium text-gray-700 text-sm">
                  {admin?.name || 'Admin'} <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/80">
                    <img src={`https://ui-avatars.com/api/?name=${admin?.name || 'Admin'}&background=1e5cdc&color=fff`} alt="Admin" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 text-sm truncate">{admin?.name || 'Admin'}</span>
                      <span className="text-xs text-gray-500 truncate">{admin?.email || 'admin@thecontractum.com'}</span>
                    </div>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/admin/profile');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-[#1e5cdc] hover:bg-blue-50/50 rounded-xl transition-colors font-semibold group"
                    >
                      <User size={16} className="text-gray-400 group-hover:text-[#1e5cdc] transition-colors" /> My Profile
                    </button>
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/admin/analytics');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-[#1e5cdc] hover:bg-blue-50/50 rounded-xl transition-colors font-semibold group"
                    >
                      <Activity size={16} className="text-gray-400 group-hover:text-[#1e5cdc] transition-colors" /> Activity Log
                    </button>
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-[#1e5cdc] hover:bg-blue-50/50 rounded-xl transition-colors font-semibold group"
                    >
                      <Settings size={16} className="text-gray-400 group-hover:text-[#1e5cdc] transition-colors" /> Global Settings
                    </button>
                  </div>
                  <div className="h-[1px] bg-gray-100 w-full"></div>
                  <div className="p-2 bg-gray-50/30">
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors font-semibold group"
                    >
                      <LogOut size={16} className="text-red-400 group-hover:text-red-600 transition-colors" /> Logout Securely
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
