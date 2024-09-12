const swaggerSetup = require('./swagger'); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const doctorRoutes = require('./routes/doctorRoutes');
const timeSlotRoutes = require('./routes/timeSlotsRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const setupSocket = require('./services/notificationService');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'], 
        credentials: true
    }
});

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
setupSocket(io);
swaggerSetup(app);


app.use('/api', doctorRoutes); 
app.use('/api', timeSlotRoutes);
app.get('/api',doctorRoutes);
app.get('/api',timeSlotRoutes);
app.use('/api', authRoutes);
app.get('/api',authRoutes);
app.use('/api', appointmentRoutes);
app.get('/api',appointmentRoutes);
app.use('/api', notificationRoutes(io));
app.get('/api', notificationRoutes(io));


module.exports = server;
