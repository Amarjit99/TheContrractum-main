import React from 'react';

export default function CompanyCollaborationDetails() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Hero Section */}
            <section
                className="relative py-32 px-6 lg:px-20 bg-cover bg-center flex items-center justify-center text-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=800&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">
                        Detailed Collaboration Dynamics
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                        Discover the comprehensive framework and visionary philosophy behind our strategic collaborations. We believe in creating synergistic relationships that transcend traditional business boundaries, fostering an ecosystem where innovation thrives and shared goals are realized. Delve into the intricate details of how we structure our partnerships to maximize value, mitigate risks, and accelerate sustainable growth for all stakeholders involved.
                    </p>
                </div>
            </section>

            {/* Lengthy Content Section */}
            <section className="py-20 px-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl -mt-10 relative z-20">
                <div className="space-y-8 text-lg text-slate-700 leading-relaxed md:px-8">
                    <h2 className="text-3xl font-bold text-slate-900">Our Collaboration Philosophy</h2>
                    <p>
                        At the core of our organization lies a deep-seated belief that the most profound innovations and resilient business models are forged through collaboration. In an increasingly complex and interconnected global market, isolated efforts often fall short of addressing multifaceted challenges. By uniting diverse perspectives, complementary skill sets, and pooled resources, we create a crucible for innovation.
                    </p>
                    <p>
                        When entering into a collaboration, our primary objective is to establish a foundation of trust and mutual transparency. This involves open dialogues defining shared visions, aligning corporate values, and clearly articulating expectations. We move beyond transactional interactions to cultivate deep-rooted strategic alliances that are built to withstand market volatilities and capitalize on emerging trends.
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">Framework for Success</h2>
                    <p>
                        Our collaboration framework revolves around five critical pillars: strategic alignment, operational synergy, risk management, knowledge exchange, and continuous evaluation. Every partnership begins with a rigorous strategic alignment phase, ensuring that our long-term objectives harmonize with those of our partners.
                    </p>
                    <p>
                        We implement integrated operational models that streamline processes and enhance efficiency. Transparency in communication and shared governance structures are established early to navigate potential complexities. By actively managing shared risks and collectively investing in research and development, we empower our collaborators to push the boundaries of their respective industries.
                    </p>

                    <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-primary italic">
                        "The strength of the team is each individual member. The strength of each member is the team. Our commitment to collaboration is our commitment to a shared, prosperous future."
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900">Long-term Value Creation</h2>
                    <p>
                        The true measure of a successful collaboration is not just the immediate project deliverables, but the long-term enterprise value generated. Our partners consistently report enhanced market reach, accelerated product development cycles, and substantial cost efficiencies. Furthermore, the cross-pollination of ideas acts as a catalyst for continuous improvement and disruptive innovation.
                    </p>
                    <p>
                        We invite you to immerse yourself in our ecosystem. By understanding the depth of our commitment to collaborative excellence, you will see why partnering with us is a strategic imperative for organizations aiming to lead in the digital era.
                    </p>
                </div>
            </section>
        </div>
    );
}
