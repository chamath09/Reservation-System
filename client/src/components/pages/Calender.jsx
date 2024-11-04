import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Clock from './Clock';

const Calender = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-4 pl-40">
      <div className="bg-white shadow-2xl rounded-lg p-6 lg:p-8 max-w-md w-full mb-6 md:mb-0 md:mr-4 transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Select a Date
        </h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded-lg shadow-md border-gray-300"
        />
        <p className="mt-6 text-center text-lg text-gray-600 font-medium">
          Selected Date: <span className="text-blue-600 font-bold">{date.toDateString()}</span>
        </p>
      </div>
      <Clock />
    </div>
  );
};

export default Calender;
