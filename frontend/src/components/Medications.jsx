// src/components/Medications.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Medications = ({ patientId, checkupDate, canEdit }) => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    medicationName: '',
    medicationType: '',
    dosage: '',
    frequency: '',
    startDate: checkupDate,
    endDate: checkupDate
  });

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const res = await axiosInstance.get(`/medications?patientId=${patientId}`);
        const filtered = res.data.filter(m => m.startDate === checkupDate);
        setMedications(filtered);
      } catch (err) {
        console.error('❌ Error fetching medications:', err);
      }
    };
    fetchMedications();
  }, [patientId, checkupDate]);

  const handleAddMedication = async () => {
    try {
      const res = await axiosInstance.post(
        '/medications',
        {
          ...newMedication,
          patientId,
          doctorId: 'D00045'
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setMedications([...medications, res.data]);
      setNewMedication({ medicationName: '', medicationType: '', dosage: '', frequency: '', startDate: checkupDate, endDate: checkupDate });
    } catch (err) {
      console.error('❌ Error adding medication:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">🧪 Medications</h2>
      {medications.length === 0 ? (
        <p>No Medications Found for {checkupDate}</p>
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
            {medications.map((m, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{m.medicationName}</td>
                <td className="p-2 border">{m.medicationType}</td>
                <td className="p-2 border">{m.dosage}</td>
                <td className="p-2 border">{m.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {canEdit && (
        <div className="space-y-2">
          <input type="text" placeholder="Medication Name" className="border p-2 w-full" value={newMedication.medicationName} onChange={(e) => setNewMedication({ ...newMedication, medicationName: e.target.value })} />
          <input type="text" placeholder="Medication Type" className="border p-2 w-full" value={newMedication.medicationType} onChange={(e) => setNewMedication({ ...newMedication, medicationType: e.target.value })} />
          <input type="text" placeholder="Dosage" className="border p-2 w-full" value={newMedication.dosage} onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })} />
          <input type="text" placeholder="Frequency" className="border p-2 w-full" value={newMedication.frequency} onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })} />
          <button onClick={handleAddMedication} className="bg-green-500 text-white px-4 py-2 rounded">Add Medication</button>
        </div>
      )}
    </div>
  );
};

export default Medications;
