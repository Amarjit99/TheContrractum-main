import p1 from "../../assets/p1.jpg";
export default function Collaborate() {
  const collaborationTypes = [
    {
      icon: "🤝",
      title: "Strategic Partnerships",
      description:
        "Form strategic alliances to expand market reach and create mutual value.",
      details: ["Market Expansion", "Resource Sharing", "Joint Growth"],
    },
    {
      icon: "🔬",
      title: "Research Initiatives",
      description:
        "Collaborate on groundbreaking research projects and innovation programs.",
      details: ["Case Studies", "Data Analysis", "Industry Insights"],
    },
    {
      icon: "🌐",
      title: "Network Expansion",
      description:
        "Connect with industry leaders and expand your professional network globally.",
      details: ["Global Network", "Industry Events", "Member Directory"],
    },
    {
      icon: "💡",
      title: "Innovation Labs",
      description:
        "Work together on innovative solutions for modern business challenges.",
      details: ["Brainstorming", "Prototyping", "Testing & Feedback"],
    },
    {
      icon: "📚",
      title: "Knowledge Sharing",
      description:
        "Exchange expertise and best practices with industry professionals.",
      details: ["Webinars", "Training", "Case Studies"],
    },
    {
      icon: "🎯",
      title: "Project Collaboration",
      description:
        "Join forces on specific projects to achieve common objectives.",
      details: ["Team Building", "Project Management", "Success Tracking"],
    },
  ];

  const benefits = [
    "Expanded Reach",
    "Shared Resources",
    "Risk Mitigation",
    "Innovation Boost",
    "Cost Efficiency",
    "Faster Growth",
  ];

  const process = [
    "Discovery",
    "Alignment",
    "Planning",
    "Execution",
    "Growth",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

     {/* ================= HERO SECTION: Collaborate With Us ================= */}
<section className="bg-black text-white py-20 px-6 lg:px-20">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
    
    {/* ================= TEXT CONTENT ================= */}
    <div className="lg:w-1/2">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Collaborate With Us
      </h1>
      <p className="text-shadow-2xs text-base md:text-lg mb-6">
        Build strategic partnerships, drive innovation, and unlock growth opportunities
        by collaborating with industry leaders and forward-thinking organizations.
      </p>
      <p className="text-shadow-white text-sm md:text-base mb-8">
        Whether you're looking to expand into new markets, share knowledge, or
        develop cutting-edge solutions, we're here to facilitate meaningful collaborations
        that create lasting value.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg
          hover:bg-primary-dark transition-colors duration-300">
          Explore Opportunities
        </button>
        <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg
          hover:bg-primary-dark transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>

    {/* ================= IMAGE ================= */}
    <div className="lg:w-1/2 relative group">
      <div className="overflow-hidden rounded-xl shadow-xl">
        <img
          src={p1}
          alt="Collaboration Illustration"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      {/* Optional overlay icon or effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl pointer-events-none"></div>
    </div>

  </div>
</section>

      {/* ================= COLLAB TYPES ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Types of Collaboration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborationTypes.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-slate-200
                shadow-sm hover:shadow-xl hover:-translate-y-2
                transition-all duration-500 ease-out"
              >
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-slate-600 mb-4">{item.description}</p>

                <ul className="space-y-2 pt-4 border-t border-slate-200">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
<section className="bg-slate-100 py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Collaboration Benefits
    </h2>
    <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
      Unlock measurable growth and long-term value through strategic
      collaboration.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Expanded Reach",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        },
        {
          title: "Shared Resources",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978",
        },
        {
          title: "Risk Mitigation",
          image:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
        },
        {
          title: "Innovation Boost",
          image:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        },
        {
          title: "Cost Efficiency",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        },
        {
          title: "Faster Growth",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        },
      ].map((benefit, index) => (
        <div
          key={index}
          className="group bg-white rounded-2xl overflow-hidden shadow-md 
          hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
        >
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={`${benefit.image}?auto=format&fit=crop&w=800&q=80`}
              alt={benefit.title}
              className="w-full h-56 object-cover 
              group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="p-6 text-left">
            <h3 className="text-xl font-semibold text-slate-800 
            group-hover:text-primary transition-colors duration-300">
              {benefit.title}
            </h3>

            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
              Strategic collaboration helps organizations maximize efficiency,
              strengthen capabilities, and create sustainable competitive
              advantage in dynamic markets.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


  {/* ================= PROCESS ================= */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Our Collaboration Process
    </h2>
    <p className="text-slate-600 mb-16 max-w-2xl mx-auto">
      A structured and transparent approach designed to ensure long-term
      collaboration success.
    </p>

    {/* ================= DESKTOP TIMELINE ================= */}
    <div className="hidden lg:flex items-center justify-between relative">
      {[
        {
          step: "1",
          title: "Discovery",
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          step: "2",
          title: "Alignment",
          image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        },
        {
          step: "3",
          title: "Planning",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        },
        {
          step: "4",
          title: "Execution",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692",
        },
        {
          step: "5",
          title: "Growth",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        },
      ].map((item, index, arr) => (
        <div key={index} className="relative flex flex-col items-center group">
          {/* Step Number */}
          <div className="w-16 h-16 bg-primary text-white rounded-full 
            flex items-center justify-center font-bold text-xl shadow-lg z-10
            group-hover:scale-110 transition-transform duration-300">
            {item.step}
          </div>

          {/* Arrow to next step */}
          {index < arr.length - 1 && (
            <div className="absolute top-8 right-[-50%] w-[100%] flex items-center">
              <div className="h-1 bg-indigo-200 flex-1 relative">
                <div className="absolute right-0 -top-1 w-4 h-4 bg-primary rotate-45"></div>
              </div>
            </div>
          )}

          {/* Image */}
          <div className="mt-6 overflow-hidden rounded-xl shadow-md w-48 h-32">
            <img
              src={`${item.image}?auto=format&fit=crop&w=400&q=80`}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Title */}
          <h3 className="mt-4 font-semibold text-lg text-gray-900
            group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
        </div>
      ))}
    </div>

    {/* ================= MOBILE / TABLET TIMELINE ================= */}
    <div className="lg:hidden relative space-y-12">
      {[
        {
          step: "1",
          title: "Discovery",
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          step: "2",
          title: "Alignment",
          image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        },
        {
          step: "3",
          title: "Planning",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        },
        {
          step: "4",
          title: "Execution",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692",
        },
        {
          step: "5",
          title: "Growth",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        },
      ].map((item, index, arr) => (
        <div key={index} className="relative flex items-start group">
          {/* Step Circle */}
          <div className="w-12 h-12 bg-primary text-white rounded-full 
            flex items-center justify-center font-bold z-10 shrink-0
            group-hover:scale-110 transition-transform duration-300">
            {item.step}
          </div>

          {/* Arrow / Line */}
          {index < arr.length - 1 && (
            <div className="absolute left-5 top-12 w-1 h-full flex items-start">
              <div className="flex-1 bg-indigo-200 relative">
                <div className="absolute bottom-0 -left-1 w-3 h-3 bg-primary rotate-45"></div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="ml-6">
            <h3 className="font-semibold text-lg mb-3 
              group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <div className="overflow-hidden rounded-xl shadow-md w-full h-40">
              <img
                src={`${item.image}?auto=format&fit=crop&w=600&q=80`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Powerful Together?
          </h2>

          <p className="text-lg text-indigo-100 mb-8">
            Let’s create meaningful impact through strategic collaboration.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-primary text-white font-semibold px-8 py-3 rounded-lg
              shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Start Collaboration
            </button>

            <button className="bg-primary text-white px-8 py-3 rounded-lg
              hover:bg-primary-dark transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
