import React from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="relative bg-gray-100 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-primary text-sm font-semibold tracking-widest mb-6 relative inline-block">
            OUR TESTIMONIALS
            <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-primary"></span>
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 relative">
            What They Are <br /> Talking About Us?
            <span className="absolute top-2 right-10 w-3 h-3 bg-primary rounded-full"></span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
            Hear from our valued clients sharing their real experiences and
            success stories with us.
          </p>

          <button className="bg-primary hover:bg-primary text-white px-10 py-4 font-semibold rounded-2xl shadow-lg transition">
            DISCOVER MORE
          </button>

          {/* Arrows */}
          <div className="flex gap-4 mt-12">
            <button className="w-14 h-14 flex items-center justify-center bg-primary hover:bg-primary-dark rounded-xl transition">
              <ArrowLeft />
            </button>
            <button className="w-14 h-14 flex items-center justify-center bg-primary hover:bg-primary-dark rounded-xl transition">
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* RIGHT TESTIMONIAL CARD */}
        <div className="relative">
          <div className="bg-white p-12 rounded-3xl shadow-xl max-w-xl">
            <div className="flex gap-2 text-blue-900 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              "Truly a reliable and creative team. Their work helped us
              achieve our business goals faster than we expected."
            </p>
          </div>

          {/* Client Info */}
          <div className="absolute -bottom-16 right-0 flex items-center gap-6">
            <div className="text-right">
              <h4 className="text-2xl font-bold">Amit Verma</h4>
              <p className="text-gray-500">
                Director, BrightEdge Solutions
              </p>
            </div>

            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Amit Verma"
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
