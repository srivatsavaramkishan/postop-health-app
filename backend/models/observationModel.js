const mongoose = require('mongoose');

const observationSchema = new mongoose.Schema({
  patientId: {
    type: String, // From CSV directly (Patient_ID)
    required: true,
  },
  doctorId: {
    type: String, // From CSV directly (Doctor_ID)
  },
  checkupDate: String,
  heartRate: String,
  bloodPressure: String,
  oxygenLevel: String,
  painLevel: String,
  medicationTaken: String,
  stepsTaken: String,
  symptomReport: String,
  doctorObservations: String,
  nextSteps: String,
  hospital: String,
  patientStatus: String,
});

module.exports = mongoose.model('Observation', observationSchema);
