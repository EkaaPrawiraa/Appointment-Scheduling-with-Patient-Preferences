const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');


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

router.get('/doctors', async (req, res) => {
    try {
        const doctor = await Doctor.find({});
        res.json(doctor);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;
