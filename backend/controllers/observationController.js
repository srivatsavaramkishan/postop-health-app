const Observation = require('../models/observationModel');

// Get all observations of a specific patient
const getObservationsByPatient = async (req, res) => {
  try {
    const observations = await Observation.find({ patientId: req.params.patientId });
    res.json(observations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new observation (Vitals) → Doctor or Patient
const addObservation = async (req, res) => {
  try {
    const newObservation = new Observation(req.body);
    await newObservation.save();
    res.status(201).json(newObservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update existing observation (Vitals) → Patient Only
const updateObservation = async (req, res) => {
  try {
    const updatedObservation = await Observation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedObservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getObservationsByPatient, addObservation, updateObservation };
