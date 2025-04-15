const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  patientId: {
    type: String, // From CSV
    required: true,
  },
  medicationName: String,
  medicationType: String,
  dosage: String,
  frequency: String,
  startDate: String,
  endDate: String,
  doctorId: String,
});

module.exports = mongoose.model('Medication', medicationSchema);
