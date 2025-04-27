// importMedications.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Medication = require('../models/medicationModel');

dotenv.config();

const importMedications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const medications = await csv().fromFile('./data/Formatted_Medication_Data.csv');

    const formattedMedications = medications.map((med) => ({
      patientId: med.Patient_ID,
      doctorId: med.Doctor_ID,
      presentDate: med.Present_Date,
      medicationName: med.Medication,
      dosage: med.Dosage,
      frequency: med.Frequency,
      startDate: med.Start_Date,
      endDate: med.End_Date,
      nextCheckupDate: med.Next_Checkup_Date,
    }));

    await Medication.insertMany(formattedMedications);
    console.log('✅ Medications Imported Successfully!');
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error('❌ Error importing medications:', error);
    process.exit(1);
  }
};

importMedications();