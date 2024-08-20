import { io } from "socket.io-client";

const socket = io("http://myappfix-egg0egd2ehahdjaa.southeastasia-01.azurewebsites.net");

export const joinRoom = (userId) => {
    console.log(`Joining room userId: ${userId}`);
    socket.emit("join", { userId });
};

export const onNotificationReceived = (callback) => {
    if (typeof callback === 'function') {
        socket.on("receiveNotification", (notification) => {
            callback(notification);
        });
    } else {
        console.error("Callback is not a function");
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.off("receiveNotification"); 
        socket.disconnect(); 
    }
};

export default socket;