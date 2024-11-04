import React, { useState } from 'react';
import axios from 'axios';

const Exam = () => {
  const [indexNumber, setIndexNumber] = useState('');
  const [examData, setExamData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchExam = async () => {
    setError(''); 
    try {
      const response = await axios.get(`http://localhost:5000/api/exams/${indexNumber}`);
      setExamData(response.data);
    } catch (err) {
      setError('No exams found for this index number.');
      setExamData(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Exam Details</h2>

      <input
        type="text"
        placeholder="Enter Index Number"
        className="mb-4 p-2 rounded border"
        value={indexNumber}
        onChange={(e) => setIndexNumber(e.target.value)}
      />

      <button
        onClick={handleFetchExam}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Fetch Exam Details
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {examData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examData.map((exam) => (
            <div key={exam._id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold">{exam.module}</h3>
              <p><strong>Name:</strong> {exam.name}</p>
              <p><strong>Email:</strong> {exam.email}</p>
              <p><strong>Index Number:</strong> {exam.indexNumber}</p>
              <p><strong>Start Time:</strong> {exam.startTime}</p>
              <p><strong>End Time:</strong> {exam.endTime}</p>
              <p><strong>Date:</strong> {exam.date}</p>
              <p><strong>Hall:</strong> {exam.hall}</p>
              <img
                src="https://img.freepik.com/free-vector/businessman-with-lot-work_23-2147509758.jpg?uid=R168750986&ga=GA1.1.293342500.1719385243&semt=ais_hybrid"
                alt={`${exam.module}`}
                className="mt-2 rounded w-40 h-20 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exam;
