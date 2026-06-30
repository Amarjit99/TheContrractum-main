import React from 'react';
import { Link } from 'react-router-dom';
import DynamicServices from "../../../components/DynamicServices";
import cloud from "../../../assets/cloud.webp";
import {
  Cloud as CloudIcon,
  Settings,
  RefreshCw,
  ShieldCheck,
  Server,
  Layers,
  Globe,
  Database,
  Zap,
  Lock,
  BarChart3,
  Activity,
  FileCheck,
  CloudLightning,
  Network,
  Download,
  Send
} from 'lucide-react';

export default function Cloud() {
  const servicesList = [
    { icon: Settings, title: "Cloud Strategy & Consulting", id: "01" },
    { icon: Server, title: "Infrastructure as a Service (IaaS)", id: "02" },
    { icon: Layers, title: "Platform as a Service (PaaS)", id: "03" },
    { icon: Globe, title: "Software as a Service (SaaS)", id: "04" },
    { icon: CloudIcon, title: "Public, Private & Hybrid Cloud", id: "05" },
    { icon: RefreshCw, title: "Cloud Migration Services", id: "06" },
    { icon: ShieldCheck, title: "Cloud Security & Compliance", id: "07" },
    { icon: Database, title: "Cloud Backup & Disaster Recovery", id: "08" },
    { icon: Network, title: "Multi-Cloud Management", id: "09" },
    { icon: CloudLightning, title: "Serverless Architecture", id: "10" },
    { icon: BarChart3, title: "Cloud Cost Optimization", id: "11" },
    { icon: Activity, title: "Managed Cloud Operations", id: "12" },
    { icon: FileCheck, title: "Cloud Governance & Risk", id: "13" },
    { icon: RefreshCw, title: "Data Modernization on Cloud", id: "14" },
    { icon: Network, title: "Cloud Connectivity Solutions", id: "15" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[650px] flex items-center" style={{ backgroundImage: `url(${cloud})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 rounded-full bg-sky-500/20 text-sky-400 text-sm font-bold uppercase tracking-widest mb-6 border border-sky-500/30 backdrop-blur-md">
              Enterprise Cloud Intelligence
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
              Next-Gen <span className="text-sky-500">Cloud</span> Transformation
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl drop-shadow-2xl font-medium">
              Empower your business with scalable, secure, and highly available cloud infrastructure. TheContractum provides comprehensive cloud solutions from initial strategy to 24/7 managed operations.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/contact/quote"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-sky-500/25 flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
              >
                <Send size={20} />
                Apply Now
              </Link>
              <Link
                to="/solutions/download?service=cloud"
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
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-bold uppercase tracking-wider mb-4">
              Cloud Service Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Explore Our Cloud Solutions</h2>
            <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 group hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-sky-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                      <Icon size={28} />
                    </div>
                    <div>
                      <div className="text-sky-600 font-bold text-xs uppercase mb-1">SERVICE {service.id}</div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{service.title}</h3>
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
              <div className="absolute -inset-4 bg-sky-500/10 rounded-3xl -rotate-2"></div>
              <img
                src={cloud}
                alt="Cloud Impact"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl relative z-10 border-8 border-white"
              />
            </div>

            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-bold uppercase tracking-wider mb-4">
                Scalable & Secure
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Modernize Your Infrastructure with Cloud Expertise
              </h2>

              <div className="space-y-6">
                {[
                  "Zero-downtime migration and rapid deployment",
                  "Integrated security & identity management",
                  "Auto-scaling & self-healing architecture",
                  "Multi-cloud orchestration for maximum resilience"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold shrink-0">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
            Accelerate Your <span className="text-sky-500">Cloud Adoption</span>
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Partner with our cloud architects to build a resilient and cost-optimized infrastructure that powers your digital transformation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/contact/quote"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-sky-500/40 text-lg"
            >
              Consult an Architect
            </Link>
            <Link
              to="/solutions/info?service=cloud"
              className="bg-white/5 hover:bg-white/10 text-white font-bold px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg"
            >
              Get Cloud Portfolio (PDF)
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Content from CMS */}
      <DynamicServices category="Connectivity Solutions" subCategory="Cloud Integration" />
    </div>
  );
}