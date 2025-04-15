const csv = require('csvtojson');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/database');
const Patient = require('../models/patientModel');

const filePath = 'data/Final_Patient_Dataset_with_All_Fields_Filled.csv';

const importPatients = async () => {
  try {
    await connectDB();

    const patients = await csv().fromFile(filePath);

    const formattedPatients = patients.map((p) => ({
      name: `${p.FIRST} ${p.MIDDLE} ${p.LAST}`.trim(),
      patientId: p.Patient_ID,
      gender: p.GENDER,
      birthDate: p.BIRTHDATE,
      age: p.AGE,
      address: p.ADDRESS,
      phone: p.PHONE_NO,
      doctor: null, // Assign doctor _id later if available
    }));

    await Patient.insertMany(formattedPatients);

    console.log('Patients Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing patients:', error);
    process.exit(1);
  }
};

importPatients();
