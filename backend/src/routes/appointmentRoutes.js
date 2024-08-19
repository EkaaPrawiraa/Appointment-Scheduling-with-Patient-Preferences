const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Retrieve all appointments
 *     description: Fetch a list of all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The appointment ID
 *                   patientName:
 *                     type: string
 *                     description: The name of the patient
 *                   doctorName:
 *                     type: string
 *                     description: The name of the doctor
 *                   time_start:
 *                     type: string
 *                     format: date-time
 *                     description: Start time of the appointment
 *                   time_end:
 *                     type: string
 *                     format: date-time
 *                     description: End time of the appointment
 *       500:
 *         description: Server error
 */
router.get('/history', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /history:
 *   post:
 *     summary: Create a new appointment
 *     description: Add a new appointment to the system
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName:
 *                 type: string
 *                 description: The name of the patient
 *               doctorName:
 *                 type: string
 *                 description: The name of the doctor
 *               time_start:
 *                 type: string
 *                 format: date-time
 *                 description: Start time of the appointment
 *               time_end:
 *                 type: string
 *                 format: date-time
 *                 description: End time of the appointment
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The appointment ID
 *                 patientName:
 *                   type: string
 *                   description: The name of the patient
 *                 doctorName:
 *                   type: string
 *                   description: The name of the doctor
 *                 time_start:
 *                   type: string
 *                   format: date-time
 *                   description: Start time of the appointment
 *                 time_end:
 *                   type: string
 *                   format: date-time
 *                   description: End time of the appointment
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/history', async (req, res) => {
    const { patientName, doctorName, time_start, time_end } = req.body;

    const appointment = new Appointment({
        patientName,
        doctorName,
        time_start,
        time_end
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
