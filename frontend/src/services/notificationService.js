import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export const joinRoom = (userId) => {
	socket.emit("join", { userId });
};

export const onNotificationReceived = (callback) => {
	socket.on("receiveNotification", callback);
};

export const disconnectSocket = () => {
	socket.off("receiveNotification");
};

export default socket;
