const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');

/**
 * @swagger
 * tags:
 *   name: TimeSlots
 *   description: Time slot management
 */

/**
 * @swagger
 * /timeslots/single:
 *   post:
 *     summary: Add a single time slot
 *     description: Create a new time slot
 *     tags: [TimeSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_time_slot:
 *                 type: string
 *               time_start:
 *                 type: string
 *               time_end:
 *                 type: string
 *             required:
 *               - id_time_slot
 *               - time_start
 *               - time_end
 *     responses:
 *       201:
 *         description: Time slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Error adding time slot
 */
router.post('/timeslots/single', async (req, res) => {
    const { id_time_slot, time_start, time_end } = req.body;

    try {
        const timeslot = new TimeSlot({ id_time_slot, time_start, time_end });
        const newTimeSlot = await timeslot.save();
        res.status(201).json(newTimeSlot);
    } catch (error) {
        res.status(500).json({ message: 'Error adding time slots' });
    }
});

/**
 * @swagger
 * /timeslots:
 *   post:
 *     summary: Add multiple time slots
 *     description: Create multiple new time slots
 *     tags: [TimeSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_time_slot:
 *                   type: string
 *                 time_start:
 *                   type: string
 *                 time_end:
 *                   type: string
 *               required:
 *                 - id_time_slot
 *                 - time_start
 *                 - time_end
 *     responses:
 *       201:
 *         description: Time slots created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Error adding time slots
 */
router.post('/timeslots', async (req, res) => {
    const timeSlots = req.body; 
    try {
        const timeSlotPromises = timeSlots.map(slot => {
            const timeSlot = new TimeSlot(slot);
            return timeSlot.save();
        });

        const savedTimeSlots = await Promise.all(timeSlotPromises); 
        res.status(201).json(savedTimeSlots); 
    } catch (error) {
        res.status(500).json({ message: 'Error adding time slots' });
    }
});

/**
 * @swagger
 * /timeslots:
 *   get:
 *     summary: Get all time slots
 *     description: Retrieve a list of all time slots
 *     tags: [TimeSlots]
 *     responses:
 *       200:
 *         description: A list of time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Server error
 */
router.get('/timeslots', async (req, res) => {
    try {
        const timeslots = await TimeSlot.find({});
        res.json(timeslots);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /timeslots/{id}:
 *   get:
 *     summary: Get a time slot by ID
 *     description: Retrieve a single time slot by its ID
 *     tags: [TimeSlots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Time slot ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Time slot found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       404:
 *         description: Time slot not found
 *       500:
 *         description: Server error
 */
router.get('/timeslots/:id', async (req, res) => {
    try {
        const timeslot = await TimeSlot.findById(req.params.id);
        if (!timeslot) return res.status(404).json({ message: 'Time slot not found' });
        res.json(timeslot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /timeslots/{id}:
 *   put:
 *     summary: Update a time slot by ID
 *     description: Update a time slot's details by its ID
 *     tags: [TimeSlots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Time slot ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_time_slot:
 *                 type: string
 *               time_start:
 *                 type: string
 *               time_end:
 *                 type: string
 *             required:
 *               - id_time_slot
 *               - time_start
 *               - time_end
 *     responses:
 *       200:
 *         description: Time slot updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       404:
 *         description: Time slot not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/timeslots/:id', async (req, res) => {
    try {
        const timeslots = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true,
        });
        if (!timeslots) return res.status(404).json({ message: 'Time slot not found' });
        res.json(timeslots);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /timeslots/{id}:
 *   delete:
 *     summary: Delete a time slot by ID
 *     description: Remove a time slot by its ID
 *     tags: [TimeSlots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Time slot ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Time slot deleted successfully
 *       404:
 *         description: Time slot not found
 *       500:
 *         description: Server error
 */
router.delete('/timeslots/:id', async (req, res) => {
    try {
        const timeslots = await TimeSlot.findByIdAndDelete(req.params.id);
        if (!timeslots) return res.status(404).json({ message: 'Time slot not found' });
        res.json({ message: 'Time slot deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
