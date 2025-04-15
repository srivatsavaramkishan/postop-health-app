const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  birthDate: String,
  age: String,
  address: String,
  phone: String,
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
});

module.exports = mongoose.model('Patient', patientSchema);
