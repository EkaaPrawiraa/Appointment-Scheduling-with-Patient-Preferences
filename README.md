# Appointment Scheduling with Dynamic Programming

The Appointment Scheduling with Dynamic Programming is a web-based application designed to optimize patient appointment scheduling based on patient preferences, aiming to maximize the hospital’s revenue.

## Features

1. **Patient Appointment Scheduling:**
    - Allows patients to book appointments by selecting their preferred doctors and time slots.
	   - Patients can confirm or cancel their appointments after they have been assigned by the system.

2. **User Roles & Authentication:**
   - Admin: Manages the initial state of appointments, opens and closes appointment booking, and sends out assignment results to patients.
   - Admin: Admins can manage doctors and time slots through a user-friendly interface.
	  - Patient: Books appointments based on preferences and confirms or cancels the assigned appointments.
    
   
3. **Real-Time Communication (RTC):**
   - Uses WebSocket (Socket.IO) for real-time notifications, informing patients of their appointment assignments immediately after they are processed.
	  - Patients can respond to notifications to confirm or cancel appointments.


4. **Persistent Data Storage:**
   - Doctor and time slot data are stored in a MongoDB.
	  - Appointment data is saved in the database once confirmed by the patient.

## Dynamic Programming Algorithm


```bash
Dynamic programming is defined as a computer programming technique where an algorithmic problem is first broken down into sub-problems, the results are saved, and then the sub-problems are optimized to find the overall solution — which usually has to do with finding the maximum and minimum range of the algorithmic query. 
```



## How It Works
 1.	Admin logs in and configures the initial state of appointments, then opens the appointment booking process.
	2.	Patients log in, select their preferred doctors and time slots, and submit their choices.
	3.	Once the booking period ends, the system uses the DP algorithm to assign the best possible appointments to each patient.
	4.	The system sends out notifications to patients, who can then confirm or cancel their assigned appointments.
	5.	Confirmed appointments are saved in the database and can be reviewed by the admin.


## How to Run
1. Download the released app.
2. Open Terminal and change directory to the root app directory.
3. Run 'docker-compose up",
4. Open the backend server on "[Localhost:5001](http://localhost:5001)"
5. Open the frontend server on "[Localhost:3000"](http://localhost:3000)"




