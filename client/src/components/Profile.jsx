import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null); 

  const userEmail = localStorage.getItem('userEmail'); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userEmail}`);
        setUser(response.data); 
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Profile Details</h3>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              disabled
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-1">Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              disabled
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          <a href="/settings" className="mt-4 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700">
            Edit Profile
          </a>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
