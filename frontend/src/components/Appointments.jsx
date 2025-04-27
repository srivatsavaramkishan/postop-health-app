// src/components/Appointments.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Appointments = ({ doctorId, onSelectPatient }) => {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Doctor Appointments</h2>

      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        appointments.map((appointment, idx) => (
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
