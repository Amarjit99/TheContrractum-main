"use client";

import { useEffect, useState } from "react";

export default function OurClients() {
  const clients = [
    {
      name: "Meesho",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop",
    },
    {
      name: "HCL Technologies",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
    },
    {
      name: "Amazon Seller Central",
      image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=500&h=400&fit=crop",
    },
    {
      name: "IBM India Private Limited",
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=500&h=400&fit=crop",
    },
    {
      name: "RICOH INNOVATIONS PRIVATE LIMITED",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=400&fit=crop",
    },
    {
      name: "Central Warehousing Corporation",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=400&fit=crop",
    },
    {
      name: "Food Corporation of India",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=500&h=400&fit=crop",
    },
    {
      name: "TOMTOM INDIA PRIVATE LIMITED",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop",
    },
    {
      name: "HERE Technologies",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop",
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