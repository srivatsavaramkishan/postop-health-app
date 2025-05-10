// src/components/DoctorDashboard.jsx

import React, { useState, useEffect } from 'react';
import Appointments from './Appointments';
import DoctorProfile from './DoctorProfile';
import PatientProfile from './PatientProfile';
import axiosInstance from '../api/axiosInstance';

const DoctorDashboard = () => {
  const [inputDoctorId, setInputDoctorId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get('/followups');
        const filtered = res.data.filter((a) => a.doctorId === doctorId);
        filtered.sort((a, b) => new Date(b.followupDate) - new Date(a.followupDate));
        setAppointments(filtered);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    if (doctorId) {
      fetchAppointments();
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

          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-600 mb-2">Doctor Appointments</h3>
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              appointments.map((a, i) => (
                <div key={i} className="border p-2 mb-2 cursor-pointer" onClick={() => handleSelectPatient(a.patientId)}>
                  <p><strong>Patient ID:</strong> {a.patientId}</p>
                  <p><strong>Date:</strong> {a.followupDate}</p>
                  <p><strong>Purpose:</strong> {a.purpose}</p>
                  <p><strong>Status:</strong> {a.status}</p>
                </div>
              ))
            )}
          </div>

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
        </>
      )}

      {selectedPatientId && (
        <div className="mt-6">
          <h3 className="text-lg mb-2 text-blue-600">Viewing Profile for Patient: {selectedPatientId}</h3>
          <PatientProfile patientId={selectedPatientId} role="doctor" />
        </div>
      )}
    </section>
  );
};

export default DoctorDashboard;
