import React from 'react';
import gsi from "../../../assets/gsi.jpg";
import { Map, Database, BarChart3, Globe } from 'lucide-react';

export default function Gissolution() {
  const features = [
    {
      icon: Map,
      title: "Geospatial Mapping",
      description: "Interactive maps and spatial data visualization solutions",
    },
    {
      icon: Database,
      title: "Spatial Data Management",
      description: "Capture, organize, and maintain accurate geographic datasets",
    },
    {
      icon: BarChart3,
      title: "Location Intelligence",
      description: "Transform location data into actionable business insights",
    },
    {
      icon: Globe,
      title: "GIS Consulting Services",
      description: "Expert guidance for GIS strategy, deployment, and optimization",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${gsi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div>
            {/* <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
              Geographic Information Systems
            </span> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              GIS Solutions for Smarter Spatial Decisions
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
              Leverage the power of location intelligence with our advanced GIS solutions. We help organizations visualize, analyze, and interpret spatial data to improve planning, optimize resources, and drive informed decision-making.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold px-10 py-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                Request Consultation
              </button>
              <button className="bg-white text-emerald-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                Explore Capabilities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-6">
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

      {/* Use Cases Section */}
      <div className="bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src={gsi}
                alt="GIS Applications"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4">
                GIS Applications
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                Where GIS Creates Business Impact
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                Our GIS solutions empower organizations to understand spatial relationships, monitor assets, and make data-driven decisions with greater clarity and precision.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-emerald-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Infrastructure & utility mapping</span>
                </li>

                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-emerald-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Urban planning & smart city analytics</span>
                </li>

                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-emerald-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Logistics & route optimization</span>
                </li>

                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-emerald-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Environmental & risk assessment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-800 text-white overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">
            Ready to Transform Your Spatial Data?
          </h2>

          <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover how our GIS solutions can help you visualize opportunities, optimize operations, and make smarter location-driven decisions.
          </p>

          <button className="bg-white text-emerald-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
            Request GIS Consultation
          </button>
        </div>
      </div>
    </div>
  );
}