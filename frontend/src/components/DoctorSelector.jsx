// src/components/DoctorSelector.jsx

import React, { useState } from 'react';

const DoctorSelector = ({ onSelectDoctor }) => {
  const [doctorId, setDoctorId] = useState('');

  const handleSubmit = () => {
    if (doctorId.trim()) {
      onSelectDoctor(doctorId.trim());
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter Doctor ID (e.g., D00045)"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        Load Doctor
      </button>
    </div>
  );
};

export default DoctorSelector;
