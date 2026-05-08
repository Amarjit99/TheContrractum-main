import { useState } from 'react';
import { Link } from 'react-router-dom';

const beliefs = [
  "We believe in the culture of performance.",
  "We believe in rewarding ideas!",
  "We believe in being a boundaryless organization.",
  "We build trust in the system through open communication.",
  "We take pride in what we do.",
];

export default function AboutSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE COLLAGE */}
        <div className="relative mb-16 lg:mb-0 mt-8 lg:mt-0">
          {/* Main Big Image */}
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="Business"
            className="rounded-lg shadow-xl w-[85%]"
          />

          {/* Top Image */}
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
            alt="Analytics"
            className="absolute top-[-40px] right-0 w-[60%] rounded-lg shadow-xl border-4 border-white"
          />

          {/* Bottom Image */}
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Team"
            className="absolute bottom-[-40px] right-10 w-[55%] rounded-lg shadow-xl border-4 border-white"
          />

          {/* Experience Badge */}
          <div className="absolute bottom-10 left-10 bg-primary text-white p-6 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold">10</h2>
            <p className="text-sm">Years of Experience</p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* About Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <p className="text-primary uppercase tracking-widest font-semibold text-sm">
              About Us
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            End To End <br />
            Business Solution <br />
            And Services.
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-2">
              Welcome to TheContractum
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We, Contractum Integral Solutions Pvt. Ltd., One of the most prominent global Business Solutions and Services providing company. We are involved in all types of B2B and B2C services in various segment. Our focuses cover the Pan Indian services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              TheContractum knows what it needs to be a leader and has a pool of carefully recruited business solution experts to service the success of each of our clients.
            </p>
          </div>

          {/* Beliefs */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-4">
              Our Beliefs
            </h3>
            <ul className="space-y-3">
              {beliefs.map((belief, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>{belief}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Read More Button */}
          <div className="mt-8">
            <Link
              to="/company/about-us"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition shadow-lg shadow-primary/20"
            >
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}