const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    id_doctor: { type: String, required: true, unique: true },
    doctor_name: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
