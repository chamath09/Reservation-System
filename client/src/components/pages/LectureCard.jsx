import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LectureCard = () => {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('lectures'); 

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sessions'); 
        setSessions(response.data); 
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const sortedSessions = [...sessions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    const startTimeA = a.startTime.split(':');
    const startTimeB = b.startTime.split(':');
    
    dateA.setHours(startTimeA[0], startTimeA[1]);
    dateB.setHours(startTimeB[0], startTimeB[1]);
    
    return dateA - dateB;
  });

  const filteredSessions = sortedSessions.filter(session =>
    session.moduleCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lectures = filteredSessions.filter(session => session.hallType === 'lecture');
  const labs = filteredSessions.filter(session => session.hallType === 'lab');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Lecture and Lab Schedule</h2>
      
      <input
        type="text"
        placeholder="Enter Subject Code"
        className="mb-4 p-2 rounded border"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-6">
        <button
          className={`px-4 py-2 mr-4 ${activeTab === 'lectures' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('lectures')}
        >
          View Lectures
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'labs' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('labs')}
        >
          View Labs
        </button>
      </div>

      {activeTab === 'lectures' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Lectures</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lectures.map((session, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src="https://img.freepik.com/free-vector/flat-medical-conference-illustrated_23-2148885344.jpg?uid=R168750986&ga=GA1.1.293342500.1719385243&semt=ais_hybrid"
                  alt="Lecture Session"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{session.module}</h3>
                  <p className="text-gray-700">Module Code: {session.moduleCode}</p>
                  <p className="text-gray-700">Date: {session.date.split('T')[0]}</p>
                  <p className="text-gray-700">Start Time: {session.startTime}</p>
                  <p className="text-gray-700">End Time: {session.endTime}</p>
                  <p className="text-gray-700">Hall: {session.hall} (Lecture Hall)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'labs' && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Labs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {labs.map((session, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src="https://img.freepik.com/free-vector/flat-medical-conference-illustrated_23-2148885344.jpg?uid=R168750986&ga=GA1.1.293342500.1719385243&semt=ais_hybrid"
                  alt="Lab Session"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{session.module}</h3>
                  <p className="text-gray-700">Module Code: {session.moduleCode}</p>
                  <p className="text-gray-700">Date: {session.date.split('T')[0]}</p>
                  <p className="text-gray-700">Start Time: {session.startTime}</p>
                  <p className="text-gray-700">End Time: {session.endTime}</p>
                  <p className="text-gray-700">Hall: {session.hall} (Lab Hall)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureCard;
