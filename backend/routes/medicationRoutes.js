const express = require('express');
const router = express.Router();
const { getMedicationsByPatient, addMedication, getAllMedications } = require('../controllers/medicationController');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public Read API
router.get('/', getAllMedications);

// Protected API - Only Doctor
router.post('/', roleMiddleware, addMedication);

// ✅ Add this line:
router.get('/patient/:patientId', getMedicationsByPatient);

module.exports = router;
