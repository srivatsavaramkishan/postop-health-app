// src/components/Appointments.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker CSS

const Appointments = ({ doctorId, onSelectPatient }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

  // Fetch appointments when the doctorId changes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get('/followups');
        const filteredAppointments = response.data
          .filter((appointment) => appointment.doctorId === doctorId)
          .sort((a, b) => new Date(b.presentDate) - new Date(a.presentDate));
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  // Format date to MM/DD/YYYY to match the backend data format
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  // Filter appointments based on the selected date
  const filterAppointmentsByDate = (appointments, date) => {
    if (!date) return appointments; // If no date is selected, return all appointments

    const formattedDate = formatDate(date); // Convert selectedDate to MM/DD/YYYY format

    return appointments.filter((appointment) => {
      const appointmentDate = formatDate(appointment.presentDate); // Convert appointment.presentDate to MM/DD/YYYY format
      return appointmentDate === formattedDate; // Compare the date strings
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Doctor Appointments</h2>

      {/* Date Picker for selecting a specific date */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select a Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)} // Update selectedDate on date change
          dateFormat="MM/dd/yyyy" // Use MM/dd/yyyy to match the backend format
          className="border p-2 rounded"
        />
      </div>

      {/* Display filtered appointments based on selected date */}
      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        filterAppointmentsByDate(appointments, selectedDate).map((appointment, idx) => (
          <div
            key={idx}
            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectPatient(appointment.patientId)}
          >
            <p><strong>Patient ID:</strong> <span className="text-blue-600 underline">{appointment.patientId}</span></p>
            <p><strong>Present Date:</strong> {appointment.presentDate}</p>
            <p><strong>Purpose:</strong> {appointment.purpose}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
