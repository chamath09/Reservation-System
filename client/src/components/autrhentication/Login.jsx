import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData); // Use the correct API route
      console.log('Login successful:', res.data);

      // Redirect to home page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed. Please check your credentials and try again.'); // Set error message
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-gradient-to-r from-blue-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://www.sjp.ac.lk/wp-content/uploads/2015/01/usjp-logo1.jpg"
          className="mx-auto h-16 w-auto" // Increased logo size for better visibility
        />
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-md ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-5 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
