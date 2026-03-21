import React from "react";
import { Calendar, User, MessageCircle } from "lucide-react";

export default function ConsultingBlogSection() {
  const posts = [
    {
      title: "Digital Transformation: The Key to Modern Business Success",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      date: "January 15, 2026",
      author: "The Contractum",
      comments: "24",
      excerpt: "Discover how digital transformation is revolutionizing businesses across industries. Learn the essential strategies and technologies that drive success in today's competitive market.",
      reverse: false,
    },
    {
      title: "Building a Scalable IT Infrastructure for Growing Companies",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      date: "January 10, 2026",
      author: "The Contractum",
      comments: "18",
      excerpt: "Explore best practices for creating robust IT infrastructure that scales with your business. From cloud solutions to network security, we cover everything you need to know.",
      reverse: true,
    },
    {
      title: "Strategic Business Consulting: Maximizing Your ROI",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      date: "January 5, 2026",
      author: "The Contractum",
      comments: "32",
      excerpt: "Learn proven strategies to optimize your business operations and maximize return on investment. Our expert consultants share insights from successful client transformations.",
      reverse: false,
    },
  ];

  return (
    <section className="relative bg-gray-100 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(229 231 235) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 relative">
          <p className="text-primary text-sm font-semibold tracking-widest mb-4 uppercase">
            OUR BLOG
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Latest Insights & Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in business consulting and digital transformation.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-16">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                post.reverse ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`rounded-2xl overflow-hidden shadow-lg group ${
                  post.reverse ? "lg:col-start-2" : ""
                }`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div
                className={`bg-white p-10 rounded-2xl shadow-sm border ${
                  post.reverse ? "lg:col-start-1" : ""
                }`}
              >
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-primary" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-primary" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug hover:text-primary transition cursor-pointer">
                  {post.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <button className="bg-primary text-white font-semibold hover:bg-primary-dark flex items-center gap-2 group px-4 py-2 rounded">
                  Read More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
