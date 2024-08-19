import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export const joinRoom = (userId) => {
    console.log(`Joining room for userId: ${userId}`);
    socket.emit("join", { userId });
};

export const onNotificationReceived = (callback) => {
    if (typeof callback === 'function') {
        socket.on("receiveNotification", (notification) => {
            console.log("Notification received:", notification);
            callback(notification);
        });
    } else {
        console.error("Callback is not a function");
    }
};

export const disconnectSocket = () => {
	socket.off("receiveNotification");
};

export default socket;
