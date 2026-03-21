"use client";

import { useEffect, useState } from "react";

export default function OurClients() {
  const clients = [
    {
      name: "HCL Technologies",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
    },
    {
      name: "Meesho",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop",
    },
    {
      name: "Amazon",
      image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=500&h=400&fit=crop",
    },
    {
      name: "Infosys",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop",
    },
    {
      name: "Wipro",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop",
    },
    {
      name: "TCS",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=400&fit=crop",
    },
    {
      name: "Tech Mahindra",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
    },
    {
      name: "Cognizant",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=400&fit=crop",
    },
    {
      name: "Accenture",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500&h=400&fit=crop",
    },
    {
      name: "Capgemini",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&h=400&fit=crop",
    },
    {
      name: "IBM",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=500&h=400&fit=crop",
    },
    {
      name: "Microsoft",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
    },
    {
      name: "Google",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=400&fit=crop",
    },
    {
      name: "Oracle",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop",
    },
    {
      name: "SAP",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  // Auto rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % clients.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [clients.length]);

  // Get 3 visible clients
  const visibleClients = Array.from({ length: 3 }, (_, i) =>
    clients[(startIndex + i) % clients.length]
  );

  return (
    <section className="relative bg-gray-100 py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop')" }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Label */}
        <div className="mb-4">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold border-b-2 border-primary inline-block pb-1">
            Our Clients
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-16">
          100% <span className="relative">
            Satisfied Clients
            <span className="absolute -top-2 -right-4 w-2 h-2 bg-primary rounded-full"></span>
          </span>
        </h2>

        {/* Client Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-700">

          {visibleClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="relative group overflow-hidden rounded-xl shadow-lg animate-fadeIn"
            >
              {/* Background Image */}
              <img
                src={client.image}
                alt={client.name}
                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-primary-dark/60 transition duration-500"></div>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-semibold text-center px-4">
                  {client.name}
                </h3>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
