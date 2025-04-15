// src/components/DoctorProfile.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const DoctorProfile = ({ doctorId }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/doctors/${doctorId}`);
        setDoctor(res.data);
      } catch (err) {
        console.error('Error fetching doctor profile', err);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Doctor Profile</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Doctor Profile</h2>
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Experience Years:</strong> {doctor.experience_years}</p>
      <p><strong>Hospital:</strong> {doctor.hospital}</p>
      <p><strong>Location:</strong> {doctor.location}</p>
      <p><strong>Contact Email:</strong> {doctor.contact_email}</p>
      <p><strong>Phone Number:</strong> {doctor.contact_phone}</p>
    </div>
  );
};

export default DoctorProfile;
