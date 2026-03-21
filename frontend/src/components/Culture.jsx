"use client";

import { useEffect, useState } from "react";

export default function OurCulture() {
  const culturePoints = [
    "We believe in Performance Excellence.",
    "We believe in Innovation & Ideas!",
    "We value Collaboration & Communication.",
    "We maintain Organization & Discipline.",
    "We take Pride in Work.",
    "We believe in Boundaryless Growth.",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through culture points
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % culturePoints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [culturePoints.length]);

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Tag */}
        <div className="text-center mb-6">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold">
            Our Culture
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-20">
          What Is <span className="text-primary">The Contractum</span> Culture?
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE CIRCLES */}
          <div className="relative flex items-center justify-center animate-pulse-slow">

            {/* Center Big Circle */}
            <div className="w-72 h-72 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-center shadow-xl z-10 animate-spin-slow">
              <h3 className="text-3xl font-bold animate-pulse">
                OUR <br /> CULTURE
              </h3>
            </div>

            {/* Top Left */}
            <div className="absolute -top-6 left-16 w-36 h-36 bg-primary-light rounded-full flex items-center justify-center text-white text-center shadow-lg animate-float-1">
              <span className="text-sm font-semibold px-3">
                Boundaryless Growth
              </span>
            </div>

            {/* Top Right */}
            <div className="absolute -top-6 right-16 w-36 h-36 bg-green-500 rounded-full flex items-center justify-center text-white text-center shadow-lg animate-float-2">
              <span className="text-sm font-semibold px-3">
                Performance Excellence
              </span>
            </div>

            {/* Middle Left */}
            <div className="absolute left-0 top-32 w-36 h-36 bg-teal-500 rounded-full flex items-center justify-center text-white text-center shadow-lg animate-float-3">
              <span className="text-sm font-semibold px-3">
                Pride in Work
              </span>
            </div>

            {/* Middle Right */}
            <div className="absolute right-0 top-32 w-36 h-36 bg-orange-500 rounded-full flex items-center justify-center text-white text-center shadow-lg animate-float-4">
              <span className="text-sm font-semibold px-3">
                Innovation & Ideas
              </span>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-0 left-24 w-36 h-36 bg-primary rounded-full flex items-center justify-center text-white text-center shadow-lg animate-float-5">
              <span className="text-sm font-semibold px-3">
                Collaboration & Comm.
              </span>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-0 right-24 w-36 h-36 bg-blue-600 rounded-full flex items-center justify-center text-white text-center shadow-lg animate-float-6">
              <span className="text-sm font-semibold px-3">
                Organization & Discipline
              </span>
            </div>

          </div>

          {/* RIGHT SIDE TEXT LIST */}
          <div className="space-y-8">
            {culturePoints.map((point, index) => (
              <div
                key={index}
                className={`border-b border-gray-300 pb-6 text-lg transition-all duration-500 ${
                  activeIndex === index
                    ? "text-primary font-bold scale-105 border-primary animate-pulse"
                    : "text-gray-700"
                }`}
              >
                {point}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
