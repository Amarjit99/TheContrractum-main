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
import AdminRegistrationPage from './pages/admin/AdminRegistrationPage';
import AdminContacts from './pages/admin/Contacts';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminResources from './pages/admin/AdminResources';
import AdminCareers from './pages/admin/AdminCareers';
import AdminPartners from './pages/admin/AdminPartners';
import AdminServices from './pages/admin/AdminServices';
import AdminSettings from './pages/admin/AdminSettings';
import AdminStudentInterns from './pages/admin/AdminStudentInterns';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminFounders from './pages/admin/AdminFounders';
import AdminFormLinks from './pages/admin/AdminFormLinks';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminSurveys from './pages/admin/AdminSurveys';
import AdminProfile from './pages/admin/AdminProfile';
import AdminTasks from './pages/admin/AdminTasks';
import AdminNews from './pages/admin/AdminNews';
import AdminIdCards from './pages/admin/AdminIdCards';
import AdminReferrals from './pages/admin/AdminReferrals';
import AdminProjects from './pages/admin/AdminProjects';
import AdminContracts from './pages/admin/AdminContracts';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminEvents from './pages/admin/AdminEvents';
import AdminEventRegistrations from './pages/admin/AdminEventRegistrations';
import VerifyCertificate from './pages/VerifyCertificate';
import ContractEditor from './pages/admin/ContractEditor';
import AdminContractTemplates from './pages/admin/AdminContractTemplates';
import AdminAffiliates from './pages/admin/AdminAffiliates';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import AdminNotifications from './pages/admin/AdminNotifications';
import { Toaster } from 'react-hot-toast';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

/////////////////////// Company Pages//////////////////////////////////

import AboutUs from './pages/company/AboutUs';
import Vision from './pages/company/Vision';
import OurImpact from './pages/company/Impact';
import Mission from './pages/company/Mission';
import Value from './pages/company/Value';
import Founder from './pages/company/Founder';
import Leadership from './pages/company/Leadership';
import OurJourney from './pages/company/OurJourney';
import CodeOfConduct from './pages/company/CodeOfConduct';
import EmployeeId from './pages/company/EmployeeId';
import CompanyContracts from './pages/company/CompanyContracts';
import ReferralDashboard from './pages/company/ReferralDashboard';
import CookiePolicy from './pages/company/CookieUsage';
import PrivacyPolicy from './pages/company/DataProtection';
import TermsOfService from './pages/company/TermsOfService';
import LearnMore from './pages/company/LearnMore';

// //////////////////Team Pages///////////////////////////////////
import CoreTeam from './pages/team/CoreTeam';
import TechnicalExperts from './pages/team/TechnicalExperts';
import IndustryAdvisors from './pages/team/IndustryAdvisors';
import StudentInterns from './pages/team/StudentInterns';
import Culture from './pages/team/Culture';
import ConnectExperts from './pages/team/ConnectExperts';
import AdvisorsDetails from './pages/team/AdvisorsDetails';
import BecomeAdvisor from './pages/team/BecomeAdvisor';




//////////////////// Solutions Pages///////////////////////////////////
import Csit from './pages/solutions/business/Csit';
import CsitInfo from './pages/solutions/business/CsitInfo';
import Gissolution from './pages/solutions/business/Gis';
import SolutionDownload from './pages/solutions/SolutionDownload';
import SolutionInfo from './pages/solutions/SolutionInfo';
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

//////////////////////// Industries Pages///////////////////////////////
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
import RequestConsultation from './pages/industries/RequestConsultation';

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
import ResearchDetails from './pages/projects/ResearchDetails';
import TestimonialDetails from './pages/projects/TestimonialDetails';
import ScheduleConsultation from './pages/projects/ScheduleConsultation';

//////////////////// Resources Pages//////////////////////////////////
import Blogs from './pages/resources/Blogs';
import BlogArticle from './pages/resources/BlogArticle';
import News from './pages/resources/News';
import Events from './pages/resources/Events';
import CSR from './pages/resources/CSR';
import CSRReport from './pages/resources/CSRReport';
import CSRReportDownload from './pages/resources/CSRReportDownload';
import Whitepapers from './pages/resources/Whitepapers';
import Reports from './pages/resources/Reports';
import Media from './pages/resources/Media';
import ContentMediaRelations from './pages/resources/ContentMediaRelations';

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
import ConsentNotice from './components/ConsentNotice';
import GoogleForm from './pages/contact/GoogleForm';

export default function App() {
  return (
    <AdminAuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen relative overflow-x-hidden w-full">
          <ConsentNotice />
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
                <Route path="/admin/registration" element={<AdminProtectedRoute><AdminRegistrationPage /></AdminProtectedRoute>} />
                <Route path="/admin/dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
                <Route path="/admin/super-dashboard" element={<AdminProtectedRoute superAdminOnly><SuperAdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/users" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive', 'System Administrator', 'User Access Administrator', 'Compliance Administrator']}><AdminUsers /></AdminProtectedRoute>} />
                <Route path="/admin/contacts" element={<AdminProtectedRoute allowedSubRoles={['Support Manager', 'Support Administrator', 'Customer Support Executive', 'CRM & Lead Manager', 'CRM Administrator', 'CRM Executive', 'Manager', 'Sales Manager', 'Sales Executive']}><AdminContacts /></AdminProtectedRoute>} />
                <Route path="/admin/services" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'Technical Manager', 'Website Administrator', 'Technical Support Executive', 'TR']}><AdminServices /></AdminProtectedRoute>} />
                <Route path="/admin/blogs" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'Content Manager', 'Content Administrator', 'Content Executive', 'Website Administrator', 'Marketing Administrator', 'Marketing Manager', 'Marketing Executive']}><AdminBlogs /></AdminProtectedRoute>} />
                <Route path="/admin/resources" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'Content Manager', 'Content Administrator', 'Content Executive', 'Website Administrator', 'Marketing Administrator', 'Marketing Manager', 'Marketing Executive']}><AdminResources /></AdminProtectedRoute>} />
                <Route path="/admin/careers" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive']}><AdminCareers /></AdminProtectedRoute>} />
                <Route path="/admin/partners" element={<AdminProtectedRoute allowedSubRoles={['Finance', 'Finance Administrator', 'Finance Manager', 'Finance Executive', 'Business Development Manager', 'Business Development Executive', 'Manager']}><AdminPartners /></AdminProtectedRoute>} />
                <Route path="/admin/analytics" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'System Administrator', 'Marketing Manager', 'Marketing Administrator', 'Marketing Executive']}><AdminAnalytics /></AdminProtectedRoute>} />
                <Route path="/admin/settings" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'System Administrator', 'Database Administrator', 'Technical Manager']}><AdminSettings /></AdminProtectedRoute>} />
                <Route path="/admin/student-interns" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive', 'Training Coordinator', 'Training & Development Manager']}><AdminStudentInterns /></AdminProtectedRoute>} />
                <Route path="/admin/volunteers" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive', 'Training Coordinator', 'Training & Development Manager']}><AdminVolunteers /></AdminProtectedRoute>} />
                <Route path="/admin/founders" element={<AdminProtectedRoute allowedSubRoles={['Legal', 'Compliance Administrator', 'Compliance Manager', 'Compliance Executive']}><AdminFounders /></AdminProtectedRoute>} />
                <Route path="/admin/form-links" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'Support Manager', 'Support Administrator', 'CRM & Lead Manager', 'CRM Administrator', 'Customer Support Executive']}><AdminFormLinks /></AdminProtectedRoute>} />
                <Route path="/admin/notifications" element={<AdminProtectedRoute><AdminNotifications /></AdminProtectedRoute>} />
                <Route path="/admin/submissions" element={<AdminProtectedRoute allowedSubRoles={['Support Manager', 'Support Administrator', 'Customer Support Executive', 'CRM & Lead Manager', 'CRM Administrator', 'Data Entry & Documentation Executive']}><AdminSubmissions /></AdminProtectedRoute>} />
                <Route path="/admin/leads" element={<Navigate to="/admin/submissions" replace />} />
                <Route path="/admin/surveys" element={<AdminProtectedRoute allowedSubRoles={['Support Manager', 'Support Administrator', 'Customer Support Executive', 'Data Entry & Documentation Executive']}><AdminSurveys /></AdminProtectedRoute>} />
                <Route path="/admin/profile" element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>} />
                <Route path="/admin/news" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'Content Manager', 'Content Administrator', 'Content Executive', 'Website Administrator']}><AdminNews /></AdminProtectedRoute>} />
                <Route path="/admin/id-cards" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive']}><AdminIdCards /></AdminProtectedRoute>} />
                <Route path="/admin/referrals" element={<AdminProtectedRoute allowedSubRoles={['Finance', 'Finance Administrator', 'Finance Manager', 'Finance Executive', 'HR', 'HR Administrator', 'HR Manager']}><AdminReferrals /></AdminProtectedRoute>} />
                <Route path="/admin/projects" element={<AdminProtectedRoute allowedSubRoles={['Manager', 'Technical Manager', 'Project Manager', 'Project Coordinator', 'TR', 'Operations Administrator', 'Website Administrator', 'Operations Manager', 'Operations Executive']}><AdminProjects /></AdminProtectedRoute>} />
                <Route path="/admin/affiliates" element={<AdminProtectedRoute allowedSubRoles={['Finance', 'Finance Administrator', 'Finance Manager', 'Finance Executive']}><AdminAffiliates /></AdminProtectedRoute>} />
                <Route path="/admin/contracts" element={<AdminProtectedRoute allowedSubRoles={['Legal', 'Compliance Administrator', 'Compliance Manager', 'Compliance Executive', 'HR', 'HR Administrator', 'HR Manager', 'Manager']}><AdminContracts /></AdminProtectedRoute>} />
                <Route path="/admin/certificates" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive', 'Legal', 'Compliance Administrator', 'Compliance Manager', 'Compliance Executive']}><AdminCertificates /></AdminProtectedRoute>} />
                <Route path="/admin/events" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive', 'Event Manager', 'Event Administrator', 'Event Coordinator', 'Manager']}><AdminEvents /></AdminProtectedRoute>} />
                <Route path="/admin/event-registrations" element={<AdminProtectedRoute allowedSubRoles={['HR', 'HR Administrator', 'HR Manager', 'HR Executive', 'Event Manager', 'Event Administrator', 'Event Coordinator', 'Manager']}><AdminEventRegistrations /></AdminProtectedRoute>} />
                <Route path="/admin/tasks" element={<AdminProtectedRoute><AdminTasks /></AdminProtectedRoute>} />
                <Route path="/admin/contracts/create" element={<AdminProtectedRoute allowedSubRoles={['Legal', 'Compliance Administrator', 'Compliance Manager', 'Compliance Executive', 'HR', 'HR Administrator', 'HR Manager', 'Manager']}><ContractEditor /></AdminProtectedRoute>} />
                <Route path="/admin/contracts/view/:id" element={<AdminProtectedRoute allowedSubRoles={['Legal', 'Compliance Administrator', 'Compliance Manager', 'Compliance Executive', 'HR', 'HR Administrator', 'HR Manager', 'Manager']}><ContractEditor /></AdminProtectedRoute>} />
                <Route path="/admin/contracts/templates" element={<AdminProtectedRoute allowedSubRoles={['Legal', 'Compliance Administrator', 'Compliance Manager', 'Compliance Executive', 'HR', 'HR Administrator', 'HR Manager', 'Manager']}><AdminContractTemplates /></AdminProtectedRoute>} />

                {/* ///////////////////////// Company Routes///////////////////////// */}
                <Route path="/company/our-impact" element={<OurImpact />} />
                <Route path="/company/learn-more" element={<LearnMore />} />

                <Route path="/company/about-us" element={<AboutUs />} />
                <Route path="/company/vision" element={<Vision />} />
                <Route path="/company/mission" element={<Mission />} />
                <Route path="/company/values" element={<Value />} />
                <Route path="/company/founders" element={<Founder />} />
                <Route path="/company/management" element={<Leadership />} />
                <Route path="/company/our-journey" element={<OurJourney />} />
                <Route path="/company/code-of-conduct" element={<CodeOfConduct />} />
                <Route path="/company/employee-id" element={<EmployeeId />} />

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
                <Route path="/solutions/business/csit/info" element={<CsitInfo />} />
                <Route path="/solutions/business/gis" element={<Gissolution />} />
                <Route path="/solutions/download" element={<SolutionDownload />} />
                <Route path="/solutions/download/" element={<SolutionDownload />} />
                <Route path="/solutions/info" element={<SolutionInfo />} />
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
                <Route path="/industries/request-consultation" element={<RequestConsultation />} />


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
                <Route path="/projects/research/:id" element={<ResearchDetails />} />
                <Route path="/projects/testimonials" element={<Testimonials />} />
                <Route path="/projects/testimonials/:id" element={<TestimonialDetails />} />
                <Route path="/projects/schedule-consultation" element={<ScheduleConsultation />} />


                {/* ///////////////////////// Cresources Routes///////////////////////// */}
                <Route path="/resources/blogs" element={<Blogs />} />
                <Route path="/resources/blogs/:id" element={<BlogArticle />} />
                <Route path="/resources/news" element={<News />} />
                <Route path="/resources/events" element={<Events />} />
                <Route path="/events" element={<Events />} />
                <Route path="/resources/csr" element={<CSR />} />
                <Route path="/resources/csr-report" element={<CSRReport />} />
                <Route path="/resources/csr-report/download" element={<CSRReportDownload />} />
                <Route path="/resources/whitepapers" element={<Whitepapers />} />
                <Route path="/resources/reports" element={<Reports />} />
                <Route path="/resources/media" element={<Media />} />
                <Route path="/resources/media-relations" element={<ContentMediaRelations />} />


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