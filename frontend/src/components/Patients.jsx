// src/components/Patients.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axiosInstance.get('/patients');
        setPatients(res.data);
      } catch (err) {
        console.error('Error fetching patients', err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">All Patients</h2>
      {patients.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.patientId} className="mb-2 border-b pb-2">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Patient ID:</strong> {patient.patientId}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Age:</strong> {patient.age}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Patients;
