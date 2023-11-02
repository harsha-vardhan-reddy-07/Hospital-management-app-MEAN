const mongoose = require('mongoose');

const medicalPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Other medical person fields
});

module.exports = mongoose.model('MedicalPerson', medicalPersonSchema);
