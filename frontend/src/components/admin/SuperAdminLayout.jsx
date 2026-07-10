import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import logo from '../../assets/main-logo.jpg';
import {
  LayoutDashboard, FileText, FileEdit, Briefcase, Handshake,
  UsersRound, Users, BarChart3, Settings,
  Search, Bell, ChevronLeft, ChevronRight, ChevronDown, Menu, X, Link as LinkIcon, ClipboardCheck, Newspaper, IdCard, Gift, FolderKanban, Award, Calendar,
  User, Activity, LogOut, HeartHandshake
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', to: '/admin/super-dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  {
    id: 'wms',
    label: 'Website Management (WMS)',
    icon: <Newspaper size={20} />,
    hasSubmenu: true,
    subItems: [
      { id: 'services', to: '/admin/services', icon: <FileText size={18} />, label: 'Services' },
      { id: 'blogs', to: '/admin/blogs', icon: <FileEdit size={18} />, label: 'Blog Posts' },
      { id: 'news', to: '/admin/news', icon: <Newspaper size={18} />, label: 'News' },
      { id: 'resources', to: '/admin/resources', icon: <FileText size={18} />, label: 'Resources Management' },
      { id: 'projects', to: '/admin/projects', icon: <FolderKanban size={18} />, label: 'Projects' },
      { id: 'careers', to: '/admin/careers', icon: <Briefcase size={18} />, label: 'Careers' },
      { id: 'events', to: '/admin/events', icon: <Calendar size={18} />, label: 'Events Management' },
      { id: 'event-registrations', to: '/admin/event-registrations', icon: <Users size={18} />, label: 'Event Registrations' },
      { id: 'founders', to: '/admin/founders', icon: <Users size={18} />, label: 'Founders & Directors' },
      { id: 'interns', to: '/admin/student-interns', icon: <UsersRound size={18} />, label: 'Student Interns' },
      { id: 'volunteers', to: '/admin/volunteers', icon: <HeartHandshake size={18} />, label: 'Volunteer Stories' },
      { id: 'form-links', to: '/admin/form-links', icon: <LinkIcon size={18} />, label: 'Form Links' },
      { id: 'submissions', to: '/admin/submissions', icon: <ClipboardCheck size={18} />, label: 'Submissions' },
      { id: 'surveys', to: '/admin/surveys', icon: <ClipboardCheck size={18} />, label: 'Surveys' },
      { id: 'leads', to: '/admin/contacts', icon: <UsersRound size={18} />, label: 'Leads' },
      { id: 'partners', to: '/admin/partners', icon: <Handshake size={18} />, label: 'Partners' },
      { id: 'settings', to: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' }
    ]
  },
  {
    id: 'cms',
    label: 'Company Management (CMS)',
    icon: <UsersRound size={20} />,
    hasSubmenu: true,
    subItems: [
      { id: 'users', to: '/admin/users', icon: <Users size={18} />, label: 'User & Access Management' },
      { id: 'affiliates', to: '/admin/affiliates', icon: <LayoutDashboard size={18} />, label: 'Affiliate Program' },
      { id: 'contracts', to: '/admin/contracts', icon: <FileText size={18} />, label: 'Contract Management' },
      { id: 'certificates', to: '/admin/certificates', icon: <Award size={18} />, label: 'Certificates' },
      { id: 'id-cards', to: '/admin/id-cards', icon: <IdCard size={18} />, label: 'ID Cards' },
      { id: 'referrals', to: '/admin/referrals', icon: <Gift size={18} />, label: 'Referrals' }
    ]
  },
  { id: 'tasks', to: '/admin/tasks', icon: <FolderKanban size={20} />, label: 'Tasks' },
  { id: 'analytics', to: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' }
];

const Sidebar = ({ location, openMenus, toggleSubmenu, setSidebarOpen, handleLogout, sidebarCollapsed, setSidebarCollapsed }) => (
  <div className="flex flex-col h-full bg-[#1e5cdc] text-white">
    <div className="px-6 py-5 flex items-center justify-between bg-white relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1e5cdc]/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'lg:hidden' : 'flex'}`}>
        <img src={logo} alt="The Contractum Logo" className="h-10 w-auto object-contain z-10" />
        <div className="z-10">
          <p className="text-[#1e5cdc] text-xs font-bold uppercase tracking-tight">Super Admin</p>
        </div>
      </div>
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 cursor-pointer hidden lg:block relative z-10"
      >
        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>

    <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
      {MENU_ITEMS.map(item => {
        const isActive = !item.hasSubmenu && location.pathname === item.to;
        const isOpen = openMenus[item.id];

        if (item.hasSubmenu) {
          const isChildActive = item.subItems?.some(sub => location.pathname === sub.to);
          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={(e) => {
                  if (sidebarCollapsed) {
                    setSidebarCollapsed(false);
                    if (!openMenus[item.id]) {
                      toggleSubmenu(e, item.id);
                    }
                  } else {
                    toggleSubmenu(e, item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isChildActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                title={item.label}
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-200">
                    {item.icon}
                  </span>
                  <span className={`${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                    {item.label}
                  </span>
                </div>
                <span className={`opacity-70 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {isOpen && !sidebarCollapsed && item.subItems && (
                <div className="pl-6 pr-2 py-1 space-y-1 transition-all duration-200">
                  {item.subItems.map(subItem => {
                    const isSubActive = location.pathname === subItem.to;
                    return (
                      <Link
                        key={subItem.id}
                        to={subItem.to}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 pl-8 pr-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isSubActive
                            ? 'bg-white text-[#1e5cdc] shadow-md transform scale-[1.01]'
                            : 'text-blue-100 hover:bg-white/5 hover:text-white'
                          }`}
                        title={subItem.label}
                      >
                        <span className={`${isSubActive ? 'text-[#1e5cdc]' : 'text-blue-200'}`}>
                          {subItem.icon}
                        </span>
                        <span className={`${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                          {subItem.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={item.id}>
            <Link
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-white text-[#1e5cdc] shadow-md transform scale-[1.02]'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              title={item.label}
            >
              <span className={`${isActive ? 'text-[#1e5cdc]' : 'text-blue-200'}`}>
                {item.icon}
              </span>
              <span className={`${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                {item.label}
              </span>
            </Link>
          </div>
        );
      })}
    </nav>

    <div className="p-4 border-t border-blue-500/30">
      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-700/50 hover:bg-blue-800 text-blue-100 transition-colors text-sm font-medium shadow-sm border border-blue-500/20" title="Logout">
        <LogOut size={16} className="shrink-0" />
        <span className={`${sidebarCollapsed ? 'lg:hidden' : ''}`}>Logout</span>
      </button>
    </div>
  </div>
);

const getAvatarInitials = (usr) => {
  if (!usr) return 'SA';
  const nameStr = (usr.name || `${usr.firstName || ''} ${usr.lastName || ''}`.trim() || (usr.role === 'super-admin' ? 'Super Admin' : (usr.role === 'admin' ? 'Admin' : 'User')));
  const parts = nameStr.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

export default function SuperAdminLayout({ children }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {};
    MENU_ITEMS.forEach(item => {
      if (item.hasSubmenu && item.subItems) {
        const isChildActive = item.subItems.some(sub => location.pathname === sub.to);
        if (isChildActive) {
          initial[item.id] = true;
        }
      }
    });
    return initial;
  });

  useEffect(() => {
    MENU_ITEMS.forEach(item => {
      if (item.hasSubmenu && item.subItems) {
        const isChildActive = item.subItems.some(sub => location.pathname === sub.to);
        if (isChildActive) {
          setOpenMenus(prev => ({ ...prev, [item.id]: true }));
        }
      }
    });
  }, [location.pathname]);

  const [globalSearch, setGlobalSearch] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  }, [admin]);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/notifications?limit=5`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  }, [admin]);

  useEffect(() => {
    if (!admin) return;
    Promise.resolve().then(() => {
      fetchUnreadCount();
    });
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, [admin, fetchUnreadCount]);

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
      if (query.includes('blog') || query.includes('post') || query.includes('article')) navigate(`/admin/blogs`);
      else if (query.includes('job') || query.includes('career') || query.includes('hire')) navigate(`/admin/careers`);
      else if (query.includes('partner')) navigate(`/admin/partners`);
      else if (query.includes('lead') || query.includes('contact')) navigate(`/admin/contacts`);
      else if (query.includes('user')) navigate(`/admin/users`);
      else if (query.includes('analyt') || query.includes('stat') || query.includes('chart')) navigate(`/admin/analytics`);
      else if (query.includes('set') || query.includes('config')) navigate(`/admin/settings`);
      else if (query.includes('serv')) navigate(`/admin/services`);
      else navigate(`/admin/super-dashboard`);
      setGlobalSearch('');
    }
  };


  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden font-sans">
      <div className={`hidden lg:block ${sidebarCollapsed ? 'w-20' : 'w-72'} shrink-0 h-full shadow-xl z-20 transition-all duration-300`}>
        <Sidebar location={location} openMenus={openMenus} toggleSubmenu={toggleSubmenu} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      </div>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 z-50 lg:hidden shadow-2xl transition-transform transform translate-x-0">
            <Sidebar location={location} openMenus={openMenus} toggleSubmenu={toggleSubmenu} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} sidebarCollapsed={false} setSidebarCollapsed={() => {}} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="h-16 bg-[#f0f4f8] shrink-0 flex items-center justify-between px-4 lg:px-8 relative z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-gray-800 bg-white rounded-lg shadow-sm">
              <Menu size={20} />
            </button>

            <div className="hidden md:flex items-center border border-gray-100 bg-[#eef2f6]/50 rounded-full px-5 py-2.5 shadow-sm min-w-[400px] focus-within:ring-2 focus-within:ring-[#1e5cdc]/20 focus-within:bg-white focus-within:shadow-md transition-all">
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                onKeyDown={handleGlobalSearch}
                type="text"
                placeholder="Search menu or data (press Enter)..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400 font-semibold"
              />
            </div>
          </div>

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
                      onClick={() => { setShowNotifications(false); navigate('/admin/super-dashboard'); }}
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
                className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false); // Close notifications if open
                }}
              >
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?name=${getAvatarInitials(admin)}&background=1e5cdc&color=fff&bold=true`}
                    alt="Admin"
                    className="w-9 h-9 rounded-full border border-gray-200 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="text-left font-medium">
                    <div className="text-xs font-black text-gray-800 leading-tight">
                      {admin?.name || 'Super Admin'}
                    </div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                      Super Admin
                    </div>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Profile Dropdown Backdrop */}
              {showProfileMenu && (
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
              )}

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/80">
                    <img src={`https://ui-avatars.com/api/?name=${getAvatarInitials(admin)}&background=1e5cdc&color=fff`} alt="Admin" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 text-sm truncate">{admin?.name || 'Super Admin'}</span>
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

        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
