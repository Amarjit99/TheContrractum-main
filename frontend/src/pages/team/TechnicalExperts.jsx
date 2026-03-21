import { Building2, Cloud, Lock, CheckCircle, Users, FileText, BookOpen, Video } from "lucide-react";
import technical from "../../assets/technical.jpg";
export default function TechnicalExperts() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Background */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${technical})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            Industry-Leading Expertise
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            World-Class Technical Excellence
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Our team of certified technical experts combines deep industry knowledge with cutting-edge solutions to drive your success
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Connect with Our Experts
                        </button>
                    </div>
                </div>
            </div>

            {/* About Our Expertise */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">About Our Team</span>
                            <h2 className="text-4xl sm:text-5xl font-black mb-8 text-slate-900 leading-tight">Expert Solutions for Complex Challenges</h2>
                            <p className="text-slate-700 mb-5 text-lg leading-relaxed">
                                Our technical experts bring extensive experience across multiple industries and technologies. We specialize in delivering innovative solutions that address your most pressing business challenges.
                            </p>
                            <p className="text-slate-700 mb-10 text-lg leading-relaxed">
                                With a proven track record of successful implementations and a deep understanding of emerging technologies, our team is equipped to guide your organization through digital transformation.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-bold text-lg">25+ Years Combined Experience</span>
                                        <p className="text-slate-600 text-sm">Proven expertise across diverse sectors</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-bold text-lg">Industry Certifications & Training</span>
                                        <p className="text-slate-600 text-sm">Latest certifications and continuous learning</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-bold text-lg">Dedicated Support & Guidance</span>
                                        <p className="text-slate-600 text-sm">24/7 assistance and consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-2xl transform -skew-y-3 opacity-20"></div>
                            <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-2 shadow-2xl overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop" alt="Technical Team Meeting" className="rounded-xl w-full object-cover h-96 shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Expertise Areas */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Core Capabilities
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">Targeted Expertise Areas</h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Our specialists deliver customized solutions across multiple domains
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-blue-500/30">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">Enterprise Architecture</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Design and implement scalable enterprise solutions with cloud-native architectures and microservices integration
                            </p>
                            <a href="#" className="inline-flex items-center text-blue-300 font-bold hover:text-white transition-colors">
                                Learn More <span className="ml-2">→</span>
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-cyan-500/30">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Cloud className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">Cloud Migration</h3>
                            <p className="text-cyan-100 mb-6 leading-relaxed">
                                Seamless transition to cloud platforms with minimal disruption, ensuring security, performance, and cost optimization
                            </p>
                            <a href="#" className="inline-flex items-center text-cyan-300 font-bold hover:text-white transition-colors">
                                Learn More <span className="ml-2">→</span>
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-indigo-500/30">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">Security & Compliance</h3>
                            <p className="text-indigo-100 mb-6 leading-relaxed">
                                Comprehensive security frameworks and compliance solutions protecting your digital assets and data integrity
                            </p>
                            <a href="#" className="inline-flex items-center text-indigo-300 font-bold hover:text-white transition-colors">
                                Learn More <span className="ml-2">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Impact
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
                            Proven Excellence
                        </h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Figures that strengthen our commitment to go above and beyond</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="group relative bg-gradient-to-br from-primary/10 to-primary-light/10 border border-blue-500/30 rounded-2xl p-12 hover:border-blue-400/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 rounded-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light mb-3">
                                    500+
                                </p>
                                <p className="text-xl font-bold text-slate-200">Successfully Delivered Projects</p>
                                <p className="text-slate-400 text-sm mt-2">Proven track record of excellence</p>
                            </div>
                        </div>
                        <div className="group relative bg-gradient-to-br from-cyan-600/10 to-cyan-800/10 border border-cyan-500/30 rounded-2xl p-12 hover:border-cyan-400/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-cyan-500/0 group-hover:from-cyan-600/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-3">
                                    10M+
                                </p>
                                <p className="text-xl font-bold text-slate-200">Lives Positively Impacted</p>
                                <p className="text-slate-400 text-sm mt-2">Global reach and influence</p>
                            </div>
                        </div>
                        <div className="group relative bg-gradient-to-br from-primary/10 to-primary-dark/10 border border-primary/30 rounded-2xl p-12 hover:border-primary-light/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary mb-3">
                                    50+
                                </p>
                                <p className="text-xl font-bold text-slate-200">Certified Experts</p>
                                <p className="text-slate-400 text-sm mt-2">Highly qualified professionals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Meet the Team</span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">Our Technical Experts</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Our team comprises industry veterans with deep expertise across various technical domains
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Expert Card 1 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop" alt="John Mitchell" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">John Mitchell</h3>
                                <p className="text-blue-600 font-bold mb-3">Lead Cloud Architect</p>
                                <p className="text-slate-600 text-sm leading-relaxed">15+ years in cloud infrastructure and enterprise solutions</p>
                            </div>
                        </div>

                        {/* Expert Card 2 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=450&fit=crop" alt="Sarah Anderson" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">Sarah Anderson</h3>
                                <p className="text-blue-600 font-bold mb-3">Security Specialist</p>
                                <p className="text-slate-600 text-sm leading-relaxed">12+ years in cybersecurity and compliance frameworks</p>
                            </div>
                        </div>

                        {/* Expert Card 3 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src="https://images.unsplash.com/photo-1539571696357-5a69c006ad4c?w=400&h=450&fit=crop" alt="David Chen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">David Chen</h3>
                                <p className="text-blue-600 font-bold mb-3">Data Solutions Lead</p>
                                <p className="text-slate-600 text-sm leading-relaxed">10+ years in big data analytics and AI implementation</p>
                            </div>
                        </div>

                        {/* Expert Card 4 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src="https://images.unsplash.com/photo-1438746681033-6461ffad8d80?w=400&h=450&fit=crop" alt="Emily Rodriguez" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">Emily Rodriguez</h3>
                                <p className="text-blue-600 font-bold mb-3">DevOps Architect</p>
                                <p className="text-slate-600 text-sm leading-relaxed">9+ years in infrastructure automation and CI/CD pipelines</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* Form Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-4xl font-black mb-4 text-white">Talk to an Expert</h3>
                            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                                Connect with our technical experts to discuss your specific challenges and discover tailored solutions for your business.
                            </p>
                            <form className="space-y-5">
                                <div>
                                    <input type="text" placeholder="Your Name" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Your Email" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Company Name" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500" />
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-xl transition transform hover:scale-105 shadow-2xl">
                                    Request Expert Consultation
                                </button>
                            </form>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h3 className="text-4xl font-black mb-10 text-white">The answers to your main questions</h3>
                            <div className="space-y-5">
                                <div className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 cursor-pointer border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                                    <p className="font-black text-white text-lg mb-3 group-hover:text-blue-300 transition">What is technical expertise?</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">Our experts provide specialized knowledge and consulting services across cloud, security, and enterprise solutions tailored to your needs.</p>
                                </div>
                                <div className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 cursor-pointer border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                                    <p className="font-black text-white text-lg mb-3 group-hover:text-blue-300 transition">How can we assess your needs?</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">We conduct comprehensive assessments of your current infrastructure and business requirements to create a strategic roadmap.</p>
                                </div>
                                <div className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 cursor-pointer border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                                    <p className="font-black text-white text-lg mb-3 group-hover:text-blue-300 transition">What is our commitment?</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">We're dedicated to delivering measurable results and long-term success for your organization through expert guidance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Knowledge Center</span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">Latest Technical Insights</h2>
                        <p className="text-slate-600 text-lg">
                            Stay updated with industry trends and expert perspectives
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" alt="Whitepaper" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">WHITEPAPER</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">Cloud Migration Best Practices 2024</h3>
                                <p className="text-slate-600 leading-relaxed">Comprehensive guide to planning and executing successful cloud transitions with minimal risk</p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop" alt="Case Study" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-4 h-4 text-purple-700" />
                                    </div>
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">CASE STUDY</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">Enterprise Security Transformation</h3>
                                <p className="text-slate-600 leading-relaxed">How we helped a global enterprise strengthen their security posture and compliance framework</p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-56">
                                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop" alt="Webinar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                                        <Video className="w-4 h-4 text-cyan-700" />
                                    </div>
                                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">WEBINAR</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">AI and Machine Learning in Enterprise</h3>
                                <p className="text-slate-600 leading-relaxed">Explore practical applications of AI for modern business solutions and digital transformation</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 px-10 rounded-xl transition transform hover:scale-105 shadow-2xl">
                            View All Resources
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

