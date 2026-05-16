import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, MapPin, Briefcase, Trash2, X, BookOpen, ChevronRight, Edit } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';



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

  // New Job / Edit Job State
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] });
  const [skillsOpen, setSkillsOpen] = useState(false);

  // Applications state
  const [applications, setApplications] = useState([]);
  const [appsModalOpen, setAppsModalOpen] = useState(false);
  const [selectedJobForApps, setSelectedJobForApps] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => { 
    fetchJobs(); 
    fetchApps(); 
  }, []);

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

  const fetchApps = async () => {
    try {
      const res = await fetch(`${API}/api/cms/applications`, { headers });
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.department?.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
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
      const url = editingJob ? `${API}/api/cms/jobs/${editingJob._id}` : `${API}/api/cms/jobs`;
      const method = editingJob ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...newJob, status: 'Active' })
      });
      if (res.ok) {
        await fetchJobs();
        setIsModalOpen(false);
        setEditingJob(null);
        setNewJob({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] });
        setSkillsOpen(false);
        showToast(`Job "${newJob.title}" ${editingJob ? 'updated' : 'posted'} successfully!`, 'success');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(errData.message || `Failed to ${editingJob ? 'update' : 'post'} job. Please try again.`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please check your connection.', 'error');
    }
    setSubmitting(false);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      tags: job.tags || [],
    });
    setIsModalOpen(true);
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
    if (!bioJob) return;
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

  const openAppsModal = (job) => {
    setSelectedJobForApps(job);
    setAppsModalOpen(true);
  };

  const jobApps = applications.filter(a => selectedJobForApps && a.jobTitle === selectedJobForApps.title);

  return (
    <AdminLayout>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}>
          <span>{toast.type === 'success' ? '✓' : '✗'}</span>
          {toast.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">Careers & Jobs</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage active listings and job applications</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white dark:bg-gray-800"
            />
          </div>
          <button onClick={() => { setEditingJob(null); setNewJob({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] }); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Post Job
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm text-gray-500">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm text-gray-500">No jobs found matching your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 sm:p-5 shadow-sm hover:shadow-md transition-all relative group flex flex-col justify-between">
              <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${job.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>



              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-base sm:text-lg mb-2 sm:mb-3 pr-16 leading-tight">{job.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase size={16} className="text-gray-400" /> {job.department} ({job.type})
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-gray-400" /> {job.location}
                  </div>
                </div>

                {/* Bio status indicator */}
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
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 gap-2">
                <button 
                  onClick={() => openAppsModal(job)}
                  className="text-sm font-semibold text-[#1e5cdc] bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md shrink-0 transition-colors cursor-pointer"
                  title="View Applications"
                >
                  {applications.filter(a => a.jobTitle === job.title).length} Apps
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(job)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all" title="Edit Job Details">
                    <Edit size={16} />
                  </button>
                  {!["Senior Business Development Manager (BDM)", "Junior Business Development Manager (BDM)", "Content Writer (YTDP)", "Corporate Ambassador (YTDP)", "Social Media Marketer (YTDP)", "Social Media Internship Program (YTDP)", "Software Development Engineer (SDE I)", "Software Development Engineer (SDE II)", "SDE III - Backend Developer"].includes(job.title) && (
                    <button onClick={() => handleDelete(job._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all" title="Delete Job">
                      <Trash2 size={16} />
                    </button>
                  )}
                  {/* Bio button */}
                  <button
                    onClick={() => openBioModal(job)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors ml-1"
                  >
                    <BookOpen size={13} /> Edit Bio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Post New Job Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxHeight: 'calc(100vh - 1rem)' }}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{editingJob ? 'Edit Job Posting' : 'Post New Job'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                <input required type="text" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. Lead Designer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Department</label>
                  <select value={newJob.department} onChange={e => setNewJob({ ...newJob, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Engineering</option><option>Design</option><option>Data Science</option><option>Marketing</option><option>YTDP</option><option>Software Developer</option><option>Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input required type="text" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. Bangalore, India" />
              </div>

              {/* Skills Multi-select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Skills <span className="font-normal text-gray-400">(top 3 shown on job card)</span>
                </label>
                {/* Selected chips */}
                {newJob.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {newJob.tags.map((skill, idx) => (
                      <span key={skill} className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${idx < 3 ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-500'
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
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <span>{newJob.tags.length === 0 ? 'Select skills...' : `${newJob.tags.length} skill${newJob.tags.length > 1 ? 's' : ''} selected`}</span>
                  <span className="text-gray-400">{skillsOpen ? '▲' : '▼'}</span>
                </button>
                {skillsOpen && (
                  <div className="mt-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 max-h-40 overflow-y-auto shadow-lg z-10">
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
                        <span className={newJob.tags.includes(skill) ? 'font-semibold text-indigo-700' : 'text-gray-700 dark:text-gray-300'}>{skill}</span>
                        {newJob.tags.indexOf(skill) !== -1 && newJob.tags.indexOf(skill) < 3 && (
                          <span className="ml-auto text-xs text-indigo-500 font-bold">Top {newJob.tags.indexOf(skill) + 1}</span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingJob(null); setNewJob({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time', tags: [] }); setSkillsOpen(false); }} className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2">
                  {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span> {editingJob ? 'Updating...' : 'Posting...'}</> : (editingJob ? 'Update Job' : 'Post Job')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Bio Modal ─── */}
      {bioModalOpen && bioJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl my-2 sm:my-4 overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxHeight: 'calc(100vh - 1rem)' }}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 bg-indigo-50">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" /> Job Bio
                </h2>
                <p className="text-sm text-gray-500 mt-0.5 font-medium">{bioJob.title}</p>
              </div>
              <button onClick={() => setBioModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBioSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
              <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                💡 <strong>Roles & Benefits:</strong> Enter one item per line. &nbsp;|&nbsp; <strong>Skills:</strong> Comma-separated.
              </p>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Roles & Responsibilities <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={bioForm.roles}
                  onChange={e => setBioForm({ ...bioForm, roles: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                  placeholder={"Design and develop scalable web applications\nCollaborate with cross-functional teams\nWrite clean, maintainable code"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Required Skills <span className="font-normal text-gray-400">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={bioForm.skills}
                  onChange={e => setBioForm({ ...bioForm, skills: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="React.js, Node.js, MongoDB, AWS"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Qualification</label>
                  <input
                    type="text"
                    value={bioForm.qualification}
                    onChange={e => setBioForm({ ...bioForm, qualification: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="B.Tech / B.E. in CS or equivalent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Experience</label>
                  <input
                    type="text"
                    value={bioForm.experience}
                    onChange={e => setBioForm({ ...bioForm, experience: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="3–5 years of relevant experience"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Salary / Compensation</label>
                <input
                  type="text"
                  value={bioForm.salary}
                  onChange={e => setBioForm({ ...bioForm, salary: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="₹12,00,000 – ₹18,00,000 per annum"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Benefits <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={bioForm.benefits}
                  onChange={e => setBioForm({ ...bioForm, benefits: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                  placeholder={"Health Insurance\nFlexible Working Hours\nProfessional Development Budget"}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setBioModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={bioSubmitting} className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2">
                  {bioSubmitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span> Saving...</> : <><BookOpen size={14} /> Save Bio</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ─── Applications Modal ─── */}
      {appsModalOpen && selectedJobForApps && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl w-full max-w-3xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxHeight: 'calc(100vh - 1rem)' }}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">Job Applications</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedJobForApps.title}</p>
              </div>
              <button onClick={() => setAppsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {jobApps.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No applications received yet.</div>
              ) : (
                <div className="space-y-4">
                  {jobApps.map(app => (
                    <div key={app._id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">{app.fullName}</h4>
                        <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-4 mt-1">
                          <span>📧 {app.email}</span>
                          {app.phone && <span>📱 {app.phone}</span>}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          Applied: {new Date(app.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${app.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-gray-100 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                          {app.status || 'New'}
                        </span>
                        {app.resume && (
                          app.resume.startsWith('/uploads') || app.resume.startsWith('http') ? (
                            <a href={app.resume.startsWith('http') ? app.resume : `${API}${app.resume.startsWith('/') ? '' : '/'}${app.resume}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200">
                              View Resume
                            </a>
                          ) : (
                            <span className="text-xs font-semibold bg-red-50 text-red-500 px-3 py-1.5 rounded-lg border border-red-200" title="This application was submitted before file uploads were enabled">
                              Resume Missing
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
