// src/components/Vitals.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Vitals = ({ patientId }) => {
  const [vitals, setVitals] = useState([]);
  const [newVital, setNewVital] = useState({
    checkupDate: '',
    heartRate: '',
    bloodPressure: '',
    oxygenLevel: '',
    painLevel: ''
  });

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await axiosInstance.get(`/observations/patient/${patientId}`);
        setVitals(response.data);
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
    };

    fetchVitals();
  }, [patientId]);

  const handleAddVital = async () => {
    try {
      const response = await axiosInstance.post(
        '/observations',
        {
          ...newVital,
          patientId,
          doctorId: 'D-2001' // Pass dynamically later
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setVitals([...vitals, response.data]);
      setNewVital({ checkupDate: '', heartRate: '', bloodPressure: '', oxygenLevel: '', painLevel: '' });
    } catch (error) {
      console.error('Error adding vitals:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Vitals</h2>

      {vitals.length === 0 ? (
        <p>No Vitals Found</p>
      ) : (
        <table className="w-full mb-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Heart Rate</th>
              <th className="p-2 border">Blood Pressure</th>
              <th className="p-2 border">Oxygen Level</th>
              <th className="p-2 border">Pain Level</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((v, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{v.checkupDate}</td>
                <td className="p-2 border">{v.heartRate}</td>
                <td className="p-2 border">{v.bloodPressure}</td>
                <td className="p-2 border">{v.oxygenLevel}</td>
                <td className="p-2 border">{v.painLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="space-y-2">
        <input type="date" value={newVital.checkupDate} onChange={(e) => setNewVital({ ...newVital, checkupDate: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Heart Rate" value={newVital.heartRate} onChange={(e) => setNewVital({ ...newVital, heartRate: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Blood Pressure" value={newVital.bloodPressure} onChange={(e) => setNewVital({ ...newVital, bloodPressure: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Oxygen Level" value={newVital.oxygenLevel} onChange={(e) => setNewVital({ ...newVital, oxygenLevel: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Pain Level" value={newVital.painLevel} onChange={(e) => setNewVital({ ...newVital, painLevel: e.target.value })} className="border p-2 w-full" />

        <button onClick={handleAddVital} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Vitals
        </button>
      </div>
    </div>
  );
};

export default Vitals;
