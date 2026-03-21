import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      alert('Registration successful! Welcome aboard!');
      console.log('Registration data:', formData);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us today and get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.fullName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-primary">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-primary">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-primary">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-primary">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-2xl transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-light font-medium transition duration-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
