// src/components/Appointments.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Appointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get('/followups');
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.doctorId === doctorId
        );
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Daily Appointments</h2>

      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        appointments.map((appointment, idx) => (
          <div key={idx} className="border p-2 mb-2">
            <p><strong>Patient ID:</strong> {appointment.patientId}</p>
            <p><strong>Follow-up Date:</strong> {appointment.followupDate}</p>
            <p><strong>Purpose:</strong> {appointment.purpose}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
