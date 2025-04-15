const Followup = require('../models/followupModel');

// Get all follow-ups of a specific patient
const getFollowupsByPatient = async (req, res) => {
  try {
    const followups = await Followup.find({ patientId: req.params.patientId });
    res.json(followups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new follow-up (Doctor Only)
const addFollowup = async (req, res) => {
  try {
    const newFollowup = new Followup(req.body);
    await newFollowup.save();
    res.status(201).json(newFollowup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFollowupsByPatient, addFollowup };
