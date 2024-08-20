const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

module.exports = function(io) {
    router.post('/notificationss/user/accepted/:id', async (req, res) => {
        try {
            const _id = req.params.id;
            const notification = await Notification.findById({ _id });
            if (notification) {
                notification.status = 'accepted';
                await notification.save();
                if (notification && notification.email) {
                    io.to(notification.email).emit('receiveNotification', notification);
                } else {
                    console.error("Notification or email is missing");
                }
                res.json({ message: 'Appointment accepted', notification });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error accepting appointment', error });
        }
    });

    router.post('/notificationss/user/canceled/:id', async (req, res) => {
        try {
            const _id = req.params.id;
            const notification = await Notification.findById({ _id });
            if (notification) {
                notification.status = 'cancelled';
                await notification.save();
                if (notification && notification.email) {
                    io.to(notification.email).emit('receiveNotification', notification);
                } else {
                    console.error("Notification or email is missing");
                }
                res.json({ message: 'Appointment cancelled', notification });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error cancelling appointment', error });
        }
    });

    router.get('/notificationss/user/:email', async (req, res) => {
        try {
            const email = req.params.email;
            const notifications = await Notification.find({ email });

            if (notifications.length > 0) {
                res.json(notifications);
            } else {
                res.status(404).json({ message: 'No notifications found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching notifications', error });
        }
    });

    router.post('/notificationss/user', async (req, res) => {
        const { email, message, status } = req.body;

        try {
            const notifications = new Notification({ email, message, status });
            const newNotifications = await notifications.save();
            res.status(201).json(newNotifications);
        } catch (error) {
            res.status(500).json({ message: 'Error adding notifications', error });
        }
    });

    return router;
};
