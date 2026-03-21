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
  const services = [
    {
      number: "01",
      title: "GIS",
      desc: "Comprehensive geospatial and IT services for businesses.",
      icon: <Map className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=400&fit=crop",
    },
    {
      number: "02",
      title: "CS/IT",
      desc: "IT staffing and technology solutions for modern enterprises.",
      icon: <Cpu className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=400&fit=crop",
    },
    {
      number: "03",
      title: "Ecommerce",
      desc: "Complete ecommerce and payment integration solutions.",
      icon: <ShoppingCart className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop",
    },
    {
      number: "04",
      title: "Telecommunication",
      desc: "Advanced telecommunication and connectivity services.",
      icon: <Phone className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=400&fit=crop",
    },
    {
      number: "05",
      title: "Human Resource",
      desc: "Workforce management and HR consulting solutions.",
      icon: <User className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=400&fit=crop",
    },
    {
      number: "06",
      title: "BPO",
      desc: "Outsourcing solutions to optimize business operations.",
      icon: <Globe className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=400&fit=crop",
    },
    {
      number: "07",
      title: "Market Research",
      desc: "Data-driven research and market analysis services.",
      icon: <BarChart3 className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
    },
    {
      number: "08",
      title: "Education",
      desc: "Digital learning and institutional management solutions.",
      icon: <BookOpen className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop",
    },
    {
      number: "09",
      title: "Healthcare",
      desc: "Hospital management and telemedicine platforms.",
      icon: <HeartPulse className="text-primary w-8 h-8" />,
      bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=400&fit=crop",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  // Auto rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get 4 visible services
  const visibleServices = Array.from({ length: 4 }, (_, i) =>
    services[(startIndex + i) % services.length]
  );

  return (
    <section className="bg-gray-100 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-primary uppercase tracking-widest font-semibold mb-3">
            Consulting Services
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Our Best Consulting Services
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700">
          {visibleServices.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 relative border border-gray-200 overflow-hidden"
            >
              {/* Background Image on Hover (Desktop) / Always Visible (Mobile/Tablet) */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-0 md:group-hover:opacity-50 transition-opacity duration-500"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Big Number */}
                <span className="absolute top-0 left-0 text-5xl font-bold text-gray-200 group-hover:text-white transition-colors drop-shadow-lg">
                  {service.number}
                </span>

                {/* Icon */}
                <div className="mb-6 relative z-10 bg-white/80 backdrop-blur-sm w-fit p-2 rounded-lg">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors drop-shadow-md">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-white transition-colors drop-shadow-md">
                  {service.desc}
                </p>

                <button className="font-semibold bg-primary text-white hover:bg-primary-dark transition drop-shadow-md px-4 py-2 rounded">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
