import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/main-logo1.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      name: 'Home',
      path: '/'
    },

    {
      name: 'Company',
      submenu: [
        { title: 'Our Vision', path: '/company/about-us/vision', items: [] },
        { title: 'Our Mission', path: '/company/about-us/mission', items: [] },
        { title: 'Our Values', path: '/company/about-us/values', items: [] },


        { title: 'Founders & Directors', path: '/company/leadership/founders', items: [] },
        { title: 'Management Team', path: '/company/leadership/management', items: [] },

        { title: 'Our Journey', path: '/company/our-journey', items: [] },
        { title: 'Company Timeline', path: '/company/our-journey/timeline', items: [] },

        { title: 'Innovation', path: '/company/why-choose-us/innovation', items: [] },
        { title: 'Reliability', path: '/company/why-choose-us/reliability', items: [] },
        { title: 'Scalability', path: '/company/why-choose-us/scalability', items: [] },
        { title: 'Code Of Conduct', path: '/company/code-of-conduct', items: [] },
        { title: 'Employee ID Verification', path: '/company/employee-id', items: [] },
        { title: 'Contracts & Documents', path: '/company/contracts', items: [] },
      ]

    },
    {
      name: 'Our Team',
      submenu: [
        { title: 'Core Team', path: '/team/core-team', items: [] },
        { title: 'Technical Experts', path: '/team/technical-experts', items: [] },
        { title: 'Industry Advisors', path: '/team/industry-advisors', items: [] },
        { title: 'Student Interns', path: '/team/student-interns', items: [] },
        { title: 'Culture & Work Environment', path: '/team/culture', items: [] }
      ]
    },
    {
      name: 'Solutions',
      submenu: [
        { title: 'CS & IT Services', path: '/solutions/business/csit', items: [] },
        { title: 'GIS Solutions', path: '/solutions/business/gis', items: [] },
        { title: 'MRAS Services', path: '/solutions/business/Mras', items: [] },
        { title: 'E-Commerce Platforms', path: '/solutions/digital/e-commerce', items: [] },
        { title: 'HR Tech Solutions', path: '/solutions/digital/hrtech', items: [] },
        { title: 'Digital Marketing', path: '/solutions/digital/digital-marketing', items: [] },
        { title: 'BPO Services', path: '/solutions/digital/bpo', items: [] },
        { title: 'Telecommunication', path: '/solutions/connectivity/telecom', items: [] },
        { title: 'Network Infrastructure', path: '/solutions/connectivity/network-infra', items: [] },
        { title: 'Cloud Integration', path: '/solutions/connectivity/cloud', items: [] }
      ]
    },
    {
      name: 'Industries',
      submenu: [
        { title: 'Government & Smart Cities', path: '/industries/government', items: [] },
        { title: 'Healthcare', path: '/industries/healthcare', items: [] },
        { title: 'Education', path: '/industries/education', items: [] },
        { title: 'Retail & E-Commerce', path: '/industries/retail', items: [] },
        { title: 'Telecom & Networking', path: '/industries/telecom', items: [] },
        { title: 'Banking & Finance', path: '/industries/banking', items: [] },
        { title: 'Manufacturing', path: '/industries/manufacturing', items: [] },
        { title: 'Agriculture & GIS', path: '/industries/agriculture', items: [] }
      ]
    },
    {
      name: 'Careers',
      submenu: [
        { title: 'Life at Company', path: '/careers/life', items: [] },
        { title: 'Job Openings', path: '/careers/jobs', items: [] },
        { title: 'Internship Programs', path: '/careers/internships', items: [] },
        { title: 'Join Running Projects', path: '/careers/projects', items: [] },
        { title: 'Campus Hiring', path: '/careers/campus', items: [] },
        { title: 'Growth & Learning', path: '/careers/growth', items: [] },
        { title: 'Employee Benefits', path: '/careers/benefits', items: [] },
        { title: 'Employee Certificates', path: '/careers/certificates', items: [] }
      ]
    },
    {
      name: 'Projects',
      submenu: [
        { title: 'Ongoing Projects', path: '/projects/ongoing', items: [] },
        { title: 'Completed Projects', path: '/projects/completed', items: [] },
        { title: 'Case Studies', path: '/projects/case-studies', items: [] },
        { title: 'Research & Innovation', path: '/projects/research', items: [] },
        { title: 'Client Testimonials', path: '/projects/testimonials', items: [] }
      ]
    },
    {
      name: 'Resources',
      submenu: [
        { title: 'Blogs & Articles', path: '/resources/blogs', items: [] },
        { title: 'News & Updates', path: '/resources/news', items: [] },
        { title: 'Events & Activities', path: '/resources/events', items: [] },
        { title: 'CSR Initiatives', path: '/resources/csr', items: [] },
        { title: 'Whitepapers', path: '/resources/whitepapers', items: [] },
        { title: 'Reports & Publications', path: '/resources/reports', items: [] },
        { title: 'Media Gallery', path: '/resources/media', items: [] }
      ]
    },
    {
      name: 'Join Us',
      submenu: [
        { title: 'Partner With Us', path: '/join/partner', items: [] },
        { title: 'Collaborate on Research', path: '/join/collaborate', items: [] },
        { title: 'Startup & Student Programs', path: '/join/startup', items: [] },
        { title: 'Volunteer & CSR Programs', path: '/join/volunteer', items: [] },
        { title: 'Affiliate Marketing', path: '/join/affiliate', items: [] }
      ]
    },
    {
      name: 'Contact',
      submenu: [
        { title: 'Get in Touch', path: '/contact/touch', items: [] },
        { title: 'Request a Quote', path: '/contact/quote', items: [] },
        { title: 'Support & Help Desk', path: '/contact/support', items: [] },
        { title: 'Office Locations', path: '/contact/location', items: [] },
        { title: 'Feedback & Queries', path: '/contact/feedback', items: [] }
      ]
    }
  ];

  const handleMouseEnter = (index) => {
    // Clear any pending close timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay
    setCloseTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    // Cancel closing when mouse enters dropdown
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    // Close dropdown when mouse leaves the dropdown area
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setCloseTimeout(timeout);
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white shadow-2xl border-b-2 border-gradient-to-r from-red-500 to-pink-500 print:hidden">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-11 xl:px-14">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Company Name */}
          <div className="shrink-0 flex items-center mr-6 lg:mr-12 xl:mr-16">
            <Link to="/" className="flex items-center group transform hover:scale-[1.15] transition-all duration-500 shrink-0">
              <img src={logo} alt="The Contractum Logo" className="h-[48px] sm:h-[64px] lg:h-[76px] xl:h-[88px] w-auto object-contain transform scale-[1.2] sm:scale-[1.45] origin-left" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-0.5 lg:gap-1 xl:gap-2 mx-2 xl:mx-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => item.submenu && handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className="text-gray-800 hover:text-white hover:bg-gradient-to-r from-red-600 via-pink-600 to-red-600 transition-all duration-300 font-bold text-[13px] lg:text-[14px] xl:text-[16px] px-2 lg:px-3 xl:px-4 py-2 lg:py-2.5 rounded-lg group transform hover:-translate-y-1 hover:shadow-xl whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button className="text-gray-800 hover:text-white hover:bg-gradient-to-r from-red-600 via-pink-600 to-red-600 transition-all duration-300 font-bold text-[13px] lg:text-[14px] xl:text-[16px] px-2 lg:px-3 xl:px-4 py-2 lg:py-2.5 rounded-lg flex items-center space-x-1.5 group transform hover:-translate-y-1 hover:shadow-xl whitespace-nowrap">
                    <span>{item.name}</span>
                    {item.submenu && (
                      <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Enhanced Mega Menu Dropdown */}
                {item.submenu && activeDropdown === index && (
                    <div
                      className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-red-200 overflow-hidden animate-fadeIn z-[110]"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="max-h-96 overflow-y-auto p-3">
                      <div className="grid grid-cols-1 gap-1">
                        {item.submenu.map((section, idx) => (
                          <div key={idx} className="group/item">
                            <Link
                              to={section.path}
                              state={{ title: section.title }}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-3.5 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300 transform hover:translate-x-2 hover:shadow-md border border-transparent hover:border-red-100"
                            >
                              <div>
                                <div className="font-bold text-gray-900 text-sm group-hover/item:text-red-600 transition-colors duration-300 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover/item:w-2.5 group-hover/item:h-2.5 transition-all shadow-sm"></span>
                                  {section.title}
                                </div>
                                <div className="flex-1">
                                  {section.items.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                      {section.items.map((subItem, subIdx) => (
                                        <div key={subIdx} className="text-xs text-gray-600 hover:text-red-600 ml-2 flex items-center space-x-1.5 transition-all duration-200 cursor-pointer hover:translate-x-1">
                                          <span className="text-red-500 font-bold">▸</span>
                                          <span className="hover:font-semibold">{subItem}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Button - Desktop */}
          {user ? (
            <div className="hidden lg:flex flex-shrink-0 justify-end items-center">
              <div className="relative">
                {/* Avatar Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  <span className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-base xl:text-lg ring-2 ring-transparent group-hover:ring-red-300 transition-all duration-200 shadow-md">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                {profileOpen && (
                  <>
                    {/* Backdrop to close */}
                    <div className="fixed inset-0 z-[105]" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[110] overflow-hidden animate-fade-in">
                      {/* User Info Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white">
                        <p className="font-bold text-sm truncate">{user.name}</p>
                        <p className="text-red-200 text-xs truncate">{user.email}</p>
                      </div>
                      {/* Menu Items */}
                      <div className="py-1">
                        {(user.role === 'admin' || user.role === 'super-admin') && (
                          <Link to={user.role === 'super-admin' ? '/admin/super-dashboard' : '/admin/dashboard'} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            Admin Dashboard
                          </Link>
                        )}

                        <Link to="/profile" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          My Profile
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button onClick={() => { setProfileOpen(false); handleLogout(); }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-shrink-0 justify-end items-center">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 xl:py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] xl:text-[15px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-pink-600 to-red-600 text-white hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white shadow-lg"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - outside max-w container */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Enhanced Mobile Menu - Slide from Right - outside max-w container */}
      <div className={`fixed top-0 right-0 h-full w-[85vw] max-w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-gray-200 bg-gradient-to-r from-red-600 to-pink-600">
          <div className="text-white">
            <h3 className="text-lg sm:text-xl font-bold">Menu</h3>
            <p className="text-xs sm:text-sm text-red-100">Explore our services</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all duration-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-88px)] p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="py-1">
              {item.path ? (
                <Link
                  to={item.path}
                  className="block py-3.5 px-5 text-gray-800 hover:text-white hover:bg-gradient-to-r from-red-600 to-pink-600 rounded-xl transition-all duration-300 font-bold shadow-sm hover:shadow-lg transform hover:translate-x-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                    className="w-full flex justify-between items-center py-3.5 px-5 text-gray-800 hover:text-white hover:bg-gradient-to-r from-red-600 to-pink-600 rounded-xl transition-all duration-300 font-bold shadow-sm hover:shadow-lg"
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === index && item.submenu && (
                    <div className="ml-4 mt-2 space-y-1 bg-gray-50 backdrop-blur-sm rounded-xl p-2">
                      {item.submenu.map((section, idx) => (
                        <div key={idx} className="py-1">
                          <Link
                            to={section.path}
                            state={{ title: section.title }}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 px-3 text-sm font-bold text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            {section.title}
                          </Link>
                          {section.items.length > 0 && (
                            <div className="ml-10 mt-1 space-y-1">
                              {section.items.map((subItem, subIdx) => (
                                <a
                                  key={subIdx}
                                  href="#"
                                  className="flex items-center space-x-2 py-1.5 px-3 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                >
                                  <span className="text-red-400">▸</span>
                                  <span>{subItem}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Auth Section - Mobile */}
          <div className="mt-4 pt-4 border-t border-gray-200 pb-8">
            {user ? (
              <div className="space-y-2">
                <div className="px-5 py-3 bg-red-50 rounded-xl mb-3 border border-red-100">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {(user.role === 'admin' || user.role === 'super-admin') && (
                  <Link
                    to={user.role === 'super-admin' ? '/admin/super-dashboard' : '/admin/dashboard'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 w-full py-3 px-5 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full py-3 px-5 text-gray-700 hover:bg-gray-50 font-bold rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  My Profile
                </Link>

                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="flex items-center gap-3 w-full py-3 px-5 text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all duration-300 text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-md transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}