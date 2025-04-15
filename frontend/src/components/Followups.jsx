// src/components/Followups.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Followups = ({ patientId }) => {
  const [followups, setFollowups] = useState([]);
  const [newFollowup, setNewFollowup] = useState({
    followupDate: '',
    purpose: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const response = await axiosInstance.get('/followups');
        const filtered = response.data.filter((f) => f.patientId === patientId);
        setFollowups(filtered);
      } catch (error) {
        console.error('Error fetching followups:', error);
      }
    };

    fetchFollowups();
  }, [patientId]);

  const handleAddFollowup = async () => {
    try {
      const response = await axiosInstance.post(
        '/followups',
        {
          ...newFollowup,
          patientId,
          doctorId: 'D-2001' // Replace with logged-in doctor ID later
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setFollowups([...followups, response.data]);
      setNewFollowup({ followupDate: '', purpose: '', status: 'Scheduled' });
    } catch (error) {
      console.error('Error adding followup:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Follow-up Checkups</h2>

      {followups.length === 0 ? (
        <p>No Follow-ups Found</p>
      ) : (
        <ul className="list-disc pl-5 mb-4">
          {followups.map((f, idx) => (
            <li key={idx} className="mb-2">
              <strong>Date:</strong> {f.followupDate} | <strong>Purpose:</strong> {f.purpose} | <strong>Status:</strong> {f.status}
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <input
          type="date"
          value={newFollowup.followupDate}
          onChange={(e) => setNewFollowup({ ...newFollowup, followupDate: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Purpose"
          value={newFollowup.purpose}
          onChange={(e) => setNewFollowup({ ...newFollowup, purpose: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={handleAddFollowup} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Follow-up
        </button>
      </div>
    </div>
  );
};

export default Followups;
