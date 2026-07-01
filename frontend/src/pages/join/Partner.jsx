import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import p20 from "../../assets/p20.webp";
import p21 from "../../assets/p21.webp";
import { 
  Rocket, 
  Users, 
  Building2, 
  Zap, 
  Globe, 
  Award, 
  Shield, 
  LineChart, 
  GraduationCap, 
  Megaphone, 
  Handshake, 
  UserCheck, 
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Repeat,
  Share2,
  Layers,
  GitMerge,
  Truck,
  Cpu,
  Network,
  UserPlus,
  FileText,
  Coins,
  Settings,
  Wrench,
  TrendingUp,
  Landmark,
  Briefcase,
  Gift
} from "lucide-react";

export default function Partner() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTier, setActiveTier] = useState(null);
  const [livePartners, setLivePartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(`${API}/api/cms/partners`);
        const data = await res.json();
        setLivePartners(Array.isArray(data) ? data.filter(p => p.status === 'Active') : []);
      } catch (err) {
        console.error('Failed to fetch partners:', err);
      } finally {
        setPartnersLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const partnerTypes = [
    { 
      icon: <Sparkles className="w-6 h-6 text-rose-500" />, 
      title: "Strategic Partnership", 
      desc: "Long-term alliances to co-develop products, expand capabilities, and share resources." 
    },
    { 
      icon: <ShoppingBag className="w-6 h-6 text-indigo-500" />, 
      title: "Vendor Partnership", 
      desc: "Supplier alliances providing critical inventory, services, or tools at scale." 
    },
    { 
      icon: <Repeat className="w-6 h-6 text-emerald-500" />, 
      title: "Reseller Partnership", 
      desc: "Authorized distribution models allowing partners to package and sell our services." 
    },
    { 
      icon: <Share2 className="w-6 h-6 text-amber-500" />, 
      title: "Affiliate Partnership", 
      desc: "Performance-based marketing where partners earn commissions per conversion." 
    },
    { 
      icon: <Layers className="w-6 h-6 text-violet-500" />, 
      title: "Franchise Partnership", 
      desc: "Licensing of brand systems, trademarks, and operations for regional scaling." 
    },
    { 
      icon: <GitMerge className="w-6 h-6 text-rose-500" />, 
      title: "Joint Venture (JV) Partnership", 
      desc: "Co-owned entities created to pursue shared strategic goals and market capture." 
    },
    { 
      icon: <Truck className="w-6 h-6 text-cyan-500" />, 
      title: "Distribution Partnership", 
      desc: "Logistical agreements to supply products to new geographic or sector markets." 
    },
    { 
      icon: <Cpu className="w-6 h-6 text-pink-500" />, 
      title: "Technology Partnership", 
      desc: "Hardware, software, and API integrations to deliver co-created capabilities." 
    },
    { 
      icon: <Network className="w-6 h-6 text-teal-500" />, 
      title: "Channel Partnership", 
      desc: "Indirect sales networks selling solutions through third-party consulting channels." 
    },
    { 
      icon: <UserPlus className="w-6 h-6 text-blue-500" />, 
      title: "Referral Partnership", 
      desc: "Reward-driven programs for partners who refer high-quality business leads." 
    },
    { 
      icon: <FileText className="w-6 h-6 text-indigo-500" />, 
      title: "Licensing Partnership", 
      desc: "Authorized usage of proprietary designs, intellectual property, or software patents." 
    },
    { 
      icon: <Award className="w-6 h-6 text-amber-500" />, 
      title: "Co-Branding Partnership", 
      desc: "Combined branding campaigns or products to capture overlapping audiences." 
    },
    { 
      icon: <Megaphone className="w-6 h-6 text-violet-500" />, 
      title: "Marketing Partnership", 
      desc: "Co-sponsored events, guest blogging, and content exchanges for lead generation." 
    },
    { 
      icon: <Coins className="w-6 h-6 text-emerald-500" />, 
      title: "Financial Partnership", 
      desc: "Alliances with banks, credit firms, or investors to enable capital flow." 
    },
    { 
      icon: <Settings className="w-6 h-6 text-rose-500" />, 
      title: "Manufacturing Partnership", 
      desc: "Outsourced fabrication models ensuring quality control and bulk production." 
    },
    { 
      icon: <Wrench className="w-6 h-6 text-cyan-500" />, 
      title: "Service Partnership", 
      desc: "Professional service delivery networks handling deployment and client support." 
    },
    { 
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />, 
      title: "Investment Partnership", 
      desc: "Ventures linking capital providers with growing high-impact business units." 
    },
    { 
      icon: <Landmark className="w-6 h-6 text-indigo-500" />, 
      title: "Public-Private Partnership (PPP)", 
      desc: "Collaborations between public sector agencies and private business units." 
    },
    { 
      icon: <Briefcase className="w-6 h-6 text-teal-500" />, 
      title: "Outsourcing Partnership", 
      desc: "Strategic outsourcing of non-core workflows to specialized agencies." 
    },
    { 
      icon: <Gift className="w-6 h-6 text-pink-500" />, 
      title: "Sponsorship Partnership", 
      desc: "Brand alignment through sponsorship of events, research, and innovation hubs." 
    }
  ];

  const benefits = [
    { 
      icon: <LineChart className="w-6 h-6 text-rose-500" />, 
      title: "High Revenue Share", 
      desc: "Earn industry-best recurring commissions with transparent, upfront payout structures." 
    },
    { 
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />, 
      title: "Dedicated Training", 
      desc: "Accelerate your teams with customized product training, technical enablement, and sandbox testing." 
    },
    { 
      icon: <Megaphone className="w-6 h-6 text-emerald-500" />, 
      title: "Co-Marketing Budget", 
      desc: "Co-sponsor virtual events, launch combined PR releases, and access premium sales materials." 
    },
    { 
      icon: <Sparkles className="w-6 h-6 text-amber-500" />, 
      title: "Growth Opportunities", 
      desc: "Get priority lead routing, join advisory boards, and preview upcoming product innovations." 
    },
    { 
      icon: <UserCheck className="w-6 h-6 text-violet-500" />, 
      title: "Partner Success Manager", 
      desc: "Work closely with a dedicated account manager to co-build accounts, align strategies, and close deals." 
    },
    { 
      icon: <Shield className="w-6 h-6 text-cyan-500" />, 
      title: "Enterprise-Grade Trust", 
      desc: "Rest assured with our secure infrastructure, full compliance, SLA-backed uptime, and robust APIs." 
    },
  ];

  const faqs = [
    {
      q: "Who is eligible to join the partner program?",
      points: [
        "Consulting firms, system integrators, and software vendors with deep industry expertise.",
        "Resellers and marketing agencies committed to scaling customer success.",
        "Enterprise developers looking to build integrations or plugins for our core system.",
      ],
    },
    {
      q: "Is there a minimum commitment or entry fee?",
      points: [
        "No entry fees are required for any level of the partner program.",
        "Commitments (e.g., certification, minimum lead referrals) vary based on the tier you choose.",
        "Flexible, low-barrier models are available for early-stage startups and independent developers.",
      ],
    },
    {
      q: "How are partner training and certifications handled?",
      points: [
        "We offer free self-paced learning paths and live hands-on bootcamps.",
        "Upon completion, you receive official digital certificates to showcase your team's expertise.",
        "Recertification is provided annually to keep your team up-to-date with new product features.",
      ],
    },
    {
      q: "What marketing and sales support will we receive?",
      points: [
        "Access to a comprehensive Partner Portal containing templates, decks, and case studies.",
        "Co-branded landing pages and marketing campaigns for top-tier partners.",
        "Pre-sales engineering support to help design complex technical solutions for your clients.",
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden py-20 lg:py-28">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-xs sm:text-sm font-semibold text-rose-400 mb-6 shadow-inner">
                <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" /> Global Partnership Network
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                Partner <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">With Us</span>
              </h1>
              <p className="text-slate-300 mb-8 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Join a world-class ecosystem of innovators, enterprise developers, and strategic resellers. 
                Together, we deliver bleeding-edge digital solutions that drive measurable business outcomes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/join/become-partner" className="w-full sm:w-auto">
                  <button className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-rose-500/20 hover:-translate-y-0.5 tracking-wide border border-rose-400/20">
                    Become a Partner
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="#tiers" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl font-bold transition-all tracking-wide border border-white/10 text-white hover:border-white/20">
                    Explore Tiers
                  </button>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative group flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-indigo-500/20 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 bg-white/5 backdrop-blur-sm max-w-md">
                <img src={p20} alt="Partnership" className="w-full rounded-xl shadow-inner relative z-10 transform group-hover:scale-[1.01] transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner with Startup India Section */}
      <SectionWrapper bg="bg-white border-b border-slate-100">
        <div className="text-center mb-20">
          <span className="text-rose-500 font-bold uppercase tracking-widest text-xs sm:text-sm bg-rose-50 px-4 py-1.5 rounded-full">
            Our Reach & Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight font-sans">
            Partner with Startup India
          </h2>
          <div className="w-16 h-1 bg-rose-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-6 lg:gap-4 xl:gap-6 pt-6">
          
          {/* Stat Card 1 */}
          <div className="relative bg-gradient-to-b from-[#24296b] to-[#141746] pt-10 pb-7 px-3 sm:px-4 rounded-2xl shadow-xl border border-indigo-950/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50 transition-transform group-hover:scale-105 duration-300">
              <Rocket className="w-5 h-5 text-rose-500" />
            </div>
            <span className="text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold tracking-tight mb-2">157,000+</span>
            <span className="text-slate-300 text-[9px] sm:text-xs lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
              NUMBER OF STARTUPS
            </span>
          </div>

          {/* Stat Card 2 */}
          <div className="relative bg-gradient-to-b from-[#24296b] to-[#141746] pt-10 pb-7 px-3 sm:px-4 rounded-2xl shadow-xl border border-indigo-950/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50 transition-transform group-hover:scale-105 duration-300">
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold tracking-tight mb-2">350,000+</span>
            <span className="text-slate-300 text-[9px] sm:text-xs lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
              INDIVIDUAL INNOVATORS
            </span>
          </div>

          {/* Stat Card 3 */}
          <div className="relative bg-gradient-to-b from-[#24296b] to-[#141746] pt-10 pb-7 px-3 sm:px-4 rounded-2xl shadow-xl border border-indigo-950/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50 transition-transform group-hover:scale-105 duration-300">
              <Building2 className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold tracking-tight mb-2">8,200+</span>
            <span className="text-slate-300 text-[9px] sm:text-xs lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
              STARTUPS BENEFITTED
            </span>
          </div>

          {/* Stat Card 4 */}
          <div className="relative bg-gradient-to-b from-[#24296b] to-[#141746] pt-10 pb-7 px-3 sm:px-4 rounded-2xl shadow-xl border border-indigo-950/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50 transition-transform group-hover:scale-105 duration-300">
              <Zap className="w-5 h-5 text-rose-500" />
            </div>
            <span className="text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold tracking-tight mb-2">229+</span>
            <span className="text-slate-300 text-[9px] sm:text-xs lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
              EXCLUSIVE PROGRAMS
            </span>
          </div>

          {/* Stat Card 5 */}
          <div className="relative bg-gradient-to-b from-[#24296b] to-[#141746] pt-10 pb-7 px-3 sm:px-4 rounded-2xl shadow-xl border border-indigo-950/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50 transition-transform group-hover:scale-105 duration-300">
              <Globe className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold tracking-tight mb-2">21</span>
            <span className="text-slate-300 text-[9px] sm:text-xs lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
              INTERNATIONAL BRIDGES
            </span>
          </div>

          {/* Stat Card 6 */}
          <div className="relative bg-gradient-to-b from-[#24296b] to-[#141746] pt-10 pb-7 px-3 sm:px-4 rounded-2xl shadow-xl border border-indigo-950/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50 transition-transform group-hover:scale-105 duration-300">
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-white text-lg sm:text-xl lg:text-lg xl:text-xl font-extrabold tracking-tight mb-2">INR 95 CR</span>
            <span className="text-slate-300 text-[9px] sm:text-xs lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wider text-center line-clamp-2">
              WORTH BENEFITS DISBURSED
            </span>
          </div>

        </div>
      </SectionWrapper>

      {/* Partnership Types */}
      <SectionWrapper bg="bg-white py-16 lg:py-24">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-bold uppercase tracking-widest text-xs sm:text-sm bg-rose-50 px-4 py-1.5 rounded-full">Engagement Pathways</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight font-sans">Partnership Models</h2>
          <div className="w-16 h-1 bg-rose-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partnerTypes.map((type, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-rose-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 w-fit mb-4 text-slate-700">
                  {type.icon}
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-rose-500 transition-colors text-base mb-2">
                  {type.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefits Section */}
      <SectionWrapper bg="bg-slate-50 border-y border-slate-100">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs sm:text-sm bg-indigo-50 px-4 py-1.5 rounded-full">Value Proposition</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight font-sans">Why Partner With Us?</h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-slate-100/80 transition-all duration-300 flex items-start gap-5 group"
            >
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-rose-500 transition-colors mb-2 text-base">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>



      {/* Live Partners from DB */}
      <SectionWrapper bg="bg-white">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-bold uppercase tracking-widest text-xs sm:text-sm bg-rose-50 px-4 py-1.5 rounded-full">Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight font-sans">Partner Network</h2>
          <div className="w-16 h-1 bg-rose-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {partnersLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        ) : livePartners.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100 max-w-xl mx-auto px-6">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Our Partner Base is Expanding</h3>
            <p className="text-slate-500 font-light text-sm">
              We are actively onboarding strategic technology and consulting partners. Be among the first to establish a presence!
            </p>
            <Link to="/join/become-partner" className="inline-block mt-6">
              <button className="bg-slate-900 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-rose-500 transition-colors">
                Apply Today
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {livePartners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden border border-slate-100"
              >
                {/* Header card info */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 px-6 py-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl font-bold text-rose-400 uppercase">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base tracking-tight text-white group-hover:text-rose-300 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 font-light">Partner since {partner.joined}</p>
                </div>

                {/* Body card info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</span>
                    <span className="font-bold text-slate-700">{partner.type}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tier</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      partner.tier === 'Elite'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : partner.tier === 'Premier'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200'
                    }`}>
                      {partner.tier} Tier
                    </span>
                  </div>
                  {partner.pointOfContact && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
                      <UserCheck className="w-4 h-4 text-rose-500" />
                      <span className="font-medium text-slate-600">{partner.pointOfContact}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Partnership Tiers */}
      <SectionWrapper bg="bg-slate-50 border-t border-slate-100" id="tiers">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs sm:text-sm bg-indigo-50 px-4 py-1.5 rounded-full">Levels of Partnership</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight font-sans">Find Your Fit</h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Associate",
              share: "10% Revenue Share",
              popular: false,
              details: [
                "Basic onboarding & technical training modules",
                "Access to the Standard Partner Portal & directory",
                "Standard marketing sheets & digital sales collateral",
              ],
            },
            {
              name: "Premier",
              share: "15% Revenue Share",
              popular: true,
              details: [
                "Advanced integration & pre-sales engineers",
                "Dedicated Partner Success Account Manager",
                "Co-marketing campaigns & virtual event hosting",
              ],
            },
            {
              name: "Elite",
              share: "20% Revenue Share",
              popular: false,
              details: [
                "Custom API solutions & custom development resources",
                "Strategic roadmap alignment & beta features preview",
                "Dedicated regional lead allocation & direct sales support",
              ],
            },
          ].map((tier, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between
              ${tier.popular 
                ? "border-rose-500 shadow-xl ring-2 ring-rose-500/10 scale-105 z-10" 
                : "border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white font-extrabold text-[10px] tracking-widest uppercase px-4 py-1 rounded-full shadow-md shadow-rose-500/20">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{tier.name}</h3>
                <span className="text-rose-500 font-extrabold text-sm bg-rose-50/70 inline-block px-4 py-1.5 rounded-full mb-6">
                  {tier.share}
                </span>

                <ul className="space-y-4 mb-8">
                  {tier.details.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-light">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold text-xs mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveTier(activeTier === i ? null : i)}
                className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all outline-none border-b-2 text-center text-sm
                ${tier.popular
                  ? "bg-slate-900 text-white border-slate-950 hover:bg-rose-500 hover:border-rose-600 shadow-md"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {activeTier === i ? "Hide Benefits" : "View Details"}
              </button>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ Accordion */}
      <SectionWrapper bg="bg-white">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-bold uppercase tracking-widest text-xs sm:text-sm bg-rose-50 px-4 py-1.5 rounded-full">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight font-sans">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-rose-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-rose-200 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full text-left px-6 py-5 font-bold text-slate-900 focus:outline-none flex justify-between items-center group"
              >
                <span className="group-hover:text-rose-500 transition-colors text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:text-rose-500 transform transition-transform duration-300 flex-shrink-0 ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/50 ${
                  openFAQ === i ? 'max-h-96 opacity-100 border-t border-slate-100/50' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-5 space-y-3">
                  {faq.points.map((point, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-slate-600 text-sm font-light leading-relaxed">
                      <span className="text-rose-500 font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-950 to-indigo-950 text-white relative overflow-hidden py-20 lg:py-24 border-t border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight font-sans">
            Ready to Partner <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">With Us?</span>
          </h2>
          <p className="text-slate-300 mb-10 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Let's build innovative solutions and grow together. Join our robust network to scale your growth, expand your reach, and deliver excellence.
          </p>
          <Link to="/join/become-partner" className="inline-block">
            <button className="group flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold px-10 py-5 rounded-2xl shadow-rose-500/10 shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1 transition-all duration-300 transform tracking-wider uppercase text-sm md:text-base border border-rose-400/20">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}

/* Reusable Section Wrapper Component */
const SectionWrapper = ({ children, bg, id }) => (
  <div className={bg} id={id}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {children}
    </div>
  </div>
);
