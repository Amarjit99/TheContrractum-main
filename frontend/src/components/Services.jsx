"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  User,
  Globe,
  BarChart3,
  Map,
  Cpu,
  ShoppingCart,
  BookOpen,
  HeartPulse,
} from "lucide-react";

export default function ConsultingSection() {
  const [dbServices, setDbServices] = useState([]);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API}/api/cms/services`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setDbServices(data.filter(s => s.status !== 'Inactive'));
      })
      .catch(console.error);
  }, []);

  const staticServices = [
    {
      title: "CS & IT Services",
      desc: "TheContractum Technology’s IT Staffing group provides clients with the tools and talent they need...",
      icon: <Cpu className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=400&fit=crop",
    },
    {
      title: "E-Commerce Platforms",
      desc: "TheContractum creates a platform for the Future in the E-commerce services segment of the company..",
      icon: <ShoppingCart className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop",
    },
    {
      title: "GIS Solutions",
      desc: "As a leading business service in the GIS domain, TheContractum offers geospatial and IT services..",
      icon: <Map className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=400&fit=crop",
    },
    {
      title: "HR Tech Solutions",
      desc: "TheContractum staffing services are designed to help your business simplify operations by...",
      icon: <User className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=400&fit=crop",
    },
    {
      title: "MRAS Services",
      desc: "The key to gaining competitive advantages lies in having an in-depth...",
      icon: <BarChart3 className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
    },
    {
      title: "Telecommunication",
      desc: "Telecommunications engineers use their technical expertise to provide a range of services and...",
      icon: <Phone className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=400&fit=crop",
    },
    {
      title: "BPO Services",
      desc: "TheContractum provides the BPO (Business Process Outsourcing) services to solution the clients...",
      icon: <Globe className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=400&fit=crop",
    },
    {
      title: "Digital Marketing",
      desc: "Full-funnel digital marketing strategies to accelerate growth and lead generation.",
      icon: <Globe className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
    },
    {
      title: "Network Infrastructure",
      desc: "Robust and secure managed network infrastructure solutions for modern connectivity.",
      icon: <Globe className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=400&fit=crop",
    },
    {
      title: "Cloud Integration",
      desc: "Seamless cloud migration, hybrid cloud setup, and integration strategies.",
      icon: <Globe className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=400&fit=crop",
    }
  ];

  const staticNames = new Set(staticServices.map(s => s.title.toLowerCase()));
  const filteredDb = dbServices.filter(s => !staticNames.has(s.title.toLowerCase()));

  const mappedDbServices = filteredDb.map((s, idx) => ({
    title: s.title,
    desc: s.description || "Learn more about this customized solution offered by TheContractum...",
    icon: <Globe className="text-primary w-8 h-8" />,
    bgImage: s.image && s.image.startsWith('/') ? `${API}${s.image}` : (s.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop"),
  }));

  const allServices = [...staticServices, ...mappedDbServices];

  const [startIndex, setStartIndex] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // Auto rotate every 4 seconds for a short period, then stop and show Next button
  useEffect(() => {
    if (allServices.length === 0) return;
    if (!isAutoRotate) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % allServices.length);
    }, 4000);

    // Stop auto-rotation after 8 seconds (adjust as needed)
    const stopTimeout = setTimeout(() => {
      clearInterval(interval);
      setIsAutoRotate(false);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
    };
  }, [allServices.length, isAutoRotate]);

  // Get 4 visible services
  const visibleServices = Array.from({ length: Math.min(4, allServices.length) }, (_, i) =>
    allServices[(startIndex + i) % allServices.length]
  );

  return (
    <section className="bg-gray-100 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          {/* <p className="text-primary uppercase tracking-widest font-semibold mb-3">
            Consulting Services
          </p> */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Best Consulting Services
          </h2>
        </div>

        
        <div className="relative">
          <div className="flex items-start md:items-center gap-4">
            <button
              aria-label="Previous services"
              onClick={() => setStartIndex((prev) => (prev - 1 + allServices.length) % allServices.length)}
              className="hidden md:flex items-center justify-center w-10 h-10 bg-white text-primary border border-primary hover:bg-primary/10 transition-shadow shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              ←
            </button>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 flex-1 transition-all duration-700">
              {visibleServices.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 relative border border-gray-200 overflow-hidden"
                >
                  {/* Background Image on Hover (Desktop) / Always Visible (Mobile/Tablet) */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-0 md:group-hover:opacity-50 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Big Number */}
                    <span className="absolute top-0 left-0 text-5xl font-bold text-gray-200 group-hover:text-black transition-colors drop-shadow-lg">
                      {String(((startIndex + index) % allServices.length) + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className="mb-6 relative z-10 bg-white/80 backdrop-blur-sm w-fit p-2 rounded-lg">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-black transition-colors drop-shadow-md">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-black transition-colors drop-shadow-md">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              aria-label="Next services"
              onClick={() => setStartIndex((prev) => (prev + 1) % allServices.length)}
              className="hidden md:flex items-center justify-center w-10 h-10 bg-white text-primary border border-primary hover:bg-primary/10 transition-shadow shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}