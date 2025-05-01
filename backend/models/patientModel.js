// patientModel.js
const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true
  },
  prefix: String,
  first: String,
  middle: String,
  last: String,
  name: String,
  gender: String,
  birthDate: String,
  age: String,
  marital: String,
  state: String,
  fips: String,
  phone: String,
  drivers: String,
  suffix: String,
  race: String,
  deathDate: String,
  healthcareExpenses: String,
  income: String,
  birthplace: String,
  ssn: String,
  passport: String,
  ethnicity: String,
  healthcareCoverage: String,
  address: String,
  causeOfOperation: String, // 🆕 New field
  doctor: String, // Doctor_ID
});

module.exports = mongoose.model('Patient', patientSchema);