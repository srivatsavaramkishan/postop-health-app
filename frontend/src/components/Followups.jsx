// ✅ Followups.jsx — properly shows all fields including Present_Date and Cause of Operation
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Followups = ({ patientId, checkupDate, canEdit }) => {
  const [followups, setFollowups] = useState([]);
  const [newFollowup, setNewFollowup] = useState({
    causeOfOperation: '',
    purpose: '',
    status: 'Scheduled',
    nextCheckupDate: ''
  });

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const res = await axiosInstance.get(`/followups/patient/${patientId}`);
        const filtered = res.data.filter(f => f.presentDate === checkupDate);
        setFollowups(filtered);
      } catch (err) {
        console.error('❌ Error fetching followups:', err);
      }
    };
    fetchFollowups();
  }, [patientId, checkupDate]);

  const handleAddFollowup = async () => {
    try {
      const res = await axiosInstance.post(
        '/followups',
        {
          ...newFollowup,
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
      setFollowups([...followups, res.data]);
      setNewFollowup({ causeOfOperation: '', purpose: '', status: 'Scheduled', nextCheckupDate: '' });
    } catch (err) {
      console.error('❌ Error adding followup:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">🔁 Follow-up Checkups</h2>

      {followups.length === 0 ? (
        <p>No Follow-ups Found for {checkupDate}</p>
      ) : (
        <table className="w-full mb-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Cause of Operation</th>
              <th className="p-2 border">Present Date</th>
              <th className="p-2 border">Purpose</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Next Checkup Date</th>
            </tr>
          </thead>
          <tbody>
            {followups.map((f, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{f.causeOfOperation}</td>
                <td className="p-2 border">{f.presentDate}</td>
                <td className="p-2 border">{f.purpose}</td>
                <td className="p-2 border">{f.status}</td>
                <td className="p-2 border">{f.nextCheckupDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {canEdit && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Cause of Operation"
            className="border p-2 w-full"
            value={newFollowup.causeOfOperation}
            onChange={(e) => setNewFollowup({ ...newFollowup, causeOfOperation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Purpose"
            className="border p-2 w-full"
            value={newFollowup.purpose}
            onChange={(e) => setNewFollowup({ ...newFollowup, purpose: e.target.value })}
          />
          <input
            type="text"
            placeholder="Next Checkup Date"
            className="border p-2 w-full"
            value={newFollowup.nextCheckupDate}
            onChange={(e) => setNewFollowup({ ...newFollowup, nextCheckupDate: e.target.value })}
          />
          <select
            value={newFollowup.status}
            onChange={(e) => setNewFollowup({ ...newFollowup, status: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Missed">Missed</option>
          </select>
          <button
            onClick={handleAddFollowup}
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Follow-up
          </button>
        </div>
      )}
    </div>
  );
};

export default Followups;