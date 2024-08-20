import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AdminMatrixComponent = ({ doctorArray, timeSlotArray, matrixStateSet, onClose }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);
    const [matrix, setMatrix] = useState([]);

    const initializeMatrix = () => {
        if (Array.isArray(doctorArray) && Array.isArray(timeSlotArray)) {
            if (doctorArray.length > 0 && timeSlotArray.length > 0) {
                return doctorArray.map(() => timeSlotArray.map(() => 0));
            }
        }
        return [];
    };

    useEffect(() => {
        setMatrix(initializeMatrix());
    }, [doctorArray, timeSlotArray]);

    const handleMatrixChange = (rowIndex, colIndex, value) => {
        const updatedMatrix = matrix.map((row, rIdx) =>
            row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? parseInt(value) : cell))
        );
        setMatrix(updatedMatrix);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const onSaveClick = async (e) => {
        e.preventDefault();
        setSnackbarMessage('Saving Matrix...');
        setSnackbarSeverity('info');
        setOpenSnackbar(true);
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSnackbarMessage('Matrix Saved Successfully');
            setSnackbarSeverity('success');
            matrixStateSet({ newMatrix: matrix });
        } catch (error) {
            setSnackbarMessage('Failed to Save Matrix');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
        }
    };

    if (!Array.isArray(doctorArray) || !Array.isArray(timeSlotArray)) {
        return <Typography>Error: Data format is invalid</Typography>;
    }

    if (doctorArray.length === 0 || timeSlotArray.length === 0) {
        return <Typography>No data available to display</Typography>;
    }

    return (
        <Box
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 'fit-content',
                maxWidth: 'fit-content',
                margin: '0 auto',
                backgroundColor: '#fdf4e3',
                borderRadius: 2,
                border: '10px solid #ffff',
                backdropFilter: 'blur(10px)',
                boxShadow: 3,
                position: 'relative',
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'gray',
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                <b>Starting State Appointment</b>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                        <Grid item xs={2} /> 
                        {timeSlotArray.map((timeSlot, colIndex) => (
                            <Grid item xs={2} key={colIndex}>
                                <Typography align="center">{timeSlot.label}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                    {doctorArray.map((doctor, rowIndex) => (
                        <Grid container key={doctor.id} spacing={1} alignItems="center" sx={{ marginBottom: 1 }}>
                            <Grid item xs={2}>
                                <Typography align="center">{doctor.name}</Typography>
                            </Grid>
                            {timeSlotArray.map((_, colIndex) => (
                                <Grid item xs={2} key={colIndex}>
                                    <TextField
                                        type="number"
                                        value={matrix[rowIndex]?.[colIndex] || 0}
                                        onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                                        sx={{ width: '100%', textAlign: 'center' }}
                                        inputProps={{ min: -1, max: 0, step: 1 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Box>
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                        onClick={onSaveClick}
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '20%',
                            padding: '1rem',
                            marginBottom: '1rem',
                            backgroundColor: 'white',
                            borderRadius: '4rem',
                            color: 'black',
                            fontWeight: 500,
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                </Box>
            </Box>
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

export default AdminMatrixComponent;
