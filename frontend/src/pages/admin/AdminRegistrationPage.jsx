import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, User, Mail, Lock, Briefcase } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    employeeId: '',
    role: '',
    department: ''
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
        setFormData({ fullName: '', email: '', password: '', employeeId: '', role: '', department: '' });
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
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-8 tracking-tight">Admin Registration</h2>
          
          {message.text && (
            <div className={`mb-6 p-4 rounded-2xl text-sm font-bold text-center ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                <input required type="text" placeholder="Full Name" value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
              </div>

              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                <input required type="email" placeholder="Official Email" value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 sm:py-4 pl-12 pr-6 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="password" placeholder="Secure Password" value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="text" placeholder="Emp ID" value={formData.employeeId}
                    onChange={e => setFormData({...formData, employeeId: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative group">
                  <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <select required value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 sm:py-4 pl-12 pr-6 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none appearance-none transition-all">
                    <option value="">Role</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="TR">TR</option>
                    <option value="Support Manager">Support Manager</option>
                    <option value="Manager">Manager</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
                <div className="relative group">
                  <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e5cdc] transition-colors" />
                  <input required type="text" placeholder="Department" value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-[#1e5cdc] outline-none transition-all" />
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
