const express = require('express');
const router = express.Router();
const { getAllPatients, getPatientById, getPatientByPatientId } = require('../controllers/patientController');



// Public Access → All Roles
router.get('/patient-id/:patientId', getPatientByPatientId);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);


module.exports = router;
