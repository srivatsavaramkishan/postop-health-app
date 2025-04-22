// src/components/Followups.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Followups = ({ patientId, checkupDate, canEdit }) => {
  const [followups, setFollowups] = useState([]);
  const [newFollowup, setNewFollowup] = useState({
    followupDate: checkupDate,
    purpose: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const res = await axiosInstance.get('/followups');
        const filtered = res.data.filter(f => f.patientId === patientId && f.followupDate === checkupDate);
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
          doctorId: 'D00045'
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setFollowups([...followups, res.data]);
      setNewFollowup({ followupDate: checkupDate, purpose: '', status: 'Scheduled' });
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
        <ul className="list-disc pl-5 mb-4">
          {followups.map((f, idx) => (
            <li key={idx} className="mb-2">
              <strong>Date:</strong> {f.followupDate} | <strong>Purpose:</strong> {f.purpose} | <strong>Status:</strong> {f.status}
            </li>
          ))}
        </ul>
      )}

      {canEdit && (
        <div className="space-y-2">
          <input type="text" placeholder="Purpose" value={newFollowup.purpose} onChange={(e) => setNewFollowup({ ...newFollowup, purpose: e.target.value })} className="border p-2 w-full" />
          <select value={newFollowup.status} onChange={(e) => setNewFollowup({ ...newFollowup, status: e.target.value })} className="border p-2 w-full">
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Missed">Missed</option>
          </select>
          <button onClick={handleAddFollowup} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Follow-up
          </button>
        </div>
      )}
    </div>
  );
};

export default Followups;
