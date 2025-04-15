import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Followups from './Followups';

const PatientProfile = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [vitals, setVitals] = useState([]);

  const [newMedication, setNewMedication] = useState({
    medicationName: '',
    medicationType: '',
    dosage: '',
    frequency: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(`/api/patients/patient-id/${patientId}`);
        const medsRes = await axios.get(`/api/medications?patientId=${patientId}`);
        const vitalsRes = await axios.get(`/api/observations/patient/${patientId}`);

        setPatient(profileRes.data);
        setMedications(medsRes.data);
        setVitals(vitalsRes.data);
      } catch (error) {
        console.error('Error loading patient data:', error);
      }
    };

    fetchData();
  }, [patientId]);

  const handleAddMedication = async () => {
    try {
      const res = await axios.post(
        '/api/medications',
        {
          ...newMedication,
          patientId,
          doctorId: 'D-2001' // Dynamic later
        },
        {
          headers: {
            'x-user-role': 'doctor',
            'Content-Type': 'application/json'
          }
        }
      );
      setMedications([...medications, res.data]);
      setNewMedication({ medicationName: '', medicationType: '', dosage: '', frequency: '' });
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

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

      {/* Medications Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Medications</h3>
        <table className="w-full mb-2 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Dosage</th>
              <th className="p-2 border">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index}>
                <td className="p-2 border">{med.medicationName}</td>
                <td className="p-2 border">{med.medicationType}</td>
                <td className="p-2 border">{med.dosage}</td>
                <td className="p-2 border">{med.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Medication Form */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Medication Name"
            className="border p-2 w-full"
            value={newMedication.medicationName}
            onChange={(e) => setNewMedication({ ...newMedication, medicationName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Medication Type"
            className="border p-2 w-full"
            value={newMedication.medicationType}
            onChange={(e) => setNewMedication({ ...newMedication, medicationType: e.target.value })}
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
          <button onClick={handleAddMedication} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Medication
          </button>
        </div>
      </div>

      {/* Vitals Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Vitals</h3>
        <table className="w-full border">
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
            {vitals.map((v, index) => (
              <tr key={index}>
                <td className="p-2 border">{v.checkupDate}</td>
                <td className="p-2 border">{v.heartRate}</td>
                <td className="p-2 border">{v.bloodPressure}</td>
                <td className="p-2 border">{v.oxygenLevel}</td>
                <td className="p-2 border">{v.painLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Followups Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Follow-up Checkups</h3>
        <Followups patientId={patientId} />
      </div>
    </div>
  );
};

export default PatientProfile;