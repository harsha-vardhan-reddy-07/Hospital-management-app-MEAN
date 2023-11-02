const Appointment = require('../models/appointment');

exports.approveAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);

    // Rest of the code...

    // Update the appointment as approved
    // appointment.approved = true;
    appointment.status = 'approved';
    await appointment.save();

    return res.json(appointment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to approve appointment' });
  }
};
