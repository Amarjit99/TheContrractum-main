import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, CheckCircle, Target, Award, TrendingUp, Lightbulb, Zap, Star } from "lucide-react";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CaseStudyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/case-studies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setCaseStudy(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch case study details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center font-bold text-slate-600">Loading Case Study...</div>
      </div>
    );
  }

  // If case study not found, show error
  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate("/projects/case-studies")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all"
          >
            Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={caseStudy.image} 
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-purple-900/80 to-indigo-900/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/projects/case-studies")}
              className="mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Case Studies</span>
            </button>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {caseStudy.featured && (
                <span className="bg-purple-500/20 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-full text-sm font-bold border border-purple-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Featured
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {caseStudy.industry}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl text-purple-200 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {caseStudy.client}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Calendar className="w-10 h-10 text-purple-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Project Duration</p>
            <p className="text-xl font-bold text-slate-900">{caseStudy.duration}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Users className="w-10 h-10 text-indigo-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Team Size</p>
            <p className="text-xl font-bold text-slate-900">{caseStudy.teamSize} Members</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Full Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-purple-600 rounded"></div>
                Case Study Overview
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {caseStudy.fullDescription}
              </p>
            </div>

            {/* The Challenge */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-purple-600 rounded"></div>
                The Challenge
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                {caseStudy.challenge}
              </p>
              {caseStudy.challenges_detailed && caseStudy.challenges_detailed.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 mb-3">Key Challenges:</h3>
                  {caseStudy.challenges_detailed.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{challenge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* The Solution */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-purple-600 rounded"></div>
                Our Solution
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {caseStudy.solution}
              </p>
            </div>

            {/* Implementation Phases */}
            {caseStudy.implementation && caseStudy.implementation.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-purple-600 rounded"></div>
                  Implementation Timeline
                </h2>
                <div className="space-y-4">
                  {caseStudy.implementation.map((phase, index) => (
                    <div key={index} className="relative pl-8 pb-4 border-l-2 border-purple-300 last:border-l-0 last:pb-0">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 border-2 border-white"></div>
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-slate-900">{phase.phase}</h3>
                          <span className="text-sm text-purple-600 font-semibold">{phase.duration}</span>
                        </div>
                        <p className="text-sm text-slate-700">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Objectives */}
            {caseStudy.keyObjectives && caseStudy.keyObjectives.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-purple-600 rounded"></div>
                  Project Objectives
                </h2>
                <div className="space-y-3">
                  {caseStudy.keyObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results & Impact */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-purple-600 rounded"></div>
                Results & Impact
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {(caseStudy.results || []).map((result, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-bold">{result}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600">
                <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-slate-700 leading-relaxed font-medium">
                  {caseStudy.impact}
                </p>
              </div>
            </div>

            {/* Business Value */}
            {caseStudy.businessValue && (caseStudy.businessValue.roi || caseStudy.businessValue.costSavings || caseStudy.businessValue.revenueImpact || caseStudy.businessValue.efficiency) && (
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Business Value Delivered</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-purple-200 text-sm mb-1">Return on Investment</p>
                    <p className="text-2xl font-bold">{caseStudy.businessValue.roi}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-purple-200 text-sm mb-1">Cost Savings</p>
                    <p className="text-2xl font-bold">{caseStudy.businessValue.costSavings}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-purple-200 text-sm mb-1">Revenue Impact</p>
                    <p className="text-2xl font-bold">{caseStudy.businessValue.revenueImpact}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-purple-200 text-sm mb-1">Efficiency Gain</p>
                    <p className="text-2xl font-bold">{caseStudy.businessValue.efficiency}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Client Testimonial */}
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
                "{caseStudy.testimonial}"
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-lg">{caseStudy.testimonialAuthor}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Key Metrics */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 sticky top-24">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Metrics</h3>
                <div className="space-y-4">
                  {caseStudy.metrics.map((metric, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{metric.icon}</span>
                        <span className="text-2xl font-bold text-purple-600">{metric.value}</span>
                      </div>
                      <p className="text-slate-700 font-medium">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {(caseStudy.technologies || []).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards */}
            {caseStudy.awards && (
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white">
                <Award className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-bold mb-4">Awards & Recognition</h3>
                <div className="space-y-2">
                  {caseStudy.awards.map((award, index) => (
                    <div key={index} className="flex items-start gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Ready for Similar Results?</h3>
              <p className="text-green-100 mb-6">
                Let's discuss how we can deliver transformative results for your organization.
              </p>
              <button 
                onClick={() => navigate("/contact/touch")}
                className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-lg"
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
