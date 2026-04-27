"use client";

import { useEffect, useState } from "react";

export default function OurCulture() {
  const culturePoints = [
    "We believe in the culture of performance.",
    "We believe in rewarding ideas!",
    "We believe in being a boundaryless organization.",
    "We build trust in the system through open communication.",
    "We take pride in what we do.",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % culturePoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [culturePoints.length]);

  // Container: 600x520, center at (300, 260)
  // Center circle radius: 144px (w-72 = 288px)
  // Small circle radius: 72px (w-36 = 144px)
  // Touch distance d = 144 + 72 = 216px → using 210px for a slight visual touch
  // Hexagonal angles: 300°(top-right), 240°(top-left), 0°(mid-right), 180°(mid-left), 60°(bot-right), 120°(bot-left)
  const smallR = 72;
  const bigR = 144;
  const d = smallR + bigR; // 216

  const cx = 300;
  const cy = 260;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const pos = (deg) => ({
    left: cx + d * Math.cos(toRad(deg)) - smallR,
    top: cy + d * Math.sin(toRad(deg)) - smallR,
  });

  const circles = [
    { label: "Culture of\nPerformance", color: "bg-green-500", deg: 270 },
    { label: "Rewarding\nIdeas!", color: "bg-orange-500", deg: 330 },
    { label: "The\nContractum", color: "bg-blue-600", deg: 30 },
    { label: "Open\nCommunication", color: "bg-indigo-600", deg: 90 },
    { label: "Pride in\nWork", color: "bg-teal-500", deg: 150 },
    { label: "Boundaryless\nOrganization", color: "bg-violet-500", deg: 210 },
  ];

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Tag */}
        <div className="text-center mb-8">
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
          <div className="flex justify-center">
            <div className="relative" style={{ width: 600, height: 520 }}>

              {/* Center Big Circle */}
              <div
                className="absolute w-72 h-72 rounded-full flex items-center justify-center text-white text-center shadow-2xl z-20 overflow-hidden"
                style={{ left: cx - 144, top: cy - 144 }}
              >
                {/* Abstract Spinning Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 animate-spin-slow" />

                {/* Static Text Overlay */}
                <h3 className="relative z-10 text-3xl font-extrabold tracking-wide drop-shadow-md animate-pulse">
                  OUR <br /> CULTURE
                </h3>
              </div>

              {/* 6 Surrounding Circles Orbiting Center */}
              <div className="absolute inset-0 animate-rotate-slow">
                {circles.map((circle, idx) => {
                  const { left, top } = pos(circle.deg);
                  // Top circles (210, 270, 330) float DOWN, Bottom circles (30, 90, 150) float UP
                  const isTopHalf = circle.deg === 270 || circle.deg === 330 || circle.deg === 210;
                  const floatClass = isTopHalf 
                    ? `animate-float-reverse-${(idx % 3) + 1}` 
                    : `animate-float-${(idx % 3) + 1}`;

                  return (
                    <div
                      key={idx}
                      className={`absolute w-36 h-36 ${circle.color} rounded-full flex items-center justify-center text-white text-center shadow-lg ${floatClass}`}
                      style={{ left, top }}
                    >
                      {/* Counter-rotate to keep text upright while orbiting */}
                      <div className="animate-rotate-slow-reverse p-4">
                        <span className="text-xs font-bold leading-snug whitespace-pre-line drop-shadow-sm">
                          {circle.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE TEXT LIST */}
          <div className="space-y-8">
            {culturePoints.map((point, index) => (
              <div
                key={index}
                className={`border-b border-gray-300 pb-6 text-lg transition-all duration-500 ${activeIndex === index
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