const MedicalPerson = require('../models/medicalperson');

// Get all medical personnel
exports.getAllMedicalPersonnel = (req, res) => {
  MedicalPerson.find({}, (err, medicalPersonnel) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch medical personnel' });
    }
    return res.json(medicalPersonnel);
  });
};
