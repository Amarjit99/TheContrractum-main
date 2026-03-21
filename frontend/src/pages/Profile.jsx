import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const [form, setForm] = useState({
    name: '', phone: '', jobTitle: '', company: '',
    location: '', bio: '', website: '', linkedin: '', twitter: '',
  });

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmNew: '' });
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      setProfile(data);
      setForm({
        name: data.name || '',
        phone: data.phone || '',
        jobTitle: data.jobTitle || '',
        company: data.company || '',
        location: data.location || '',
        bio: data.bio || '',
        website: data.website || '',
        linkedin: data.linkedin || '',
        twitter: data.twitter || '',
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProfile(data);
      setSaveMsg('Profile updated successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwMsg(''); setPwError('');
    if (pwForm.newPassword !== pwForm.confirmNew) { setPwError('New passwords do not match'); return; }
    if (pwForm.newPassword.length < 6) { setPwError('New password must be at least 6 characters'); return; }
    try {
      const res = await fetch(`${API_URL}/api/users/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPwMsg('Password changed successfully!');
      setPwForm({ currentPassword: '', newPassword: '', confirmNew: '' });
      setTimeout(() => setPwMsg(''), 3000);
    } catch (err) {
      setPwError(err.message);
    }
  };

  const initials = profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  const joinedDate = profile?.joinedDate ? new Date(profile.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white text-red-600 flex items-center justify-center text-3xl font-black shadow-xl border-4 border-white">
              {initials}
            </div>
            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold">{profile?.name}</h1>
              {profile?.jobTitle && <p className="text-red-100 font-medium">{profile.jobTitle}{profile?.company ? ` at ${profile.company}` : ''}</p>}
              {profile?.location && (
                <p className="text-red-200 text-sm flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {profile.location}
                </p>
              )}
              <p className="text-red-200 text-sm mt-1">Joined {joinedDate}</p>
            </div>
            {/* Logout */}
            <button onClick={() => { logout(); navigate('/'); }}
              className="px-5 py-2 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition shadow text-sm">
              Logout
            </button>
          </div>

          {/* Bio */}
          {profile?.bio && <p className="mt-4 text-red-100 max-w-2xl text-sm leading-relaxed">{profile.bio}</p>}

          {/* Social Links */}
          <div className="flex gap-3 mt-4 justify-center sm:justify-start flex-wrap">
            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition">LinkedIn</a>}
            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition">Twitter</a>}
            {profile?.website && <a href={profile.website} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition">Website</a>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-0">
            {['overview', 'edit', 'security'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize border-b-2 transition-all ${activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {tab === 'overview' ? '📋 Overview' : tab === 'edit' ? '✏️ Edit Profile' : '🔒 Security'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><span>👤</span> Personal Info</h3>
              <div className="space-y-3">
                {[
                  { label: 'Full Name', value: profile?.name },
                  { label: 'Email', value: profile?.email },
                  { label: 'Phone', value: profile?.phone || '—' },
                  { label: 'Location', value: profile?.location || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500 font-medium">{label}</span>
                    <span className="text-sm text-gray-800 font-semibold text-right max-w-[60%] break-all">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><span>💼</span> Professional</h3>
              <div className="space-y-3">
                {[
                  { label: 'Job Title', value: profile?.jobTitle || '—' },
                  { label: 'Company', value: profile?.company || '—' },
                  { label: 'Website', value: profile?.website || '—' },
                  { label: 'LinkedIn', value: profile?.linkedin || '—' },
                  { label: 'Twitter', value: profile?.twitter || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500 font-medium">{label}</span>
                    <span className="text-sm text-gray-800 font-semibold text-right max-w-[60%] break-all">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {profile?.bio && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 md:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span>📝</span> About</h3>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            )}
          </div>
        )}

        {/* EDIT PROFILE TAB */}
        {activeTab === 'edit' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h3>
            {saveMsg && (
              <div className={`mb-4 p-3 rounded-xl text-sm text-center ${saveMsg.startsWith('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                {saveMsg}
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true },
                  { name: 'phone', label: 'Phone Number', type: 'tel' },
                  { name: 'jobTitle', label: 'Job Title', type: 'text' },
                  { name: 'company', label: 'Company', type: 'text' },
                  { name: 'location', label: 'Location', type: 'text' },
                  { name: 'website', label: 'Website URL', type: 'url' },
                  { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
                  { name: 'twitter', label: 'Twitter URL', type: 'url' },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
                    <input type={type} name={name} value={form[name]} onChange={handleFormChange} required={required}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition"
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio <span className="text-gray-400 text-xs">(max 500 chars)</span></label>
                <textarea name="bio" value={form.bio} onChange={handleFormChange} rows={4} maxLength={500}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition resize-none"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/500</p>
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 rounded-xl transition shadow-md">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Change Password</h3>
            <p className="text-sm text-gray-500 mb-6">Use a strong password that you don't use elsewhere.</p>
            {pwMsg && <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 border border-green-200 text-sm text-center">{pwMsg}</div>}
            {pwError && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm text-center">{pwError}</div>}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {[
                { name: 'currentPassword', label: 'Current Password' },
                { name: 'newPassword', label: 'New Password' },
                { name: 'confirmNew', label: 'Confirm New Password' },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type="password" name={name}
                    value={pwForm[name]}
                    onChange={e => setPwForm({ ...pwForm, [e.target.name]: e.target.value })}
                    required className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition"
                    placeholder="••••••••"
                  />
                </div>
              ))}
              <button type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-md">
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
