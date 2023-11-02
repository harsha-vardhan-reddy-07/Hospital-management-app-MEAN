const express = require('express');
const router = express.Router();
const medicalPersonController = require('../controllers/medicalPersonController');

// Get all medical personnel
router.get('/', medicalPersonController.getAllMedicalPersonnel);

module.exports = router;
