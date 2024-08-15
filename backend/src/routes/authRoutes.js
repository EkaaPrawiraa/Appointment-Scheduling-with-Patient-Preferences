const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/users', async (req, res) => {
    const userData = req.body;
    try {
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});

module.exports = router;