import React, { useEffect, useState } from 'react';

const Notice = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notices'); 
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-5">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Notices</h1>
      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="w-full max-w-lg mx-auto border-2 border-red-500 p-4 rounded-lg shadow-lg bg-white bg-opacity-90 transition-transform transform hover:scale-105"
          >
            <h2 className="font-bold text-xl text-gray-800 mb-2 border-b-2 border-yellow-400 pb-1">{notice.topic}</h2>
            <p className="text-gray-700 text-base leading-relaxed">{notice.description}</p>
            <div className="mt-4 flex justify-end">
              <button className="text-blue-500 hover:text-blue-400 font-medium">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
