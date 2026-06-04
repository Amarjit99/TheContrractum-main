import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const INDUSTRIES = ['Technology','Finance','Healthcare','Education','Legal','Consulting','Manufacturing','Retail','Media','Real Estate','Other'];
const GENDERS = ['', 'Male', 'Female', 'Non-binary', 'Prefer not to say'];

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'overview';

  const [tab, setTab] = useState(initialTab);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState({ text: '', ok: true });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const [form, setForm] = useState({
    name:'', phone:'', dateOfBirth:'', gender:'', location:'', bio:'',
    jobTitle:'', department:'', company:'', industry:'', experience:'',
    skills:[], website:'', linkedin:'', twitter:'', github:'',
  });

  const [contracts, setContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(false);
  const [signingId, setSigningId] = useState(null);
  const [signatureName, setSignatureName] = useState('');
  const [viewingContract, setViewingContract] = useState(null);

  const [pwForm, setPwForm] = useState({ currentPassword:'', newPassword:'', confirmNew:'' });
  const [pwMsg, setPwMsg] = useState({ text:'', ok:true });

  const headers = useMemo(() => ({ Authorization: `Bearer ${user?.token}` }), [user?.token]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/users/profile`, { headers });
      const data = await res.json();
      setProfile(data);
      setForm({
        name: data.name||'', phone: data.phone||'', dateOfBirth: data.dateOfBirth||'',
        gender: data.gender||'', location: data.location||'', bio: data.bio||'',
        jobTitle: data.jobTitle||'', department: data.department||'', company: data.company||'',
        industry: data.industry||'', experience: data.experience||'', skills: data.skills||[],
        website: data.website||'', linkedin: data.linkedin||'', twitter: data.twitter||'', github: data.github||'',
      });
    } finally { setLoading(false); }
  }, [headers]);

  const fetchContracts = useCallback(async () => {
    setLoadingContracts(true);
    try {
      const res = await fetch(`${API}/api/contracts/my-contracts`, { headers });
      const data = await res.json();
      if (Array.isArray(data)) setContracts(data);
    } finally { setLoadingContracts(false); }
  }, [headers]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchProfile();
    fetchContracts();
  }, [user, navigate, fetchProfile, fetchContracts]);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const t = q.get('tab');
    if (t && t !== tab) setTab(t);
  }, [location.search, tab]);

  const handleSign = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/contracts/${signingId}/sign`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ signatureName })
      });
      if (res.ok) {
        toast.success('Contract signed successfully!');
        setSigningId(null);
        setSignatureName('');
        fetchContracts();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Signing failed');
      }
    } catch (err) { 
      console.error(err);
      toast.error('An error occurred during signing');
    }
  };

  // Avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.success('Image must be under 2 MB'); return; }
    setUploadingAvatar(true);
    const fd = new FormData();
    fd.append('avatar', file);
    try {
      const res = await fetch(`${API}/api/users/avatar`, { method:'POST', headers, body: fd });
      const data = await res.json();
      if (res.ok) setProfile(p => ({ ...p, avatar: data.avatar }));
      else toast.success(data.message);
    } finally { setUploadingAvatar(false); }
  };

  // Skills tag management
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s) && form.skills.length < 15) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }));
      setSkillInput('');
    }
  };
  const removeSkill = (s) => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setSaveMsg({ text:'', ok:true });
    try {
      const res = await fetch(`${API}/api/users/profile`, {
        method:'PUT', headers: { ...headers, 'Content-Type':'application/json' },
        body: JSON.stringify({ ...form, skills: form.skills }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProfile(data);
      setSaveMsg({ text:'✅ Profile updated successfully!', ok:true });
    } catch (err) { setSaveMsg({ text:'❌ ' + err.message, ok:false }); }
    finally { setSaving(false); setTimeout(() => setSaveMsg({ text:'', ok:true }), 3500); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(); setPwMsg({ text:'', ok:true });
    if (pwForm.newPassword !== pwForm.confirmNew) { setPwMsg({ text:'New passwords do not match', ok:false }); return; }
    if (pwForm.newPassword.length < 6) { setPwMsg({ text:'Password must be at least 6 characters', ok:false }); return; }
    try {
      const res = await fetch(`${API}/api/users/change-password`, {
        method:'PUT', headers: { ...headers, 'Content-Type':'application/json' },
        body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPwMsg({ text:'✅ Password changed!', ok:true });
      setPwForm({ currentPassword:'', newPassword:'', confirmNew:'' });
    } catch (err) { setPwMsg({ text:'❌ ' + err.message, ok:false }); }
    finally { setTimeout(() => setPwMsg({ text:'', ok:true }), 3500); }
  };

  const initials = profile?.name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || '?';
  const joined = profile?.joinedDate ? new Date(profile.joinedDate).toLocaleDateString('en-IN',{ year:'numeric', month:'long', day:'numeric' }) : '';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading profile…</p>
      </div>
    </div>
  );

  /* ─── INPUT HELPER ─── */
  const Input = ({ label, name, type='text', required=false, options }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {options ? (
        <select name={name} value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white">
          {options.map(o => <option key={o} value={o}>{o || '— Select —'}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={form[name]} required={required}
          onChange={e=>setForm({...form,[name]:e.target.value})}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
      )}
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-start py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-36 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium text-right break-all">{value || <span className="text-gray-300 italic">Not set</span>}</span>
    </div>
  );

  const TABS = [
    { id:'overview', icon:'📋', label:'Overview' },
    { id:'contracts',icon:'📜', label:'My Contracts' },
    { id:'edit',     icon:'✏️', label:'Edit Profile' },
    { id:'security', icon:'🔒', label:'Security' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">

            {/* Avatar with upload overlay */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                {profile?.avatar
                  ? <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-4xl font-black text-red-600">{initials}</div>
                }
              </div>
              {/* Upload overlay */}
              <button onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                {uploadingAvatar
                  ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                }
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <span className="absolute -bottom-1 -right-1 bg-white text-red-600 rounded-full p-1 shadow-lg border-2 border-red-100 text-xs cursor-pointer" onClick={() => fileInputRef.current.click()}>
                📷
              </span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h1 className="text-2xl lg:text-3xl font-black">{profile?.name}</h1>
              {(profile?.jobTitle || profile?.company) && (
                <p className="text-red-200 font-semibold mt-0.5">
                  {profile?.jobTitle}{profile?.jobTitle && profile?.company ? ' · ' : ''}{profile?.company}
                </p>
              )}
              <div className="flex flex-wrap gap-3 mt-2 justify-center sm:justify-start text-sm text-red-100">
                {profile?.location && <span className="flex items-center gap-1">📍 {profile.location}</span>}
                {profile?.industry && <span className="flex items-center gap-1">🏢 {profile.industry}</span>}
                {profile?.experience && <span className="flex items-center gap-1">⏳ {profile.experience}</span>}
                <span className="flex items-center gap-1">📅 Joined {joined}</span>
              </div>
              {profile?.bio && <p className="mt-3 text-red-100 text-sm leading-relaxed max-w-xl">{profile.bio}</p>}

              {/* Skills */}
              {profile?.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
                  {profile.skills.map(s => (
                    <span key={s} className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold">{s}</span>
                  ))}
                </div>
              )}

              {/* Social links */}
              <div className="flex gap-2 mt-3 justify-center sm:justify-start flex-wrap">
                {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold transition">💼 LinkedIn</a>}
                {profile?.github   && <a href={profile.github}   target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold transition">🐙 GitHub</a>}
                {profile?.twitter  && <a href={profile.twitter}  target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold transition">🐦 Twitter</a>}
                {profile?.website  && <a href={profile.website}  target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold transition">🔗 Website</a>}
              </div>
            </div>

            {/* Logout */}
            <button onClick={() => { logout(); navigate('/'); }}
              className="shrink-0 px-5 py-2 bg-white text-red-700 font-bold rounded-xl hover:bg-red-50 transition shadow text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div
          className="max-w-5xl mx-auto px-4 flex overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-4 text-sm font-semibold border-b-2 transition-all ${tab===t.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-base">👤 Personal Information</h3>
              <InfoRow label="Full Name"    value={profile?.name} />
              <InfoRow label="Email"        value={profile?.email} />
              <InfoRow label="Phone"        value={profile?.phone} />
              <InfoRow label="Date of Birth" value={profile?.dateOfBirth} />
              <InfoRow label="Gender"       value={profile?.gender} />
              <InfoRow label="Location"     value={profile?.location} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-base">💼 Professional Details</h3>
              <InfoRow label="Job Title"    value={profile?.jobTitle} />
              <InfoRow label="Department"   value={profile?.department} />
              <InfoRow label="Company"      value={profile?.company} />
              <InfoRow label="Industry"     value={profile?.industry} />
              <InfoRow label="Experience"   value={profile?.experience} />
            </div>

            {profile?.skills?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-3 text-base">🛠️ Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-red-50 text-red-700 text-sm font-semibold rounded-full border border-red-100">{s}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-base">🌐 Online Presence</h3>
              <InfoRow label="Website"  value={profile?.website} />
              <InfoRow label="LinkedIn" value={profile?.linkedin} />
              <InfoRow label="GitHub"   value={profile?.github} />
              <InfoRow label="Twitter"  value={profile?.twitter} />
            </div>

            {profile?.bio && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:col-span-2">
                <h3 className="font-bold text-gray-800 mb-3 text-base">📝 About Me</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{profile.bio}</p>
              </div>
            )}
          </div>
        )}

        {/* ── CONTRACTS ── */}
        {tab === 'contracts' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg px-2">📜 My Active & Pending Contracts</h3>
            {loadingContracts ? (
              <div className="py-12 text-center text-gray-400">Loading your contracts...</div>
            ) : contracts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-gray-500 font-medium">No contracts found for your account.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contracts.map(c => (
                  <div key={c._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{c.title}</h4>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs font-semibold text-gray-400">
                           <span className="bg-gray-50 px-2 py-0.5 rounded uppercase tracking-wider">{c.type}</span>
                           <span>Expires: {c.validUntil ? new Date(c.validUntil).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                        c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {c.status.replace('_', ' ')}
                      </span>
                      {c.status === 'Pending_Signature' && (
                        <button 
                          onClick={() => setSigningId(c._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl transition shadow text-sm flex items-center gap-2"
                        >
                          Sign Contract 👋
                        </button>
                      )}
                      <button 
                        onClick={() => setViewingContract(c)}
                        title="View Contract"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Signature Modal */}
            {signingId && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
                  <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 leading-tight">Digital Contract Signing</h3>
                      <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-wider">Legal Acknowledgment</p>
                    </div>
                    <button onClick={() => setSigningId(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                        <span className="text-xl">⚠️</span>
                        <p className="text-xs text-amber-700 font-bold leading-relaxed">
                          By signing this document, you acknowledge that you have read and agree to all terms and conditions stated in the contract. This digital signature is legally binding.
                        </p>
                     </div>

                     <div className="py-2">
                        {/* Contract text preview - beautifully styled HTML container */}
                        <div 
                           className="bg-gray-50 p-6 rounded-xl max-h-60 overflow-y-auto text-xs text-gray-700 leading-relaxed border border-gray-100 prose prose-sm max-w-none"
                           style={{ fontFamily: 'Georgia, serif' }}
                           dangerouslySetInnerHTML={{ __html: contracts.find(c => c._id === signingId)?.content || '' }}
                        />
                     </div>

                     <form onSubmit={handleSign} className="space-y-4">
                        <div>
                           <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Type your full name to sign</label>
                           <input 
                              required
                              type="text" 
                              value={signatureName}
                              onChange={(e) => setSignatureName(e.target.value)}
                              placeholder="e.g. John Doe"
                              className="w-full px-4 py-3 bg-red-50/50 border-2 border-dashed border-red-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 font-bold text-red-900 placeholder-red-200 text-center text-lg"
                           />
                        </div>
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition shadow-xl text-sm uppercase tracking-widest shadow-red-500/20">
                           Confirm & Sign Contract
                        </button>
                      </form>
                  </div>
                </div>
              </div>
            )}

            {/* View Contract Modal */}
            {viewingContract && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in duration-300">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 leading-tight">{viewingContract.title}</h3>
                      <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">
                        {viewingContract.type} &bull; Status: {viewingContract.status.replace('_', ' ')}
                      </p>
                    </div>
                    <button onClick={() => setViewingContract(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  <div className="p-8 overflow-y-auto flex-1 bg-gray-50/50">
                    <div 
                      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-sm max-w-none"
                      style={{ fontFamily: 'Georgia, serif', lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{ __html: viewingContract.content || '<p class="italic text-gray-400">No content.</p>' }}
                    />
                  </div>
                  <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex justify-end shrink-0">
                    <button 
                      onClick={() => setViewingContract(null)}
                      className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition shadow text-xs uppercase tracking-wider"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── EDIT PROFILE ── */}
        {tab === 'edit' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-3xl">
            {saveMsg.text && (
              <div className={`mb-5 p-3 rounded-xl text-sm text-center font-medium ${saveMsg.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {saveMsg.text}
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-7">

              {/* ── AVATAR section ── */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Profile Photo</p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-200 shrink-0">
                    {profile?.avatar
                      ? <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">{initials}</div>}
                  </div>
                  <button type="button" onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 border-2 border-dashed border-red-300 text-red-600 rounded-xl text-sm font-semibold hover:border-red-500 hover:bg-red-50 transition">
                    {uploadingAvatar ? 'Uploading…' : '📷 Upload New Photo'}
                  </button>
                  <p className="text-xs text-gray-400">JPG, PNG up to 2 MB</p>
                </div>
              </div>

              {/* Personal */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 pb-1 border-b border-gray-100">Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" name="name" required />
                  <Input label="Phone Number" name="phone" type="tel" />
                  <Input label="Date of Birth" name="dateOfBirth" type="date" />
                  <Input label="Gender" name="gender" options={GENDERS} />
                  <div className="sm:col-span-2"><Input label="Location (City, Country)" name="location" /></div>
                </div>
              </div>

              {/* Professional */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 pb-1 border-b border-gray-100">Professional Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Job Title" name="jobTitle" />
                  <Input label="Department" name="department" />
                  <Input label="Company / Organisation" name="company" />
                  <Input label="Industry" name="industry" options={['', ...INDUSTRIES]} />
                  <div className="sm:col-span-2"><Input label="Years of Experience" name="experience" placeholder="e.g. 3 years" /></div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 pb-1 border-b border-gray-100">Skills <span className="font-normal text-gray-400 text-xs">(max 15)</span></h4>
                <div className="flex gap-2 mb-3">
                  <input value={skillInput} onChange={e=>setSkillInput(e.target.value)}
                    onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addSkill(); }}}
                    placeholder="Type a skill & press Enter"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
                  <button type="button" onClick={addSkill} className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-semibold border border-red-100">
                      {s}
                      <button type="button" onClick={()=>removeSkill(s)} className="text-red-400 hover:text-red-700 font-bold leading-none">&times;</button>
                    </span>
                  ))}
                  {form.skills.length === 0 && <p className="text-sm text-gray-400 italic">No skills added yet</p>}
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 pb-1 border-b border-gray-100">About Me</h4>
                <textarea name="bio" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}
                  rows={4} maxLength={600}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                  placeholder="Write a short bio about yourself…" />
                <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/600</p>
              </div>

              {/* Online */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3 pb-1 border-b border-gray-100">Online Presence</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Website URL" name="website" type="url" />
                  <Input label="LinkedIn URL" name="linkedin" type="url" />
                  <Input label="GitHub URL" name="github" type="url" />
                  <Input label="Twitter URL" name="twitter" type="url" />
                </div>
              </div>

              <button type="submit" disabled={saving}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 rounded-xl transition shadow-md text-sm">
                {saving ? 'Saving…' : '💾 Save All Changes'}
              </button>
            </form>
          </div>
        )}

        {/* ── SECURITY ── */}
        {tab === 'security' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Change Password</h3>
            <p className="text-sm text-gray-500 mb-6">Use a strong password that you don't use elsewhere.</p>
            {pwMsg.text && (
              <div className={`mb-4 p-3 rounded-xl text-sm text-center font-medium ${pwMsg.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {pwMsg.text}
              </div>
            )}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {[['currentPassword','Current Password'],['newPassword','New Password'],['confirmNew','Confirm New Password']].map(([name, label]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
                  <input type="password" name={name} value={pwForm[name]}
                    onChange={e=>setPwForm({...pwForm,[e.target.name]:e.target.value})} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="••••••••" />
                </div>
              ))}
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-md text-sm">
                🔒 Change Password
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-700 mb-1">Danger Zone</h4>
              <p className="text-xs text-gray-400 mb-3">Logging out will clear your session. You'll need to sign in again.</p>
              <button onClick={() => { logout(); navigate('/'); }}
                className="w-full border-2 border-red-300 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-50 transition text-sm">
                🚪 Logout from This Device
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
