const express = require('express');
const { getFollowupsByPatient, addFollowup } = require('../controllers/followupController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Public - Get Follow-ups of Patient
router.get('/patient/:patientId', getFollowupsByPatient);

// Doctor Only - Add Follow-up
router.post('/', roleMiddleware(['Doctor']), addFollowup);

module.exports = router;
