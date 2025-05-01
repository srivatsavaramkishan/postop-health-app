// ✅ Medications.jsx with proper medication field handling and add form
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Medications = ({ patientId, checkupDate, canEdit }) => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    startDate: checkupDate,
    endDate: checkupDate,
    nextCheckupDate: ''
  });

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const res = await axiosInstance.get(`/medications`);
        const filtered = res.data.filter(m => m.patientId === patientId && m.presentDate === checkupDate);
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
          doctorId: 'D00045',
          presentDate: checkupDate
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setMedications([...medications, res.data]);
      setNewMedication({ medication: '', dosage: '', frequency: '', startDate: checkupDate, endDate: checkupDate, nextCheckupDate: '' });
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
              <th className="p-2 border">Present Date</th>
              <th className="p-2 border">Medication</th>
              <th className="p-2 border">Dosage</th>
              <th className="p-2 border">Frequency</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
              <th className="p-2 border">Next Checkup Date</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((m, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{m.presentDate}</td>
                <td className="p-2 border">{m.medicationName}</td>
                <td className="p-2 border">{m.dosage}</td>
                <td className="p-2 border">{m.frequency}</td>
                <td className="p-2 border">{m.startDate}</td>
                <td className="p-2 border">{m.endDate}</td>
                <td className="p-2 border">{m.nextCheckupDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {canEdit && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Medication"
            className="border p-2 w-full"
            value={newMedication.medication}
            onChange={(e) => setNewMedication({ ...newMedication, medication: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dosage"
            className="border p-2 w-full"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
          />
          <input
            type="text"
            placeholder="Frequency"
            className="border p-2 w-full"
            value={newMedication.frequency}
            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
          />
          <input
            type="text"
            placeholder="Next Checkup Date"
            className="border p-2 w-full"
            value={newMedication.nextCheckupDate}
            onChange={(e) => setNewMedication({ ...newMedication, nextCheckupDate: e.target.value })}
          />
          <button
            onClick={handleAddMedication}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Medication
          </button>
        </div>
      )}
    </div>
  );
};

export default Medications;