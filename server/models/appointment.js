const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    ref: 'Patient',
    required: true,
  },
  
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    // required: true,
  },
  
  
  doctor: {
    type: String,
    ref: 'Doctor',
    required: true,
  },
  
  
  timeSlot: {
    type: Date,
    required: true,
  },
  // approved: {
  //   type: Boolean,
  //   default: false,
  // },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  meetingDetails: {
    type: String,
  },
  // Other appointment fields
});

module.exports = mongoose.model('Appointment', appointmentSchema);
