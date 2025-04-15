// src/components/Medications.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Medications = ({ patientId }) => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    medicationName: '',
    medicationType: '',
    dosage: '',
    frequency: ''
  });

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axiosInstance.get(`/medications?patientId=${patientId}`);
        setMedications(response.data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, [patientId]);

  const handleAddMedication = async () => {
    try {
      const response = await axiosInstance.post(
        '/medications',
        {
          ...newMedication,
          patientId,
          doctorId: 'D-2001' // Dynamic in production
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setMedications([...medications, response.data]);
      setNewMedication({ medicationName: '', medicationType: '', dosage: '', frequency: '' });
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Medications</h2>

      {medications.length === 0 ? (
        <p>No Medications Found</p>
      ) : (
        <table className="w-full mb-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Dosage</th>
              <th className="p-2 border">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{med.medicationName}</td>
                <td className="p-2 border">{med.medicationType}</td>
                <td className="p-2 border">{med.dosage}</td>
                <td className="p-2 border">{med.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Medication Name"
          value={newMedication.medicationName}
          onChange={(e) => setNewMedication({ ...newMedication, medicationName: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Medication Type"
          value={newMedication.medicationType}
          onChange={(e) => setNewMedication({ ...newMedication, medicationType: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Dosage"
          value={newMedication.dosage}
          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Frequency"
          value={newMedication.frequency}
          onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={handleAddMedication} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Medication
        </button>
      </div>
    </div>
  );
};

export default Medications;
