import React, { useState, useEffect, useCallback } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Truly a reliable and creative team. Their work helped us achieve our business goals faster than we expected.",
    name: "Amit Verma",
    role: "Director, BrightEdge Solutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Contractum transformed our IT infrastructure completely. The team was professional, responsive, and deeply knowledgeable throughout.",
    name: "Priya Sharma",
    role: "CTO, NovaTech Enterprises",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Their GIS solutions gave us incredible insights into our field operations. We've seen a 40% improvement in efficiency since partnering with them.",
    name: "Rajesh Nair",
    role: "Operations Head, GreenField Corp",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    quote:
      "The e-commerce platform they built for us exceeded all expectations. Smooth, fast, and beautifully designed — our sales doubled in 3 months.",
    name: "Sunita Rao",
    role: "Founder, ShopNest India",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "Outstanding support and delivery. Contractum understood our vision and delivered a telecom solution that works flawlessly across our network.",
    name: "Vikram Khanna",
    role: "GM, ConnectLink Telecom",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((index + testimonials.length) % testimonials.length);
        setAnimating(false);
      }, 300);
    },
    [animating]
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="relative bg-gray-100 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-primary text-sm font-semibold tracking-widest mb-6 relative inline-block">
            OUR TESTIMONIALS
            <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-primary"></span>
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 relative">
            What They Are <br /> Talking About Us?
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
            Hear from our valued clients sharing their real experiences and
            success stories with us.
          </p>

          {/* Slide counter dots */}
          <div className="flex gap-2 mb-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current
                  ? "w-8 bg-indigo-600"
                  : "w-2 bg-gray-300 hover:bg-indigo-300"
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs h-1 bg-gray-200 rounded-full mb-10 overflow-hidden">
            <div
              key={current}
              className="h-full bg-indigo-600 rounded-full"
              style={{
                animation: "progressBar 5s linear forwards",
              }}
            />
          </div>
          <style>{`
            @keyframes progressBar {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>

        {/* RIGHT TESTIMONIAL CARD */}
        <div className="relative pb-20">
          <div
            className={`bg-white p-6 md:p-12 rounded-3xl shadow-xl transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"
              }`}
          >
            <div className="flex gap-2 text-indigo-600 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-4 min-h-[100px]">
              "{t.quote}"
            </p>
          </div>

          {/* Client Info */}
          <div
            className={`absolute -bottom-2 right-0 flex items-center gap-4 sm:gap-6 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"
              }`}
          >
            <div className="text-right">
              <h4 className="text-xl font-bold">{t.name}</h4>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-indigo-100"
            />
          </div>
        </div>
      </div>

      {/* LEFT & RIGHT ARROWS — centered below the two-column content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 flex justify-between items-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
        >
          <ArrowLeft size={22} />
        </button>

        {/* Testimonial counter */}
        <span className="text-gray-500 font-medium text-sm tracking-widest">
          {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>

        {/* Right Arrow */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </section>
  );
}