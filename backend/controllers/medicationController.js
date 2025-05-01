const Medication = require('../models/medicationModel');

// Get all medications of a specific patient
const getMedicationsByPatient = async (req, res) => {
  try {
    const medications = await Medication.find({ patientId: req.params.patientId });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new medication (Doctor Only)
const addMedication = async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMedicationsByPatient, addMedication, getAllMedications };

