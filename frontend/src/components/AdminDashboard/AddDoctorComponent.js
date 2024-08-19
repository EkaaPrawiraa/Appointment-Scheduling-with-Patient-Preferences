import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const DoctorManagement = ({ onClose,doctorss }) => {
    const [doctors, setDoctors] = useState([]);
    const [idDoctor, setIdDoctor] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogType, setDialogType] = useState('add'); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (doctorss) {
            const newDoctorsWithLabel = doctors.map(doctor => ({
                id: doctor.id_doctor,
                name: doctor.doctor_name,
                label: doctor.doctor_name.toString()
            }));
            doctorss(newDoctorsWithLabel);
        }
    }, [doctors, doctorss]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setSnackbarMessage('Error fetching doctors');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleOpenDialog = (type, doctor = null) => {
        setDialogType(type);
        setEditingDoctor(doctor);
        if (type === 'edit' && doctor) {
            setIdDoctor(doctor.id_doctor);
            setDoctorName(doctor.doctor_name);
        } else {
            setIdDoctor('');
            setDoctorName('');
        }
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setEditingDoctor(null);
    };

    const handleSubmit = async () => {
        if (dialogType === 'add') {
            try {
                const response = await axios.post('http://localhost:5001/api/doctors/single', { id_doctor: idDoctor, doctor_name: doctorName });
                setDoctors([...doctors, response.data]);
                setSnackbarMessage('Doctor added successfully');
                setSnackbarSeverity('success');
            } catch (error) {
                console.error('Error adding doctor:', error);
                setSnackbarMessage('Error adding doctor');
                setSnackbarSeverity('error');
            }
        } else if (dialogType === 'edit' && editingDoctor) {
            try {
                const response = await axios.put(`http://localhost:5001/api/doctors/${editingDoctor._id}`, { id_doctor: idDoctor, doctor_name: doctorName });
                setDoctors(doctors.map(d => d._id === response.data._id ? response.data : d));
                setSnackbarMessage('Doctor updated successfully');
                setSnackbarSeverity('success');
            } catch (error) {
                console.error('Error updating doctor:', error);
                setSnackbarMessage('Error updating doctor');
                setSnackbarSeverity('error');
            }
        }
        handleCloseDialog();
        setSnackbarOpen(true);
    };

    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/doctors/${id}`);
            setDoctors(doctors.filter(doctor => doctor._id !== id));
            setSnackbarMessage('Doctor deleted successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error deleting doctor:', error);
            setSnackbarMessage('Error deleting doctor');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
                <b>Doctor Management</b>
            </Typography>
            
            <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                    padding: '1rem',
                    position: 'relative',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    width: '80%',
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor._id}>
                                <TableCell>{doctor.id_doctor}</TableCell>
                                <TableCell>{doctor.doctor_name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenDialog('edit', doctor)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteDoctor(doctor._id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog('add')}
                sx={{
                    width: '50%',
                    padding: '1rem',
                    marginTop: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '4rem',
                    color: 'black',
                    fontWeight: 500,
                }}
            >
                Add Doctor
            </Button>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogType === 'add' ? 'Add Doctor' : 'Edit Doctor'}
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            color: 'gray',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="ID Doctor"
                        fullWidth
                        value={idDoctor}
                        onChange={(e) => setIdDoctor(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Doctor Name"
                        fullWidth
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit}>{dialogType === 'add' ? 'Add' : 'Update'}</Button>
                </DialogActions>
            </Dialog>
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                action={
                    <Button color="inherit" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default DoctorManagement;
