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

const TimeSlotManagement = ({ onClose, timeSlotsUpdate }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [idTimeSlot, setIdTimeSlot] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [editingTimeSlot, setEditingTimeSlot] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchTimeSlots();
    }, []);

    useEffect(() => {
        if (timeSlotsUpdate) {
            const newTimeSlotWithLabel = timeSlots.map(timeslot =>({
                id: timeslot.id_time_slot,
                start: new Date(timeslot.time_start),
                end: new Date(timeslot.time_end),
                label: `${new Date(timeslot.time_start).toLocaleTimeString()} - ${new Date(timeslot.time_end).toLocaleTimeString()}`
            }));
            timeSlotsUpdate(newTimeSlotWithLabel);
        }
    }, [timeSlots, timeSlotsUpdate]);

    const fetchTimeSlots = async () => {
        try {
            const response = await axios.get('http://myappfix-egg0egd2ehahdjaa.southeastasia-01.azurewebsites.net/api/timeslots');
            setTimeSlots(response.data);
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setSnackbarMessage('Error fetching time slots');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleOpenDialog = (type, timeSlot = null) => {
        setDialogType(type);
        setEditingTimeSlot(timeSlot);
        if (type === 'edit' && timeSlot) {
            setIdTimeSlot(timeSlot.id_time_slot);
            setTimeStart(new Date(timeSlot.time_start).toISOString().substring(0, 16)); 
            setTimeEnd(new Date(timeSlot.time_end).toISOString().substring(0, 16)); 
        } else {
            setIdTimeSlot('');
            setTimeStart('');
            setTimeEnd('');
        }
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setEditingTimeSlot(null);
    };

    const handleSubmit = async () => {
        const data = {
            id_time_slot: idTimeSlot,
            time_start: new Date(timeStart),
            time_end: new Date(timeEnd)
        };

        if (dialogType === 'add') {
            try {
                const response = await axios.post('http://myappfix-egg0egd2ehahdjaa.southeastasia-01.azurewebsites.net/api/timeslots/single', data);
                setTimeSlots([...timeSlots, response.data]);
                setSnackbarMessage('Time slot added successfully');
                setSnackbarSeverity('success');
            } catch (error) {
                console.error('Error adding time slot:', error);
                setSnackbarMessage('Error adding time slot');
                setSnackbarSeverity('error');
            }
        } else if (dialogType === 'edit' && editingTimeSlot) {
            try {
                const response = await axios.put(`http://myappfix-egg0egd2ehahdjaa.southeastasia-01.azurewebsites.net/api/timeslots/${editingTimeSlot._id}`, data);
                setTimeSlots(timeSlots.map(ts => ts._id === response.data._id ? response.data : ts));
                setSnackbarMessage('Time slot updated successfully');
                setSnackbarSeverity('success');
            } catch (error) {
                console.error('Error updating time slot:', error);
                setSnackbarMessage('Error updating time slot');
                setSnackbarSeverity('error');
            }
        }
        handleCloseDialog();
        setSnackbarOpen(true);
    };

    const handleDeleteTimeSlot = async (id) => {
        try {
            await axios.delete(`http://myappfix-egg0egd2ehahdjaa.southeastasia-01.azurewebsites.net/api/timeslots/${id}`);
            setTimeSlots(timeSlots.filter(timeSlot => timeSlot._id !== id));
            setSnackbarMessage('Time slot deleted successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error deleting time slot:', error);
            setSnackbarMessage('Error deleting time slot');
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
                <b>Time Slot Management</b>
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
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map((timeSlot) => (
                            <TableRow key={timeSlot._id}>
                                <TableCell>{timeSlot.id_time_slot}</TableCell>
                                <TableCell>{new Date(timeSlot.time_start).toLocaleString()}</TableCell>
                                <TableCell>{new Date(timeSlot.time_end).toLocaleString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenDialog('edit', timeSlot)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteTimeSlot(timeSlot._id)}><DeleteIcon /></IconButton>
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
                Add Time Slot
            </Button>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogType === 'add' ? 'Add Time Slot' : 'Edit Time Slot'}
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
                        placeholder="ID Time Slot"
                        fullWidth
                        value={idTimeSlot}
                        onChange={(e) => setIdTimeSlot(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        placeholder="Start Time"
                        type="datetime-local"
                        fullWidth
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        placeholder="End Time"
                        type="datetime-local"
                        fullWidth
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
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

export default TimeSlotManagement;
