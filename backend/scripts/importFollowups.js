const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csv = require('csvtojson');
const Followup = require('../models/followupModel');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const importFollowups = async () => {
  try {
    const followups = await csv().fromFile('data/Updated_Followups__200_Patients_.csv');

    const formattedFollowups = followups.map((f) => ({
      patientId: f.Patient_ID,
      doctorId: f.Doctor_ID,
      followupDate: f.Followup_Date,
      purpose: f.Purpose,
      status: f.Status,
    }));

    await Followup.insertMany(formattedFollowups);
    console.log('Followups Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing followups:', error);
    process.exit(1);
  }
};

importFollowups();
