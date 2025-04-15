const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csvtojson = require('csvtojson');
const Doctor = require('../models/doctorModel');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const importDoctors = async () => {
  try {
    const doctors = await csvtojson().fromFile('./data/Doctors_with_Updated_Contact_Details.csv');

    const formattedDoctors = doctors.map((doc) => ({
      doctor_id: doc['Doctor_ID'],
      name: `${doc['First_Name']} ${doc['Middle_Name']} ${doc['Last_Name']}`.trim(),
      gender: doc['Gender'],
      age: doc['Age'],
      specialty: doc['Specialty'],
      experience_years: doc['Experience_Years'],
      contact_email: doc['Contact_Email'],
      contact_phone: doc['Contact_Phone'],
      hospital: doc['Hospital'],
      location: doc['Location'],
      phone_number: doc['Phone_Number'],
      address: doc['Address'],
    }));

    await Doctor.insertMany(formattedDoctors);
    console.log('Doctors Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing doctors:', error);
    process.exit(1);
  }
};

importDoctors();
