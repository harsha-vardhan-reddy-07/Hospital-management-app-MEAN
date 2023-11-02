const Patient = require('../models/patient');

// Get all patients
const getAllPatients = (req, res) => {
  // Logic to retrieve all patients from the database
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Add a new patient
const addPatient = (req, res) => {
  // Logic to add a new patient to the database
  const { name, age, gender, contact } = req.body;
  const newPatient = new Patient({ name, age, gender, contact });
  newPatient
    .save()
    .then(patient => res.status(201).json(patient))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Get patient by ID
const getPatientById = (req, res) => {
  // Logic to retrieve a patient by ID from the database
  const { id } = req.params;
  Patient.findById(id)
    .then(patient => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Update patient by ID
const updatePatientById = (req, res) => {
  // Logic to update a patient by ID in the database
  const { id } = req.params;
  const { name, age, gender, contact } = req.body;
  Patient.findByIdAndUpdate(id, { name, age, gender, contact }, { new: true })
    .then(patient => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Delete patient by ID
const deletePatientById = (req, res) => {
  // Logic to delete a patient by ID from the database
  const { id } = req.params;
  Patient.findByIdAndDelete(id)
    .then(patient => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json({ message: 'Patient deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = {
  getAllPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletePatientById
};
