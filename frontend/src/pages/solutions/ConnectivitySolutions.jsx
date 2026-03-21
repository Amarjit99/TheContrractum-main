import p16 from "../../assets/p16.webp";
import p19 from "../../assets/p19.webp";
import p17 from "../../assets/p17.webp";
import p18 from "../../assets/p18.webp";
import p9 from "../../assets/p9.webp";
import p10 from "../../assets/p10.webp";
import p11 from "../../assets/p11.webp";
import p12 from "../../assets/p12.webp";
import p13 from "../../assets/p13.webp";
import p14 from "../../assets/p14.webp";
import p15 from "../../assets/p15.webp";

export default function ConnectivitySolutions() {
  const features = [
    { icon: "⚡", title: "High-Speed Connectivity", desc: "Ultra-fast & low-latency networks" },
    { icon: "🔐", title: "Secure Infrastructure", desc: "Enterprise-grade protection" },
    { icon: "🌐", title: "Seamless Integration", desc: "Cloud & on-premise connectivity" },
    { icon: "📡", title: "Reliable Uptime", desc: "Redundant & resilient architecture" },
  ];

  const sections = [
    {
      title: "Network Design & Architecture",
      desc: "We design scalable, high-performance network infrastructures tailored to business requirements, ensuring resilience, efficiency, and future readiness.",
      points: [
        "Scalable network frameworks",
        "Redundant & failover systems",
        "Performance optimization",
        "Future-ready infrastructure",
      ],
      image: p16,
    },
    {
      title: "5G & Broadband Solutions",
      desc: "Unlock ultra-high speeds and minimal latency with advanced 5G and enterprise broadband deployments supporting modern digital ecosystems.",
      points: [
        "5G infrastructure deployment",
        "Ultra-high broadband access",
        "Low-latency connectivity",
        "IoT enablement",
      ],
      image: p17,
    },
    {
      title: "Enterprise Network Management",
      desc: "Gain full visibility and control over your network with intelligent monitoring, automation, and performance optimization tools.",
      points: [
        "Real-time monitoring",
        "AI-driven optimization",
        "Automated fault detection",
        "Security policy enforcement",
      ],
      image: p18,
    },
    {
      title: "Cloud Connectivity",
      desc: "Ensure secure and reliable connections between your enterprise infrastructure and cloud environments for seamless operations.",
      points: [
        "Hybrid cloud integration",
        "Secure VPN & SD-WAN",
        "Optimized bandwidth routing",
        "Low-latency cloud access",
      ],
      image: p9,
    },
    {
      title: "Wireless & Mobility Solutions",
      desc: "Enable flexible, high-performance wireless networks supporting mobility, remote workforces, and smart environments.",
      points: [
        "Enterprise Wi-Fi deployment",
        "Secure wireless access",
        "Mobility optimization",
        "Coverage & capacity planning",
      ],
      image:p10,
    },
    {
      title: "Data Center Networking",
      desc: "Design robust and high-throughput data center networks ensuring optimal performance, redundancy, and scalability.",
      points: [
        "High-speed switching",
        "Redundant architecture",
        "Traffic optimization",
        "Disaster recovery readiness",
      ],
      image:p11,
    },
    {
      title: "IoT Connectivity",
      desc: "Support connected devices and smart ecosystems with secure, low-latency IoT network infrastructures.",
      points: [
        "IoT device integration",
        "Secure communication protocols",
        "Low-power wide-area networks",
        "Edge connectivity",
      ],
      image:p12,
    },
    {
      title: "Network Security Solutions",
      desc: "Protect your connectivity ecosystem with advanced security frameworks designed to mitigate threats and vulnerabilities.",
      points: [
        "Firewall & intrusion prevention",
        "Threat detection & response",
        "Secure access controls",
        "End-to-end encryption",
      ],
      image:p13,
    },
    {
      title: "Performance Optimization",
      desc: "Enhance network speed, reliability, and efficiency through intelligent optimization and proactive management.",
      points: [
        "Bandwidth optimization",
        "Latency reduction",
        "Traffic prioritization",
        "Continuous performance tuning",
      ],
        image:p14,
    },
    {
      title: "Managed Connectivity Services",
      desc: "Outsource network operations to our experts for proactive monitoring, maintenance, and continuous optimization.",
      points: [
        "24/7 network monitoring",
        "Incident management",
        "Preventive maintenance",
        "Performance reporting",
      ],
      image:p15,
    },
  ];

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Advanced <span className="text-purple-400">Connectivity Solutions</span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                Empower your business with secure, scalable, and high-performance
                connectivity solutions designed for modern digital enterprises.
              </p>

              <button className="bg-primary hover:bg-primary text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition">
                Explore Solutions
              </button>
            </div>

            <img src={p19} alt="Connectivity Solutions" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">
            Why Choose Our Connectivity Solutions?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-900">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Sections (10 Topics) */}
      {sections.map((section, i) => (
        <div key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

              {section.image && (
                <img
                  src={section.image}
                  alt={section.title}
                  className={`w-full rounded-lg shadow-lg ${i % 2 !== 0 ? "order-2 md:order-1" : ""}`}
                />
              )}

              <div className={!section.image ? "md:col-span-2 text-center max-w-3xl mx-auto" : ""}>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  {section.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {section.desc}
                </p>

                <ul className="space-y-2">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="text-slate-700 text-sm sm:text-base">
                      ✓ {point}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Build a Smarter, Faster Network
          </h2>

          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Partner with us to design, deploy, and manage connectivity solutions
            that enhance performance, security, and reliability.
          </p>

          <button className="bg-primary text-white font-medium px-8 py-3 rounded-lg hover:bg-primary-dark transition">
            Schedule Consultation
          </button>
        </div>
      </div>

    </div>
  );
}
