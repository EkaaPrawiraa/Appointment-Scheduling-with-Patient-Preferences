const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'cancelled'], default: 'pending' }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notifications', notificationSchema);

module.exports = Notification;
