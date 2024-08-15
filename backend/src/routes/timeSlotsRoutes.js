const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');

router.post('/timeslots', async (req, res) => {
    const  timeSlots = req.body; 
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

router.get('/timeslots', async (req, res) => {
    try {
        const timeslots = await TimeSlot.find({});
        res.json(timeslots);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
