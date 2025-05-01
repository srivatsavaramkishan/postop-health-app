// followupModel.js
const mongoose = require('mongoose');
const followupSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: String,
  causeOfOperation: String, // 🆕 New field
  presentDate: String, // 🆕 replaces old followupDate
  purpose: String,
  status: String,
  nextCheckupDate: String, // 🆕 New field
});

module.exports = mongoose.model('Followup', followupSchema);