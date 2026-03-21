import { useState } from "react";
import { Search, MapPin, Briefcase, Clock, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import join  from "../../assets/join.png"

export default function JobOpenings() {
    const [filterDepartment, setFilterDepartment] = useState("All");
    const [filterLocation, setFilterLocation] = useState("All");

    const jobs = [
        {
            id: 1,
            title: "Senior Full Stack Engineer",
            department: "Engineering",
            location: "Bangalore",
            type: "Full-Time",
            posted: "2 days ago",
            tags: ["React", "Node.js", "AWS"]
        },
        {
            id: 2,
            title: "Machine Learning Architect",
            department: "Data Science",
            location: "Remote",
            type: "Full-Time",
            posted: "1 week ago",
            tags: ["Python", "TensorFlow", "Kubernetes"]
        },
        {
            id: 3,
            title: "Product Designer (UI/UX)",
            department: "Design",
            location: "Mumbai",
            type: "Full-Time",
            posted: "3 days ago",
            tags: ["Figma", "User Research"]
        },
        {
            id: 4,
            title: "DevOps Engineer",
            department: "Engineering",
            location: "Bangalore",
            type: "Full-Time",
            posted: "Today",
            tags: ["Docker", "CI/CD", "Linux"]
        },
        {
            id: 5,
            title: "Marketing Manager",
            department: "Marketing",
            location: "Delhi",
            type: "Full-Time",
            posted: "5 days ago",
            tags: ["SEO", "Content Strategy"]
        },
    ];

    const departments = ["All", "Engineering", "Data Science", "Design", "Marketing"];
    const locations = ["All", "Bangalore", "Mumbai", "Delhi", "Remote"];

    const filteredJobs = jobs.filter(job => {
        const matchDept = filterDepartment === "All" || job.department === filterDepartment;
        const matchLoc = filterLocation === "All" || job.location === filterLocation;
        return matchDept && matchLoc;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[500px] overflow-hidden" style={{ backgroundImage: `url(${join})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                {/* Content */}
                <div className="relative max-w-7xl text-black mx-auto px-6 lg:px-8 text-center z-10 h-full flex flex-col justify-center">
                    {/* <h1 className="text-5xl lg:text-6xl font-black mb-6 drop-shadow-2xl">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-black max-w-2xl mx-auto drop-shadow-lg">
                        Find your next challenge. Build the future with us.
                    </p> */}
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full md:w-auto flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                        <Search className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by role or keyword..."
                            className="bg-transparent border-none outline-none w-full text-gray-700 font-medium"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            className="flex-1 md:w-48 px-4 py-3 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                        >
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select
                            className="flex-1 md:w-48 px-4 py-3 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        >
                            {locations.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Jobs List */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
                    </h2>
                </div>

                <div className="space-y-4">
                    {filteredJobs.map(job => (
                        <div key={job.id} className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 md:flex items-center justify-between group">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {job.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Briefcase size={16} />
                                        <span>{job.department}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={16} />
                                        <span>{job.posted}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Link to={`/careers/job-application/${job.id}`}>
                                    <button className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-700 transition-all">
                                        Apply Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                            <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                            <button
                                onClick={() => { setFilterDepartment("All"); setFilterLocation("All"); }}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Newsletter CTA */}
            {/* <div className="max-w-7xl mx-auto px-6 lg:px-8 items-center py-12">
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 md:p-16 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-black mb-4">Don't see a perfect fit?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        We are always looking for exceptional talent. Join our talent network to get notified about future opportunities.
                    </p>
                    <button className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all">
                        Join Talent Network
                    </button>
                </div>
            </div> */}
        </div>
    );
}
