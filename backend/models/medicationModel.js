// medicationModel.js
const mongoose = require('mongoose');
const medicationSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: String,
  presentDate: String, // 🆕 New field
  medicationName: String,
  dosage: String,
  frequency: String,
  startDate: String,
  endDate: String,
  nextCheckupDate: String, // 🆕 New field
});

module.exports = mongoose.model('Medication', medicationSchema);