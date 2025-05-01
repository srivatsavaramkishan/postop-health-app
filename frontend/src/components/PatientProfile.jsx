// src/components/PatientProfile.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'
import Medications from './Medications';
import Followups from './Followups';
import Vitals from './Vitals';

const PatientProfile = ({ patientId, role }) => {
  const [patient, setPatient] = useState(null);
  const [checkupDates, setCheckupDates] = useState([]);
  const [selectedCheckupDate, setSelectedCheckupDate] = useState('');
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axiosInstance.get(`/patients/patient-id/${patientId}`);
        setPatient(profileRes.data);

        const obsRes = await axiosInstance.get(`/observations/patient/${patientId}`);
        const uniqueDates = [...new Set(obsRes.data.map(o => o.checkupDate))].sort((a, b) => new Date(b) - new Date(a));
        setCheckupDates(uniqueDates);
        setSelectedCheckupDate(uniqueDates[0] || '');
      } catch (error) {
        console.error('Error loading patient profile:', error);
      }
    };

    fetchData();
  }, [patientId]);

  useEffect(() => {
    setCanEdit(role === 'doctor');
  }, [role]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>

      {patient && (
        <div className="mb-6">
          <h3 className="font-semibold">Patient Demographics</h3>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Patient ID:</strong> {patient.patientId}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
        </div>
      )}

      {checkupDates.length > 0 && (
        <div className="mb-4">
          <label htmlFor="checkup-date" className="mr-2">Select Checkup Date:</label>
          <select
            id="checkup-date"
            value={selectedCheckupDate}
            onChange={(e) => setSelectedCheckupDate(e.target.value)}
            className="border p-2"
          >
            {checkupDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Medications</h3>
        <Medications patientId={patientId} checkupDate={selectedCheckupDate} canEdit={canEdit} />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Follow-up Checkups</h3>
        <Followups patientId={patientId} checkupDate={selectedCheckupDate} canEdit={canEdit} />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Vitals</h3>
        <Vitals patientId={patientId} checkupDate={selectedCheckupDate} canEdit={canEdit} />
      </div>
    </div>
  );
};

export default PatientProfile;
