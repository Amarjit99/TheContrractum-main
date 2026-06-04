import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { User, Mail, Shield, Calendar, Phone, Save, KeyRound, Briefcase } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminProfile() {
  const { admin, authFetch, updateAdminData } = useAdminAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (admin) {
      setFormData(prev => ({
        ...prev,
        name: admin.name || '',
        email: admin.email || '',
        mobile: admin.mobile || '',
      }));
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const token = adminUser?.token;

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
      };
      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await authFetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/users/${admin._id || admin.id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');

      // Update admin context & localStorage so sidebar/header shows new data immediately
      updateAdminData({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
      });

      toast.success('Profile updated successfully');

      // Update local context manually or rely on re-login
      // Usually best to refresh the page or update localStorage if needed
      if (formData.password) {
        toast('Please login again with your new password', { icon: '🔐' });
      }
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Toaster position="top-right" />
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your administrative account and security settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Card */}
          <div className="col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#1e5cdc] to-blue-400 opacity-20"></div>

              <div className="relative mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${admin?.name || 'Admin'}&background=1e5cdc&color=fff&size=128`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" title="Active"></div>
              </div>

              <h2 className="text-xl font-bold text-gray-900">{admin?.name || 'Admin'}</h2>
              <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm mt-1 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                <Shield size={14} /> {admin?.role || 'Administrator'}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Briefcase size={18} className="text-[#1e5cdc]" /> Account Details</h3>

              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <span className="truncate font-medium">{admin?.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <span className="font-medium">{admin?.mobile || 'Not provided'}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Calendar size={16} className="text-gray-400 shrink-0" />
                <span className="font-medium">Joined {admin?.joiningDate ? new Date(admin.joiningDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <User size={20} className="text-[#1e5cdc]" /> Edit Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${isEditing ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-blue-50 text-[#1e5cdc] hover:bg-blue-100'}`}
                >
                  {isEditing ? 'Cancel Edit' : 'Enable Editing'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all disabled:opacity-60 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all disabled:opacity-60 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all disabled:opacity-60 font-medium"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mt-2">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <KeyRound size={20} className="text-[#1e5cdc]" /> Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all disabled:opacity-60"
                        placeholder="Leave blank to keep current"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={!isEditing || !formData.password}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all disabled:opacity-60"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-500/20"
                    >
                      {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
