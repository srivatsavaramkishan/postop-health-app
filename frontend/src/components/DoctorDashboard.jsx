import React, { useState } from 'react';
import DoctorProfile from './DoctorProfile';
import Appointments from './Appointments';
import PatientProfile from './PatientProfile';          // ✅ Correct


const DoctorDashboard = () => {
  const [activeSubSection, setActiveSubSection] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Doctor Dashboard</h2>

      <div className="space-x-4 mb-4">
        <button onClick={() => setActiveSubSection('appointments')} className="btn">Daily Appointments</button>
        <button onClick={() => setActiveSubSection('doctorProfile')} className="btn">Doctor Profile</button>
        <button onClick={() => setActiveSubSection('patientProfile')} className="btn">Patient Profile</button>
      </div>

      {/* Subsections Rendering */}
      {activeSubSection === 'appointments' && <Appointments doctorId={'D-2001'} />}
      {activeSubSection === 'doctorProfile' && <DoctorProfile doctorId={'D-2001'} />}
      {activeSubSection === 'patientProfile' && (
        <div>
          <input
            type="text"
            placeholder="Enter Patient ID (e.g. P-1001)"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {selectedPatientId && <PatientProfile patientId={selectedPatientId} />}
        </div>
      )}
    </section>
  );
};

export default DoctorDashboard;
