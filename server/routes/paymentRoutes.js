const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all payments
router.get('/', paymentController.getAllPayments);

// Make a payment for a prescription
router.post('/:prescriptionId/payments', paymentController.makePayment);


module.exports = router;
