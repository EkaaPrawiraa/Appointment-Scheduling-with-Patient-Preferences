const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

module.exports = function(io) {
    router.post('/notificationss/user/accepted/:email', async (req, res) => {
        try {
            const email = req.params.email;
            
            const notifications = await Notification.find({ email });
            if (notifications.length > 0) {
                await Promise.all(notifications.map(async (notification) => {
                    notification.status = 'accepted';
                    await notification.save();
                    io.to(notification.email).emit('receiveNotification', notification);
                }));

                res.json({ message: 'Appointment accepted', notifications });
            } else {
                res.status(404).json({ message: 'Notifications not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error accepting appointment', error });
        }
    });

    router.post('/notificationss/user/canceled/:email', async (req, res) => {
        try {
            const email = req.params.email;
            

            const notifications = await Notification.find({ email });

            if (notifications.length > 0) {
                await Promise.all(notifications.map(async (notification) => {
                    notification.status = 'cancelled';
                    await notification.save();
                    io.to(notification.email).emit('receiveNotification', notification);
                }));

                res.json({ message: 'Appointment cancelled', notifications });
            } else {
                res.status(404).json({ message: 'Notifications not found' });
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
