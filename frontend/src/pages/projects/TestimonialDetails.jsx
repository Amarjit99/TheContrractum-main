import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Star, Quote, Calendar, Clock, Tag, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function TestimonialDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/testimonials/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Testimonial not found");
        return res.json();
      })
      .then(data => {
        setTestimonial(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch testimonial details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <RefreshCw className="animate-spin text-amber-600 mb-4" size={40} />
        <p className="text-gray-500 font-semibold tracking-wide">Loading Testimonial...</p>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-md border border-slate-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Testimonial Not Found</h1>
          <p className="text-slate-500 mb-6">The testimonial you are looking for does not exist or was removed.</p>
          <button
            onClick={() => navigate("/projects/testimonials")}
            className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            Back to Testimonials
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <div className="relative h-[480px] overflow-hidden">
        {testimonial.image ? (
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-800 to-orange-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/90 via-amber-950/80 to-yellow-950/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/projects/testimonials")}
              className="mb-6 flex items-center gap-2 text-white hover:text-amber-300 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Testimonials</span>
            </button>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {testimonial.featured && (
                <span className="bg-orange-500/20 backdrop-blur-sm text-orange-300 px-4 py-2 rounded-full text-sm font-bold border border-orange-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Featured Story
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
                {testimonial.industry}
              </span>
              {testimonial.rating && (
                <span className="bg-yellow-500/20 backdrop-blur-sm text-yellow-300 px-4 py-2 rounded-full text-sm font-bold border border-yellow-400 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {testimonial.rating}.0 / 5
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-2xl max-w-4xl leading-tight">
              {testimonial.project || "Digital Innovation Partnership"}
            </h1>

            <div className="flex items-center gap-4 mt-6">
              {testimonial.image && (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover shadow-lg"
                />
              )}
              <div>
                <p className="text-xl font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-amber-200 font-semibold">{testimonial.position} &bull; {testimonial.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonial.projectDuration && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Project Duration</p>
                <p className="text-lg font-bold text-slate-800">{testimonial.projectDuration}</p>
              </div>
            </div>
          )}

          {testimonial.date && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date Shared</p>
                <p className="text-lg font-bold text-slate-800">{testimonial.date}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Industry Sector</p>
              <p className="text-lg font-bold text-slate-800">{testimonial.industry}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* The Quote / Testimonial Statement */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200 relative overflow-hidden">
              <div className="absolute right-6 top-6 text-slate-100 dark:text-slate-50 pointer-events-none">
                <Quote className="w-24 h-24 stroke-[0.5]" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                <div className="w-1 h-8 bg-amber-500 rounded"></div>
                Client Testimonial
              </h2>
              
              <p className="text-slate-700 leading-relaxed text-xl italic relative z-10 pl-4 border-l-4 border-amber-300">
                "{testimonial.testimonial}"
              </p>
            </div>

            {/* Before Context & After Results Details */}
            {(testimonial.beforeContext || testimonial.afterResults) && (
              <div className="grid md:grid-cols-2 gap-8">
                
                {testimonial.beforeContext && (
                  <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      The Challenge (Before)
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {testimonial.beforeContext}
                    </p>
                  </div>
                )}

                {testimonial.afterResults && (
                  <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      The Outcome (After)
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base font-medium">
                      {testimonial.afterResults}
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Right Column - Client Summary Card */}
          <div className="space-y-8">
            <div className="bg-gradient-to-b from-slate-900 to-amber-950 text-white rounded-xl shadow-xl p-8 border border-slate-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Client Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-amber-200 uppercase tracking-wider font-semibold">Client Name</p>
                  <p className="text-lg font-bold">{testimonial.name}</p>
                </div>

                <div>
                  <p className="text-xs text-amber-200 uppercase tracking-wider font-semibold">Job Title</p>
                  <p className="text-base font-semibold">{testimonial.position}</p>
                </div>

                <div>
                  <p className="text-xs text-amber-200 uppercase tracking-wider font-semibold">Organization</p>
                  <p className="text-base font-semibold">{testimonial.company}</p>
                </div>

                <div>
                  <p className="text-xs text-amber-200 uppercase tracking-wider font-semibold">Industry Focus</p>
                  <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mt-1">
                    {testimonial.industry}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
