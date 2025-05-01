const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const Patient = require('../models/patientModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const filePath = path.join(__dirname, '../data/Cleaned_Patient_Data_3000_Without_Specialty_Experience.csv');
const patients = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    patients.push(row);
  })
  .on('end', async () => {
    for (const row of patients) {
      try {
        const patientData = {
          patientId: row.Patient_ID,
          prefix: row.PREFIX,
          first: row.FIRST,
          middle: row.MIDDLE,
          last: row.LAST,
          name: `${row.FIRST} ${row.MIDDLE} ${row.LAST}`,
          gender: row.GENDER,
          birthDate: row.BIRTHDATE,
          age: row.AGE,
          marital: row.MARITAL,
          state: row.STATE,
          fips: row.FIPS,
          phone: row.PHONE_NO,
          drivers: row.DRIVERS,
          suffix: row.SUFFIX,
          race: row.RACE,
          deathDate: row.DEATHDATE,
          healthcareExpenses: row.HEALTHCARE_EXPENSES,
          income: row.INCOME,
          birthplace: row.BIRTHPLACE,
          ssn: row.SSN,
          passport: row.PASSPORT,
          ethnicity: row.ETHNICITY,
          healthcareCoverage: row.HEALTHCARE_COVERAGE,
          address: row.Address,
          doctor: row.Doctor_ID, // ✅ Store Doctor_ID directly
        };

        await Patient.findOneAndUpdate(
          { patientId: patientData.patientId },
          patientData,
          { upsert: true, new: true }
        );

        console.log(`✅ Imported patient ${patientData.patientId}`);
      } catch (err) {
        console.error(`❌ Failed to import patient ${row.Patient_ID}:`, err.message);
      }
    }

    console.log('✅ All patients imported.');
    mongoose.connection.close();
  });
