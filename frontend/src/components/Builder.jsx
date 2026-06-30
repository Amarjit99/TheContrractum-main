"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setStartIndex((index + clients.length) % clients.length);
        setAnimating(false);
      }, 300);
    },
    [animating, clients.length]
  );

  const prev = () => goTo(startIndex - 1);
  const next = useCallback(() => goTo(startIndex + 1), [startIndex, goTo]);

  // Auto rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next]);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Top Label */}
        <div className="mb-4">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold border-b-2 border-primary inline-block pb-1">
            Our Clients
          </p>
        </div>

        {/* Heading & Progress Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            100% <span className="relative">
              Satisfied Clients
              <span className="absolute -top-2 -right-4 w-2 h-2 bg-primary rounded-full"></span>
            </span>
          </h2>

          {/* Progress bar */}
          <div className="w-full max-w-xs h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              key={startIndex}
              className="h-full bg-primary rounded-full"
              style={{
                animation: "progressBar 5s linear forwards",
              }}
            />
          </div>
        </div>

        {/* Client Cards */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>

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
                <h3 className="text-white text-2xl sm:text-3xl font-semibold text-center px-4">
                  {client.name}
                </h3>
              </div>
            </div>
          ))}

        </div>

        {/* Slider Controls */}
        <div className="mt-12 flex justify-between items-center">
          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous client"
            className="w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
          >
            <ArrowLeft size={22} />
          </button>

          {/* Client counter */}
          <span className="text-gray-500 font-medium text-sm tracking-widest">
            {String(startIndex + 1).padStart(2, "0")} / {String(clients.length).padStart(2, "0")}
          </span>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next client"
            className="w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
          >
            <ArrowRight size={22} />
          </button>
        </div>

      </div>
      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}