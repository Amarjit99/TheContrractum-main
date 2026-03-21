import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, MapPin, Briefcase, Trash2, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialJobs = [
  { _id: 'static-1', title: "Senior Full Stack Engineer", department: "Engineering", location: "Bangalore", type: "Full-Time", applications: 24, status: "Active" },
  { _id: 'static-2', title: "Machine Learning Architect", department: "Data Science", location: "Remote", type: "Full-Time", applications: 8, status: "Active" },
  { _id: 'static-3', title: "Product Designer (UI/UX)", department: "Design", location: "Mumbai", type: "Full-Time", applications: 45, status: "Active" },
  { _id: 'static-4', title: "DevOps Engineer", department: "Engineering", location: "Bangalore", type: "Full-Time", applications: 12, status: "Active" },
  { _id: 'static-5', title: "Marketing Manager", department: "Marketing", location: "Delhi", type: "Full-Time", applications: 32, status: "Closed" },
];

export default function AdminCareers() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // New Job State
  const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time' });

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
    if(window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        const res = await fetch(`${API}/api/cms/jobs/${id}`, { method: 'DELETE', headers });
        if(res.ok) fetchJobs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if(!newJob.title) return alert("Please fill title");
    
    try {
      const res = await fetch(`${API}/api/cms/jobs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...newJob, status: 'Active' })
      });
      if(res.ok) {
        fetchJobs();
        setIsModalOpen(false);
        setNewJob({ title: '', department: 'Engineering', location: 'Remote', type: 'Full-Time' });
      } else {
        alert("Failed to post job");
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
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
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase size={16} className="text-gray-400" /> {job.department} ({job.type})
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-gray-400" /> {job.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm font-semibold text-[#1e5cdc] bg-blue-50 px-3 py-1 rounded-md">
                  {job.applications || 0} Applications
                </div>
                <button className="text-gray-400 hover:text-gray-800 font-semibold text-sm transition-colors">
                  Manage Apps
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Modal */}
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
                <input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. Lead Designer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                  <select value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Engineering</option><option>Design</option><option>Data Science</option><option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Full-Time</option><option>Part-Time</option><option>Contract</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input required type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. Bangalore, India" />
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Post Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
