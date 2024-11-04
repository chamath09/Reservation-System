import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setIsLoggingOut(true);
      localStorage.removeItem('authToken');
      setTimeout(() => {
        setIsLoggingOut(false);
        navigate('/');
      }, 500); // Adding a slight delay for a smoother transition
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
        isLoggingOut ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
}
