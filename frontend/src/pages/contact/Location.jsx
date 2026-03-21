import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";

export default function LocationSection() {
  return (
    <section className="relative bg-gray-100 py-20 overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start relative z-10">

        {/* Left Content */}
        <div className="space-y-8">

          <h2 className="text-4xl font-bold text-black">
            From Contractum Integral Solution Private Limited
          </h2>

          {/* Company Description */}
          <p className="text-gray-600 leading-relaxed">
            Established in the year <strong>2015-2016</strong>, 
            Contractum Integral Solution Pvt. Ltd. is a reputed organization 
            providing comprehensive IT & GIS services across India.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We specialize in CS/IT solutions, Engineering Survey Services,
            Geo-spatial Services, LiDAR Data Processing, Photogrammetry,
            3D City Modeling, Location Content Development, Satellite Data Processing,
            Navigation Map Building, and E-commerce Services.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We are registered with the Indian Panel Court for all clearances and
            operate across PAN India on diverse projects. With over 
            <strong> 10+ years of experience</strong> in public surveys,
            merchant onboarding, e-KYC verification, digital wallet promotion,
            and multiple government projects, we ensure reliable and effective solutions.
          </p>

          {/* Contact Details */}
          <div className="space-y-4 text-gray-700 pt-4">

            <div className="flex items-start gap-3">
              <img src={location} alt="Location" className="w-5 h-5 mt-1" />
              <p>
                <strong>Head Office:</strong><br />
                169, Ganesh Nagar Ground Floor,<br />
                169, Ganesh Nagar,<br />
                Kota, Rajasthan 324005
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src={phone} alt="Phone" className="w-5 h-5" />
              <p>
                <strong>Phone:</strong> 096805 34740
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src={email} alt="Email" className="w-5 h-5" />
              <p>
                <strong>Email:</strong> info@thecontractum.com
              </p>
            </div>

          </div>

          <button className="mt-6 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary transition duration-300">
            Read More
          </button>

        </div>

        {/* Right Illustration */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Location Illustration"
            className="w-80 md:w-96 object-contain"
          />
        </div>

      </div>

    </section>
  );
}
