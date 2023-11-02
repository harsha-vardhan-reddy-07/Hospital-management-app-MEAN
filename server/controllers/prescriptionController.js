const Prescription = require('../models/prescription');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().exec();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Failed to fetch prescriptions:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};


// Create a new prescription
// exports.createPrescription = (req, res) => {
//     const { patient, doctor, medication, dosage } = req.body;
  
//     // Logic to validate and create the prescription
//     // Here, you can perform any necessary checks, such as checking if the patient and doctor exist.
  
//     const newPrescription = new Prescription({ patient, doctor, medication, dosage });
  
//     newPrescription
//       .save()
//       .then(prescription => {
//         return res.status(201).json(prescription);
//       })
//       .catch(err => {
//         console.error(err);
//         return res.status(500).json({ error: 'Failed to create prescription' });
//       });
//   };
  // Create a new prescription
exports.createPrescription = async (req, res) => {
  const { patientName, doctorName, medication, dosage } = req.body;

  try {
    // Fetch patient ID based on name
    const patient = await Patient.findOne({ patient: patientName });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Fetch doctor ID based on name
    const doctor = await Doctor.findOne({ doctor: doctorName });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const newPrescription = new Prescription({ patient: patient._id, doctor: doctor._id, medication, dosage });

    const savedPrescription = await newPrescription.save();

    return res.status(201).json(savedPrescription);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create prescription' });
  }
};
  
  
// Get prescriptions by patient ID
exports.getPrescriptionsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await Prescription.find({ patient: patientId }).exec();
    return res.json(prescriptions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};


// Get prescriptions by patient name
exports.getPrescriptionsByPatientName = async (req, res) => {
  try {
    const { patientName } = req.params;
    const patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const prescriptions = await Prescription.find({ patient: patient._id }).exec();
    return res.json(prescriptions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};