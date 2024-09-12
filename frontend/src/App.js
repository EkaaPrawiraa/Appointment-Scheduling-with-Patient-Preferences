import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { useAuth } from "./services/authService";
import { TimerContext } from "./services/timerService";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import findBestCombination from "./utils/dpAlgorithm";
import { io } from "socket.io-client";
import { Snackbar, Alert } from "@mui/material";
import {
	joinRoom,
	onNotificationReceived,
	disconnectSocket,
} from "./services/notificationService";
import NotificationList from "./components/Notification/NotificationComponent";

function App() {
	const [allDoctorPreferences, setAllDoctorPreferences] = useState([]);
	const [allTimePreferences, setAllTimePreferences] = useState([]);
	const [doctorArray, setDoctorArray] = useState([]);
	const [timeSlotArray, setTimeSlotArray] = useState([]);
	const { user } = useAuth();
	const { isOpenAppointment, appointmentId } = useContext(TimerContext);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

	const [patientName, setPatientName] = useState([]);
	const [availabilityMatrix, setAvailabilityMatrix] = useState();
	const [patientData, setPatientData] = useState([["", [], []]]); //name,drpref,timepref
	const [showNotif, setShowNotif] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socketInstance = io("http://localhost:5001");
		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);
	useEffect(() => {
		if (user?.email) {
			joinRoom(user.email);
			const handleNotificationReceived = (notification) => {
				if (notification) {
					setNotifications((prev) => [...prev, notification]);
				} else {
					console.error("Received notification is null or undefined");
				}
			};
			onNotificationReceived(handleNotificationReceived);
			return () => {
				disconnectSocket();
			};
		} else {
			setNotifications([]);
		}
	}, [user?.email, isOpenAppointment]);
	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};
	const getOptionsDisabled = (option, timeSlotArray, doctorIndex) => {
		const timeSlotIndex = timeSlotArray.findIndex(
			(slot) => slot.label === option.label
		);
		return availabilityMatrix[doctorIndex]?.[timeSlotIndex] === -1;
	};
	const handleAccept = async (notificationss) => {
		const id = notificationss._id;
		setOpenSnackbar(true);
		try {
			const response = await axios.post(
				`http://localhost:5001/api/notificationss/user/accepted/${id}`
			);
			fetchNotifications();
			const email = notificationss.email;
			const doctorName = notificationss.message
				.substring(
					notificationss.message.indexOf("with ") + "with ".length,
					notificationss.message.indexOf(" on")
				)
				.trim();
			const time_start = notificationss.message
				.substring(
					notificationss.message.indexOf("on ") + "on ".length,
					notificationss.message.indexOf(" -")
				)
				.trim();
			const time_end = notificationss.message
				.substring(
					notificationss.message.indexOf("- ") + "- ".length,
					notificationss.message.indexOf("?")
				)
				.trim();

			const responses = await axios.post(`http://localhost:5001/api/history`, {
				email,
				doctorName,
				time_start,
				time_end,
			});

			setSnackbarMessage("Appointment Accepted");
			setSnackbarSeverity("succes");
		} catch (error) {
			console.error("Error accepting appointment:", error);
		}
	};

	const handleCancel = async (notificationss) => {
		try {
			setOpenSnackbar(true);
			const id = notificationss._id;
			const response = await axios.post(
				`http://localhost:5001/api/notificationss/user/canceled/${id}`
			);
			fetchNotifications();
			setSnackbarMessage("Appointment Cancelled");
			setSnackbarSeverity("succes");
		} catch (error) {
			console.error("Error canceling appointment:", error);
		}
	};

	const getPatientPreference = ({ doctorPref, timePref }) => {
		console.log(patientName);
		if (patientName.indexOf(user.email) == -1) {
			patientName.push(user.email);
			allTimePreferences.push(timePref);
			allDoctorPreferences.push(doctorPref);
			addPatientData(user.email, doctorPref, timePref);
			console.log("TimePref:", timePref);
			console.log("DocPref:", doctorPref);
		} else {
			setOpenSnackbar(true);
			setSnackbarMessage("You Already Submit an Appointment");
			setSnackbarSeverity("error");
		}
	};
	const addPatientData = (name, doctorPref, timePref) => {
		setPatientData((prevData) => {
			if (prevData.length === 1 && prevData[0][0] === "") {
				const newPatient = [
					name,
					doctorPref.map((doc) => Number(doc.id)),
					timePref.map((time) => Number(time.id)),
				];
				return [newPatient];
			} else {
				const newPatient = [
					name,
					doctorPref.map((doc) => Number(doc.id)),
					timePref.map((time) => Number(time.id)),
				];
				return [...prevData, newPatient];
			}
		});
	};
	const matrixSet = ({ newMatrix }) => {
		setAvailabilityMatrix(newMatrix);
	};

	useEffect(() => {
		if (!isOpenAppointment && allTimePreferences.length != 0) {
			console.log("Send algorithm");
			const result = findBestCombination(patientData);
			console.log(result.score);
			console.log(result.combination);
			console.log(result.combination[0].doctor);
			result.combination.forEach(({ name, doctor, timeSlot }) => {
				sendNotification(name, doctor, timeSlot);
			});
			fetchNotifications();

			//reset
			setAllTimePreferences([]);
			setPatientData([["", [], []]]);
			setPatientName([]);
		}
	}, [isOpenAppointment]);

	const sendNotification = async (patientName, doctorId, timeId) => {
		const doc = doctorArray.find((doc) => Number(doc.id) === doctorId);
		const time = timeSlotArray.find((tim) => Number(tim.id) === timeId);

		try {
			const message = `Do you accept your appointment with ${doc.name} on ${time.label}?`;
			const response = await axios.post(
				"http://localhost:5001/api/notificationss/user",
				{
					email: patientName,
					message,
					status: "pending",
				}
			);
		} catch (error) {
			console.error("Error sending notification:", error);
		}
	};

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const response = await axios.get("http://localhost:5001/api/doctors");
				const doctors = response.data.map((doctor) => ({
					id: doctor.id_doctor,
					name: doctor.doctor_name,
					label: doctor.doctor_name.toString(),
				}));
				setDoctorArray(doctors);
			} catch (error) {
				console.error("Error fetching doctors:", error);
			}
		};
		const fetchTimeSlots = async () => {
			try {
				const response = await axios.get("http://localhost:5001/api/timeslots");
				const timeSlots = response.data.map((slot) => ({
					id: slot.id_time_slot,
					start: new Date(slot.time_start),
					end: new Date(slot.time_end),
					label: `${new Date(
						slot.time_start
					).toLocaleTimeString()} - ${new Date(
						slot.time_end
					).toLocaleTimeString()}`,
				}));
				setTimeSlotArray(timeSlots);
			} catch (error) {
				console.error("Error fetching time slots:", error);
			}
		};
		fetchTimeSlots();
		fetchDoctors();
		setAvailabilityMatrix(
			Array.from({ length: doctorArray.length }, () =>
				Array(timeSlotArray.length).fill(0)
			)
		);
	}, []);

	const fetchNotifications = async () => {
		try {
			setNotifications([]);
			const response = await axios.get(
				`http://localhost:5001/api/notificationss/user/${user.email}`
			);
			setNotifications(response.data);
		} catch (error) {
			console.error("Error fetching notifications:", error);
		}
	};

	useEffect(() => {
		if (user?.email) {
			fetchNotifications();
			joinRoom(user.email);

			const handleNotificationReceived = (notification) => {
				if (notification) {
					setNotifications((prev) => [...prev, notification]);
				} else {
					console.error("Received notification is null or undefined");
				}
			};

			onNotificationReceived(handleNotificationReceived);

			return () => {
				console.log("Cleaning up socket listeners");
				disconnectSocket();
			};
		} else {
			setNotifications([]);
		}
	}, [user?.email, isOpenAppointment]);

	const handleNotifButton = () => {
		if (!showNotif) {
			setShowNotif(true);
		} else {
			setShowNotif(false);
		}
	};

	return (
		<Router>
			<Header
				userName={user?.email || "Guest"}
				userRole={user?.role || "Role"}
				onNotif={handleNotifButton}
				isNotif={notifications.length}
			/>
			<main>
				{showNotif && user && (
					<NotificationList
						notifications={notifications}
						onAccept={handleAccept}
						onCancel={handleCancel}
					/>
				)}
				<Snackbar
					open={openSnackbar}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				>
					<Alert
						onClose={handleCloseSnackbar}
						severity={snackbarSeverity}
						sx={{ width: "100%" }}
					>
						{snackbarMessage}
					</Alert>
				</Snackbar>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/patient"
						element={
							<Patient
								getOptionsDisabled={getOptionsDisabled}
								getPref={getPatientPreference}
								doctorArray={doctorArray}
								timeSlotArray={timeSlotArray}
							/>
						}
					/>
					<Route path="/Home" element={<Home />} />
					<Route path="/Home" element={<Home />} />
					<Route
						path="/Admin"
						element={
							<Admin
								doctorArray={doctorArray}
								timeSlotArray={timeSlotArray}
								matrixSet={matrixSet}
								setDoctors={setDoctorArray}
								setTimes={setTimeSlotArray}
							/>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
