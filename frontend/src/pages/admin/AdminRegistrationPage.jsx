import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, User, Mail, Lock, Briefcase, Calendar, Phone } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    adminSubRole: '',
    joiningDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`${API}/api/auth/admin-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ firstName: '', lastName: '', email: '', password: '', mobile: '', adminSubRole: '', joiningDate: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-gray-900 flex items-center justify-center p-6 font-sans">
      <div className="bg-white dark:bg-gray-800 w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Info */}
        <div className="bg-[#1e5cdc] md:w-1/3 p-8 flex flex-col text-white">
          <ShieldCheck size={48} className="mb-6 opacity-90" />
          <h1 className="text-2xl font-black leading-tight mb-4 uppercase tracking-tighter">Join the Admin Team</h1>
          <p className="text-blue-100 text-sm font-medium mb-auto">Register your interest to manage the Contractum platform. Your application requires Super Admin approval.</p>
          <div className="mt-8">
            <Link to="/admin/login" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
              Already an Admin? <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-10 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-tight">Admin Registration</h2>
          
          {message.text && (
            <div className={`mb-6 p-4 rounded-2xl text-sm font-bold text-center ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="text" placeholder="First Name" value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="text" placeholder="Last Name" value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
              </div>

              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                <input required type="email" placeholder="Official Email Address" value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-6 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="password" placeholder="Secure Password" value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
                <div className="relative group">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="text" placeholder="Mobile Number" value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative group">
                  <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <select required value={formData.adminSubRole}
                    onChange={e => setFormData({...formData, adminSubRole: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-6 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none appearance-none transition-all">
                    <option value="">Assign Role</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="TR">TR</option>
                    <option value="Support Manager">Support Manager</option>
                  </select>
                </div>
                <div className="relative group">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="date" value={formData.joiningDate}
                    onChange={e => setFormData({...formData, joiningDate: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
              </div>
            </div>

            <button disabled={loading} type="submit" 
              className="w-full bg-[#1e5cdc] text-white font-black uppercase tracking-widest py-4 sm:py-5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-blue-300 pointer-events-auto text-sm sm:text-base"
            >
              {loading ? 'Submitting...' : 'Apply for Access'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
