const express = require('express');
const connectDB = require('./config/database');
const doctorRoutes = require('./routes/doctorRoutes');
const timeSlotRoutes = require('./routes/timeSlotsRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express();


app.use(express.json()); 


connectDB();


app.use('/api', doctorRoutes); 
app.use('/api', timeSlotRoutes);
app.get('/api',doctorRoutes)
app.get('/api',timeSlotRoutes);
app.use('/api', authRoutes);
app.get('/api',authRoutes)


module.exports = app;
