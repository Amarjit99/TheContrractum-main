"use client";

import { Users, Briefcase, Trophy, BarChart3 } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      number: "1000",
      title: "Our Staffs",
      desc: "TheContractum has a pool of carefully recruited business solution experts to service the success of each of our clients.",
      icon: <Users size={60} strokeWidth={1.5} />,
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
    },
    {
      number: "200",
      title: "Our Clients",
      desc: "Trusted by over 200 businesses ranging from startups to large enterprises across diverse industries.",
      icon: <Briefcase size={60} strokeWidth={1.5} />,
      bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop",
    },
    {
      number: "175",
      title: "Completed Projects",
      desc: "Successfully delivered 175+ projects spanning IT, GIS, telecom, HR tech, and more.",
      icon: <Trophy size={60} strokeWidth={1.5} />,
      bgImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop",
    },
    {
      number: "25",
      title: "Running Projects",
      desc: "Actively managing 25+ ongoing projects, delivering innovation and progress every day.",
      icon: <BarChart3 size={60} strokeWidth={1.5} />,
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Small Top Tag */}
        <div className="mb-4">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold">
            Our Feature
          </p>
          <div className="w-6 h-6 border-2 border-primary rounded-full mx-auto mt-2"></div>
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-20">
          Our Feature
        </h2>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 relative">

          {features.map((item, index) => (
            <div key={index} className="group relative flex flex-col items-center cursor-pointer">

              {/* Red Half Circle Background with Hover Image */}
              <div className="relative w-64 h-64 flex items-center justify-center overflow-hidden rounded-full">

                {/* Background Image on Hover (Desktop) / Always Visible (Mobile/Tablet) */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-500 rounded-full"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                ></div>

                <div className="absolute w-64 h-64 bg-primary rounded-full -left-6 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="relative w-60 h-60 bg-primary group-hover:bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">

                  {/* Icon Background Image on Hover (Desktop) / Always Visible (Mobile/Tablet) */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${item.bgImage})` }}
                  ></div>

                  <div className="relative text-blue-900 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                    {item.icon}
                  </div>
                </div>

                {/* Step Number Circle */}
                <div className="absolute bottom-4 right-6 w-14 h-14 bg-black group-hover:bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                  {item.number}
                </div>

              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary mt-8 mb-4 transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-gray-600 group-hover:text-gray-900 max-w-xs leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}