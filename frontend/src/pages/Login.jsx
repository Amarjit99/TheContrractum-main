import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ShieldCheck, User as UserIcon, X, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { setAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const u = await login(formData.email, formData.password);
      if (u.role === 'admin' || u.role === 'super-admin') {
        localStorage.setItem('adminUser', JSON.stringify(u));
        setAdmin(u);
        const target = u.role === 'super-admin' ? '/admin/super-dashboard' : '/admin/dashboard';
        navigate(target);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange} required
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password" id="password" name="password"
                value={formData.password} onChange={handleChange} required
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" name="remember" checked={formData.remember} onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-red-600 hover:text-red-800 transition duration-300">Forgot password?</a>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 rounded-2xl transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:transform-none"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => setSignupModalOpen(true)}
                className="text-red-600 hover:text-red-800 font-medium transition duration-300 pointer-events-auto"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Signup Choice Modal */}
      {signupModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-fade-in duration-200" 
            onClick={() => setSignupModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="bg-white/95 w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSignupModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <div className="p-6 sm:p-10 pt-10 sm:pt-14">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Create Account</h2>
                <p className="text-gray-500 font-bold text-sm tracking-tight uppercase">Choose your account type to proceed</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Admin Registration Choice */}
                <button 
                  onClick={() => navigate('/admin/registration')}
                  className="group relative flex flex-col items-center justify-center p-8 bg-blue-600 hover:bg-blue-700 rounded-[32px] transition-all duration-300 shadow-xl shadow-blue-200 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={32} />
                  </div>
                  <span className="text-white font-black text-lg uppercase tracking-tight">Admin</span>
                  <p className="text-blue-100/70 text-[10px] font-bold text-center mt-2 leading-tight px-1">Verification Required</p>
                  <ArrowRight size={16} className="text-white/50 absolute bottom-6 right-8 group-hover:translate-x-2 transition-transform" />
                </button>

                {/* User Registration Choice */}
                <button 
                  onClick={() => navigate('/register')}
                  className="group relative flex flex-col items-center justify-center p-8 bg-red-600 hover:bg-red-700 rounded-[32px] transition-all duration-300 shadow-xl shadow-red-200 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <UserIcon size={32} />
                  </div>
                  <span className="text-white font-black text-lg uppercase tracking-tight">User</span>
                  <p className="text-red-100/70 text-[10px] font-bold text-center mt-2 leading-tight px-1">Instant Registration</p>
                  <ArrowRight size={16} className="text-white/50 absolute bottom-6 right-8 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              <div className="mt-10 text-center">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                  Join the Contractum ecosystem to manage <br /> and grow your business services effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
