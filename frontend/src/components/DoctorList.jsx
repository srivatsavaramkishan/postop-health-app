// src/components/DoctorList.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const DoctorList = ({ doctorId, onSelectPatient }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axiosInstance.get('/patients');
        const assigned = res.data.filter((p) => p.doctor === doctorId);
        setPatients(assigned);
      } catch (err) {
        console.error('Error fetching patients for doctor:', err);
      }
    };

    fetchPatients();
  }, [doctorId]);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Doctor's Assigned Patients</h2>

      {patients.length === 0 ? (
        <p>No Patients Assigned</p>
      ) : (
        patients.map((patient, idx) => (
          <div
            key={idx}
            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectPatient(patient.patientId)}
          >
            <p><strong>Patient ID:</strong> <span className="text-blue-600 underline">{patient.patientId}</span></p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorList;
