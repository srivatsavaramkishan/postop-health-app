// src/components/PatientDashboard.jsx

import React, { useState } from 'react';
import Medications from './Medications';
import Followups from './Followups';
import Vitals from './Vitals';

const PatientDashboard = () => {
  const [activeSubSection, setActiveSubSection] = useState('');

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Patient Dashboard</h2>
      <div className="space-x-4 mb-4">
        <button onClick={() => setActiveSubSection('medications')} className="btn">Medications</button>
        <button onClick={() => setActiveSubSection('followups')} className="btn">Follow-ups</button>
        <button onClick={() => setActiveSubSection('vitals')} className="btn">Vitals</button>
      </div>

      {activeSubSection === 'medications' && <Medications patientId={'P-1001'} />}  {/* Pass patientId dynamically later */}
      {activeSubSection === 'followups' && <Followups patientId={'P-1001'} />}
      {activeSubSection === 'vitals' && <Vitals patientId={'P-1001'} />}
    </section>
  );
};

export default PatientDashboard;
