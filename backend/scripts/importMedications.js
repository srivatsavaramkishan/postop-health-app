const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Medication = require('../models/medicationModel');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const importMedications = async () => {
  try {
    const medications = await csv().fromFile('data/Final_Medication_Data_3000_Patients.csv');

    const formattedMedications = medications.map((med) => ({
      patientId: med.Patient_ID,
      doctorId: med.Doctor_ID,
      medicationName: med.Medication, // ✅ FIXED: this matches your actual CSV column
      medicationType: med.Medication_Type,
      dosage: med.Dosage,
      frequency: med.Frequency,
      startDate: med.Start_Date,
      endDate: med.End_Date,
    }));

    await Medication.insertMany(formattedMedications);
    console.log('✅ Medications Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing medications:', error);
    process.exit(1);
  }
};

importMedications();
