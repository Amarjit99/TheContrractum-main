import { useEffect, useState } from "react";
import { Users, Briefcase, Trophy, BarChart3, Calendar } from "lucide-react";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function WhyChooseUs() {
  const [stats, setStats] = useState({
    staffs: 0,
    clients: 0,
    completedProjects: 0,
    runningProjects: 0,
    miniEvents: 0
  });

  useEffect(() => {
    fetch(`${API}/api/public/stats`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data) {
          setStats({
            staffs: data.staffs ?? 0,
            clients: data.clients ?? 0,
            completedProjects: data.completedProjects ?? 0,
            runningProjects: data.runningProjects ?? 0,
            miniEvents: data.miniEvents ?? 0
          });
        }
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
      });
  }, []);

  const features = [
    {
      number: String(stats.staffs),
      title: "Our Staffs",
      desc: "TheContractum has a pool of carefully recruited business solution experts to service the success of each of our clients.",
      icon: <Users size={60} strokeWidth={1.5} className="text-blue-900" />,
      bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
    },
    {
      number: String(stats.clients),
      title: "Our Clients",
      desc: `Trusted by over ${stats.clients} businesses ranging from startups to large enterprises across diverse industries.`,
      icon: <Briefcase size={60} strokeWidth={1.5} className="text-blue-900" />,
      bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop",
    },
    {
      number: String(stats.completedProjects),
      title: "Completed Projects",
      desc: `Successfully delivered ${stats.completedProjects}+ projects spanning IT, GIS, telecom, HR tech, and more.`,
      icon: <Trophy size={60} strokeWidth={1.5} className="text-blue-900" />,
      bgImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop",
    },
    {
      number: String(stats.runningProjects),
      title: "Running Projects",
      desc: `Actively managing ${stats.runningProjects}+ ongoing projects, delivering innovation and progress every day.`,
      icon: <BarChart3 size={60} strokeWidth={1.5} className="text-blue-900" />,
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop",
    },
    {
      number: String(stats.miniEvents),
      title: "Mini Event Platform",
      desc: "A real-time interactive application showcasing RSVP flow, concurrency, and attendee management.",
      icon: <Calendar size={60} strokeWidth={1.5} className="text-blue-900" />,
      bgImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

        {/* Small Top Tag */}
        <div className="mb-4 flex flex-col items-center">
          <p className="text-black uppercase tracking-widest text-sm font-semibold">
            Our Feature
          </p>
          <div className="w-6 h-6 border-2 border-black rounded-full mt-2"></div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-20 text-center">
          Why Choose The Contractum
        </h2>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 xl:gap-8 justify-center relative">

          {features.map((item, index) => (
            <div key={index} className="group relative flex flex-col items-center cursor-pointer">

              {/* Circle Container */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center overflow-hidden rounded-full bg-white shadow-lg group-hover:shadow-2xl transition-all duration-500">

                {/* Background Image on Hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-500 rounded-full"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                ></div>

                {/* Icon */}
                <div className="relative group-hover:scale-110 transition-all duration-500 z-10">
                  {item.icon}
                </div>

                {/* Step Number Circle */}
                <div className="absolute bottom-2 right-3 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md z-10">
                  {item.number}
                </div>

              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-black mt-6 mb-3 transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-gray-600 group-hover:text-gray-900 text-xs max-w-xs leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}