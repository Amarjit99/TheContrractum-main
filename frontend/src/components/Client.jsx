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

  // Auto rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
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

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16">
          100% <span className="relative">
            Satisfied Clients
            <span className="absolute -top-2 -right-4 w-2 h-2 bg-primary rounded-full"></span>
          </span>
        </h2>

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

        {/* Slide counter dots */}
        <div className="flex gap-2 justify-start mt-12 mb-4">
          {clients.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === startIndex
                ? "w-8 bg-indigo-600"
                : "w-2 bg-gray-300 hover:bg-indigo-300"
                }`}
              aria-label={`Go to client ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs h-1 bg-gray-200 rounded-full mb-10 overflow-hidden">
          <div
            key={startIndex}
            className="h-full bg-indigo-600 rounded-full"
            style={{
              animation: "progressBar 4s linear forwards",
            }}
          />
        </div>

        <style>{`
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>

        {/* Navigation arrows & counter */}
        <div className="mt-12 flex justify-between items-center w-full">
          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous clients"
            className="w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
          >
            <ArrowLeft size={22} />
          </button>

          {/* Counter */}
          <span className="text-gray-500 font-medium text-sm tracking-widest">
            {String(startIndex + 1).padStart(2, "0")} / {String(clients.length).padStart(2, "0")}
          </span>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next clients"
            className="w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
          >
            <ArrowRight size={22} />
          </button>
        </div>

      </div>
    </section>
  );
}