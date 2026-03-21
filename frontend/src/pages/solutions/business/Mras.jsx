import React from "react";
import { Link } from "react-router-dom";
import mrass from "../../../assets/mrass.avif";
import mrImg from "../../../assets/mr.jfif";
import { Settings, Zap, BarChart3, Wrench } from 'lucide-react';

export default function MRASservies() {
  const features = [
    { icon: Settings, title: "Managed Operations", description: "24/7 operations & monitoring" },
    { icon: Zap, title: "Automation", description: "RPA and workflow automation for efficiency" },
    { icon: BarChart3, title: "Analytics", description: "Business insights and reporting pipelines" },
    { icon: Wrench, title: "Integration & Support", description: "End-to-end integration and SLA-backed support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${mrass})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div>
            {/* <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
              Managed Resilience
            </span> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              MRAS — Managed, Reliable & Automated Services
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
              Reduce operational overhead and increase reliability with managed services, automation and expert support tailored to your environment.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/solutions/digitalsolutions/csi-services" className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold px-10 py-4 rounded-xl hover:from-orange-700 hover:to-amber-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                Explore CS/IT Services
              </Link>
              <Link to="/solutions/gis-solution" className="bg-white text-orange-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                Explore GIS Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Our MRAS Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Why Choose MRAS</h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                We deliver predictable operations, lower MTTR, and continuous improvement through automation and expert-managed services.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">SLA-backed managed operations</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Automation-driven efficiency</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Fast incident response</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Transparent reporting & analytics</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img src={mrImg} alt="Managed Services" className="w-full h-auto rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-orange-900 via-amber-900 to-orange-800 text-white overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">Let us manage your operations</h2>
          <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">Talk to our MRAS team to design a managed services plan that reduces risk and cost.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/solutions/digitalsolutions/csi-services" className="bg-white text-orange-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              See CS/IT
            </Link>
            <Link to="/solutions/gis-solution" className="bg-white/20 border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white/30 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              See GIS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}