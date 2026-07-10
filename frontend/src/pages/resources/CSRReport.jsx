import React from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Leaf, Users, Shield, Globe, Award, Target, BarChart, CheckCircle2 } from 'lucide-react';

const CSRReport = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Premium Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
            alt="Nature Background" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-white"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-emerald-500/30">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-bold uppercase tracking-widest text-xs">Sustainability Report 2024</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
            Impact & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Responsibility</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Our annual comprehensive report on environmental stewardship, social equity, and corporate governance.
          </p>
          
          {/* The ONLY button on the page as requested */}
          <Link to="/resources/csr-report/download" className="group relative px-12 py-5 bg-white text-slate-900 font-black rounded-2xl shadow-2xl hover:bg-emerald-50 transition-all duration-500 transform hover:-translate-y-2 inline-flex items-center gap-4 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Download className="relative z-10 w-6 h-6 group-hover:bounce" />
            <span className="relative z-10 text-lg">Download Full PDF Report</span>
          </Link>
        </div>
      </section>

      {/* Lengthy Content Sections */}
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32">
        
        {/* Executive Summary */}
        <section className="relative">
          <div className="absolute -left-12 top-0 text-slate-100 text-9xl font-black select-none z-0">01</div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
              <FileText className="text-emerald-600 w-10 h-10" />
              Executive Summary
            </h2>
            <div className="prose prose-lg text-slate-600 leading-relaxed font-light">
              <p className="mb-6 text-xl text-slate-800 font-medium">
                At The Contractum, we believe that business growth and social responsibility are inexorably linked. 
              </p>
              <p className="mb-6">
                In 2024, we reached a major milestone in our commitment to global sustainability. This report provides a detailed account of our efforts to integrate environmental, social, and governance (ESG) principles into every facet of our operations. From optimizing our supply chain to fostering a diverse and inclusive workplace, we are dedicated to creating long-term value for all our stakeholders.
              </p>
              <p>
                Our vision for the future is clear: to be a catalyst for positive change in the technology sector and beyond. We invite you to explore our progress and join us on this journey toward a more sustainable and equitable world.
              </p>
            </div>
          </div>
        </section>

        {/* Environmental Stewardship */}
        <section className="relative">
          <div className="absolute -left-12 top-0 text-slate-100 text-9xl font-black select-none z-0">02</div>
          <div className="relative z-10 bg-emerald-50/50 p-12 rounded-[32px] border border-emerald-100 shadow-sm transition-all hover:shadow-xl hover:border-emerald-200">
            <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
              <Leaf className="text-emerald-600 w-10 h-10" />
              Environmental Stewardship
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800">Carbon Neutrality Roadmap</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We have successfully reduced our operational carbon footprint by 45% since 2021 through the adoption of renewable energy sources and the implementation of energy-efficient technologies across our global data centers. Our goal remains set on obtaining 100% carbon neutrality by the end of 2027.
                </p>
                <div className="flex items-center gap-3 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>45% reduction achieved</span>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800">Zero-Waste Initiative</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Our circular economy program has diverted 8,500 tons of e-waste from landfills. By refurbishing and repurposing server components, we are extending the lifecycle of our hardware and reducing the demand for raw material extraction.
                </p>
                <div className="flex items-center gap-3 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>8,500 tons diverted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Impact */}
        <section className="relative">
          <div className="absolute -left-12 top-0 text-slate-100 text-9xl font-black select-none z-0">03</div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
              <Users className="text-blue-600 w-10 h-10" />
              Empowering Communities
            </h2>
            <div className="space-y-12">
              <div className="prose prose-lg text-slate-600 leading-relaxed font-light max-w-none">
                <p>
                  Our commitment to community extends beyond traditional philanthropy. We invest in education, healthcare, and digital inclusion programs that empower individuals and foster resilient societies. In 2024, our global workforce contributed over 50,000 hours of volunteer service to projects ranging from building local schools to mentoring aspiring tech professionals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-lg transition-all">
                  <Globe className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-3xl font-black text-slate-900 mb-2">150+</h4>
                  <p className="text-sm text-slate-600 uppercase tracking-widest font-bold">Villages Reach</p>
                </div>
                <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-lg transition-all">
                  <Target className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-3xl font-black text-slate-900 mb-2">5,000+</h4>
                  <p className="text-sm text-slate-600 uppercase tracking-widest font-bold">Students Trained</p>
                </div>
                <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-lg transition-all">
                  <Shield className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-3xl font-black text-slate-900 mb-2">100%</h4>
                  <p className="text-sm text-slate-600 uppercase tracking-widest font-bold">Data Privacy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance & Transparency */}
        <section className="relative">
          <div className="absolute -left-12 top-0 text-slate-100 text-9xl font-black select-none z-0">04</div>
          <div className="relative z-10 bg-slate-50 p-12 rounded-[32px] border border-slate-200 shadow-sm transition-all hover:shadow-2xl hover:bg-white">
            <h2 className="text-4xl font-black mb-8 flex items-center gap-4 text-slate-900">
              <Shield className="text-slate-700 w-10 h-10" />
              Governance & Ethics
            </h2>
            <div className="prose prose-lg text-slate-600 leading-relaxed font-light mb-12">
              <p>
                Transparency and accountability are the foundations of our corporate culture. We maintain rigorous standards for ethical conduct, risk management, and regulatory compliance. Our board of directors provides independent oversight to ensure that our operations remain aligned with our core values and the long-term interests of our stakeholders.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                "100% adherence to global anti-corruption standards",
                "Regular independent audits of financial and ethical practices",
                "Robust whistleblower protection programs",
                "Comprehensive stakeholder engagement framework",
                "Full compliance with international labor laws"
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-4 text-slate-800">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="font-medium text-lg">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Goals */}
        <section className="relative text-center py-12">
          <div className="inline-flex items-center gap-2 text-emerald-600 mb-6 font-bold uppercase tracking-widest text-sm">
            <BarChart className="w-5 h-5" />
            <span>Looking Ahead</span>
          </div>
          <h2 className="text-5xl font-black mb-12">Our Vision for 2030</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform">
              <h4 className="text-2xl font-bold mb-4">Carbon Negative Operations</h4>
              <p className="text-emerald-50 leading-relaxed font-light opacity-90">
                To move beyond neutrality and actively remove more carbon from the atmosphere than we emit, utilizing next-gen DAC technologies.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform">
              <h4 className="text-2xl font-bold mb-4">Global Digital Equity</h4>
              <p className="text-slate-300 leading-relaxed font-light opacity-90">
                To connect the final billion people to high-speed internet and digital services, bridging the global digital divide once and for all.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer-like statement (No navigation buttons) */}
      <footer className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Globe className="w-16 h-16 text-emerald-400 mx-auto mb-8 opacity-50" />
          <h3 className="text-3xl font-black mb-6">Together for a Better World</h3>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            The Contractum remains committed to the principles of sustainability and humanity. This report serves as our pledge to continue striving for excellence in all that we do.
          </p>
          <div className="mt-12 text-sm text-slate-600 uppercase tracking-[0.2em]">
            © 2024 The Contractum Inc. | Sustainability Office
          </div>
        </div>
      </footer>

    </div>
  );
};

export default CSRReport;
