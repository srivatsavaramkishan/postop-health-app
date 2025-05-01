import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const DoctorProfile = ({ doctorId }) => {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/doctors/${doctorId}`);
        console.log("✅ Doctor data fetched:", res.data);
        setDoctor(res.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching doctor:', err);
        setDoctor(null);
        setError('Doctor not found or error fetching data.');
      }
    };

    fetchDoctor();
  }, [doctorId]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Doctor Profile</h2>

      {error && <p className="text-red-500">{error}</p>}

      {!doctor && !error && <p>Loading...</p>}

      {doctor && (
        <div className="space-y-2">
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Experience Years:</strong> {doctor.experience_years}</p>
          <p><strong>Hospital:</strong> {doctor.hospital}</p>
          <p><strong>Location:</strong> {doctor.location}</p>
          <p><strong>Contact Email:</strong> {doctor.contact_email}</p>
          <p><strong>Contact Phone:</strong> {doctor.contact_phone}</p>
          <p><strong>Phone Number:</strong> {doctor.phone_number}</p>
          <p><strong>Address:</strong> {doctor.address}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
