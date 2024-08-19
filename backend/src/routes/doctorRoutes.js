const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management
 */

/**
 * @swagger
 * /doctors/single:
 *   post:
 *     summary: Add a single doctor
 *     description: Create a new doctor entry
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_doctor:
 *                 type: string
 *                 description: Doctor ID
 *               doctor_name:
 *                 type: string
 *                 description: Doctor name
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Server error
 */
router.post('/doctors/single', async (req, res) => {
    const { id_doctor, doctor_name } = req.body;

    try {
        const doctor = new Doctor({ id_doctor, doctor_name });
        const newDoctor = await doctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error adding doctor' });
    }
});

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Add multiple doctors
 *     description: Create multiple doctor entries
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_doctor:
 *                   type: string
 *                   description: Doctor ID
 *                 doctor_name:
 *                   type: string
 *                   description: Doctor name
 *     responses:
 *       201:
 *         description: Doctors added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Server error
 */
router.post('/doctors', async (req, res) => {
    const doctorDataArray = req.body;
    try {
        const doctorPromises = doctorDataArray.map(doctorData => {
            const doctor = new Doctor(doctorData);
            return doctor.save();
        });
        const newDoctors = await Promise.all(doctorPromises);
        res.status(201).json(newDoctors);
    } catch (error) {
        res.status(500).json({ message: 'Error adding doctors' });
    }
});

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Server error
 */
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     description: Retrieve a single doctor by its ID
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
router.get('/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update a doctor by ID
 *     description: Update a doctor's details by its ID
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_doctor:
 *                 type: string
 *               doctor_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/doctors/:id', async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(updatedDoctor);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     description: Remove a doctor by its ID
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */
router.delete('/doctors/:id', async (req, res) => {
    try {
        const result = await Doctor.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Doctor not found' });
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
