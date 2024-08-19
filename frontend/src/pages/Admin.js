import React, { useState, useContext } from 'react';
import { Box, Button, Snackbar, Alert, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AdminMatrixComponent from "../components/AdminDashboard/AdminMatrixComponent";
import { TimerContext } from '../services/timerService';
import { useAuth } from '../services/authService';
import OpenHistory from '../components/AdminDashboard/AppointmentHistoryComponent';
import HistoryIcon from '@mui/icons-material/History';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddIcon from '@mui/icons-material/Add';
import DoctorManagement from '../components/AdminDashboard/AddDoctorComponent';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import TimeSlotManagement from '../components/AdminDashboard/AddTimeComponent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Admin = ({ doctorArray, timeSlotArray, matrixSet,setDoctors,setTimes }) => {
    const [showMatrix, setShowMatrix] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const { user } = useAuth();
    const { isOpenAppointment, openRegistration, closeRegistration, appointmentId } = useContext(TimerContext);
    const [durationTerm, setDurationTerm] = useState('');
    const [showDurationInput, setShowDurationInput] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showManageDoctor, setShowManageDoctor] = useState(false);
    const [showManageTime,setShowManageTime]=useState(false);
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
    const showHistoryComponent = () => {
        setShowHistory(true);
    };

    const hideHistoryComponent = () => {
        setShowHistory(false);
    };
    const showDoctorManagementComponent = () => {
        setShowManageDoctor(true);
    };

    const hideDoctorManagementComponent = () => {
        setShowManageDoctor(false);
    };
    const showTimeManagementComponent = () => {
        setShowManageTime(true);
    };

    const hideTimeManagementComponent = () => {
        setShowManageTime(false);
    };

    const handleToggleRegistration = () => {
        if (isOpenAppointment) {
            closeRegistration();
            setSnackbarMessage('Registration closed.');
            setSnackbarSeverity('info');
            setOpenSnackbar(true);
        } else {
            setShowDurationInput(true);
        }
    };

    const handleDurationTermChange = (e) => {
        const inputValue = e.target.value;
        setDurationTerm(inputValue);
    };

    const handleConfirmOpenRegistration = () => {
        let durationInMs = Number(durationTerm) * 60000;
        if (isNaN(durationInMs) || durationInMs <= 0) {
            setSnackbarMessage('Please enter a valid duration.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        openRegistration(durationInMs);
        setSnackbarMessage(`Registration opened for ${durationTerm} minutes.`);
        setSnackbarSeverity('info');
        setOpenSnackbar(true);
        setShowDurationInput(false);
    };

    const handleCloseDurationInput = () => {
        setShowDurationInput(false);
    };

    const HandleAppointmentHistoryButton = () => {
        showHistoryComponent();
    };
    const HandleDoctorManagementButton = () => {
        showDoctorManagementComponent();
    };
    const HandleTimeManagementButton = () => {
        showTimeManagementComponent();
    };

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '4rem',
            }}
        >
            <Box sx={{
                display: 'flex',
                gap: '4rem',
            }}>

{!showMatrix && !showHistory && !isOpenAppointment && !showManageDoctor&& !showManageTime && (
                    <Button
                        variant="contained"
                        onClick={HandleDoctorManagementButton}
                        sx={{
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                    >
                        <MedicationLiquidIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                marginTop: '1rem',
                                fontFamily: '"Anton", sans-serif',
                                color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray',
                            }}
                        >
                            Manage Doctor
                        </Typography>
                    </Button>
                )}
                {showManageDoctor && (
                    <DoctorManagement
                        onClose={hideDoctorManagementComponent} doctorss={setDoctors} 
                    />
                )}

                
                {!showMatrix && !showHistory && !showManageDoctor && !showManageTime&&  (
                    
                        <Button
                            variant="contained"
                            onClick={handleToggleRegistration}
                            sx={{
                                width: '200px',
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                borderRadius: '1rem',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <AppRegistrationIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    marginTop: '1rem',
                                    fontFamily: '"Anton", sans-serif',
                                    color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray',
                                }}
                            >
                                {isOpenAppointment ? 'Close Registration' : 'Open Registration'}
                            </Typography>
                        </Button>
                    
                )}
                {!showMatrix && !isOpenAppointment && !showHistory && !showManageDoctor&& !showManageTime && (
                    <Button
                        variant="contained"
                        onClick={showMatrixComponent}
                        sx={{
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                    >
                        <AddIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                marginTop: '1rem',
                                fontFamily: '"Anton", sans-serif',
                                color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray',
                            }}
                        >
                            Add Matrix
                        </Typography>
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
                {!showMatrix && !showHistory && !showManageDoctor&& !showManageTime && (
                    <Button
                        variant="contained"
                        onClick={HandleAppointmentHistoryButton}
                        sx={{
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                    >
                        <HistoryIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                marginTop: '1rem',
                                fontFamily: '"Anton", sans-serif',
                                color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray',
                            }}
                        >
                            Open History
                        </Typography>
                    </Button>
                )}
                {showHistory && (
                    <OpenHistory
                        onClose={hideHistoryComponent}
                    />
                )}
                    

                {!showMatrix && !showHistory && !isOpenAppointment && !showManageDoctor&& !showManageTime &&(
                    <Button
                        variant="contained"
                        onClick={HandleTimeManagementButton}
                        sx={{
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                    >
                        <AccessTimeIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                marginTop: '1rem',
                                fontFamily: '"Anton", sans-serif',
                                color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray',
                            }}
                        >
                            Manage Time Slot
                        </Typography>
                    </Button>
                )}
                {showManageTime && (
                    <TimeSlotManagement
                        onClose={hideTimeManagementComponent} timeSlotsUpdate={setTimes} 
                    />
                )}
            </Box>
            <Dialog open={showDurationInput} onClose={handleCloseDurationInput}>
                <DialogTitle>Enter Duration</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="durationTerm"
                        label="Duration in Minutes"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={durationTerm}
                        onChange={handleDurationTermChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDurationInput} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmOpenRegistration} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

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
