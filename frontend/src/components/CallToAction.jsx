import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="py-20 bg-linear-to-r from-primary to-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers and take your business to the next level today.
        </p>
        <Link
          to="/register"
          className="inline-block bg-primary text-white hover:bg-primary-dark font-bold px-8 py-4 rounded-2xl transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Your Free Trial
        </Link>
      </div>
    </section>
  );
}
