// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';

const Dashboard = () => {
  const [activeDashboard, setActiveDashboard] = useState('');

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="space-x-4 mb-4">
        <button onClick={() => setActiveDashboard('patient')} className="btn">Patient Dashboard</button>
        <button onClick={() => setActiveDashboard('doctor')} className="btn">Doctor Dashboard</button>
      </div>

      {activeDashboard === 'patient' && <PatientDashboard />}
      {activeDashboard === 'doctor' && <DoctorDashboard />}
    </section>
  );
};

export default Dashboard;
