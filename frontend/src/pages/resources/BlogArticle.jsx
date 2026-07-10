import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Full blog posts data with complete article content
export const blogPosts = [
    {
        id: 1,
        title: "Artificial Intelligence: Transforming Business Operations",
            excerpt: "Discover how AI is revolutionizing the way companies operate and make decisions in the modern era.",
            author: "Rahul Sharma",
            date: "Feb 15, 2026",
            readTime: "6 min read",
            category: "AI & ML",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
            content: {
                intro: "Artificial Intelligence has emerged as one of the most transformative technologies of our time. From automating routine tasks to enabling data-driven decision making, AI is reshaping how businesses operate across all industries.",
                sections: [
                    {
                        heading: "The AI Revolution in Modern Business",
                        text: "Today's businesses are leveraging AI to gain competitive advantages in unprecedented ways. Machine learning algorithms can now predict customer behavior, optimize supply chains, and identify patterns that humans might miss. Companies that embrace AI technologies are seeing significant improvements in efficiency, cost reduction, and customer satisfaction.",
                        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200"
                    },
                    {
                        heading: "Key Applications of AI",
                        text: "AI is being deployed across various business functions. In customer service, chatbots and virtual assistants handle millions of queries 24/7. In finance, AI algorithms detect fraudulent transactions in real-time. Marketing teams use AI to personalize content and predict campaign outcomes. Manufacturing facilities employ AI-powered robots for precision tasks and quality control.",
                        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200"
                    },
                    {
                        heading: "Challenges and Considerations",
                        text: "While AI offers tremendous potential, organizations must navigate challenges such as data privacy, ethical considerations, and the need for skilled talent. Successful AI implementation requires a clear strategy, quality data, and a culture that embraces change. Companies must also ensure their AI systems are transparent, fair, and aligned with human values.",
                        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
                    },
                    {
                        heading: "The Future of AI in Business",
                        text: "Looking ahead, AI will continue to evolve and expand its influence. Emerging technologies like quantum computing and advanced neural networks promise even greater capabilities. Businesses that invest in AI today are positioning themselves for long-term success in an increasingly digital world.",
                        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200"
                    }
                ],
                conclusion: "Artificial Intelligence is no longer a futuristic concept—it's a present-day reality that's transforming how businesses operate. Organizations that strategically adopt AI technologies while addressing ethical considerations will be best positioned to thrive in the digital age."
            }
        },
        {
            id: 2,
            title: "Cloud Computing: The Backbone of Modern Infrastructure",
            excerpt: "Understanding the critical role of cloud technologies in enabling scalable and flexible business solutions.",
            author: "Priya Patel",
            date: "Feb 12, 2026",
            readTime: "5 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
            content: {
                intro: "Cloud computing has revolutionized the way organizations build, deploy, and scale their IT infrastructure. What once required massive capital investments in physical servers can now be achieved with a few clicks.",
                sections: [
                    {
                        heading: "Understanding Cloud Computing",
                        text: "Cloud computing delivers computing services—including servers, storage, databases, networking, software, and analytics—over the Internet. This model offers flexibility, scalability, and cost-efficiency that traditional on-premises infrastructure cannot match. Organizations can scale resources up or down based on demand, paying only for what they use.",
                        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
                    },
                    {
                        heading: "Types of Cloud Services",
                        text: "Cloud services come in three main models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). IaaS provides virtualized computing resources, PaaS offers platforms for application development, and SaaS delivers complete applications over the Internet. Each model serves different business needs and use cases.",
                        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200"
                    },
                    {
                        heading: "Benefits for Modern Businesses",
                        text: "Cloud computing enables businesses to innovate faster, reduce IT costs, and improve operational efficiency. Companies can deploy new applications in minutes rather than months, collaborate more effectively across geographic boundaries, and ensure business continuity with built-in disaster recovery capabilities.",
                        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200"
                    },
                    {
                        heading: "Security and Compliance",
                        text: "Modern cloud providers invest heavily in security measures, often exceeding what individual organizations can implement on their own. Features like encryption, identity management, and compliance certifications help businesses maintain security while meeting regulatory requirements. However, organizations must still implement proper security practices and understand the shared responsibility model.",
                        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200"
                    }
                ],
                conclusion: "Cloud computing has become essential infrastructure for modern businesses. As technology continues to evolve, organizations that embrace cloud-first strategies will be better positioned to innovate, scale, and compete in the digital marketplace."
            }
        },
        {
            id: 3,
            title: "Strategic Innovation: Staying Ahead in a Competitive Market",
            excerpt: "Learn the key strategies that successful companies use to maintain their competitive edge through innovation.",
            author: "Amit Kumar",
            date: "Feb 10, 2026",
            readTime: "7 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
            content: {
                intro: "In today's rapidly evolving business landscape, innovation is no longer optional—it's essential for survival. Companies that fail to innovate risk becoming obsolete as competitors and new entrants disrupt their markets.",
                sections: [
                    {
                        heading: "The Innovation Imperative",
                        text: "Strategic innovation goes beyond developing new products or services. It involves reimagining business models, processes, and customer experiences. Successful innovators create ecosystems that foster creativity, encourage experimentation, and rapidly bring ideas to market. They understand that innovation must be embedded in the organization's DNA, not treated as a separate initiative.",
                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                    },
                    {
                        heading: "Building an Innovation Culture",
                        text: "Creating a culture of innovation requires leadership commitment, resources, and the right mindset. Organizations must empower employees to take calculated risks, learn from failures, and challenge the status quo. This means establishing processes for capturing and evaluating ideas, providing time and resources for experimentation, and celebrating both successes and instructive failures.",
                        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                    },
                    {
                        heading: "Customer-Centric Innovation",
                        text: "The most successful innovations solve real customer problems. Companies must develop deep insights into customer needs, pain points, and aspirations. This requires continuous engagement, data analysis, and empathy. By focusing on customer value rather than technology for its own sake, organizations can create innovations that resonate in the market.",
                        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200"
                    },
                    {
                        heading: "Measuring Innovation Success",
                        text: "Effective innovation requires clear metrics and accountability. Organizations should track both input metrics (like R&D spending and innovation projects) and output metrics (like new revenue from innovations and time-to-market). These measurements help identify what's working, what isn't, and where to adjust strategy.",
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
                    }
                ],
                conclusion: "Strategic innovation is a continuous journey, not a destination. Companies that systematically invest in innovation capabilities, foster the right culture, and stay closely connected to customer needs will be best positioned to thrive in competitive markets."
            }
        },
        {
            id: 4,
            title: "Cybersecurity Best Practices for 2026",
            excerpt: "Essential security measures every organization should implement to protect their digital assets.",
            author: "Neha Singh",
            date: "Feb 8, 2026",
            readTime: "6 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
            content: {
                intro: "As cyber threats become increasingly sophisticated, organizations must adopt comprehensive security strategies to protect their digital assets, customer data, and business operations.",
                sections: [
                    {
                        heading: "The Evolving Threat Landscape",
                        text: "Cyber threats in 2026 are more advanced than ever. Attackers use AI-powered tools, exploit zero-day vulnerabilities, and launch sophisticated social engineering campaigns. Ransomware attacks target critical infrastructure, while data breaches expose sensitive information. Organizations must understand these evolving threats to build effective defenses.",
                        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200"
                    },
                    {
                        heading: "Implementing Defense in Depth",
                        text: "A multi-layered security approach is essential. This includes perimeter defenses like firewalls, network segmentation, endpoint protection, email security, and application security. Each layer provides additional protection, ensuring that if one defense fails, others remain effective. Regular security assessments help identify and address vulnerabilities before they can be exploited.",
                        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"
                    },
                    {
                        heading: "Zero Trust Architecture",
                        text: "The traditional security perimeter has dissolved in the era of cloud computing and remote work. Zero trust architecture assumes no user or device should be automatically trusted. Every access request must be verified, regardless of its origin. This approach combines identity verification, device health checks, and least-privilege access principles.",
                        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200"
                    },
                    {
                        heading: "Security Awareness and Training",
                        text: "Human error remains a leading cause of security breaches. Regular security awareness training helps employees recognize phishing attempts, use strong passwords, and follow security protocols. Organizations should conduct simulated attacks, provide ongoing education, and create a culture where security is everyone's responsibility.",
                        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                    }
                ],
                conclusion: "Cybersecurity is an ongoing journey that requires vigilance, investment, and continuous improvement. By implementing comprehensive security measures and fostering a security-conscious culture, organizations can significantly reduce their risk of cyber incidents."
            }
        },
        {
            id: 5,
            title: "The Rise of Remote Work: Building Digital-First Teams",
            excerpt: "How companies are adapting to the new normal of distributed teams and hybrid work models.",
            author: "Vikram Malhotra",
            date: "Feb 5, 2026",
            readTime: "5 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
            content: {
                intro: "The shift to remote and hybrid work has fundamentally changed how organizations operate. Companies are reimagining workplace strategies, collaboration tools, and employee engagement approaches.",
                sections: [
                    {
                        heading: "The Digital Workplace Transformation",
                        text: "Remote work is no longer a temporary solution—it's a permanent feature of the modern workplace. Organizations are investing in digital infrastructure, collaboration platforms, and virtual communication tools. This transformation requires rethinking everything from meeting protocols to performance management and company culture.",
                        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                    },
                    {
                        heading: "Tools and Technologies",
                        text: "Successful remote teams rely on robust technology stacks including video conferencing, project management platforms, instant messaging, and cloud-based collaboration tools. The key is selecting integrated solutions that work seamlessly together, reducing friction and improving productivity. Security and accessibility are paramount considerations.",
                        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
                    },
                    {
                        heading: "Maintaining Culture and Engagement",
                        text: "Building strong team connections in a distributed environment requires intentional effort. Companies are hosting virtual team-building activities, creating digital water cooler spaces, and establishing clear communication norms. Regular check-ins, transparent communication, and recognition programs help maintain morale and engagement.",
                        image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1200"
                    },
                    {
                        heading: "Productivity and Work-Life Balance",
                        text: "Remote work offers flexibility but can blur boundaries between professional and personal life. Organizations must establish clear expectations around work hours, availability, and response times. Encouraging breaks, respecting offline time, and providing mental health resources help employees maintain healthy work-life balance.",
                        image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?q=80&w=1200"
                    }
                ],
                conclusion: "The future of work is digital-first. Companies that successfully navigate this transition by investing in the right tools, fostering strong cultures, and prioritizing employee well-being will attract top talent and achieve sustainable success."
            }
        },
        {
            id: 6,
            title: "Machine Learning Applications in Real-World Scenarios",
            excerpt: "Practical examples of how ML is being deployed across various industries to solve complex problems.",
            author: "Anjali Desai",
            date: "Feb 3, 2026",
            readTime: "8 min read",
            category: "AI & ML",
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800",
            content: {
                intro: "Machine Learning has moved from research labs to production environments, solving real-world problems across industries. Understanding practical applications helps organizations identify opportunities for ML adoption.",
                sections: [
                    {
                        heading: "Healthcare and Medical Diagnosis",
                        text: "ML algorithms analyze medical images, predict disease progression, and assist in diagnosis. Deep learning models can detect cancer in radiology images with accuracy matching or exceeding human experts. Predictive models help hospitals optimize resource allocation and identify patients at risk of complications.",
                        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200"
                    },
                    {
                        heading: "Financial Services and Fraud Detection",
                        text: "Banks and financial institutions use ML for fraud detection, credit scoring, and algorithmic trading. Models analyze transaction patterns in real-time to identify suspicious activity. Personalized recommendations help customers make better financial decisions while automated systems process loan applications faster and more consistently.",
                        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200"
                    },
                    {
                        heading: "Retail and Customer Experience",
                        text: "Retailers leverage ML for inventory optimization, demand forecasting, and personalized marketing. Recommendation engines analyze customer behavior to suggest relevant products. Computer vision enables cashierless stores, while chatbots provide 24/7 customer support. These applications improve efficiency while enhancing customer satisfaction.",
                        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200"
                    },
                    {
                        heading: "Manufacturing and Quality Control",
                        text: "ML-powered computer vision systems inspect products for defects with unprecedented accuracy and speed. Predictive maintenance models analyze sensor data to identify equipment failures before they occur, reducing downtime and maintenance costs. Supply chain optimization algorithms improve logistics and reduce waste.",
                        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
                    }
                ],
                conclusion: "Machine Learning's practical applications continue to expand across industries. Organizations that identify relevant use cases, invest in quality data, and build ML capabilities will unlock significant competitive advantages and operational improvements."
            }
        },
        {
            id: 7,
            title: "The Future of Blockchain Technology in Enterprise",
            excerpt: "How blockchain is transforming supply chain management and digital contracts in large organizations.",
            author: "Sanjay Mehta",
            date: "Jan 30, 2026",
            readTime: "7 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800",
            content: {
                intro: "Blockchain technology is evolving beyond cryptocurrency to deliver real business value. Enterprises are exploring blockchain for supply chain transparency, smart contracts, and secure data sharing.",
                sections: [
                    {
                        heading: "Understanding Enterprise Blockchain",
                        text: "Enterprise blockchain platforms differ from public cryptocurrencies. They offer permissioned networks with controlled access, higher transaction throughput, and integration with existing systems. These characteristics make blockchain practical for business applications requiring transparency, immutability, and trust among multiple parties.",
                        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200"
                    },
                    {
                        heading: "Supply Chain Transparency",
                        text: "Blockchain enables end-to-end supply chain visibility. Each transaction—from raw material sourcing to final delivery—is recorded immutably. This transparency helps combat counterfeiting, verify sustainability claims, and quickly trace quality issues. Major retailers and manufacturers are implementing blockchain to provide consumers with product authenticity and provenance information.",
                        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200"
                    },
                    {
                        heading: "Smart Contracts and Automation",
                        text: "Smart contracts automatically execute agreements when predefined conditions are met. This automation reduces manual processing, eliminates intermediaries, and accelerates transaction settlement. Industries like insurance, real estate, and trade finance use smart contracts to streamline operations and reduce fraud.",
                        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200"
                    },
                    {
                        heading: "Challenges and Adoption Considerations",
                        text: "Despite its potential, blockchain adoption faces challenges including scalability limitations, integration complexity, and regulatory uncertainty. Organizations must carefully evaluate use cases where blockchain provides clear advantages over traditional databases. Success requires technical expertise, stakeholder alignment, and realistic expectations about blockchain's capabilities.",
                        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200"
                    }
                ],
                conclusion: "Blockchain technology offers compelling solutions for enterprise challenges requiring transparency and trust. As the technology matures and standards emerge, we'll see increased adoption in supply chains, financial services, and other sectors where multiple parties need to share and verify information."
            }
        },
        {
            id: 8,
            title: "Digital Transformation: A Complete Roadmap",
            excerpt: "Step-by-step guide to successfully implementing digital transformation in your organization.",
            author: "Meera Kapoor",
            date: "Jan 28, 2026",
            readTime: "10 min read",
            category: "Digital Transformation",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
            content: {
                intro: "Digital transformation is more than adopting new technologies—it's a fundamental shift in how organizations operate and deliver value. A structured approach increases the likelihood of success.",
                sections: [
                    {
                        heading: "Assessing Current State",
                        text: "Begin by understanding your organization's digital maturity. Evaluate existing processes, technologies, and capabilities. Identify pain points, inefficiencies, and opportunities. Engage stakeholders across departments to gather diverse perspectives. This assessment provides the baseline for measuring transformation progress.",
                        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
                    },
                    {
                        heading: "Defining Vision and Strategy",
                        text: "Develop a clear vision for what digital transformation means for your organization. Set specific, measurable goals aligned with business objectives. Identify priority areas where digital initiatives can deliver the greatest impact. Create a roadmap with phases, milestones, and success metrics. Secure executive sponsorship and adequate resources.",
                        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200"
                    },
                    {
                        heading: "Building Digital Capabilities",
                        text: "Transformation requires new skills and mindsets. Invest in training existing employees while recruiting digital talent. Establish centers of excellence for key technologies. Foster a culture of experimentation and learning. Implement modern development practices like agile and DevOps to accelerate innovation.",
                        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                    },
                    {
                        heading: "Scaling and Sustaining Change",
                        text: "Start with pilot projects to validate approaches and build momentum. Learn from early initiatives and adapt strategy accordingly. Scale successful pilots across the organization. Establish governance structures to manage ongoing transformation efforts. Continuously measure results and refine approaches based on feedback and outcomes.",
                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                    }
                ],
                conclusion: "Digital transformation is an ongoing journey requiring leadership commitment, strategic vision, and organizational agility. By following a structured approach while remaining flexible to adapt, organizations can successfully navigate transformation and emerge stronger in the digital age."
            }
        },
        {
            id: 9,
            title: "Advanced Cybersecurity Threat Detection",
            excerpt: "Modern techniques for identifying and mitigating cyber threats before they impact your business.",
            author: "Rohan Verma",
            date: "Jan 25, 2026",
            readTime: "6 min read",
            category: "Cybersecurity",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
            content: {
                intro: "As cyber threats become more sophisticated, traditional security measures are no longer sufficient. Advanced threat detection techniques help organizations identify and respond to threats faster.",
                sections: [
                    {
                        heading: "Behavioral Analytics and AI",
                        text: "Modern threat detection uses machine learning to establish baseline behaviors for users, devices, and applications. AI algorithms identify anomalies that may indicate security incidents. These systems can detect sophisticated attacks that evade traditional signature-based detection, including zero-day exploits and advanced persistent threats.",
                        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"
                    },
                    {
                        heading: "Security Information and Event Management",
                        text: "SIEM platforms aggregate and analyze security data from across the organization. They correlate events from multiple sources to identify complex attack patterns. Real-time alerting enables rapid response to potential threats. Integration with threat intelligence feeds provides context about emerging threats and attack techniques.",
                        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200"
                    },
                    {
                        heading: "Threat Hunting and Proactive Defense",
                        text: "Rather than waiting for alerts, threat hunting involves actively searching for signs of compromise. Security analysts use hypothesis-driven investigations to uncover threats that automated systems miss. This proactive approach helps organizations identify and neutralize threats before they cause significant damage.",
                        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200"
                    },
                    {
                        heading: "Incident Response and Recovery",
                        text: "Effective threat detection must be coupled with strong incident response capabilities. Organizations need documented playbooks for different types of incidents, trained response teams, and regular drills. Automated response tools can contain threats immediately while human analysts investigate. Post-incident analysis helps improve defenses and prevent similar attacks.",
                        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                    }
                ],
                conclusion: "Advanced threat detection combines technology, processes, and people to create defense-in-depth. Organizations that invest in AI-powered detection, threat intelligence, and skilled security teams can significantly reduce their risk of successful cyber attacks."
            }
        },
        {
            id: 10,
            title: "Innovation Management: From Idea to Implementation",
            excerpt: "Best practices for fostering a culture of innovation and bringing new ideas to market.",
            author: "Kavita Reddy",
            date: "Jan 22, 2026",
            readTime: "9 min read",
            category: "Innovation",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
            content: {
                intro: "Innovation doesn't happen by accident. It requires systematic processes for capturing ideas, evaluating opportunities, and executing effectively. Organizations need structured innovation management approaches.",
                sections: [
                    {
                        heading: "Creating an Innovation Pipeline",
                        text: "Establish clear processes for collecting, evaluating, and prioritizing ideas. Create multiple channels for idea submission—from employee suggestion programs to customer feedback to partnerships with startups. Use stage-gate processes to systematically assess ideas, allocate resources, and make go/no-go decisions at key milestones.",
                        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"
                    },
                    {
                        heading: "Rapid Prototyping and Testing",
                        text: "Move quickly from concept to prototype. Use lean startup methodologies to test assumptions with minimum viable products. Gather customer feedback early and iterate based on learning. This approach reduces risk by validating ideas before major investments. Design thinking workshops help teams empathize with users and ideate creative solutions.",
                        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                    },
                    {
                        heading: "Innovation Governance and Funding",
                        text: "Balance innovation investments across horizons: improving core business, developing adjacent opportunities, and exploring transformational ideas. Establish dedicated innovation budgets separate from operational funding. Create governance structures that empower teams while ensuring alignment with strategy. Senior leadership must actively champion innovation initiatives.",
                        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200"
                    },
                    {
                        heading: "Scaling Successful Innovations",
                        text: "Moving from pilot to full-scale deployment requires different skills and approaches. Develop business cases, secure stakeholder buy-in, and plan for change management. Build partnerships with business units to ensure adoption. Measure impact against defined metrics and continuously optimize. Celebrate successes and share learnings across the organization.",
                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                    }
                ],
                conclusion: "Effective innovation management combines structured processes with creative freedom. Organizations that systematically capture ideas, rapidly test concepts, and scale successful innovations will maintain competitive advantages in dynamic markets."
            }
        },
        {
            id: 11,
            title: "Building Scalable Software Architecture",
            excerpt: "Design patterns and principles for creating applications that grow with your business needs.",
            author: "Arun Sharma",
            date: "Jan 20, 2026",
            readTime: "8 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800",
            content: {
                intro: "Software architecture decisions made early in development have long-lasting impacts. Building scalable systems requires understanding patterns, trade-offs, and best practices that enable growth.",
                sections: [
                    {
                        heading: "Microservices Architecture",
                        text: "Microservices decompose applications into small, independent services that communicate via APIs. This approach enables teams to develop, deploy, and scale services independently. Each service can use the technology stack best suited for its requirements. However, microservices add complexity in areas like deployment, monitoring, and data consistency.",
                        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200"
                    },
                    {
                        heading: "Database Scalability Strategies",
                        text: "Database performance often becomes a bottleneck as applications scale. Strategies include vertical scaling (more powerful hardware), horizontal scaling (sharding and replication), caching frequently accessed data, and using read replicas. Choose between SQL and NoSQL databases based on data structure, consistency requirements, and access patterns.",
                        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200"
                    },
                    {
                        heading: "Asynchronous Processing and Queuing",
                        text: "Not all operations need immediate processing. Message queues enable asynchronous communication between services, improving responsiveness and resilience. Background jobs handle time-consuming tasks without blocking user requests. Event-driven architectures provide loose coupling and flexibility to add new functionality without modifying existing services.",
                        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
                    },
                    {
                        heading: "Monitoring and Observability",
                        text: "Scalable systems require comprehensive monitoring. Implement logging, metrics, and distributed tracing to understand system behavior. Set up alerts for anomalies and performance degradation. Use observability tools to troubleshoot issues quickly. Regular performance testing identifies bottlenecks before they impact users.",
                        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                    }
                ],
                conclusion: "Building scalable software architecture requires balancing immediate needs with future growth. By applying proven patterns, choosing appropriate technologies, and investing in observability, development teams can create systems that scale efficiently as business demands increase."
            }
        },
        {
            id: 12,
            title: "Leadership in the Digital Age",
            excerpt: "Essential skills and strategies for leading teams through technological change and innovation.",
            author: "Priya Patel",
            date: "Jan 18, 2026",
            readTime: "7 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
            content: {
                intro: "Digital transformation demands new leadership approaches. Leaders must navigate rapid technological change while developing human-centric organizations that attract and retain top talent.",
                sections: [
                    {
                        heading: "Digital Literacy for Leaders",
                        text: "Modern leaders need sufficient technical understanding to make informed decisions about technology investments and digital strategy. This doesn't mean becoming developers, but understanding capabilities, limitations, and implications of technologies like AI, cloud computing, and data analytics. Digital literacy enables better conversations with technical teams and more effective technology governance.",
                        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                    },
                    {
                        heading: "Leading Distributed Teams",
                        text: "Remote and hybrid work requires different leadership approaches. Build trust through transparency and regular communication. Establish clear expectations while allowing flexibility in how work gets done. Use asynchronous communication effectively and be mindful of time zones. Create opportunities for team bonding and maintain strong culture across physical distances.",
                        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                    },
                    {
                        heading: "Fostering Innovation and Agility",
                        text: "Leaders must create environments where experimentation is encouraged and failure is treated as learning. Remove barriers to innovation, provide resources for exploration, and celebrate creative problem-solving. Adopt agile mindsets that value iteration over perfection. Empower teams to make decisions and take ownership of outcomes.",
                        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"
                    },
                    {
                        heading: "Developing Future Leaders",
                        text: "Organizations must build leadership pipelines for the digital age. Identify high-potential individuals early and provide development opportunities. Offer mentorship programs, stretch assignments, and exposure to different parts of the business. Develop both technical and soft skills. Create succession plans to ensure leadership continuity during transformation.",
                        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200"
                    }
                ],
                conclusion: "Leadership in the digital age requires combining technical awareness with strong people skills. Leaders who can navigate technological change while building engaged, innovative teams will drive their organizations to success in an increasingly digital world."
            }
        }
];

export default function BlogArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [dbArticle, setDbArticle] = useState(null);
    const [dbLoading, setDbLoading] = useState(false);
    const [allBlogs, setAllBlogs] = useState([]);

    // Fetch from DB if id is not a simple integer (i.e., it's a MongoDB ObjectId)
    useEffect(() => {
        const isStaticId = /^\d+$/.test(id);
        if (!isStaticId) {
            setDbLoading(true);
            fetch(`${API}/api/cms/blogs/${id}`)
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        setDbArticle({
                            id: data._id,
                            title: data.title,
                            excerpt: data.excerpt || '',
                            author: data.author,
                            date: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            readTime: data.readTime || '5 min read',
                            category: data.category,
                            image: data.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800',
                            content: data.content || data.excerpt || 'No content available for this post.',
                        });
                    }
                    setDbLoading(false);
                })
                .catch(() => setDbLoading(false));
        }

        // Fetch all blogs for "Related Articles"
        fetch(`${API}/api/cms/blogs`)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                const formatted = data
                    .filter(b => b.status === 'Published')
                    .map(b => ({
                        id: b._id,
                        title: b.title,
                        excerpt: b.excerpt || '',
                        author: b.author,
                        date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        readTime: b.readTime || '5 min read',
                        category: b.category,
                        image: b.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800'
                    }));
                setAllBlogs(formatted);
            })
            .catch(err => console.error("Error fetching related blogs:", err));
    }, [id]);

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

    const isStaticId = /^\d+$/.test(id);
    const article = isStaticId ? blogPosts.find(post => post.id === parseInt(id)) : null;

    // Determine which article to show (prioritize static if IDs are numeric)
    const currentArticle = article || dbArticle;

    // Show loading state while fetching DB article
    if (dbLoading && !article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    // If no article is found in either static or DB
    if (!currentArticle) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-4">Article Not Found</h1>
                    <button 
                        onClick={() => navigate('/resources/blogs')}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        Back to Blogs
                    </button>
                </div>
            </div>
        );
    }

    // Deduplicate related articles by title and prioritize static ones
    const deduplicatedBlogs = [...allBlogs, ...blogPosts]
        .reduce((acc, current) => {
            const x = acc.find(item => item.title === current.title);
            if (!x) return acc.concat([current]);
            const isCurrentStatic = /^\d+$/.test(String(current.id));
            if (isCurrentStatic) return acc.map(item => item.title === current.title ? current : item);
            return acc;
        }, []);

    // Filter by category first, fallback to all blogs if no related ones found in same category
    let relatedArticles = deduplicatedBlogs
        .filter(post => post.title !== currentArticle.title && post.category === currentArticle.category)
        .slice(0, 3);
    
    if (relatedArticles.length === 0) {
        relatedArticles = deduplicatedBlogs
            .filter(post => post.title !== currentArticle.title)
            .slice(0, 3);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Featured Image */}
            <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src={currentArticle.image} 
                        alt={currentArticle.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                </div>
                
                <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 sm:pb-12 md:pb-16">
                    <button 
                        onClick={() => navigate('/resources/blogs')}
                        className="mb-4 sm:mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors w-fit"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blogs
                    </button>
                    
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4 w-fit">
                        {currentArticle.category}
                    </span>
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                        {currentArticle.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/90 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                {currentArticle.author?.charAt(0) || 'A'}
                            </div>
                            <span className="font-medium">{currentArticle.author}</span>
                        </div>
                        <span>•</span>
                        <span>{currentArticle.date}</span>
                        <span>•</span>
                        <span>{currentArticle.readTime}</span>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                {/* Introduction / Excerpt */}
                {(currentArticle.excerpt || (currentArticle.content && currentArticle.content.intro)) && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic border-l-4 border-primary pl-4 sm:pl-6">
                            {currentArticle.content?.intro || currentArticle.excerpt}
                        </p>
                    </div>
                )}

                {/* Main Content Rendering */}
                {typeof currentArticle.content === 'string' ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mb-8">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                            {currentArticle.content}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 sm:space-y-12">
                        {currentArticle.content?.sections?.map((section, index) => (
                            <section key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                {section.image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img 
                                            src={section.image} 
                                            alt={section.heading}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-6 sm:p-8 md:p-10">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm sm:text-base">
                                            {index + 1}
                                        </span>
                                        {section.heading}
                                    </h2>
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                        {section.text}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* Conclusion - Shared for both DB and Static articles if they have it */}
                {(currentArticle.conclusion || currentArticle.content?.conclusion) && (
                    <div className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-black transform hover:scale-[1.02] transition-all duration-300 border border-gray-100">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-black">Conclusion</h2>
                        <p className="text-base sm:text-lg text-black/95 leading-relaxed">
                            {currentArticle.conclusion || currentArticle.content?.conclusion}
                        </p>
                    </div>
                )}

                <div className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4">Share this article</h3>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        <button 
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </button>
                        <button 
                            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(currentArticle.title)}`, '_blank')}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            Twitter
                        </button>
                        <button 
                            onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentArticle.title + ' ' + window.location.href)}`, '_blank')}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                        </button>
                        <button 
                            onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-tr from-[#FFB000] via-[#FF0069] to-[#AD00FF] text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                            Instagram
                        </button>
                        <button 
                            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                        </button>
                    </div>
                </div>
            </article>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4h4" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h6" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-black">
                            {deduplicatedBlogs.filter(p => p.title !== currentArticle.title && p.category === currentArticle.category).length > 0 
                                ? "Related Articles" 
                                : "Latest Articles"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedArticles.map((post) => (
                            <div 
                                key={post.id} 
                                onClick={() => {
                                    navigate(`/resources/blogs/${post.id}`);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full border border-gray-100"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-lg shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-[10px]">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 p-3 sm:p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-dark hover:shadow-primary/50 transition-all duration-300 hover:scale-110 group"
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
