import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Users, Clock, CheckCircle, Target, Award, TrendingUp, Star } from "lucide-react";

export default function CompletedProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects/${id}`)
      .then(res => res.json())
      .then(data => {
        if(data.message === "Project not found") setProject(null);
        else setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch project", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
      return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          </div>
      );
  }

  // If project not found, show error
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects/completed")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Back to Completed Projects
          </button>
        </div>
      </div>
    );
  }

  const getRatingStars = (rating) => {
    return Array(rating).fill("⭐").join("");
  };

  const getRatingColor = (rating) => {
    if (rating === 5) return "bg-green-100 text-green-700 border-green-300";
    if (rating === 4) return "bg-blue-100 text-blue-700 border-blue-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section with Project Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-green-900/80 to-emerald-900/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/projects/completed")}
              className="mb-6 flex items-center gap-2 text-white hover:text-green-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Completed Projects</span>
            </button>

            {/* Title and Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-green-500/20 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full text-sm font-bold border border-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border backdrop-blur-sm ${getRatingColor(project.rating)}`}>
                {getRatingStars(project.rating)} {project.rating}/5
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
              {project.title}
            </h1>
            
            <p className="text-xl text-green-200 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {project.client}
            </p>

            {/* Success Badge */}
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <p className="text-green-300 font-bold text-lg">{project.impact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Calendar className="w-10 h-10 text-green-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Completed</p>
            <p className="text-xl font-bold text-slate-900">{project.completedDate}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Clock className="w-10 h-10 text-blue-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Duration</p>
            <p className="text-xl font-bold text-slate-900">{project.duration}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Users className="w-10 h-10 text-primary mb-3" />
            <p className="text-sm text-slate-600 mb-1">Team Size</p>
            <p className="text-xl font-bold text-slate-900">{project.teamSize} Members</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <DollarSign className="w-10 h-10 text-emerald-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Budget</p>
            <p className="text-xl font-bold text-slate-900">{project.budget}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Project Overview
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg mb-4">
                {project.fullDescription || project.description}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800 font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Key Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-bold text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges Overcome */}
            {project.challenges?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Challenges Overcome
              </h2>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Results Achieved */}
            {project.results?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Measurable Results
              </h2>
              <div className="space-y-3">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Client Testimonial */}
            {project.clientTestimonial && project.clientTestimonial.quote && (
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
              <p className="text-blue-100 text-lg italic mb-6 leading-relaxed">
                "{project.clientTestimonial.quote}"
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-lg">{project.clientTestimonial.author}</p>
                <p className="text-blue-200">{project.clientTestimonial.position}</p>
              </div>
            </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Key Metrics */}
            {project.keyMetrics?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Metrics</h3>
              <div className="space-y-4">
                {project.keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{metric.icon}</span>
                      <span className="text-2xl font-bold text-green-600">{metric.value}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* ROI */}
              {project.roi && (
              <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
                <h4 className="text-lg font-bold mb-2">Return on Investment</h4>
                <p className="text-3xl font-black">{project.roi}</p>
              </div>
              )}
            </div>
            )}

            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Ready for Your Project?</h3>
              <p className="text-purple-100 mb-6">
                Let's discuss how we can deliver similar results for your organization.
              </p>
              <button 
                onClick={() => navigate("/contact/touch")}
                className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all shadow-lg"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
