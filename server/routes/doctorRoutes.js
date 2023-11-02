const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/', doctorController.getAllDoctors);

// Post all doctors
router.post('/', doctorController.addDoctor);

module.exports = router;
