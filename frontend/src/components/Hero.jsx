import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const texts = [
    "Professional Business Support Services",
    "Strategic Business Support Services",
    "Effective Business Support Services",
    "Professional Smart Support Services",
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
  ];

  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(bgInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden">

      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: bgIndex === idx ? 1 : 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/65"></div>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="max-w-2xl space-y-6">

          {/* Rotating Heading */}
          <h1
            key={index}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight transition-all duration-500"
          >
            {texts[index]}
          </h1>

          {/* Paragraph */}
          <p className="text-gray-300 text-lg leading-relaxed">
            Empowering businesses with cutting-edge technology solutions,
            strategic consulting, and innovative services designed to drive
            growth and digital transformation.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">

            <Link
              to="/careers"
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Join Our Team
            </Link>

            <Link
              to="/partner"
              className="px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition"
            >
              Become a Partner
            </Link>

          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setBgIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              bgIndex === idx
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
