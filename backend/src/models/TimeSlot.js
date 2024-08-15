const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    id_time_slot: { type: String, required: true, unique: true },
    time_start: { type: Date, required: true },
    time_end: { type: Date, required: true }
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
module.exports = TimeSlot;
