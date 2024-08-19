import React from "react";
import { Box, Button, Paper, Divider, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const NotificationList = ({ notifications, onAccept, onCancel }) => {
	return (
		<Paper
			sx={{
				position: "fixed",
				top: 100,
				left: 20,
				backgroundColor: "white",
				border: "1px solid #ddd",
				borderRadius: "8px",
				padding: "10px",
				boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
				maxWidth: "300px",
				width: "100%",
				maxHeight: "400px",
				overflowY: "auto",
				zIndex: 1300,
			}}
		>
			{notifications.length === 0 ? (
				<Typography
					variant="body2"
					sx={{ textAlign: "center", padding: "10px" }}
				>
					No notifications
				</Typography>
			) : (
				notifications.map((notification) => (
					<Box key={notification._id} sx={{ paddingBottom: "10px" }}>
						<Typography variant="body2">{notification.message}</Typography>
						{notification.status == "pending" ? (
							<Box sx={{ marginTop: "10px" }}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => onAccept(notification.email)}
									sx={{ marginRight: "5px" }}
								>
									<CheckIcon />
								</Button>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => onCancel(notification.email)}
								>
									<CloseIcon />
								</Button>
							</Box>
						) : (
							<Typography
								variant="body2"
								sx={{
									textAlign: "center",
									padding: "10px",
									color: notification.status === "accepted" ? "green" : "red",
								}}
							>
								{notification.status}
							</Typography>
						)}

						<Divider sx={{ marginTop: "10px" }} />
					</Box>
				))
			)}
		</Paper>
	);
};

export default NotificationList;
