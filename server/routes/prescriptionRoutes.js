const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Get all prescriptions
router.get('/', prescriptionController.getAllPrescriptions);


// Get prescriptions by patient ID
router.get('/:patientId', prescriptionController.getPrescriptionsByPatientId);


// Create prescriptions
router.post('/', prescriptionController.createPrescription);

// Route to get prescriptions by patient name
router.get('/patient/name/:patientName', prescriptionController.getPrescriptionsByPatientName);


module.exports = router;
