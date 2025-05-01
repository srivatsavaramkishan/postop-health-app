// src/pages/Dashboard.jsx
import React, { useContext, useState } from 'react';
import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';
import { useRole } from '../context/RoleContext';

const Dashboard = () => {
  const { role } = useRole();

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Dashboard ({role === 'doctor' ? 'Doctor' : 'Patient'})</h2>

      {role === 'patient' && <PatientDashboard />}
      {role === 'doctor' && <DoctorDashboard />}
    </section>
  );
};

export default Dashboard;
