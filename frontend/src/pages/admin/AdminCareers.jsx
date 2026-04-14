import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, MapPin, Briefcase, Trash2, X, BookOpen, ChevronRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialJobs = [
  { _id: 'static-1', title: "Senior Full Stack Engineer", department: "Engineering", location: "Bangalore", type: "Full-Time", applications: 24, status: "Active" },
  { _id: 'static-2', title: "Machine Learning Architect", department: "Data Science", location: "Remote", type: "Full-Time", applications: 8, status: "Active" },
  { _id: 'static-3', title: "Product Designer (UI/UX)", department: "Design", location: "Mumbai", type: "Full-Time", applications: 45, status: "Active" },
  { _id: 'static-4', title: "DevOps Engineer", department: "Engineering", location: "Bangalore", type: "Full-Time", applications: 12, status: "Active" },
  { _id: 'static-5', title: "Marketing Manager", department: "Marketing", location: "Delhi", type: "Full-Time", applications: 32, status: "Closed" },
];

const TECH_SKILLS = [
  'React.js', 'Node.js', 'Python', 'MongoDB', 'AWS / Cloud',
  'Docker', 'Machine Learning', 'JavaScript', 'TypeScript', 'SQL / PostgreSQL',
  'REST APIs', 'Git & CI/CD', 'Kubernetes', 'Figma / UI Design', 'Cybersecurity',
];

const emptyBio = {
  roles: '',
  skills: '',
  qualification: '',
  experience: '',
  salary: '',
  benefits: '',
};


export default function AdminCareers() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Bio modal state
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [bioJob, setBioJob] = useState(null); // the job being edited
  const [bioForm, setBioForm] = useState(emptyBio);
  const [bioSubmitting, setBioSubmitting] = useState(false);

  // New Job State
  const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] });
  const [skillsOpen, setSkillsOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/cms/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const allJobs = [...jobs, ...initialJobs];
  const filteredJobs = allJobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.department?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if (typeof id === 'string' && id.startsWith('static-')) return alert("Cannot delete demo data.");
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        const res = await fetch(`${API}/api/cms/jobs/${id}`, { method: 'DELETE', headers });
        if (res.ok) fetchJobs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.location) return showToast('Please fill all required fields.', 'error');
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/cms/jobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...newJob, status: 'Active' })
      });
      if (res.ok) {
        await fetchJobs();
        setIsModalOpen(false);
        setNewJob({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] });
        setSkillsOpen(false);
        showToast(`Job "${newJob.title}" posted successfully!`, 'success');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(errData.message || 'Failed to post job. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please check your connection.', 'error');
    }
    setSubmitting(false);
  };

  // Open Bio modal — pre-populate if bio already exists
  const openBioModal = (job) => {
    setBioJob(job);
    setBioForm({
      roles: (job.roles || []).join('\n'),
      skills: (job.skills || []).join(', '),
      qualification: job.qualification || '',
      experience: job.experience || '',
      salary: job.salary || '',
      benefits: (job.benefits || []).join('\n'),
    });
    setBioModalOpen(true);
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    if (!bioJob || typeof bioJob._id === 'string' && bioJob._id.startsWith('static-')) {
      return showToast('Cannot edit bio for demo jobs.', 'error');
    }
    setBioSubmitting(true);
    const payload = {
      roles: bioForm.roles.split('\n').map(s => s.trim()).filter(Boolean),
      skills: bioForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      qualification: bioForm.qualification.trim(),
      experience: bioForm.experience.trim(),
      salary: bioForm.salary.trim(),
      benefits: bioForm.benefits.split('\n').map(s => s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(`${API}/api/cms/jobs/${bioJob._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchJobs();
        setBioModalOpen(false);
        showToast(`Bio for "${bioJob.title}" saved successfully!`, 'success');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(errData.message || 'Failed to save bio.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please check your connection.', 'error');
    }
    setBioSubmitting(false);
  };

  const hasBio = (job) => job.roles?.length > 0 || job.qualification || job.experience || job.salary;

  return (
    <AdminLayout>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <span>{toast.type === 'success' ? '✓' : '✗'}</span>
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Careers & Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage active listings and job applications</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white"
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Post Job
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500">No jobs found matching your search.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative group flex flex-col justify-between">
              <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${job.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>

              <button onClick={() => handleDelete(job._id)} className="absolute top-[11px] right-10 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={16} />
              </button>

              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-3 pr-16 leading-tight">{job.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase size={16} className="text-gray-400" /> {job.department} ({job.type})
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-gray-400" /> {job.location}
                  </div>
                </div>

                {/* Bio status indicator */}
                {!job._id?.toString().startsWith('static-') && (
                  <div className="mb-3">
                    {hasBio(job) ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Bio Added
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> Bio Pending
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                <div className="text-sm font-semibold text-[#1e5cdc] bg-blue-50 px-3 py-1 rounded-md shrink-0">
                  {job.applications || 0} Apps
                </div>

                {/* Bio button — only for real DB jobs */}
                {!job._id?.toString().startsWith('static-') ? (
                  <button
                    onClick={() => openBioModal(job)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <BookOpen size={13} /> Bio
                  </button>
                ) : (
                  <span className="text-xs text-gray-300 italic">Demo</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Post New Job Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Post New Job</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                <input required type="text" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. Lead Designer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                  <select value={newJob.department} onChange={e => setNewJob({ ...newJob, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Engineering</option><option>Design</option><option>Data Science</option><option>Marketing</option><option>YTDP</option><option>Software Developer</option><option>Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input required type="text" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. Bangalore, India" />
              </div>

              {/* Skills Multi-select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Skills <span className="font-normal text-gray-400">(top 3 shown on job card)</span>
                </label>
                {/* Selected chips */}
                {newJob.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {newJob.tags.map((skill, idx) => (
                      <span key={skill} className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        idx < 3 ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {idx < 3 && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>}
                        {skill}
                        <button type="button" onClick={() => setNewJob({ ...newJob, tags: newJob.tags.filter(s => s !== skill) })} className="ml-0.5 hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                )}
                {/* Dropdown toggle */}
                <button
                  type="button"
                  onClick={() => setSkillsOpen(p => !p)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <span>{newJob.tags.length === 0 ? 'Select skills...' : `${newJob.tags.length} skill${newJob.tags.length > 1 ? 's' : ''} selected`}</span>
                  <span className="text-gray-400">{skillsOpen ? '▲' : '▼'}</span>
                </button>
                {skillsOpen && (
                  <div className="mt-1 border border-gray-200 rounded-lg bg-white max-h-40 overflow-y-auto shadow-lg z-10">
                    {TECH_SKILLS.map(skill => (
                      <label key={skill} className="flex items-center gap-2.5 px-3 py-2 hover:bg-indigo-50 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={newJob.tags.includes(skill)}
                          onChange={() => {
                            const has = newJob.tags.includes(skill);
                            setNewJob({ ...newJob, tags: has ? newJob.tags.filter(s => s !== skill) : [...newJob.tags, skill] });
                          }}
                          className="accent-indigo-600 w-4 h-4"
                        />
                        <span className={newJob.tags.includes(skill) ? 'font-semibold text-indigo-700' : 'text-gray-700'}>{skill}</span>
                        {newJob.tags.indexOf(skill) !== -1 && newJob.tags.indexOf(skill) < 3 && (
                          <span className="ml-auto text-xs text-indigo-500 font-bold">Top {newJob.tags.indexOf(skill) + 1}</span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setIsModalOpen(false); setNewJob({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] }); setSkillsOpen(false); }} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2">
                  {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span> Posting...</> : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Bio Modal ─── */}
      {bioModalOpen && bioJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-4 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-indigo-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" /> Job Bio
                </h2>
                <p className="text-sm text-gray-500 mt-0.5 font-medium">{bioJob.title}</p>
              </div>
              <button onClick={() => setBioModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBioSubmit} className="p-6 space-y-5">
              <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                💡 <strong>Roles & Benefits:</strong> Enter one item per line. &nbsp;|&nbsp; <strong>Skills:</strong> Comma-separated.
              </p>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Roles & Responsibilities <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={bioForm.roles}
                  onChange={e => setBioForm({ ...bioForm, roles: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                  placeholder={"Design and develop scalable web applications\nCollaborate with cross-functional teams\nWrite clean, maintainable code"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Required Skills <span className="font-normal text-gray-400">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={bioForm.skills}
                  onChange={e => setBioForm({ ...bioForm, skills: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="React.js, Node.js, MongoDB, AWS"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Qualification</label>
                  <input
                    type="text"
                    value={bioForm.qualification}
                    onChange={e => setBioForm({ ...bioForm, qualification: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="B.Tech / B.E. in CS or equivalent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Experience</label>
                  <input
                    type="text"
                    value={bioForm.experience}
                    onChange={e => setBioForm({ ...bioForm, experience: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="3–5 years of relevant experience"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Salary / Compensation</label>
                <input
                  type="text"
                  value={bioForm.salary}
                  onChange={e => setBioForm({ ...bioForm, salary: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="₹12,00,000 – ₹18,00,000 per annum"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Benefits <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={bioForm.benefits}
                  onChange={e => setBioForm({ ...bioForm, benefits: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                  placeholder={"Health Insurance\nFlexible Working Hours\nProfessional Development Budget"}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setBioModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={bioSubmitting} className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2">
                  {bioSubmitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span> Saving...</> : <><BookOpen size={14} /> Save Bio</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
