const express = require('express');
const {
  getObservationsByPatient,
  addObservation,
  updateObservation
} = require('../controllers/observationController');

const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Public - Get Observations (Vitals) of Patient
router.get('/patient/:patientId', getObservationsByPatient);

// Doctor or Patient - Add Observation (Vitals)
router.post('/', roleMiddleware(['Doctor', 'Patient']), addObservation);

// Patient Only - Update Vitals (Own Data)
router.put('/:id', roleMiddleware(['Patient']), updateObservation);

module.exports = router;
