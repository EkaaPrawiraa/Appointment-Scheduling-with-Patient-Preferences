const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const appointmentSchema = new mongoose.Schema({
    appointmentId: { type: Number },
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    time_start: { type: String, required: true },
    time_end: { type: String, required: true },
});

appointmentSchema.plugin(AutoIncrement, { inc_field: 'appointmentId' });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
