import React from "react";
import { ShieldCheck, UserCheck, FileText, Download, AlertCircle } from "lucide-react";

const CodeOfConduct = () => {
  const sections = [
    {
      title: "WHAT IS CODE OF CONDUCT",
      icon: <FileText className="w-10 h-10 text-indigo-600" />,
      content:
        "Code of Conduct is a set of guidelines which illustrates the principles and commitments which are to be undertaken by everyone associated with TheContractum and its Operating Companies.\n\nMain purpose of this Code of Conduct is to state TheContractum’s commitment to these ethical principles under all circumstances, and in particular to:\n1. Compliance to rules, regulations and local laws of India/any Country where TheContractum operates.\n2. Play role with professionalism, ethics and integrity under all circumstances.\n3. Be just, fair and polite in relationships with fellow employees.\n4. Respect the interests of all stakeholders (colleagues, customers, business partners, government authorities and community).",
      bgColor: "bg-indigo-50/50",
      accent: "border-indigo-200",
    },
    {
      title: "APPLICABILITY",
      icon: <UserCheck className="w-10 h-10 text-blue-600" />,
      content:
        "This Code of Conduct is applicable to everyone who is directly or indirectly associated with TheContractum. This includes but not limited to Board of Directors, top Managements, managers, employees, associates of every company belonging to the TheContractum across Globe.\n\nThe Managements of TheContractum and its Operating Companies are accountable for making sure that this Code of Code is distributed, explained, understood and complied by all the employees without fail.\n\nThis Code of Conduct shall supersede any other existing Code of Conduct/Policy executed by the Operating Companies.\n\nThis Code of Conduct shall be in effect from 1 Oct 2021.",
      bgColor: "bg-blue-50/50",
      accent: "border-blue-200",
    },
    {
      title: "RESPONSIBILITY",
      icon: <ShieldCheck className="w-10 h-10 text-cyan-600" />,
      content:
        "You are expected to carefully read and fully comply to this Code of Conduct. You are expected to seek clarity by asking questions. In case you are not clear on steps to be taken, you must discuss it with your manager or Human Resources team.\n\nWe would appreciate, if you happen to witness violation of this Code of Conduct, you should report to the appropriate authority, or at legal@theContractum.com.",
      bgColor: "bg-cyan-50/50",
      accent: "border-cyan-200",
    },
    {
      title: "ZERO TOLERANCE",
      icon: <AlertCircle className="w-10 h-10 text-slate-600" />,
      content:
        "All employees, and managers in particular, are responsible for creating an environment that both facilitates open discussion of issues and makes it easy and comfortable to raise concerns; without a fear of reprisal.\n\nThere will be zero tolerance to non-compliance of the Code of Conduct. I assure you that your calls and written communications will always be dealt with confidentially.",
      bgColor: "bg-slate-50/50",
      accent: "border-slate-200",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Hero Section */}
      <div className="relative h-[450px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.4] scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="inline-block px-4 py-1.5 bg-indigo-600/20 backdrop-blur-md border border-indigo-400/30 rounded-full text-indigo-300 text-sm font-bold uppercase tracking-widest mb-8">
            Company Policy
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-2xl">
            Code Of Conduct
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Establishing the ethical foundation and behavioral expectations for everyone in TheContractum family.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={`${section.bgColor} p-10 rounded-[2.5rem] border ${section.accent} shadow-sm backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group bg-white/80`}
              >
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="p-5 bg-white rounded-2xl shadow-lg group-hover:bg-indigo-600 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <div className="group-hover:text-white transition-colors duration-500">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-indigo-600 transition-colors">{section.title}</h2>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-line text-lg font-medium">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar / CEO Statement */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500 group-hover:scale-150"></div>
                <div className="relative z-10">
                  <div className="w-12 h-1 bg-indigo-500 mb-8 rounded-full"></div>
                  <h3 className="text-3xl font-black mb-8 leading-tight">
                    Statement by <span className="text-indigo-400">Group CEO</span>
                  </h3>
                  <div className="space-y-6 italic text-slate-300 mb-10 leading-relaxed text-lg border-l-4 border-indigo-500/30 pl-6">
                    <p>"Dear All,</p>
                    <p>
                      We are fully committed to conduct TheContractum’s business with the highest level of integrity in all aspects of our business and we expect strict adherence to guidelines of this Code of Conduct from everyone who is associated with us.
                    </p>
                    <p>
                      I thank you for your commitment to maintain highest standards of integrity and business ethics in everything we do."
                    </p>
                  </div>
                  <div className="flex items-center gap-5 pt-8 border-t border-slate-800">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transform -rotate-3">
                      JS
                    </div>
                    <div>
                      <p className="font-black text-xl tracking-tight uppercase">Jitendra Singh</p>
                      <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Group CEO</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 text-center shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Download className="w-10 h-10 text-indigo-600" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Full Documentation</h4>
                <p className="text-slate-500 mb-8 text-lg font-medium leading-relaxed">Access the complete Code of Conduct digital copy for detailed reference.</p>
                <button className="w-full bg-slate-900 text-white hover:bg-indigo-600 font-black py-5 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group text-lg">
                  <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                  GET DIGITAL COPY
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;
