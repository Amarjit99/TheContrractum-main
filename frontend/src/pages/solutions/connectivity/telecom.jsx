import React from 'react';
import { Link } from 'react-router-dom';
import DynamicServices from "../../../components/DynamicServices";
import telecom from "../../../assets/telecom.jpeg";
import {
  Network,
  Server,
  Wifi,
  Cable,
  PhoneCall,
  Activity,
  Shuffle,
  Share2,
  ShieldCheck,
  Lock,
  Download,
  Send
} from 'lucide-react';

export default function TelecomSolutions() {
  const servicesList = [
    { icon: Network, title: "LAN/WAN Design", id: "A" },
    { icon: Server, title: "Data Center / Core Networking", id: "B" },
    { icon: Wifi, title: "Wireless LAN", id: "C" },
    { icon: Cable, title: "Wired LAN Solution", id: "D" },
    { icon: PhoneCall, title: "VoIP", id: "E" },
    { icon: Activity, title: "Quality of Services (QoS)", id: "F" },
    { icon: Shuffle, title: "Routing", id: "G" },
    { icon: Share2, title: "Switching and Distribution", id: "H" },
    { icon: ShieldCheck, title: "VPN", id: "I" },
    { icon: Lock, title: "Firewall", id: "J" },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[650px] flex items-center" style={{ backgroundImage: `url(${telecom})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-widest mb-6 border border-orange-500/30 backdrop-blur-md">
              Connecting the World
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
              Advanced <span className="text-orange-500">Telecommunication</span> Engineering
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl drop-shadow-2xl font-medium">
              TheContractum engineers use technical expertise to provide communication and information transfer solutions, from wireless telephony to broadband technologies. We handle everything from feasibility exercises to technical documentation.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/contact/quote"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
              >
                <Send size={20} />
                Apply Now
              </Link>
              <Link
                to="/solutions/download?service=telecom"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all border border-white/20 backdrop-blur-md flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
              >
                <Download size={20} />
                Download PDF
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services List Section */}
      <div className="bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Core Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Telecom Engineering Portfolio</h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We cover all aspects of service delivery, ensuring connectivity and operational documentation for major infrastructure projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 group hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                      <Icon size={28} />
                    </div>
                    <div>
                      <div className="text-orange-600 font-bold text-xs uppercase mb-1">COMPONENT {service.id}</div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors">{service.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl -rotate-2"></div>
              <img
                src={telecom}
                alt="Telecom Engineering"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl relative z-10 border-8 border-white"
              />
            </div>

            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
                Technical Expertise
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Engineering Solutions for Global Connectivity
              </h2>

              <div className="space-y-6">
                {[
                  "Feasibility exercises & connectivity planning",
                  "Wireless, radio & satellite communications",
                  "Feasibility studies & internet broadband tech",
                  "Detailed technical & operational documentation"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">
                      ✓
                    </div>
                    <span className="font-bold text-lg text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 relative py-20 lg:py-32 overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-25">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
            Build Your <span className="text-orange-500">Connected Future</span>
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Our telecom engineers are involved across all aspects of service delivery with tight deadlines and well-defined milestones.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/contact/quote"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-orange-500/40 text-lg"
            >
              Start Project
            </Link>
            <Link
              to="/solutions/download?service=telecom"
              className="bg-white/5 hover:bg-white/10 text-white font-bold px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg"
            >
              Download Profile (PDF)
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Content from CMS */}
      <DynamicServices category="Connectivity Solutions" subCategory="Telecommunication" />
    </div>
  );
}