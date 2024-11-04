import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [user, setUser] = useState(null); // State to hold user details
  const [formData, setFormData] = useState({}); // State to hold form data
  const [isEditing, setIsEditing] = useState(false); // State for editing mode

  // Fetch user details based on email
  const userEmail = localStorage.getItem('userEmail'); // Assume email is stored in local storage after login

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userEmail}`);
        setUser(response.data); // Assuming response contains user details
        setFormData(response.data); // Initialize form data
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userEmail}`, formData);
      setUser(response.data); 
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
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
              value={isEditing ? formData.name : user.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-1">Phone:</label>
            <input
              type="text"
              name="phone"
              value={isEditing ? formData.phone : user.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="mt-4 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Settings;
