// observationModel.js
const mongoose = require('mongoose');
const observationSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: String,
  presentDate: String, // 🆕 replaces checkupDate
  heartRate: String,
  bloodPressure: String,
  oxygenLevel: String,
  painLevel: String,
  medicationTaken: String,
  stepsTaken: String,
  symptomReport: String,
  doctorObservations: String,
  nextSteps: String,
});

module.exports = mongoose.model('Observation', observationSchema);