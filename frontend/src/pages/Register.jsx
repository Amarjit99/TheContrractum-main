import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Calendar, Users, ChevronRight, ArrowLeft } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    alternateMobile: '',
    whatsapp: '',
    gender: 'Select',
    dob: '',
    street: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal, 2: Address & Security

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleNext = () => {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 transition duration-300 ${
      errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-gray-100 focus:ring-blue-500 focus:bg-white focus:border-transparent'
    }`;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Sidebar Info */}
        <div className="md:w-1/3 bg-[#1e5cdc] p-6 sm:p-10 text-white flex flex-col">
          <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-8">
            <Users size={24} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-tight mb-4">Join Our Community</h1>
          <p className="text-blue-100 text-sm font-medium mb-auto">Create your account to access our ERP dashboard and manage your services seamlessly.</p>
          
          <div className="mt-10 space-y-4">
            <div className={`flex items-center gap-3 transition-opacity ${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</div>
              <span className="text-xs font-black uppercase tracking-widest">Personal Details</span>
            </div>
            <div className={`flex items-center gap-3 transition-opacity ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">2</div>
              <span className="text-xs font-black uppercase tracking-widest">Address & Security</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 sm:p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tight">
              {step === 1 ? 'Personal Information' : 'Address & Security'}
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Please fill in the details below</p>
          </div>

          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              /* Step 1: Personal Information */
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} required className={inputClass('firstName') + " pl-12"} />
                    {errors.firstName && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase ml-4">{errors.firstName}</p>}
                  </div>
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} required className={inputClass('lastName') + " pl-12"} />
                    {errors.lastName && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase ml-4">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className={inputClass('email') + " pl-12"} />
                  {errors.email && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase ml-4">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="text" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} required className={inputClass('mobile') + " pl-12"} />
                    {errors.mobile && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase ml-4">{errors.mobile}</p>}
                  </div>
                  <div className="relative group">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="text" name="whatsapp" placeholder="WhatsApp Number" value={formData.whatsapp} onChange={handleChange} className={inputClass('whatsapp') + " pl-12"} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass('gender') + " pl-12 appearance-none"}>
                      <option value="Select text-gray-400">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass('dob') + " pl-12"} />
                  </div>
                </div>

                <button type="button" onClick={handleNext} className="w-full bg-[#1e5cdc] text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group mt-4">
                  Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              /* Step 2: Address & Security */
              <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="relative group">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} className={inputClass('street') + " pl-12"} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass('city')} />
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className={inputClass('state')} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className={inputClass('country')} />
                  <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className={inputClass('pincode')} />
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="password" name="password" placeholder="Create Password *" value={formData.password} onChange={handleChange} required className={inputClass('password') + " pl-12"} />
                    {errors.password && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase ml-4">{errors.password}</p>}
                  </div>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={handleChange} required className={inputClass('confirmPassword') + " pl-12"} />
                    {errors.confirmPassword && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase ml-4">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-50 text-gray-500 font-black uppercase tracking-widest py-4 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button type="submit" disabled={loading} className="flex-[2] bg-[#1e5cdc] text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:bg-blue-300">
                    {loading ? 'Creating account...' : 'Finalize Account'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1e5cdc] hover:underline">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
