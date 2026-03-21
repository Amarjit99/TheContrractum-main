import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard, FileText, FileEdit, Briefcase, Handshake,
  UsersRound, Users, BarChart3, Settings,
  Search, Bell, ChevronDown, ChevronRight, Menu, X
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { id: 'services', to: '/admin/services', icon: <FileText size={20} />, label: 'Services' },
  { id: 'blogs', to: '/admin/blogs', icon: <FileEdit size={20} />, label: 'Blog Posts' },
  { id: 'careers', to: '/admin/careers', icon: <Briefcase size={20} />, label: 'Careers' },
  { id: 'partners', to: '/admin/partners', icon: <Handshake size={20} />, label: 'Partners' },
  { id: 'leads', to: '/admin/contacts', icon: <UsersRound size={20} />, label: 'Leads' },
  { id: 'users', to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
  { id: 'analytics', to: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  { id: 'settings', to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [globalSearch, setGlobalSearch] = useState('');

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
      <div className="px-6 py-5 flex items-center gap-3 bg-white/10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-[#1e5cdc]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>
        <div className="z-10">
          <h2 className="text-lg font-bold leading-tight">TheContractum</h2>
          <p className="text-blue-200 text-xs">Admin Panel</p>
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
              <button className="text-gray-500 hover:text-[#1e5cdc] transition-colors relative">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-[#f0f4f8]">3</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
              <img src={`https://ui-avatars.com/api/?name=${admin?.name}&background=1e5cdc&color=fff`} alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
              <div className="hidden sm:flex items-center gap-1 font-medium text-gray-700 text-sm">
                Admin <ChevronDown size={14} className="text-gray-400" />
              </div>
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
