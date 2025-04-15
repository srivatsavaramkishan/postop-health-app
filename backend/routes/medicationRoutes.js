const express = require('express');
const router = express.Router();
const { addMedication, getAllMedications } = require('../controllers/medicationController');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public Read API
router.get('/', getAllMedications);

// Protected API - Only Doctor
router.post('/', roleMiddleware, addMedication);

module.exports = router;
