import React from "react";
import { Link } from "react-router-dom";
import { Target, Globe, TrendingUp, Users, Lightbulb, Shield, Rocket, ArrowRight } from "lucide-react";
import visin from "../../assets/visin.png";

export default function Vision() {
  const strategicPillars = [
    {
      title: "Client-Centric Execution",
      description: "We align every engagement with business outcomes, speed, and measurable impact.",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Innovation at Scale",
      description: "We continuously invest in modern solutions that improve reliability, agility, and growth.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-amber-500 to-orange-400",
    },
    {
      title: "Trusted Governance",
      description: "We ensure quality, security, and transparency through disciplined delivery standards.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "Global Collaboration",
      description: "We build strong partnerships across regions to deliver value consistently and responsibly.",
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500 to-pink-400",
    },
  ];

  const roadmap = [
    {
      year: "2026",
      goal: "Expand high-impact delivery capabilities across priority sectors and regions.",
      number: "01",
    },
    {
      year: "2027",
      goal: "Scale AI-enabled solutions and strengthen strategic alliances with technology leaders.",
      number: "02",
    },
    {
      year: "2028",
      goal: "Lead with sustainable innovation and become the preferred long-term transformation partner.",
      number: "03",
    },
  ];

  const impactStats = [
    { metric: "75+", label: "Countries Served", icon: <Globe className="w-8 h-8" />, color: "from-blue-600 to-blue-400" },
    { metric: "10K+", label: "Enterprise Clients", icon: <Users className="w-8 h-8" />, color: "from-purple-600 to-purple-400" },
    { metric: "$5B+", label: "Client Value Created", icon: <TrendingUp className="w-8 h-8" />, color: "from-emerald-600 to-emerald-400" },
    { metric: "25K+", label: "Skilled Professionals", icon: <Target className="w-8 h-8" />, color: "from-orange-600 to-orange-400" },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <section
        className="relative min-h-[540px] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${visin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/60 to-blue-900/50"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">
        
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black max-w-4xl leading-tight mb-6 animate-slide-up text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100" style={{ animation: "slideUp 0.8s ease-out 0.1s backwards" }}>
            Building the Future of Business Through Trusted Technology
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-3xl leading-relaxed mb-8 animate-fade-in" style={{ animation: "fadeIn 0.8s ease-out 0.2s backwards" }}>
            We envision a world where every organization can innovate confidently, scale responsibly, and create long-term value.
          </p>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* 2. Vision Statement */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 animate-fade-in" style={{ animation: "fadeIn 0.8s ease-out" }}>Vision Statement</h2>
          <div className="inline-block px-8 py-6 bg-gradient-to-br from-white to-slate-100 rounded-3xl border border-blue-200/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <p className="text-xl sm:text-2xl bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-relaxed font-bold">
              "To empower organizations worldwide with practical innovation, strategic partnerships, and reliable execution that drives sustainable growth."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Strategic Pillars */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 animate-slide-up" style={{ animation: "slideUp 0.8s ease-out" }}>Strategic Pillars</h2>
            <p className="text-gray-600 text-lg font-medium">The principles that guide how we execute and grow.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {strategicPillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                style={{ animation: "slideUp 0.8s ease-out backwards", animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Card Container */}
                <div className="relative p-8 rounded-2xl border border-slate-200/60 bg-white shadow-md group-hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                  {/* Icon Container */}
                  <div className={`mb-5 w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {pillar.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-slate-900 to-blue-600 transition-all duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium group-hover:text-slate-700 transition-colors duration-300">
                    {pillar.description}
                  </p>
                  
                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${pillar.color} w-0 group-hover:w-full transition-all duration-500`}></div>
                </div>

                <style>{`
                  @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Roadmap / Future Goals */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Roadmap / Future Goals</h2>
            <p className="text-slate-300 text-lg font-medium">A focused path from expansion to industry leadership.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 cursor-pointer"
                style={{ animation: "slideUp 0.8s ease-out backwards", animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md group-hover:border-blue-400/60 transition-all duration-500 h-full flex flex-col">
                  {/* Number Badge */}
                  <div className="text-6xl font-black text-blue-400/30 group-hover:text-blue-300/50 transition-colors duration-300 mb-2">
                    {item.number}
                  </div>

                  {/* Year */}
                  <p className="text-blue-300 font-black text-2xl mb-4 group-hover:text-blue-200 transition-colors duration-300">
                    {item.year}
                  </p>

                  {/* Goal */}
                  <p className="text-slate-200 leading-relaxed font-medium group-hover:text-white transition-colors duration-300 flex-grow">
                    {item.goal}
                  </p>

                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center gap-2 text-blue-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-sm font-semibold">Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <style>{`
                  @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Global Impact Stats */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 animate-slide-up" style={{ animation: "slideUp 0.8s ease-out" }}>Global Impact Stats</h2>
            <p className="text-slate-600 text-lg font-medium">Our progress reflected through measurable outcomes.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                style={{ animation: "slideUp 0.8s ease-out backwards", animationDelay: `${index * 0.1}s` }}
              >
                {/* Subtle gradient overlay (kept for accent) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className={`relative p-8 rounded-2xl bg-slate-900 border border-slate-700 text-center shadow-md group-hover:shadow-xl transition-all duration-500`}>                  
                  {/* Icon Container */}
                  <div className={`flex justify-center mb-5 text-white transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                    {item.icon}
                  </div>

                  {/* Metric */}
                  <p className={`text-4xl font-black text-white mb-2 group-hover:text-5xl transition-all duration-300`}>
                    {item.metric}
                  </p>

                  {/* Label */}
                  <p className="text-slate-300 font-semibold transition-colors duration-300">
                    {item.label}
                  </p>

                  {/* Top accent line (gradient) */}
                  <div className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${item.color} w-0 group-hover:w-full transition-all duration-500`}></div>
                </div>

                <style>{`
                  @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 transform group hover:scale-110 transition-transform duration-500 inline-block">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black mb-6 bg-gradient-to-r from-blue-300 via-white to-cyan-300 bg-clip-text text-transparent animate-slide-up" style={{ animation: "slideUp 0.8s ease-out" }}>
            Let's Build the Future Together
          </h2>
          
          <p className="text-lg text-slate-200 mb-10 font-medium leading-relaxed animate-fade-in" style={{ animation: "fadeIn 0.8s ease-out 0.2s backwards" }}>
            Partner with us to accelerate growth, modernize operations, and unlock sustainable business value.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animation: "fadeIn 0.8s ease-out 0.3s backwards" }}>
            <Link
              to="/contact/touch"
              className="group relative px-8 py-3 font-bold rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/30 group-hover:border-white/60 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-500 group-hover:bg-transparent">
                Contact Us
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>

            <Link
              to="/careers/jobs"
              className="group relative px-8 py-3 font-bold rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/30 group-hover:border-white/60 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-500 group-hover:bg-transparent">
                Explore Opportunities
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </div>
  );
}
