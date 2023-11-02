const Doctor = require('../models/doctor');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    return res.json(doctors);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch doctors' });
  }

};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    return res.json(appointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

// Add a new doctor

exports.addDoctor = (req, res) => {
    // Logic to add a new doctor to the database
    const { name, specialization, contact } = req.body;
    const newDoctor = new Doctor({ name, specialization, contact });
    newDoctor
      .save()
      .then(doctor => res.status(201).json(doctor))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  

// Update doctor by ID
exports.updateDoctorById = (req, res) => {
  const { id } = req.params;
  const { name, specialization, contact } = req.body;
  Doctor.findByIdAndUpdate(id, { name, specialization, contact }, { new: true }, (err, doctor) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update doctor' });
    }
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json(doctor);
  });
};

// Delete doctor by ID
exports.deleteDoctorById = (req, res) => {
  const { id } = req.params;
  Doctor.findByIdAndDelete(id, (err, doctor) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete doctor' });
    }
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json({ message: 'Doctor deleted successfully' });
  });
};
