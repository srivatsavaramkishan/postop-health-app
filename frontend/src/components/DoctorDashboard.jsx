// src/components/DoctorDashboard.jsx

import React, { useState, useEffect } from 'react';
import Appointments from './Appointments'; // Import Appointments component
import DoctorProfile from './DoctorProfile';
import PatientProfile from './PatientProfile';
import axiosInstance from '../api/axiosInstance';

const DoctorDashboard = () => {
  const [inputDoctorId, setInputDoctorId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [activeDoctorTab, setActiveDoctorTab] = useState('appointments');
  
  useEffect(() => {
    const fetchDoctorPatients = async () => {
      try {
        const allPatients = await axiosInstance.get('/patients');
        const filtered = allPatients.data.filter((p) => p.doctor === doctorId);
        setPatients(filtered);
      } catch (err) {
        console.error('Error fetching patients for doctor:', err);
      }
    };

    if (doctorId) {
      fetchDoctorPatients();
    }
  }, [doctorId]);

  const handleSelectPatient = (id) => {
    setSelectedPatientId(id);
  };

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Doctor Dashboard</h2>

      <input
        type="text"
        placeholder="Enter Doctor ID (e.g., D00045)"
        value={inputDoctorId}
        onChange={(e) => setInputDoctorId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={() => setDoctorId(inputDoctorId)}
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search Doctor
      </button>

      {doctorId && !selectedPatientId && (
        <>
          <div className="mt-6">
            <DoctorProfile doctorId={doctorId} />
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className={`px-4 py-2 rounded ${
                activeDoctorTab === 'appointments' ? 'bg-blue-700 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveDoctorTab('appointments')}
            >
              Doctor Appointments
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeDoctorTab === 'patients' ? 'bg-blue-700 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveDoctorTab('patients')}
            >
              Doctor Patient List
            </button>
          </div>

          {/* Doctor Appointments */}
          {activeDoctorTab === 'appointments' && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">Doctor Appointments</h3>
              <Appointments doctorId={doctorId} onSelectPatient={handleSelectPatient} />
            </div>
          )}

          {/* Doctor Patient List */}
          {activeDoctorTab === 'patients' && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-blue-600 mb-2">Doctor Patient List</h3>
              {patients.length === 0 ? (
                <p>No patients assigned.</p>
              ) : (
                patients.map((p, i) => (
                  <div key={i} className="border p-2 mb-2 cursor-pointer" onClick={() => handleSelectPatient(p.patientId)}>
                    <p><strong>Patient ID:</strong> {p.patientId}</p>
                    <p><strong>Name:</strong> {p.name}</p>
                    <p><strong>Age:</strong> {p.age}</p>
                    <p><strong>Gender:</strong> {p.gender}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* Patient Profile with Back Button */}
      {selectedPatientId && (
        <div className="mt-6">
          <button
            className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setSelectedPatientId('')}
          >
            ← Back to Dashboard
          </button>
          <h3 className="text-lg mb-2 text-blue-600">Viewing Profile for Patient: {selectedPatientId}</h3>
          <PatientProfile patientId={selectedPatientId} role="doctor" />
        </div>
      )}
    </section>
  );
};

export default DoctorDashboard;
