const express = require('express');
const {
  getAllDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Public - Get All Doctors
router.get('/', getAllDoctors);

// Public - Get Doctor by ID
router.get('/:id', getDoctorById);

// Doctor Only - Create, Update, Delete
router.post('/', roleMiddleware(['Doctor']), addDoctor);
router.put('/:id', roleMiddleware(['Doctor']), updateDoctor);
router.delete('/:id', roleMiddleware(['Doctor']), deleteDoctor);

module.exports = router;
