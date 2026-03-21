import React from "react";
import { Lightbulb, Users, TrendingUp, Building, Heart, Coffee, Quote, Briefcase, Sparkles } from "lucide-react";
import cultureHero from "../../assets/culture.webp";
import workEnv1 from "../../assets/life.webp";
import workEnv2 from "../../assets/people.webp";
import workEnv3 from "../../assets/benefits.webp";

export default function Culture() {
    return (
    <div className="w-full bg-white text-black min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${cultureHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div>
            {/* <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
              Our Culture & Values
            </span> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              Life at The Contrractum
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
              Where innovation, collaboration, and growth create a thriving workplace culture
            </p>
            <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold px-10 py-4 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Explore Our Culture
            </button>
          </div>
        </div>
      </div>

      {/* ================= CULTURE SECTION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
              Core Values
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">
              Our Culture
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Innovation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We empower creative thinking and encourage bold ideas that shape
                the future.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Collaboration
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Teamwork drives our success. We grow together and support each
                other.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-slate-900">
                Growth
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Continuous learning and development help our team reach their
                full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WORK ENVIRONMENT ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Workplace
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">
              Work Environment
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our workspace is built for productivity, creativity, and balance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={workEnv1}
                alt="Office"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mb-3">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Modern Office</h3>
                <p className="text-gray-200 text-sm">State-of-the-art workspace designed for collaboration</p>
              </div>
            </div>
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={workEnv2}
                alt="Teamwork"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Team Collaboration</h3>
                <p className="text-gray-200 text-sm">Working together to achieve exceptional results</p>
              </div>
            </div>
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={workEnv3}
                alt="Workspace"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Work-Life Balance</h3>
                <p className="text-gray-200 text-sm">Flexible environment promoting wellbeing and productivity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
              Team Voices
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">
              What Our Team Says
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Hear from the people who make our culture thrive
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-teal-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    "The culture here motivates me to push boundaries and grow professionally."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Jane Doe</p>
                      <p className="text-sm text-slate-600">Product Lead</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-cyan-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    "Flexible work and supportive leadership make it an inspiring place to work."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">John Smith</p>
                      <p className="text-sm text-slate-600">Software Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            Join Our Team
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-lg">
            Be part of a culture that celebrates innovation and collaboration
          </p>

          <button className="group inline-flex items-center gap-3 bg-white text-teal-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:scale-105 transform transition-all duration-300 shadow-2xl">
            <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Explore Careers
            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </section>

    </div>
  );
}
