// importObservations.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Observation = require('../models/observationModel');

dotenv.config();

const importObservations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const observations = await csv().fromFile('./data/Formatted_Vitals_Data.csv');

    const formattedObservations = observations.map((obs) => ({
      patientId: obs.Patient_ID,
      doctorId: obs.Doctor_ID,
      presentDate: obs.Present_Date,
      heartRate: obs.Heart_Rate,
      bloodPressure: obs.Blood_Pressure,
      oxygenLevel: obs.Oxygen_Level,
      painLevel: obs.Pain_Level,
      medicationTaken: obs.Medication_Taken,
      stepsTaken: obs.Steps_Taken,
      symptomReport: obs.Symptom_Report,
      doctorObservations: obs.Doctor_Observations,
      nextSteps: obs.Next_Steps,
    }));

    await Observation.insertMany(formattedObservations);
    console.log('✅ Observations Imported Successfully!');
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error('❌ Error importing observations:', error);
    process.exit(1);
  }
};

importObservations();
