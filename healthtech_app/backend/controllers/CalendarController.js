const Appointment = require('../models/Appointment');

// Get all appointments for the authenticated user
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const newAppointment = new Appointment({
      user: req.user.id,
      title,
      date,
      description,
    });

    await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    // Ensure the appointment belongs to the user
    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const { title, date, description } = req.body;
    appointment.title = title || appointment.title;
    appointment.date = date || appointment.date;
    appointment.description = description || appointment.description;

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await appointment.remove();
    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
