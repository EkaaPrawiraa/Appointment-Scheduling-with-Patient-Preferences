const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const doctorRoutes = require('./routes/doctorRoutes');
const timeSlotRoutes = require('./routes/timeSlotsRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json()); 



connectDB();


app.use('/api', doctorRoutes); 
app.use('/api', timeSlotRoutes);
app.get('/api',doctorRoutes)
app.get('/api',timeSlotRoutes);
app.use('/api', authRoutes);
app.get('/api',authRoutes)


module.exports = app;
