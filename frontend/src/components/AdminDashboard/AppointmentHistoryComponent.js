import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton } from "@mui/material";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const OpenHistory = ({ onClose }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/history');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointment history:', error);
            }
        };

        fetchAppointments();
        console.log(appointments);
    }, []);

    return (
        <Box sx={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                <b> Appointment History</b>
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            padding: '1rem', 
                            position: 'relative', 
                            maxHeight: '400px',  
                            overflowY: 'auto'  
                        }}
                    >
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                color: 'gray',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <Box key={index} sx={{ marginBottom: '1rem', borderBottom:'1px solid'}}>
                                    <Typography variant="h6">
                                        Appointment ID: {appointment.appointmentId}
                                    </Typography>
                                    <Typography variant="body1">
                                        Patient's Name: {appointment.patientName}
                                    </Typography>
                                    <Typography variant="body1">
                                        Doctor's Name: {appointment.doctorName}
                                    </Typography>
                                    <Typography variant="body1">
                                        Time : {(appointment.time_start)} - {(appointment.time_end)}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1">No appointment history found.</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OpenHistory;
