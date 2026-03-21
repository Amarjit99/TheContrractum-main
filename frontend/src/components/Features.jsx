export default function AboutSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE COLLAGE */}
        <div className="relative">

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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            End To End <br />
            Business Solution <br />
            And Services.
          </h2>

          {/* About Contractum */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-2">
              About The Contractum
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Contractum Integral Solutions Pvt. Ltd. is a leading global
              provider of B2B and B2C services across multiple segments,
              offering Pan-India coverage.
            </p>
          </div>

          {/* Expertise */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-black mb-2">
              Our Expertise
            </h3>
            <p className="text-gray-600 leading-relaxed">
              With a team of expert professionals, we deliver tailored
              business solutions to drive your growth at any stage of your
              business journey.
            </p>
          </div>

          {/* Button */}
          <button className="bg-primary text-white px-8 py-3 font-semibold rounded hover:bg-primary-dark transition duration-300 shadow-lg">
            Discover More
          </button>

        </div>
      </div>
    </section>
  );
}
