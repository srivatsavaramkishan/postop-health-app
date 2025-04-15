const mongoose = require('mongoose');

const followupSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: String,
  followupDate: String,
  purpose: String,
  status: String,
});

module.exports = mongoose.model('Followup', followupSchema);
