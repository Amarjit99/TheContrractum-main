import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import p20 from "../../assets/p20.webp";
import p21 from "../../assets/p21.webp";


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
    { image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop", title: "Technology Partners", desc: "Integrate your solutions with our platform to reach a global audience." },
    { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", title: "Reseller Partners", desc: "Become a reseller and grow your revenue with our proven solutions." },
    { image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop", title: "Enterprise Partners", desc: "Strategic alliances for large-scale deployments and implementations." },
    { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop", title: "Channel Partners", desc: "Build a distribution network and expand market reach together." },
  ];

  const benefits = [
    { image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=150&h=150&fit=crop", title: "Revenue Share", desc: "Competitive commission structure with transparent pricing models." },
    { image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=150&h=150&fit=crop", title: "Training & Support", desc: "Comprehensive training programs and dedicated partner resources." },
    { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop", title: "Marketing Support", desc: "Co-marketing opportunities and promotional materials included." },
    { image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop", title: "Growth Opportunity", desc: "Access to emerging markets and high-growth opportunities." },
    { image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", title: "Dedicated Manager", desc: "Personal partner account manager for strategic guidance." },
    { image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=150&h=150&fit=crop", title: "Regular Updates", desc: "Early access to new features and roadmap visibility." },
  ];

  const faqs = [
    {
      q: "Who can become a partner?",
      points: [
        "Organizations with relevant domain expertise",
        "Businesses committed to customer success",
        "Companies seeking strategic collaboration",
      ],
    },
    {
      q: "What is the minimum commitment?",
      points: [
        "Varies by partnership tier",
        "Flexible engagement models available",
        "Performance-based growth opportunities",
      ],
    },
    {
      q: "How are partners trained?",
      points: [
        "Structured onboarding programs",
        "Certification & skill development",
        "Continuous learning resources",
      ],
    },
    {
      q: "What support do we provide?",
      points: [
        "Marketing & sales enablement",
        "Technical & implementation support",
        "Dedicated partner success manager",
      ],
    },
  ];

  return (
    <div className="bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-md">
                Partner <span className="text-rose-400">With Us</span>
              </h1>
              <p className="text-gray-300 mb-8 text-lg font-light leading-relaxed max-w-lg">
                Join a thriving ecosystem of partners delivering innovation and
                measurable business outcomes across industries.
              </p>
              <Link to="/join/become-partner">
                <button className="bg-gray-800 hover:bg-white hover:text-black px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform tracking-wide border-2 border-white">
                  Become a Partner
                </button>
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img src={p20} alt="Partnership" className="w-full rounded-2xl shadow-2xl relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <SectionWrapper bg="bg-gray-50">
        <div className="text-center mb-12">
          <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-2">Collaboration</p>
          <SectionTitle title="Partnership Types" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerTypes.map((type, i) => (
            <HoverCard key={i} className="flex flex-col items-center text-center">
              <div className="w-full h-40 mb-6 rounded-xl overflow-hidden shadow-sm">
                <img src={type.image} alt={type.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 group-hover:text-primary transition-colors text-lg mb-3">{type.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">{type.desc}</p>
            </HoverCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper bg="bg-white">
        <div className="text-center mb-12">
          <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-2">Advantages</p>
          <SectionTitle title="Partner Benefits" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <HoverCard key={i} className="flex items-center gap-6">
              <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden shadow-md ring-4 ring-white group-hover:ring-rose-50 transition-all duration-300">
                <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 group-hover:text-primary transition-colors mb-2 text-base">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{benefit.desc}</p>
              </div>
            </HoverCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Partner Networks – Live from MongoDB */}
      <SectionWrapper bg="bg-gray-50">
        <div className="text-center mb-12">
          <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-2">Ecosystem</p>
          <SectionTitle title="Partner Network" />
        </div>

        {partnersLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        ) : livePartners.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-rose-400 text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Partners Yet</h3>
            <p className="text-slate-500 font-light">Our partner network is growing. Be the first to join!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {livePartners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden border border-gray-100"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-white/10 group-hover:ring-rose-400/30 transition-all duration-300">
                    <span className="text-2xl font-black text-rose-300 uppercase">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg tracking-tight group-hover:text-rose-200 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 font-light">Partner since {partner.joined}</p>
                </div>

                {/* Card Body */}
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</span>
                    <span className="text-sm font-bold text-slate-800">{partner.type}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tier</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${partner.tier === 'Elite'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : partner.tier === 'Premier'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                      {partner.tier} Tier
                    </span>
                  </div>
                  {partner.pointOfContact && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 border-t border-gray-100 pt-4">
                      <span className="text-rose-400">👤</span>
                      <span className="font-light">{partner.pointOfContact}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Partnership Tiers */}
      <SectionWrapper bg="bg-white">
        <div className="text-center mb-12">
          <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-2">Levels</p>
          <SectionTitle title="Partnership Tiers" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Associate",
              share: "10% Revenue Share",
              details: [
                "Basic onboarding & certification",
                "Access to partner portal",
                "Standard marketing materials",
              ],
            },
            {
              name: "Premier",
              share: "15% Revenue Share",
              details: [
                "Advanced sales & technical training",
                "Dedicated partner manager",
                "Co-marketing opportunities",
              ],
            },
            {
              name: "Elite",
              share: "20% Revenue Share",
              details: [
                "Custom solution collaboration",
                "Executive-level support",
                "Strategic growth planning",
              ],
            },
          ].map((tier, i) => (
            <div
              key={i}
              className={`bg-white p-8 rounded-2xl border transition-all cursor-pointer duration-300
              hover:shadow-2xl hover:-translate-y-2 group
              ${activeTier === i ? "border-rose-500 shadow-2xl" : "border-gray-100 shadow-md"}`}
            >
              <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {tier.name}
              </h3>

              <p className="text-rose-500 font-bold mb-6 text-lg bg-rose-50 inline-block px-4 py-1 rounded-full">
                {tier.share}
              </p>

              <button
                onClick={() => setActiveTier(activeTier === i ? null : i)}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-primary transition-colors shadow-md border-b-4 border-slate-950 hover:border-primary-dark outline-none"
              >
                {activeTier === i ? "Hide Details" : "Select Plan"}
              </button>

              {/* Expandable Content */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTier === i ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                <ul className="space-y-4 text-sm text-slate-600 font-medium">
                  {tier.details.map((point, idx) => (
                    <li key={idx} className="flex gap-3 items-center">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-bold text-xs">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </SectionWrapper>

      {/* FAQ Accordion */}
      <SectionWrapper bg="bg-gray-50">
        <div className="text-center mb-12">
          <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-2">Help Center</p>
          <SectionTitle title="Frequently Asked Questions" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-rose-300 transition-colors duration-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full text-left px-6 py-5 font-bold text-slate-900 focus:outline-none flex justify-between items-center group"
              >
                <span className="group-hover:text-rose-600 transition-colors">{faq.q}</span>
                <span className={`text-rose-500 text-xl font-light transform transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-50 ${openFAQ === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="px-8 pb-6 pt-2 space-y-3 text-sm text-slate-600 font-light">
                  {faq.points.map((point, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-rose-500 font-bold font-sans mt-0.5">•</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA – Professional Dark */}
      <div className="bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 mix-blend-color-dodge pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-md">
            Ready to Partner <span className="text-rose-400">With Us?</span>
          </h2>
          <p className="text-gray-300 mb-10 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Let's build innovative solutions and grow together. Join our robust network to scale your growth and deliver excellence.
          </p>
          <Link to="/join/become-partner">
            <button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold px-10 py-5 rounded-2xl shadow-rose-500/20 shadow-2xl hover:shadow-rose-500/40 hover:-translate-y-2 transition-all duration-300 transform tracking-widest uppercase text-sm md:text-base border border-rose-400/30">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}

/* Reusable Components */

const SectionWrapper = ({ children, bg }) => (
  <div className={bg}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {children}
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 border-b-4 border-rose-500 pb-2 inline-block">
    {title}
  </h2>
);

const HoverCard = ({ children, className = "" }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden border border-gray-100 ${className}`}>
    {children}
  </div>
);
