```jsx
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide mb-6">
              ABOUT THE CONTRACTUM
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Driving Business Growth Through
              <span className="text-primary"> Innovation & Excellence</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The Contractum is a technology-driven organization committed to
              delivering innovative digital solutions, business consulting, and
              workforce transformation services that help businesses thrive in
              a rapidly evolving world.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              With a strong focus on quality, reliability, and customer
              satisfaction, we empower organizations to achieve sustainable
              growth through technology, talent, and strategic expertise.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={22} />
                <span className="text-gray-700">
                  Industry-leading business solutions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={22} />
                <span className="text-gray-700">
                  Experienced professionals and consultants
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={22} />
                <span className="text-gray-700">
                  Trusted by clients across multiple industries
                </span>
              </div>
            </div>

            {/* CTA */}
            <button className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
              Learn More
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Image & Stats */}
          <div className="relative">

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-company.jpg"
                alt="About The Contractum"
                width={700}
                height={700}
                className="w-full h-[550px] object-cover"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 left-6 right-6">
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    10+
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Years Experience
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    5000+
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Happy Clients
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
```
