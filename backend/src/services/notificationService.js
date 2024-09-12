const Notification = require('../models/Notification');

const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('join', ({ userId }) => {
            socket.join(userId);
            console.log(`User with ID ${userId} joined their room`);
        });
        socket.on('sendNotification', async (data) => {
            try {
                const newNotification = new Notification({
                    userId: data.userId,
                    message: data.message
                });
                await newNotification.save();
                console.log("bisa");
                io.to(data.userId).emit('receiveNotification', newNotification);
                console.log("bisa1");
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

module.exports = setupSocket;
