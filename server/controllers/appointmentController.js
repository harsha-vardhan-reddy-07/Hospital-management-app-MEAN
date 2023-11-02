const Appointment = require('../models/appointment');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    return res.json(appointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};


// Get appointments by patient ID
exports.getAppointmentsByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
      const appointments = await Appointment.find({ patient: patientId });
      return res.json(appointments);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  };
  
  
// Get appointments by doctor name
exports.getAppointmentsByDoctorName = async (req, res) => {
  try {
    const { doctorName } = req.params;
    const appointments = await Appointment.find({ doctor: doctorName });
    return res.json(appointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};


// Book a new appointment
exports.bookAppointment = (req, res) => {
  const { name, doctor, timeSlot } = req.body;

  // Logic to validate and book the appointment
  // Here, you can perform any necessary checks, such as checking if the patient and doctor exist and if the appointment slot is available.
  // Once the validation is done, you can create a new appointment and save it to the database.

  const newAppointment = new Appointment({ name, doctor, timeSlot });

  newAppointment
    .save()
    .then(appointment => {
      return res.status(201).json(appointment);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to book appointment' });
    });
};
