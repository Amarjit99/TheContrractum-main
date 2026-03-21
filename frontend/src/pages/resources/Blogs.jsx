import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import p20 from "../../assets/p20.png";
import p18 from "../../assets/p18.png";

export default function Blogs() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const categories = ['All', 'Technology', 'Business', 'Innovation', 'Digital Transformation', 'AI & ML', 'Cybersecurity'];

    // Handle scroll for scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBlogs = () => {
        document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const blogPosts = [
        {
            id: 1,
            title: "Artificial Intelligence: Transforming Business Operations",
            excerpt: "Discover how AI is revolutionizing the way companies operate and make decisions in the modern era.",
            author: "Rahul Sharma",
            date: "Feb 15, 2026",
            readTime: "6 min read",
            category: "AI & ML",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800"
        },
        {
            id: 2,
            title: "Cloud Computing: The Backbone of Modern Infrastructure",
            excerpt: "Understanding the critical role of cloud technologies in enabling scalable and flexible business solutions.",
            author: "Priya Patel",
            date: "Feb 12, 2026",
            readTime: "5 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
        },
        {
            id: 3,
            title: "Strategic Innovation: Staying Ahead in a Competitive Market",
            excerpt: "Learn the key strategies that successful companies use to maintain their competitive edge through innovation.",
            author: "Amit Kumar",
            date: "Feb 10, 2026",
            readTime: "7 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
        },
        {
            id: 4,
            title: "Cybersecurity Best Practices for 2026",
            excerpt: "Essential security measures every organization should implement to protect their digital assets.",
            author: "Neha Singh",
            date: "Feb 8, 2026",
            readTime: "6 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800"
        },
        {
            id: 5,
            title: "The Rise of Remote Work: Building Digital-First Teams",
            excerpt: "How companies are adapting to the new normal of distributed teams and hybrid work models.",
            author: "Vikram Malhotra",
            date: "Feb 5, 2026",
            readTime: "5 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
        },
        {
            id: 6,
            title: "Machine Learning Applications in Real-World Scenarios",
            excerpt: "Practical examples of how ML is being deployed across various industries to solve complex problems.",
            author: "Anjali Desai",
            date: "Feb 3, 2026",
            readTime: "8 min read",
            category: "AI & ML",
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800"
        },
        {
            id: 7,
            title: "The Future of Blockchain Technology in Enterprise",
            excerpt: "How blockchain is transforming supply chain management and digital contracts in large organizations.",
            author: "Sanjay Mehta",
            date: "Jan 30, 2026",
            readTime: "7 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800"
        },
        {
            id: 8,
            title: "Digital Transformation: A Complete Roadmap",
            excerpt: "Step-by-step guide to successfully implementing digital transformation in your organization.",
            author: "Meera Kapoor",
            date: "Jan 28, 2026",
            readTime: "10 min read",
            category: "Digital Transformation",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800"
        },
        {
            id: 9,
            title: "Advanced Cybersecurity Threat Detection",
            excerpt: "Modern techniques for identifying and mitigating cyber threats before they impact your business.",
            author: "Rohan Verma",
            date: "Jan 25, 2026",
            readTime: "6 min read",
            category: "Cybersecurity",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
        },
        {
            id: 10,
            title: "Innovation Management: From Idea to Implementation",
            excerpt: "Best practices for fostering a culture of innovation and bringing new ideas to market.",
            author: "Kavita Reddy",
            date: "Jan 22, 2026",
            readTime: "9 min read",
            category: "Innovation",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800"
        },
        {
            id: 11,
            title: "Building Scalable Software Architecture",
            excerpt: "Design patterns and principles for creating applications that grow with your business needs.",
            author: "Arun Sharma",
            date: "Jan 20, 2026",
            readTime: "8 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800"
        },
        {
            id: 12,
            title: "Leadership in the Digital Age",
            excerpt: "Essential skills and strategies for leading teams through technological change and innovation.",
            author: "Priya Patel",
            date: "Jan 18, 2026",
            readTime: "7 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
        }
    ];

    // Filter by category and search
    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const displayedPosts = filteredPosts.slice(0, visiblePosts);
    const hasMorePosts = visiblePosts < filteredPosts.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            
            {/* Hero Section */}
            <section
                className="relative h-[60vh] sm:h-[65vh] md:h-[75vh] flex items-center text-white"
                style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                            Insights & <br />
                            <span className="font-extrabold">Innovation Hub</span>
                        </h1>

                        <p className="mt-4 md:mt-6 text-base sm:text-lg text-gray-200 max-w-xl">
                            Explore expert insights, industry trends, and innovative ideas that drive digital transformation and business success.
                        </p>

                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button 
                                onClick={scrollToBlogs}
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary-light text-white text-sm sm:text-base font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                Explore Articles
                            </button>
                            <a 
                                href="#newsletter"
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 text-center"
                            >
                                Subscribe
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:flex justify-center md:justify-end">
                        <img
                            src={p20}
                            alt="Digital Innovation"
                            className="w-64 lg:w-96 xl:w-[420px] animate-float drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Animation Styles */}
                <style>{`
                    @keyframes floatY {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    .animate-float {
                        animation: floatY 6s ease-in-out infinite;
                    }
                `}</style>
            </section>

            {/* Featured Topics Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-8 md:mb-10 text-center">
                        Featured Topics
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                        {[
                            { name: "AI & Machine Learning", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=300" },
                            { name: "Cloud Computing", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300" },
                            { name: "Cybersecurity", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300" },
                            { name: "Digital Innovation", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300" }
                        ].map((item, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden border-2 sm:border-4 border-purple-200 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-700 font-medium group-hover:text-primary transition-colors">
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning Section */}
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-primary-light relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid md:grid-cols-[40%_60%] items-center gap-0 shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden bg-white">

                        {/* LEFT IMAGE */}
                        <div className="hidden md:block">
                            <div className="relative overflow-hidden bg-white h-full">
                                <img
                                    src={p18}
                                    alt="Dynamic Learning"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                            </div>
                        </div>

                        {/* RIGHT CONTENT BOX */}
                        <div className="bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 md:p-10 lg:p-14">
                            <div className="flex items-center gap-3 mb-6">
                                
                                <div>
                                    
                                
                                </div>
                            </div>
                            
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2 md:mb-3">
                                Dynamic Learning for
                            </h2>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-primary-light bg-clip-text text-transparent mb-4 md:mb-6">
                                Cutting-Edge Skills
                            </h2>

                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6 md:mb-8">
                                At The Contractum, we deliver comprehensive training that enables you 
                                to specialize in emerging technologies essential for today's job market. 
                                Our programs span various competencies and industry certifications, 
                                all supported by expert instructors with real-world experience.
                            </p>

                            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
                                <div className="group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-lg sm:rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                                    <div className="relative text-center p-2 sm:p-3 md:p-4 text-white">
                                        <div className="text-lg sm:text-xl md:text-2xl font-black mb-1">500+</div>
                                        <div className="text-[10px] sm:text-xs font-medium opacity-90">Articles</div>
                                    </div>
                                </div>
                                <div className="group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-primary rounded-lg sm:rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                                    <div className="relative text-center p-2 sm:p-3 md:p-4 text-white">
                                        <div className="text-lg sm:text-xl md:text-2xl font-black mb-1">50K+</div>
                                        <div className="text-[10px] sm:text-xs font-medium opacity-90">Readers</div>
                                    </div>
                                </div>
                                <div className="group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-primary-light rounded-lg sm:rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                                    <div className="relative text-center p-2 sm:p-3 md:p-4 text-white">
                                        <div className="text-lg sm:text-xl md:text-2xl font-black mb-1">100+</div>
                                        <div className="text-[10px] sm:text-xs font-medium opacity-90">Topics</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <button className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-primary via-primary to-primary-light text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Start Learning
                                </button>
                                <button className="px-4 sm:px-6 py-3 sm:py-3.5 bg-primary text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:bg-primary-dark transition-all duration-300 hover:scale-105">
                                    View Courses
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <div id="blog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* Search and Filter Header */}
                <div className="mb-8 md:mb-12 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 mb-4 md:mb-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-black">Explore Our Blogs</h2>
                            <p className="text-sm sm:text-base text-gray-600 mt-1 md:mt-2">Discover insights from industry experts and thought leaders</p>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                            />
                            <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Filter by Category:</h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setVisiblePosts(6);
                                    }}
                                    className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base rounded-full font-semibold transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-primary border-2 border-transparent hover:border-purple-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="mb-8 md:mb-12">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black">
                            {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
                        </h2>
                        <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-purple-100 text-primary rounded-full text-xs sm:text-sm font-semibold">
                            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                        </span>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                {displayedPosts.map((post) => (
                                    <div 
                                        key={post.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100 group"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-6">
                                            <span className="inline-block px-3 py-1 bg-purple-100 text-primary text-xs font-semibold rounded-full mb-3">
                                                {post.category}
                                            </span>
                                            <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-100">
                                                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {post.author.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-700">{post.author}</p>
                                                    <p className="text-xs text-gray-500">{post.date}</p>
                                                </div>
                                                <span className="text-xs text-gray-500">{post.readTime}</span>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/resources/blogs/${post.id}`)}
                                                className="w-full py-2 bg-gradient-to-r from-primary to-primary-light text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                            >
                                                Read Article →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {hasMorePosts && (
                                <div className="text-center mt-8 md:mt-12">
                                    <button
                                        onClick={() => setVisiblePosts(prev => prev + 6)}
                                        className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-primary text-black-300 font-bold rounded-lg sm:rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:scale-105"
                                    >
                                        Load More Articles
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

               

                {/* Trending Topics */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl"></span> Trending Topics
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {['Cloud Computing', 'DevOps', 'Blockchain', 'IoT', 'Data Science', 'Agile', 'Microservices', 'Kubernetes', 'React', 'Machine Learning', 'API Design', 'Web3'].map((topic, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchQuery(topic)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-xs sm:text-sm font-medium hover:from-primary-dark hover:to-pink-100 hover:text-primary cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105"
                            >
                                #{topic}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 p-3 sm:p-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 group"
                    aria-label="Scroll to top"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            )}
        </div>
    );
}
