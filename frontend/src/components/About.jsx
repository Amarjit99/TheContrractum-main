export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              We are a leading technology company dedicated to providing innovative solutions that empower businesses to thrive in the digital age.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over a decade of experience and a team of passionate professionals, we've helped thousands of clients achieve their goals and transform their operations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-primary/10 rounded-2xl">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-2xl">
                <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-linear-to-r from-primary-light to-purple-500 rounded-2xl h-96 shadow-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
