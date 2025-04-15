const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Observation = require('../models/observationModel');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const importObservations = async () => {
  try {
    const observations = await csv().fromFile('data/Patients_with_Updated_Observations_and_Steps.csv');

    const formattedObservations = observations.map((obs) => ({
      patientId: obs.Patient_ID,
      doctorId: obs.Doctor_ID,
      checkupDate: obs.Checkup_Date,
      heartRate: obs.Heart_Rate,
      bloodPressure: obs.Blood_Pressure,
      oxygenLevel: obs.Oxygen_Level,
      painLevel: obs.Pain_Level,
      medicationTaken: obs.Medication_Taken,
      stepsTaken: obs.Steps_Taken,
      symptomReport: obs.Symptom_Report,
      doctorObservations: obs.Doctor_Observations,
      nextSteps: obs.Next_Steps,
      hospital: obs.Hospital,
      patientStatus: obs.Patient_Status,
    }));

    await Observation.insertMany(formattedObservations);
    console.log('Observations Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing observations:', error);
    process.exit(1);
  }
};

importObservations();
