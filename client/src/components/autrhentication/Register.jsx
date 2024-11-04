import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post registration data to the backend using the specific URL
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration successful:', res.data);
      navigate('/'); // Automatically navigate to login after successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://www.sjp.ac.lk/wp-content/uploads/2015/01/usjp-logo1.jpg"
          className="mx-auto h-16 w-auto" // Increased height to 16
        />
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Create Your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-md ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm px-3"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-md ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-5 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
