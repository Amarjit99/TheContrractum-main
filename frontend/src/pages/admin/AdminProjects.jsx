import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { FolderKanban, Plus, Search, RefreshCw, X, Image as ImageIcon, Briefcase, Calendar, CheckSquare, Settings2, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminProjects() {
  const { admin } = useAdminAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

  const [finishData, setFinishData] = useState({
    completedDate: "",
    duration: "",
    rating: 5,
    achievements: "",
    impact: ""
  });

  const emptyForm = {
    title: "", client: "", category: "Enterprise", startDate: "", expectedCompletion: "",
    status: "In Progress", progress: 50, teamSize: 5, budget: "$100,000",
    technologies: "", image: "", description: "", keyFeatures: "", priority: "High",
    objectives: "", challenges: "", milestones: []
  };

  const [formData, setFormData] = useState(emptyForm);
  const [newMilestone, setNewMilestone] = useState({ name: "", status: "Pending", date: "" });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
      setFormData(emptyForm);
      setEditingId(null);
      setIsModalOpen(true);
  };

  const handleOpenEdit = (e, project) => {
      e.stopPropagation();
      setFormData({
          ...project,
          technologies: project.technologies?.join(", ") || "",
          keyFeatures: project.keyFeatures?.join(", ") || "",
          objectives: project.objectives?.join(", ") || "",
          challenges: project.challenges?.join(", ") || "",
          milestones: project.milestones || []
      });
      setEditingId(project.id);
      setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Parse comma-separated strings to arrays
    const formattedData = {
        ...formData,
        technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
        keyFeatures: formData.keyFeatures.split(",").map(k => k.trim()).filter(Boolean),
        objectives: formData.objectives.split(",").map(k => k.trim()).filter(Boolean),
        challenges: formData.challenges.split(",").map(k => k.trim()).filter(Boolean),
        progress: parseInt(formData.progress),
        teamSize: parseInt(formData.teamSize)
    };

    const url = editingId 
        ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${editingId}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`
        },
        body: JSON.stringify(formattedData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData(emptyForm);
        setEditingId(null);
        fetchProjects();
      }
    } catch (err) {
      console.error("Failed to save project", err);
    }
    setIsSubmitting(false);
  };

  const handleFinishProject = async (e) => {
      e.preventDefault();
      if(!editingId) return;
      setIsSubmitting(true);

      const finalPayload = {
          ...formData, // gets title, client, category, teamSize, budget, technologies, image, description
          technologies: typeof formData.technologies === 'string' ? formData.technologies.split(",").map(t=>t.trim()).filter(Boolean) : formData.technologies,
          completedDate: finishData.completedDate,
          duration: finishData.duration,
          rating: parseInt(finishData.rating),
          achievements: finishData.achievements.split(',').map(a=>a.trim()).filter(Boolean),
          impact: finishData.impact
      };

      try {
          // 1. Send to Completed Projects
          const res1 = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${admin?.token}` },
              body: JSON.stringify(finalPayload)
          });

          if(res1.ok) {
              // 2. Delete from Ongoing Projects
              await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${editingId}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${admin?.token}` }
              });

              setIsFinishModalOpen(false);
              setFormData(emptyForm);
              setFinishData({ completedDate: "", duration: "", rating: 5, achievements: "", impact: "" });
              setEditingId(null);
              fetchProjects();
          }
      } catch (err) {
          console.error("Failed to finish project", err);
      }
      setIsSubmitting(false);
  };

  const handleDelete = async (e, id) => {
      e.stopPropagation();
      if (!window.confirm("Are you sure you want to delete this project?")) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchProjects();
      } catch (err) {
          console.error("Delete failed", err);
      }
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <FolderKanban className="text-blue-600" size={32} />
              Ongoing Projects Management
            </h1>
            <p className="text-gray-500 mt-2">Add and handle projects displayed on the public Ongoing Projects page.</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none shadow-sm transition-all w-64"
              />
            </div>
            <button 
              onClick={handleOpenAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md font-bold transition flex items-center gap-2"
            >
              <Plus size={20} /> Add Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
                <div className="col-span-full py-12 text-center text-gray-500">
                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                    Loading projects...
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                    No projects found. Add your first project!
                </div>
            ) : (
                filteredProjects.map((project) => (
                    <div key={project.id} onClick={() => setViewingProject(project)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                        <div className="h-48 overflow-hidden relative">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">
                                {project.priority} Priority
                            </span>
                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {project.category}
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{project.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{project.client}</p>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <div className="text-sm font-semibold text-gray-700">Progress: {project.progress}%</div>
                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%`}}></div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                                <div className="text-xs font-semibold text-gray-500">
                                    {project.teamSize} Members • {project.budget}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={(e) => handleOpenEdit(e, project)} className="text-blue-500 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm">
                                        Edit
                                    </button>
                                    <button onClick={(e) => handleDelete(e, project.id)} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

      </div>

        {/* View Details Modal */}
        {viewingProject && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
                    <button onClick={() => setViewingProject(null)} className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black p-2 rounded-full z-10 transition">
                        <X size={20} />
                    </button>
                    <div className="h-64 relative w-full">
                        <img src={viewingProject.image} alt={viewingProject.title} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-8">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block ${viewingProject.priority === 'Critical' ? 'bg-red-500' : viewingProject.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                {viewingProject.priority} Priority
                            </span>
                            <h2 className="text-3xl font-black text-white">{viewingProject.title}</h2>
                            <p className="text-gray-300 font-medium">{viewingProject.client}</p>
                        </div>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-bold">Category</p>
                                <p className="font-semibold">{viewingProject.category}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-bold">Timeline</p>
                                <p className="font-semibold">{viewingProject.startDate}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-bold">Budget</p>
                                <p className="font-semibold">{viewingProject.budget}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-500 font-bold">Team</p>
                                <p className="font-semibold">{viewingProject.teamSize} Members</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.description}</p>
                        </div>
                        {viewingProject.keyFeatures?.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-2">Key Features</h3>
                            <div className="flex flex-wrap gap-2">
                                {viewingProject.keyFeatures.map((f, i) => <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{f}</span>)}
                            </div>
                        </div>
                        )}
                        {viewingProject.technologies?.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-2">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {viewingProject.technologies.map((t, i) => <span key={i} className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>)}
                            </div>
                        </div>
                        )}
                        {viewingProject.objectives?.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-2">Objectives</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {viewingProject.objectives.map((o, i) => <li key={i}>{o}</li>)}
                                </ul>
                            </div>
                        )}
                        {viewingProject.challenges?.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-2">Challenges</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {viewingProject.challenges.map((o, i) => <li key={i}>{o}</li>)}
                                </ul>
                            </div>
                        )}
                        {viewingProject.milestones?.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-2">Milestones</h3>
                                <div className="space-y-3">
                                    {viewingProject.milestones.map((m, i) => (
                                        <div key={i} className="flex justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div>
                                                <p className="font-semibold text-sm">{m.name}</p>
                                                <p className="text-xs text-gray-500">{m.date}</p>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded h-fit ${m.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{m.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Add/Edit Project Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        {editingId ? <Settings2 className="text-blue-600"/> : <Plus className="text-blue-600"/> }
                        {editingId ? "Edit Project" : "Add New Project"}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Project Image Map/Cover</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative overflow-hidden h-40">
                                        {formData.image ? (
                                            <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                        ) : (
                                            <div className="space-y-1 text-center flex flex-col items-center">
                                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <span className="font-medium text-blue-600">Upload a file</span>
                                                </div>
                                            </div>
                                        )}
                                        <input required type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Smart City GIS System"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Client/Partner Name</label>
                                    <input required type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Government Infra Dept"/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Category (Sector)</label>
                                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                            <option>Government</option>
                                            <option>Enterprise</option>
                                            <option>Healthcare</option>
                                            <option>Finance</option>
                                            <option>Education</option>
                                            <option>E-Commerce</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Priority Badge</label>
                                        <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                            <option>Critical</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                    <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Project overview..."></textarea>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2"><Calendar size={18}/> Timeline & Progress</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                                            <input required type="month" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"/>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Target Completion</label>
                                            <input required type="month" value={formData.expectedCompletion} onChange={e => setFormData({...formData, expectedCompletion: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Progress Percentage ({formData.progress}%)</label>
                                        <input type="range" min="0" max="100" value={formData.progress} onChange={e => setFormData({...formData, progress: e.target.value})} className="w-full accent-blue-600"/>
                                    </div>
                                </div>

                                <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2"><Settings2 size={18}/> Resources & Output</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Team Size (Members)</label>
                                            <input required type="number" min="1" value={formData.teamSize} onChange={e => setFormData({...formData, teamSize: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"/>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Budget Formatted</label>
                                            <input required type="text" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="$450,000"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Technologies Used (Comma Separated)</label>
                                        <input required type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="React, Node.js, Postgres..."/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Key Features (Comma Separated)</label>
                                        <input required type="text" value={formData.keyFeatures} onChange={e => setFormData({...formData, keyFeatures: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="AI Models, Real-time mapping..."/>
                                    </div>
                                </div>
                                <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4 mt-4">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2"><CheckSquare size={18}/> Expanded Details</h4>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Objectives (Comma Separated)</label>
                                        <input type="text" value={formData.objectives} onChange={e => setFormData({...formData, objectives: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Target 1, Target 2..."/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">Challenges (Comma Separated)</label>
                                        <input type="text" value={formData.challenges} onChange={e => setFormData({...formData, challenges: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Challenge 1, Challenge 2..."/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2">Milestones</label>
                                        <div className="flex gap-2 mb-2">
                                            <input type="text" value={newMilestone.name} onChange={e => setNewMilestone({...newMilestone, name: e.target.value})} placeholder="Milestone Name" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"/>
                                            <select value={newMilestone.status} onChange={e => setNewMilestone({...newMilestone, status: e.target.value})} className="w-32 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white">
                                                <option>Pending</option>
                                                <option>In Progress</option>
                                                <option>Completed</option>
                                            </select>
                                            <input type="month" value={newMilestone.date} onChange={e => setNewMilestone({...newMilestone, date: e.target.value})} className="w-32 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none"/>
                                            <button type="button" onClick={() => {
                                                if(newMilestone.name) {
                                                    setFormData({...formData, milestones: [...formData.milestones, {...newMilestone}]});
                                                    setNewMilestone({ name: "", status: "Pending", date: "" });
                                                }
                                            }} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-200">Add</button>
                                        </div>
                                        {formData.milestones.length > 0 && (
                                            <div className="space-y-2 mt-2">
                                                {formData.milestones.map((m, i) => (
                                                    <div key={i} className="flex justify-between items-center bg-white p-2 border border-gray-200 rounded-md text-xs">
                                                        <span className="font-semibold">{m.name} <span className="text-gray-400 font-normal ml-2">{m.date}</span></span>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600 font-bold">{m.status}</span>
                                                            <button type="button" onClick={() => setFormData({...formData, milestones: formData.milestones.filter((_, idx) => idx !== i)})} className="text-red-500 hover:text-red-700 font-bold">X</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between items-center border-t border-gray-100">
                            {editingId && (
                                <button type="button" onClick={() => { setIsModalOpen(false); setIsFinishModalOpen(true); }} className="px-6 py-3 rounded-xl font-bold bg-green-100 text-green-700 hover:bg-green-200 transition flex items-center gap-2">
                                    <CheckSquare size={18}/> Mark as Finished
                                </button>
                            )}
                            {!editingId && <div></div>}
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all">
                                    {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Add Project"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Finalize Completion Modal */}
        {isFinishModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                    <button onClick={() => setIsFinishModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    <h3 className="text-2xl font-black text-green-700 mb-2 flex items-center gap-2">
                        <CheckSquare className="text-green-600"/> Finalize Completion
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">You are moving <strong>{formData.title}</strong> to Completed Projects. Provide final metrics.</p>
                    
                    <form onSubmit={handleFinishProject} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Completed Date</label>
                                <input required type="text" value={finishData.completedDate} onChange={e => setFinishData({...finishData, completedDate: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. December 2025"/>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Total Duration</label>
                                <input required type="text" value={finishData.duration} onChange={e => setFinishData({...finishData, duration: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 12 months"/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Final Client Rating (1-5)</label>
                                <input required type="number" min="1" max="5" value={finishData.rating} onChange={e => setFinishData({...finishData, rating: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Key Achievements (Comma separated)</label>
                                <input required type="text" value={finishData.achievements} onChange={e => setFinishData({...finishData, achievements: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="500+ Users, 2M+ Transactions..."/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Global Impact / Summary Statement</label>
                                <textarea required value={finishData.impact} onChange={e => setFinishData({...finishData, impact: e.target.value})} className="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none resize-none" placeholder="Describe the overall business impact delivered..."></textarea>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                            <button type="button" onClick={() => setIsFinishModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all">
                                {isSubmitting ? "Finalizing..." : "Save and Update Database"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </AdminLayout>
  );
}
