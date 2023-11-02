const Payment = require('../models/payment');
const Prescription = require('../models/prescription');

// Get all payments
exports.getAllPayments = (req, res) => {
  Payment.find({}, (err, payments) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch payments' });
    }
    return res.json(payments);
  });
};



exports.makePayment = async (req, res) => {
  try {
    const { patient, prescription, amount, status } = req.body;

    // Check if the prescription exists
    const foundPrescription = await Prescription.findById(prescription);
    if (!foundPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    // Create a new payment
    const newPayment = new Payment({
      patient: patient,
      prescription: foundPrescription,
      amount,
      status,
    });

    // Save the payment
    await newPayment.save();

    return res.status(201).json(newPayment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to make payment' });
  }
};
