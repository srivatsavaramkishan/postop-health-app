// doctorModel.js
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  gender: String,
  age: Number,
  specialty: String,
  experience_years: Number,
  contact_email: String,
  contact_phone: String,
  hospital: String,
  location: String,
  phone_number: String,
  address: String,
  specialisedInOperations: String, // 🆕 Added field
});

module.exports = mongoose.model('Doctor', doctorSchema);
