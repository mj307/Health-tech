const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/CalendarController');
// const auth = require('../middleware/auth');

router.get('/', /*auth,*/ calendarController.getAppointments);
router.post('/', /*auth,*/ calendarController.createAppointment);
router.put('/:id', /*auth,*/ calendarController.updateAppointment);
router.delete('/:id', /*auth,*/ calendarController.deleteAppointment);

module.exports = router;
