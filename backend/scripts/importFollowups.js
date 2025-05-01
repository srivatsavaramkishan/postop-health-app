// importFollowups.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Followup = require('../models/followupModel');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const importFollowups = async () => {
  try {
    const followups = await csv().fromFile('./data/Final_Corrected_Followup_Data_3000_Patients.csv');

    const formattedFollowups = followups.map((f) => ({
      patientId: f.Patient_ID,
      doctorId: f.Doctor_ID,
      causeOfOperation: f['Cause of Operation'],
      presentDate: f.Present_Date,
      purpose: f.Purpose,
      status: f.Status,
      nextCheckupDate: f.Next_Checkup_Date,
    }));

    await Followup.insertMany(formattedFollowups);
    console.log('✅ Followups Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing followups:', error);
    process.exit(1);
  }
};

importFollowups();