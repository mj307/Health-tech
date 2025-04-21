const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/CalendarController');
// const auth = require('../middleware/auth');

// 🤖 Dummy user middleware
router.use((req, res, next) => {
    req.user = { id: 'YOUR_TEST_USER_ID' }; 
    next();
  });

router.get('/Appointments', /*auth,*/ calendarController.getAppointments);
router.post('/createAppointments', /*auth,*/ calendarController.createAppointment);
router.put('/addAppointments/:id', /*auth,*/ calendarController.updateAppointment);
router.delete('/deleteAppointments/:id', /*auth,*/ calendarController.deleteAppointment);

module.exports = router;
