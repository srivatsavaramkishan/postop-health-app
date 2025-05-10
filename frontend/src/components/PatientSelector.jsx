import React, { useState } from 'react';

const PatientSelector = ({ onSelectPatient }) => {
  const [patientId, setPatientId] = useState('');

  const handleLoad = () => {
    const trimmed = patientId.trim();
    if (trimmed) {
      onSelectPatient(trimmed);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter Patient ID (eg: P-1001)"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleLoad} className="bg-blue-700 text-white px-4 py-2 rounded">
        Load Patient
      </button>
    </div>
  );
};

export default PatientSelector;
