import React, { useState, useContext } from 'react';
import { Box, Button, Snackbar, Alert, Typography } from "@mui/material";
import AdminMatrixComponent from "../components/AdminDashboard/AdminMatrixComponent";
import { TimerContext } from '../services/timerService';
import { useAuth } from '../services/authService';

const Admin = ({ doctorArray, timeSlotArray, matrixSet }) => {
    const [showMatrix, setShowMatrix] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const { user } = useAuth();
    
    const { isOpenAppointment, openRegistration, closeRegistration } = useContext(TimerContext);
    if (!user || (user.role !== 'Hacker' && user.role !== 'Admin')) {
        return (
          <Box sx={{
            position: 'relative',
            height: '100%',
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h3" sx={{ fontFamily: '"Anton", sans-serif', color: 'red' }}>
              Access Denied
            </Typography>
          </Box>
        );
      }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const showMatrixComponent = () => {
        setShowMatrix(true);
    };

    const hideMatrixComponent = () => {
        setShowMatrix(false);
    };

    const handleToggleRegistration = () => {
        if (isOpenAppointment) {
            closeRegistration();
            setSnackbarMessage('Registration closed.');
            setSnackbarSeverity('info');
            setOpenSnackbar(true);
        } else {
            openRegistration();
            setSnackbarMessage('Registration opened for 10 minutes.');
            setSnackbarSeverity('info');
            setOpenSnackbar(true);
        }
        
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Registration is {isOpenAppointment ? 'Open' : 'Closed'}
            </Typography>
            {!showMatrix && (
                <Button 
                    variant="contained" 
                    onClick={showMatrixComponent} 
                    sx={{
                        width: '10%',
                        padding: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '4rem',
                        color: 'black',
                        fontWeight: 500,
                    }}
                >
                    Add Matrix
                </Button>
            )}
            {showMatrix && (
                <AdminMatrixComponent 
                    doctorArray={doctorArray} 
                    timeSlotArray={timeSlotArray} 
                    matrixStateSet={matrixSet} 
                    onClose={hideMatrixComponent}
                />
            )}
            <Button 
                variant="contained" 
                onClick={handleToggleRegistration} 
                sx={{
                    width: '10%',
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '4rem',
                    color: 'black',
                    fontWeight: 500,
                }}
            >
                {isOpenAppointment ? 'Close Registration' : 'Open Registration'}
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Admin;
