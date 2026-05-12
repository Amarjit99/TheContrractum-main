import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminAdmins from './pages/admin/Admins';
import AdminRegistrationPage from './pages/admin/AdminRegistrationPage';
import AdminContacts from './pages/admin/Contacts';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCareers from './pages/admin/AdminCareers';
import AdminPartners from './pages/admin/AdminPartners';
import AdminServices from './pages/admin/AdminServices';
import AdminSettings from './pages/admin/AdminSettings';
import AdminStudentInterns from './pages/admin/AdminStudentInterns';
import AdminFounders from './pages/admin/AdminFounders';
import AdminFormLinks from './pages/admin/AdminFormLinks';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminSurveys from './pages/admin/AdminSurveys';
import AdminNews from './pages/admin/AdminNews';
import AdminIdCards from './pages/admin/AdminIdCards';
import AdminReferrals from './pages/admin/AdminReferrals';
import AdminProjects from './pages/admin/AdminProjects';
import AdminContracts from './pages/admin/AdminContracts';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminEvents from './pages/admin/AdminEvents';
import VerifyCertificate from './pages/VerifyCertificate';
import ContractEditor from './pages/admin/ContractEditor';
import AdminAffiliates from './pages/admin/AdminAffiliates';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import AdminNotifications from './pages/admin/AdminNotifications';
import { AdminAuthProvider } from './context/AdminAuthContext';

/////////////////////// Company Pages//////////////////////////////////
import AboutUs from './pages/company/AboutUs';
import Leadership from './pages/company/Leadership';
import OurJourney from './pages/company/OurJourney';
import WhyChooseUs from './pages/company/WhyChooseUs';
import Vision from './pages/company/Vision';
import Mission from './pages/company/Mission';
import Value from './pages/company/Value';
import Founder from './pages/company/Founder';
import Innovation from './pages/company/Innovation';
import Reliability from './pages/company/Reliability';
import Scalability from './pages/company/Scalability';
import StartScaling from './pages/company/StartScaling';
import ViewArchitecture from './pages/company/ViewArchitecture';
import LeadershipJourney from './pages/company/LeadershipJourney';
import VisionaryLeadership from './pages/company/VisionaryLeadership';
import StrategicExcellence from './pages/company/StrategicExcellence';
import ExploreInnovations from './pages/company/ExploreInnovations';
import JoinInnovationLab from './pages/company/JoinInnovationLab';
import ContactInnovationLab from './pages/company/ContactInnovationLab';
import SLADetails from './pages/company/SLADetails';
import CodeOfConduct from './pages/company/CodeOfConduct';
import EmployeeId from './pages/company/EmployeeId';
import CompanyContracts from './pages/company/CompanyContracts';
import ReferralDashboard from './pages/company/ReferralDashboard';
import CookiePolicy from './pages/company/CookiePolicy';
import PrivacyPolicy from './pages/company/PrivacyPolicy';
import TermsOfService from './pages/company/TermsOfService';

// //////////////////Team Pages///////////////////////////////////
import CoreTeam from './pages/team/CoreTeam';
import TechnicalExperts from './pages/team/TechnicalExperts';
import IndustryAdvisors from './pages/team/IndustryAdvisors';
import StudentInterns from './pages/team/StudentInterns';
import Culture from './pages/team/Culture';
import ConnectExperts from './pages/team/ConnectExperts';
import AdvisorsDetails from './pages/team/AdvisorsDetails';
import BecomeAdvisor from './pages/team/BecomeAdvisor';

//////////////////// Solutions Pages/////////////////////////////////////
import Csit from './pages/solutions/business/Csit';
import Gissolution from './pages/solutions/business/Gis';
import SolutionDownload from './pages/solutions/SolutionDownload';
import MRASservies from './pages/solutions/business/Mras';
import ECommerceSolutions from './pages/solutions/digital/ECommerce';
import HrTech from './pages/solutions/digital/HrTech';
import BPO from './pages/solutions/digital/Bpo';
import TelecomSolutions from './pages/solutions/connectivity/Telecom';
import NetworkInfrastructure from './pages/solutions/connectivity/NetworkInfrastructure';
import Cloud from './pages/solutions/connectivity/Cloud';
import DigitalSolutions from './pages/solutions/DigitalSolutions';
import BusinessSolutions from './pages/solutions/BusinessSolutions';
import ConnectivitySolutions from './pages/solutions/ConnectivitySolutions';

//////////////////////// Industries Pages////////////////////////////////////
import Government from './pages/industries/Government';
import GovernmentDetails from './pages/industries/GovernmentDetails';
import Healthcare from './pages/industries/Healthcare';
import WhyChooseHealthcare from './pages/industries/WhyChooseHealthcare';
import Education from './pages/industries/Education';
import EducationResults from './pages/industries/EducationResults';
import Retail from './pages/industries/Retail';
import Telecom from './pages/industries/Telecom';
import Banking from './pages/industries/Banking';
import WhyChooseBanking from './pages/industries/WhyChooseBanking';
import Manufacturing from './pages/industries/Manufacturing';
import OptimizeProduction from './pages/industries/OptimizeProduction';
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
import CareersCSR from './pages/careers/CareersCSR';
import Themes from './pages/careers/Themes';
import YTDP from './pages/careers/YtdpPage';
import EmployeeCertificates from './pages/careers/EmployeeCertificates';

///////////////////// Projects Pages//////////////////////////////////
import Ongoing from './pages/projects/Ongoing';
import Completed from './pages/projects/Completed';
import CaseStudies from './pages/projects/CaseStudies';
import Research from './pages/projects/Research';
import Testimonials from './pages/projects/Testimonials';
import ProjectDetails from './pages/projects/ProjectDetails';
import CompletedProjectDetails from './pages/projects/CompletedProjectDetails';
import CaseStudyDetails from './pages/projects/CaseStudyDetails';
import ScheduleConsultation from './pages/projects/ScheduleConsultation';

//////////////////// Resources Pages/////////////////////////////////////
import Blogs from './pages/resources/Blogs';
import BlogArticle from './pages/resources/BlogArticle';
import News from './pages/resources/News';
import Events from './pages/resources/Events';
import CSR from './pages/resources/CSR';
import CSRReport from './pages/resources/CSRReport';
import Whitepapers from './pages/resources/Whitepapers';
import Reports from './pages/resources/Reports';
import Media from './pages/resources/Media';

//////////////////// Join Us Pages////////////////////////////////////
import Partner from './pages/join/Partner';
import BecomePartner from './pages/join/BecomePartner';
import Collaborate from './pages/join/Collaborate';
import CompanyCollaborationDetails from './pages/join/CompanyCollaborationDetails';
import Startup from './pages/join/Startup';
import GuidebookDetails from './pages/join/GuidebookDetails';
import Volunteer from './pages/join/Volunteer';
import Affiliate from './pages/join/Affiliate';

///////////////////// Contact Pages///////////////////////////////////
import Touch from './pages/contact/GetInTouch';
import Quote from './pages/contact/RequestAQuote';
const DigitalMarketing = lazy(() => import('./pages/solutions/digital/DigitalMarketing'));
import Support from './pages/contact/Support';
import RequestDemo from './pages/contact/RequestDemo';
import Feedback from './pages/contact/FeedbackModal';
import Location from './pages/contact/Location';
import CookiesPopup from './components/CookiesPopup';
import GoogleForm from './pages/contact/GoogleForm';

export default function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen relative overflow-x-hidden w-full">
          <CookiesPopup />
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-black italic tracking-widest text-2xl uppercase">Loading Experience...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/verify/:id" element={<VerifyCertificate />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/registration" element={<AdminRegistrationPage />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/super-dashboard" element={<SuperAdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/admins" element={<AdminAdmins />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/blogs" element={<AdminBlogs />} />
                <Route path="/admin/careers" element={<AdminCareers />} />
                <Route path="/admin/partners" element={<AdminPartners />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/student-interns" element={<AdminStudentInterns />} />
                <Route path="/admin/founders" element={<AdminFounders />} />
                <Route path="/admin/form-links" element={<AdminFormLinks />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                <Route path="/admin/submissions" element={<AdminSubmissions />} />
                <Route path="/admin/surveys" element={<AdminSurveys />} />
                <Route path="/admin/news" element={<AdminNews />} />
                <Route path="/admin/id-cards" element={<AdminIdCards />} />
                <Route path="/admin/referrals" element={<AdminReferrals />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/affiliates" element={<AdminAffiliates />} />
                <Route path="/admin/contracts" element={<AdminContracts />} />
                <Route path="/admin/certificates" element={<AdminCertificates />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/contracts/create" element={<ContractEditor />} />
                <Route path="/admin/contracts/view/:id" element={<ContractEditor />} />

                {/* ///////////////////////// Company Routes///////////////////////// */}
                <Route path="/company/about-us" element={<AboutUs />} />
                <Route path="/company/about-us/vision" element={<Vision />} />
                <Route path="/company/about-us/mission" element={<Mission />} />
                <Route path="/company/about-us/values" element={<Value />} />

                <Route path="/company/leadership" element={<Leadership />} />
                <Route path="/company/leadership/founders" element={<Founder />} />
                <Route path="/company/leadership/management" element={<Leadership />} />
                <Route path="/company/leadership/visionary" element={<VisionaryLeadership />} />
                <Route path="/company/leadership/strategic-excellence" element={<StrategicExcellence />} />

                <Route path="/company/our-journey" element={<OurJourney />} />
                <Route path="/company/our-journey/timeline" element={<OurJourney />} />

                <Route path="/company/why-choose-us" element={<WhyChooseUs />} />
                <Route path="/company/why-choose-us/innovation" element={<Innovation />} />
                <Route path="/company/innovation/explore" element={<ExploreInnovations />} />
                <Route path="/company/innovation/join-lab" element={<JoinInnovationLab />} />
                <Route path="/company/innovation/contact-lab" element={<ContactInnovationLab />} />
                <Route path="/company/why-choose-us/reliability" element={<Reliability />} />
                <Route path="/company/why-choose-us/reliability/sla" element={<SLADetails />} />
                <Route path="/company/why-choose-us/scalability" element={<Scalability />} />
                <Route path="/company/why-choose-us/scalability/start-scaling" element={<StartScaling />} />
                <Route path="/company/why-choose-us/scalability/architecture" element={<ViewArchitecture />} />
                <Route path="/company/leadership-journey" element={<LeadershipJourney />} />
                <Route path="/company/code-of-conduct" element={<CodeOfConduct />} />
                <Route path="/company/employee-id" element={<EmployeeId />} />
                <Route path="/company/employee-id/:id" element={<EmployeeId />} />
                <Route path="/company/contracts" element={<CompanyContracts />} />
                <Route path="/company/referral-dashboard" element={<ReferralDashboard />} />
                <Route path="/company/cookie-policy" element={<CookiePolicy />} />
                <Route path="/company/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/company/terms-of-service" element={<TermsOfService />} />

                {/* ///////////////////////// team Routes///////////////////////// */}
                <Route path="/team/core-team" element={<CoreTeam />} />

                <Route path="/team/technical-experts" element={<TechnicalExperts />} />
                <Route path="/team/connect-experts" element={<ConnectExperts />} />
                <Route path="/team/industry-advisors" element={<IndustryAdvisors />} />
                <Route path="/team/advisors-details" element={<AdvisorsDetails />} />
                <Route path="/team/become-advisor" element={<BecomeAdvisor />} />
                <Route path="/team/student-interns" element={<StudentInterns />} />
                <Route path="/team/culture" element={<Culture />} />

                {/* ///////////////////////// solutions Routes///////////////////////// */}
                <Route path="/solutions/digital" element={<DigitalSolutions />} />
                <Route path="/solutions/business/csit" element={<Csit />} />
                <Route path="/solutions/business/gis" element={<Gissolution />} />
                <Route path="/solutions/download" element={<SolutionDownload />} />
                <Route path="/solutions/download/" element={<SolutionDownload />} />
                <Route path="/solutions/business/Mras" element={<MRASservies />} />
                <Route path="/solutions/digital/digital-marketing" element={<DigitalMarketing />} />
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
                <Route path="/industries/government-details" element={<GovernmentDetails />} />
                <Route path="/industries/healthcare" element={<Healthcare />} />
                <Route path="/industries/why-healthcare" element={<WhyChooseHealthcare />} />
                <Route path="/industries/education" element={<Education />} />
                <Route path="/industries/education-results" element={<EducationResults />} />
                <Route path="/industries/retail" element={<Retail />} />
                <Route path="/industries/telecom" element={<Telecom />} />
                <Route path="/industries/banking" element={<Banking />} />
                <Route path="/industries/why-banking" element={<WhyChooseBanking />} />
                <Route path="/industries/manufacturing" element={<Manufacturing />} />
                <Route path="/industries/optimize-production" element={<OptimizeProduction />} />
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
                <Route path="/careers/csr" element={<CareersCSR />} />
                <Route path="/careers/themes" element={<Themes />} />
                <Route path="/careers/ytdp" element={<YTDP />} />
                <Route path="/careers/certificates" element={<EmployeeCertificates />} />


                {/* ///////////////////////// projects Routes///////////////////////// */}
                <Route path="/projects/ongoing" element={<Ongoing />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/projects/completed" element={<Completed />} />
                <Route path="/projects/completed/:id" element={<CompletedProjectDetails />} />
                <Route path="/projects/case-studies" element={<CaseStudies />} />
                <Route path="/projects/case-studies/:id" element={<CaseStudyDetails />} />
                <Route path="/projects/research" element={<Research />} />
                <Route path="/projects/testimonials" element={<Testimonials />} />
                <Route path="/projects/schedule-consultation" element={<ScheduleConsultation />} />


                {/* ///////////////////////// Cresources Routes///////////////////////// */}
                <Route path="/resources/blogs" element={<Blogs />} />
                <Route path="/resources/blogs/:id" element={<BlogArticle />} />
                <Route path="/resources/news" element={<News />} />
                <Route path="/resources/events" element={<Events />} />
                <Route path="/resources/csr" element={<CSR />} />
                <Route path="/resources/csr-report" element={<CSRReport />} />
                <Route path="/resources/whitepapers" element={<Whitepapers />} />
                <Route path="/resources/reports" element={<Reports />} />
                <Route path="/resources/media" element={<Media />} />


                {/* ///////////////////////// joins Routes///////////////////////// */}
                <Route path="/join/partner" element={<Partner />} />
                <Route path="/join/become-partner" element={<BecomePartner />} />
                <Route path="/join/collaborate" element={<Collaborate />} />
                <Route path="/join/collaborate/details" element={<CompanyCollaborationDetails />} />
                <Route path="/join/startup" element={<Startup />} />
                <Route path="/join/startup/guidebook" element={<GuidebookDetails />} />
                <Route path="/join/volunteer" element={<Volunteer />} />
                <Route path="/join/affiliate" element={<Affiliate />} />



                {/* ///////////////////////// Contact Routes///////////////////////// */}
                <Route path="/contact/touch" element={<Touch />} />
                <Route path="/contact/quote" element={<Quote />} />
                <Route path="/contact/support" element={<Support />} />
                <Route path="/contact/request-demo" element={<RequestDemo />} />
                <Route path="/contact/feedback" element={<Feedback />} />
                <Route path="/contact/location" element={<Location />} />
                <Route path="/contact/google-form" element={<GoogleForm />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}