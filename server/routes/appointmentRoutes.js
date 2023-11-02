const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { approveAppointment } = require('../controllers/approveAppointment');

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Get appointments by patient Id
router.get('/:patientId', appointmentController.getAppointmentsByPatientId);




router.get('/doctor/:doctorName', appointmentController.getAppointmentsByDoctorName);


// Book a new appointment
router.post('/', appointmentController.bookAppointment);

// Route for approving appointments by doctors
router.put('/:appointmentId/approve', approveAppointment);


module.exports = router;
