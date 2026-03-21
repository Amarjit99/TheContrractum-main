import { useState } from "react";
import p20 from "../../assets/p20.webp";
import p21 from "../../assets/p21.webp";
import p22 from "../../assets/p22.webp";
import p23 from "../../assets/p23.webp";
import p24 from "../../assets/p24.webp";

export default function Partner() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTier, setActiveTier] = useState(null);


  const partnerTypes = [
    { icon: "🤝", title: "Technology Partners", desc: "Integrate your solutions with our platform to reach a global audience." },
    { icon: "📊", title: "Reseller Partners", desc: "Become a reseller and grow your revenue with our proven solutions." },
    { icon: "🏢", title: "Enterprise Partners", desc: "Strategic alliances for large-scale deployments and implementations." },
    { icon: "🌍", title: "Channel Partners", desc: "Build a distribution network and expand market reach together." },
  ];

  const benefits = [
    { icon: "💰", title: "Revenue Share", desc: "Competitive commission structure with transparent pricing models." },
    { icon: "📚", title: "Training & Support", desc: "Comprehensive training programs and dedicated partner resources." },
    { icon: "🎯", title: "Marketing Support", desc: "Co-marketing opportunities and promotional materials included." },
    { icon: "🚀", title: "Growth Opportunity", desc: "Access to emerging markets and high-growth opportunities." },
    { icon: "👥", title: "Dedicated Manager", desc: "Personal partner account manager for strategic guidance." },
    { icon: "🔄", title: "Regular Updates", desc: "Early access to new features and roadmap visibility." },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Partner <span className="text-rose-400">With Us</span>
              </h1>
              <p className="text-gray-300 mb-6">
                Join a thriving ecosystem of partners delivering innovation and
                measurable business outcomes across industries.
              </p>
              <button className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg">
                Become a Partner
              </button>
            </div>
            <img src={p20} alt="Partnership" className="w-full rounded-xl shadow-xl" />
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <SectionWrapper bg="bg-gray-50">
        <SectionTitle title="Partnership Types" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerTypes.map((type, i) => (
            <HoverCard key={i}>
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="font-bold text-slate-900">{type.title}</h3>
              <p className="text-slate-600 text-sm">{type.desc}</p>
            </HoverCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper bg="bg-white">
        <SectionTitle title="Partner Benefits" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <HoverCard key={i}>
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-slate-900">{benefit.title}</h3>
              <p className="text-slate-600 text-sm">{benefit.desc}</p>
            </HoverCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Success Stories */}
      <SectionWrapper bg="bg-gray-50">
        <SectionTitle title="Our Successful Partners" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[p22, p23, p24].map((img, i) => (
            <HoverCard key={i}>
              <img src={img} alt="Success" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-slate-900">Partner Company</h3>
              <p className="text-slate-600 text-sm">Driving measurable business success.</p>
            </HoverCard>
          ))}
        </div>
      </SectionWrapper>

     {/* Partnership Tiers */}
<SectionWrapper bg="bg-white">
  <SectionTitle title="Partnership Tiers" />

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
        className={`bg-white p-6 rounded-xl border shadow-md transition cursor-pointer
        hover:shadow-xl hover:-translate-y-1
        ${activeTier === i ? "border-rose-500 shadow-xl" : "border-gray-200"}`}
      >
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {tier.name}
        </h3>

        <p className="text-rose-500 font-semibold mb-4">
          {tier.share}
        </p>

        <button
          onClick={() => setActiveTier(activeTier === i ? null : i)}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
        >
          {activeTier === i ? "Hide Details" : "Select Plan"}
        </button>

        {/* Expandable Content */}
        {activeTier === i && (
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {tier.details.map((point, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-rose-500">✓</span> {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}

  </div>
</SectionWrapper>

      {/* FAQ Accordion */}
      <SectionWrapper bg="bg-gray-50">
        <SectionTitle title="Frequently Asked Questions" />
       <div className="max-w-3xl mx-auto space-y-4">
  {faqs.map((faq, i) => (
    <div key={i} className="bg-white rounded-lg shadow-sm">
      
      <button
        onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
        className="w-full text-left px-5 py-4 font-semibold flex justify-between items-center"
      >
        {faq.q}
        <span className="text-rose-500 text-lg">
          {openFAQ === i ? "−" : "+"}
        </span>
      </button>

      {openFAQ === i && (
        <ul className="px-5 pb-4 space-y-2 text-sm text-slate-600">
          {faq.points.map((point, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-rose-500">✓</span> {point}
            </li>
          ))}
        </ul>
      )}

    </div>
  ))}
</div>

      </SectionWrapper>

      {/* CTA – Professional Dark */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            Ready to Partner With Us?
          </h2>
          <p className="text-gray-400 mb-6">
            Let’s build innovative solutions and grow together.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition shadow-lg">
            Start Your Journey
          </button>
        </div>
      </div>

    </div>
  );
}

/* Reusable Components */

const SectionWrapper = ({ children, bg }) => (
  <div className={bg}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {children}
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">
    {title}
  </h2>
);

const HoverCard = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
    {children}
  </div>
);
