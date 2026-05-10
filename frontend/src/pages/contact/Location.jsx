import { useState } from "react";
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";

export default function LocationSection() {
  const [showMore, setShowMore] = useState(false);

  const extraPoints = [
    { title: "PAN India Presence", desc: "Successfully executing diverse IT and Survey projects across all Indian states and union territories." },
    { title: "Expert Technical Team", desc: "Over 100+ certified professionals specializing in GIS, LiDAR, and Geospatial data analytics." },
    { title: "Quality Guaranteed", desc: "ISO 9001:2015 certified processes ensuring the highest standards of accuracy and data security." },
    { title: "Public Sector Partner", desc: "Trusted partner for major government digitization, e-KYC, and smart city infrastructure projects." }
  ];

  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-40 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-40 -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start relative z-10">

        {/* Left Content */}
        <div className="space-y-10">

          <div className="space-y-4">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight italic tracking-tighter">
              The <span className="text-blue-600 font-black">Contractum</span> <br />
              <span className="text-3xl text-slate-500 font-light not-italic tracking-normal">Integral Solution Private Limited</span>
            </h2>
            <div className="w-20 h-2 bg-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-6 text-slate-600 text-lg font-light leading-relaxed">
            <p>
              Established in <strong className="font-bold text-slate-900">2015-2016</strong>,
              Contractum Integral Solution Pvt. Ltd. has emerged as a powerhouse in the
              IT & GIS domain, delivering precision-driven services across the Indian landscape.
            </p>

            <p>
              Our multi-disciplinary expertise spans <span className="text-slate-900 font-medium">Engineering Surveys, LiDAR Processing, 3D City Modeling</span>,
              and advanced <span className="text-slate-900 font-medium">Satellite Data Processing</span>, bridging the gap between raw data and actionable intelligence.
            </p>

            <p>
              With over <strong className="text-blue-600 font-black">10+ years of operational excellence</strong>, we’ve pioneered e-KYC verification
              and digital transformation for both public and private sectors, completing numerous high-stakes government projects with zero compromise on quality.
            </p>

            {/* Read More Points */}
            <div className={`space-y-8 overflow-hidden transition-all duration-700 ease-in-out ${showMore ? "max-h-[800px] opacity-100 mt-8" : "max-h-0 opacity-0"}`}>
              <div className="grid gap-6">
                {extraPoints.map((point, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5"></div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">{point.title}</h4>
                      <p className="text-sm text-slate-500 font-light">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 active:scale-95"
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50 grid sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <img src={location} alt="Location" className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Office</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                169, Ganesh Nagar <br />
                Kota, RJ 324005
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <img src={phone} alt="Phone" className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Support</span>
              </div>
              <p className="text-sm text-slate-600 font-light">+91 96805-34740</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <img src={email} alt="Email" className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Inquiries</span>
              </div>
              <p className="text-sm text-slate-600 font-light break-all">info@thecontractum.com</p>
            </div>
          </div>

        </div>

        {/* Right Map Component */}
        <div className="lg:sticky lg:top-32 w-full h-[500px] lg:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white relative group">
          <div className="absolute inset-0 bg-blue-600/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.4512345678901!2d75.83500000000001!3d25.180000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f850e8ae2985d%3A0x1234567890abcdef!2sRangbari%20Rd%2C%20Kota%2C%20Rajasthan%20324005!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[3rem]"
            title="The Contractum Office Location - Kota, Rajasthan"
          ></iframe>
        </div>

      </div>

    </section>
  );
}
