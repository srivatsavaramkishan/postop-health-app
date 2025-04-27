// src/components/PatientDashboard.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import Medications from './Medications';
import Followups from './Followups';
import Vitals from './Vitals';

const PatientDashboard = () => {
  const [inputPatientId, setInputPatientId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [isDoctorAssigned, setIsDoctorAssigned] = useState(false);
  const [checkupDates, setCheckupDates] = useState([]);
  const [selectedCheckupDate, setSelectedCheckupDate] = useState('');
  const [activeSubSection, setActiveSubSection] = useState('');

  const handleLoadPatient = async () => {
    try {
      const res = await axiosInstance.get(`/patients/patient-id/${inputPatientId}`);
      setPatientInfo(res.data);
      setPatientId(inputPatientId);

      if (res.data.doctor) {
        const doctorRes = await axiosInstance.get(`/doctors/${res.data.doctor}`);
        setDoctorInfo(doctorRes.data);
        setIsDoctorAssigned(true);
      } else {
        setDoctorInfo(null);
        setIsDoctorAssigned(false);
      }

      const obsRes = await axiosInstance.get(`/observations/patient/${inputPatientId}`);
      const uniqueDates = [...new Set(obsRes.data.map(o => o.presentDate))].sort((a, b) => new Date(b) - new Date(a));
      setCheckupDates(uniqueDates);
      setSelectedCheckupDate(uniqueDates[0] || '');

    } catch (err) {
      console.error('❌ Error fetching patient or doctor data:', err);
      setPatientInfo(null);
      setDoctorInfo(null);
      setIsDoctorAssigned(false);
      setCheckupDates([]);
      setSelectedCheckupDate('');
    }
  };

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Patient Dashboard</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Patient ID (eg: P-1001)"
          value={inputPatientId}
          onChange={(e) => setInputPatientId(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleLoadPatient}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Load Patient
        </button>
      </div>

      {patientInfo && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Patient Details</h3>
            <p>Name: {patientInfo.name}</p>
            <p>Age: {patientInfo.age}</p>
            <p>Gender: {patientInfo.gender}</p>
            <p>Address: {patientInfo.address}</p>
            <p>Phone: {patientInfo.phone}</p>
            <p>Cause of Operation: {patientInfo.causeOfOperation || 'N/A'}</p>
          </div>

          {isDoctorAssigned && doctorInfo && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Doctor's Information</h3>
              <p>Doctor Name: {doctorInfo.name}</p>
              <p>Specialization: {doctorInfo.specialty}</p>
              <p>Phone: {doctorInfo.phone_number}</p>
            </div>
          )}

          {checkupDates.length > 0 && (
            <div className="mb-4">
              <label htmlFor="checkup-date" className="mr-2">Select Present Date:</label>
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

          <div className="space-x-4 mb-4">
            <button onClick={() => setActiveSubSection('medications')} className="btn">
              Medications
            </button>
            <button onClick={() => setActiveSubSection('followups')} className="btn">
              Follow-ups
            </button>
            <button onClick={() => setActiveSubSection('vitals')} className="btn">
              Vitals
            </button>
          </div>

          {activeSubSection === 'medications' && (
            <Medications patientId={patientId} checkupDate={selectedCheckupDate} canEdit={false} />
          )}
          {activeSubSection === 'followups' && (
            <Followups patientId={patientId} checkupDate={selectedCheckupDate} canEdit={false} />
          )}
          {activeSubSection === 'vitals' && (
            <Vitals patientId={patientId} checkupDate={selectedCheckupDate} canEdit={false} />
          )}
        </>
      )}
    </section>
  );
};

export default PatientDashboard;