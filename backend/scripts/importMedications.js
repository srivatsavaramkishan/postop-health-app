const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Medication = require('../models/medicationModel');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const importMedications = async () => {
  try {
    const medications = await csv().fromFile('data/Synced_Medications__Final_.csv');

    const formattedMedications = medications.map((med) => ({
      patientId: med.Patient_ID,
      medicationName: med.Medication_Name,
      medicationType: med.Medication_Type,
      dosage: med.Dosage,
      frequency: med.Frequency,
      startDate: med.Start_Date,
      endDate: med.End_Date,
      doctorId: med.Doctor_ID,
    }));

    await Medication.insertMany(formattedMedications);
    console.log('Medications Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing medications:', error);
    process.exit(1);
  }
};

importMedications();
