import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Patient from './Patient';
import Doctor from './Doctor';

export default function Dashboard() {
  return (
    <div>
      <nav className="space-x-4 mb-4">
        <Link to="patient">Patient</Link>
        <Link to="doctor">Doctor</Link>
      </nav>
      <Routes>
        <Route path="patient" element={<Patient />} />
        <Route path="doctor" element={<Doctor />} />
      </Routes>
    </div>
  );
}
