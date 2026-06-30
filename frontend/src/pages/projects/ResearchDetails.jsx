import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Award, TrendingUp, Users, BookOpen, Shield, Tag, Globe, RefreshCw, AlertCircle } from "lucide-react";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ResearchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/research/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Research project not found");
        return res.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch research details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <RefreshCw className="animate-spin text-cyan-600 mb-4" size={40} />
        <p className="text-gray-500 font-semibold tracking-wide">Loading Research Project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-md border border-slate-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Not Found</h1>
          <p className="text-slate-500 mb-6">The research project you are looking for does not exist or was removed.</p>
          <button
            onClick={() => navigate("/projects/research")}
            className="bg-cyan-600 text-white px-6 py-3 rounded-xl hover:bg-cyan-700 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            Back to Research
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-800 to-indigo-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/90 via-blue-900/80 to-indigo-950/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/projects/research")}
              className="mb-6 flex items-center gap-2 text-white hover:text-cyan-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Research & Innovation</span>
            </button>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.featured && (
                <span className="bg-purple-500/20 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-full text-sm font-bold border border-purple-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Featured Research
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
                {project.category}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${
                project.status === 'Published' ? 'bg-green-500/20 text-green-300 border-green-400' :
                project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-300 border-blue-400' :
                'bg-yellow-500/20 text-yellow-300 border-yellow-400'
              }`}>
                {project.status}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl max-w-4xl leading-tight">
              {project.title}
            </h1>
            
            {project.fundingAmount && (
              <p className="text-xl text-cyan-200 mb-6 flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Funding Amount: {project.fundingAmount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Calendar className="w-10 h-10 text-cyan-600 mb-3" />
            <p className="text-sm text-slate-500 mb-1">Timeline</p>
            <p className="text-lg font-bold text-slate-800">
              {project.startDate || "N/A"} - {project.completionDate || "Ongoing"}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 col-span-2">
            <BookOpen className="w-10 h-10 text-indigo-600 mb-3" />
            <p className="text-sm text-slate-500 mb-1">Citation</p>
            <p className="text-base font-medium text-slate-700 italic line-clamp-2">
              {project.citation || "No citation registered."}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description / Abstract */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-cyan-600 rounded"></div>
                Research Abstract
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Key Findings */}
            {project.keyFindings && project.keyFindings.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-cyan-600 rounded"></div>
                  Key Findings & Outcomes
                </h2>
                <div className="space-y-3">
                  {project.keyFindings.map((finding, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {project.publications && project.publications.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-cyan-600 rounded"></div>
                  Scientific Publications
                </h2>
                <div className="space-y-3">
                  {project.publications.map((pub, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{pub}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patents */}
            {project.patents && project.patents.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-cyan-600 rounded"></div>
                  Patents & IP Registered
                </h2>
                <div className="space-y-3">
                  {project.patents.map((patent, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{patent}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-cyan-600" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Research Team */}
            {project.team && project.team.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-600" />
                  Research Team
                </h3>
                <ul className="space-y-2">
                  {project.team.map((member, index) => (
                    <li key={index} className="text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Collaborators */}
            {project.collaborators && project.collaborators.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-600" />
                  Collaborators & Partners
                </h3>
                <ul className="space-y-2">
                  {project.collaborators.map((partner, index) => (
                    <li key={index} className="text-sm font-medium text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Global Impact Box */}
            {project.impact && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-600" />
                  Global Impact
                </h3>
                <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed whitespace-pre-line">
                  {project.impact}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
