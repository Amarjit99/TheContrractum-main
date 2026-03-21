import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

/////////////////////// Company Pages//////////////////////////////////
import AboutUs from './pages/company/AboutUs';
import Leadership from './pages/company/Leadership';
import OurJourney from './pages/company/OurJourney';
import WhyChooseUs from './pages/company/WhyChooseUs';
import Vision from './pages/company/vision';
import Mission from './pages/company/Mission';
import Value from './pages/company/Value';
import Founder from './pages/company/Founder';
import Innovation from './pages/company/Innovation';
import Reliability from './pages/company/Reblity';
import Scalability from './pages/company/Scalability';

// //////////////////Team Pages///////////////////////////////////
import CoreTeam from './pages/team/CoreTeam';
import TechnicalExperts from './pages/team/TechnicalExperts';
import IndustryAdvisors from './pages/team/IndustryAdvisors';
import StudentInterns from './pages/team/StudentInterns';
import Culture from './pages/team/Culture';

//////////////////// Solutions Pages/////////////////////////////////////
import Csit from './pages/solutions/business/csit';
import Gissolution from './pages/solutions/business/gis';
import MRASservies from './pages/solutions/business/Mras';
import ECommerceSolutions from './pages/solutions/digital/e-commerce';
import HrTech from './pages/solutions/digital/hrtech';
import BPO from './pages/solutions/digital/bpo';
import TelecomSolutions from './pages/solutions/connectivity/telecom';
import NetworkInfrastructure from './pages/solutions/connectivity/network-infra';
import Cloud from './pages/solutions/connectivity/cloud';
import DigitalSolutions from './pages/solutions/DigitalSolutions';
import BusinessSolutions from './pages/solutions/BusinessSolutions';
import ConnectivitySolutions from './pages/solutions/ConnectivitySolutions';

//////////////////////// Industries Pages////////////////////////////////////
import Government from './pages/industries/Government';
import Healthcare from './pages/industries/Healthcare';
import Education from './pages/industries/Education';
import Retail from './pages/industries/Retail';
import Telecom from './pages/industries/Telecom';
import Banking from './pages/industries/Banking';
import Manufacturing from './pages/industries/Manufacturing';
import Agriculture from './pages/industries/Agriculture';

// ///////////////////////Careers Pages/////////////////////////////////
import Life from './pages/careers/Life';
import JobOpenings from './pages/careers/JobOpenings';
import JobApplication from './pages/careers/JobApplication';
import Internships from './pages/careers/Internships';
import Projects from './pages/careers/Projects';
import Campus from './pages/careers/Campus';
import Growth from './pages/careers/Growth';
import Benefits from './pages/careers/Benefits';

///////////////////// Projects Pages//////////////////////////////////
import Ongoing from './pages/projects/Ongoing';
import Completed from './pages/projects/Completed';
import CaseStudies from './pages/projects/CaseStudies';
import Research from './pages/projects/Research';
import Testimonials from './pages/projects/Testimonials';
import ProjectDetails from './pages/projects/ProjectDetails';
import CompletedProjectDetails from './pages/projects/CompletedProjectDetails';
import CaseStudyDetails from './pages/projects/CaseStudyDetails';

//////////////////// Resources Pages/////////////////////////////////////
import Blogs from './pages/resources/Blogs';
import BlogArticle from './pages/resources/BlogArticle';
import News from './pages/resources/News';
import Events from './pages/resources/Events';
import CSR from './pages/resources/CSR';
import Whitepapers from './pages/resources/Whitepapers';
import Reports from './pages/resources/Reports';
import Media from './pages/resources/Media';

//////////////////// Join Us Pages////////////////////////////////////
import Partner from './pages/join/Partner';
import Collaborate from './pages/join/Collaborate';
import Startup from './pages/join/Startup';
import Volunteer from './pages/join/Volunteer';

///////////////////// Contact Pages///////////////////////////////////
import Touch from './pages/contact/Getintouch';
import Quote from './pages/contact/Requestaquote';
import Support from './pages/contact/Support';
import Feedback from './pages/contact/FeedbackModal';
import Location from './pages/contact/Location';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />



{/* ///////////////////////// Company Routes///////////////////////// */}
            <Route path="/company/about-us" element={<AboutUs />} />
            <Route path="/company/about-us/vision" element={<Vision />} />
            <Route path="/company/about-us/mission" element={<Mission />} />
            <Route path="/company/about-us/values" element={<Value />} />
            
            <Route path="/company/leadership" element={<Leadership />} />
            <Route path="/company/leadership/founders" element={<Founder />} />
            <Route path="/company/leadership/management" element={<Leadership />} />
            
            <Route path="/company/our-journey" element={<OurJourney />} />
            <Route path="/company/our-journey/timeline" element={<OurJourney />} />
            
            <Route path="/company/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/company/why-choose-us/innovation" element={<Innovation />} />
            <Route path="/company/why-choose-us/reliability" element={<Reliability />} />
            <Route path="/company/why-choose-us/scalability" element={<Scalability />} />

{/* ///////////////////////// team Routes///////////////////////// */}
            <Route path="/team/core-team" element={<CoreTeam />} />
            <Route path="/team/technical-experts" element={<TechnicalExperts />} />
            <Route path="/team/industry-advisors" element={<IndustryAdvisors />} />
            <Route path="/team/student-interns" element={<StudentInterns />} />
            <Route path="/team/culture" element={<Culture />} />

{/* ///////////////////////// solutions Routes///////////////////////// */}
            <Route path="/solutions/digital" element={<DigitalSolutions />} />
            <Route path="/solutions/business/csit" element={<Csit />} />
            <Route path="/solutions/business/gis" element={<Gissolution />} />
            <Route path="/solutions/business/Mras" element={<MRASservies />} />
            <Route path="/solutions/digital/e-commerce" element={<ECommerceSolutions />} />
            <Route path="/solutions/digital/hrtech" element={<HrTech />} />
            <Route path="/solutions/digital/bpo" element={<BPO />} />
            <Route path="/solutions/connectivity/telecom" element={<TelecomSolutions />} />
            <Route path="/solutions/connectivity/network-infra" element={<NetworkInfrastructure />} />
            <Route path="/solutions/connectivity/cloud" element={<Cloud />} />
            <Route path="/solutions/business" element={<BusinessSolutions />} />
            <Route path="/solutions/connectivity" element={<ConnectivitySolutions />} />


{/* ///////////////////////// industries Routes///////////////////////// */}
            <Route path="/industries/government" element={<Government />} />
            <Route path="/industries/healthcare" element={<Healthcare />} />
            <Route path="/industries/education" element={<Education />} />
            <Route path="/industries/retail" element={<Retail />} />
            <Route path="/industries/telecom" element={<Telecom />} />
            <Route path="/industries/banking" element={<Banking />} />
            <Route path="/industries/manufacturing" element={<Manufacturing />} />
            <Route path="/industries/agriculture" element={<Agriculture />} />


{/* ///////////////////////// Careers Routes///////////////////////// */}
            <Route path="/careers/life" element={<Life />} />
            <Route path="/careers/jobs" element={<JobOpenings />} />
            <Route path="/careers/job-application/:jobId" element={<JobApplication />} />
            <Route path="/careers/internships" element={<Internships />} />
            <Route path="/careers/projects" element={<Projects />} />
            <Route path="/careers/campus" element={<Campus />} />
            <Route path="/careers/growth" element={<Growth />} />
            <Route path="/careers/benefits" element={<Benefits />} />


{/* ///////////////////////// projects Routes///////////////////////// */}
            <Route path="/projects/ongoing" element={<Ongoing />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/completed" element={<Completed />} />
            <Route path="/projects/completed/:id" element={<CompletedProjectDetails />} />
            <Route path="/projects/case-studies" element={<CaseStudies />} />
            <Route path="/projects/case-studies/:id" element={<CaseStudyDetails />} />
            <Route path="/projects/research" element={<Research />} />
            <Route path="/projects/testimonials" element={<Testimonials />} />


{/* ///////////////////////// Cresources Routes///////////////////////// */}
            <Route path="/resources/blogs" element={<Blogs />} />
            <Route path="/resources/blogs/:id" element={<BlogArticle />} />
            <Route path="/resources/news" element={<News />} />
            <Route path="/resources/events" element={<Events />} />
            <Route path="/resources/csr" element={<CSR />} />
            <Route path="/resources/whitepapers" element={<Whitepapers />} />
            <Route path="/resources/reports" element={<Reports />} />
            <Route path="/resources/media" element={<Media />} />


{/* ///////////////////////// joins Routes///////////////////////// */}
            <Route path="/join/partner" element={<Partner />} />
            <Route path="/join/collaborate" element={<Collaborate />} />
            <Route path="/join/startup" element={<Startup />} />
            <Route path="/join/volunteer" element={<Volunteer />} />



{/* ///////////////////////// Contact Routes///////////////////////// */}
            <Route path="/contact/touch" element={<Touch />} />
            <Route path="/contact/quote" element={<Quote />} />
            <Route path="/contact/support" element={<Support />} />
            <Route path="/contact/feedback" element={<Feedback />} />
            <Route path="/contact/location" element={<Location />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
