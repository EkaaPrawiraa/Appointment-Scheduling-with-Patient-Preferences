import React, { useState, useEffect } from 'react';
import { Box, Typography,Snackbar,Alert} from '@mui/material';
import axios from 'axios';
import PatientPreferencesComponent from '../components/PatientDashboard/PatientPreferences';
import Button from '@mui/material/Button';

const Patient = ({ getOptionsDisabled,getPref,doctorArray,timeSlotArray }) => {
  const [doctorPreference, setDoctorPreference] = useState(Array(doctorArray.length).fill(null));
  const [timeSlotPreference, setTimeSlotPreference] = useState(Array(doctorArray.length).fill(null));
  const [availableTimeSlots, setAvailableTimeSlots] = useState(Array(doctorArray.length).fill(null));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  

  const handleSetDoctorPreference = (index, value) => {
    const updatedPreferences = [...doctorPreference];
    updatedPreferences[index] = value;
    setDoctorPreference(updatedPreferences);

    if (value !== null) {
      const doctorIndex = doctorArray.findIndex(doc => doc.label === value.label);
      const filteredTimeSlots = timeSlotArray.filter((_, slotIndex) => !getOptionsDisabled(_, timeSlotArray, doctorIndex));
      const updatedTimeSlots = [...availableTimeSlots];
      updatedTimeSlots[index] = filteredTimeSlots;
      setAvailableTimeSlots(updatedTimeSlots);
    }
  };

  const handleSetTimeSlotPreference = (index, value) => {
    const updatedPreferences = [...timeSlotPreference];
    updatedPreferences[index] = value;
    setTimeSlotPreference(updatedPreferences);
  };

  const handleSubmit = async () => {
    if (doctorPreference.includes(null) || timeSlotPreference.includes(null)) {
      setSnackbarMessage('All fields must be filled');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    getPref({
      doctorPref: doctorPreference,
      timePref: timeSlotPreference,
    });

    setSnackbarMessage('Preferences submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <Box sx={{
      position: 'relative',
      height: '100%',
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="h3" sx={{ fontFamily: '"Anton", sans-serif', color: 'black' }}>
          My Appointment Preferences
        </Typography>
      </Box>
      <Box sx={{ padding: '20px' }}>
        {doctorArray.map((_, index) => (
          <Box key={index} sx={{ marginBottom: '20px' }}>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="h6" sx={{ fontFamily: '"Anton", sans-serif', color: 'black' }}>
                Priority {index + 1}
              </Typography>
            </Box>
            <PatientPreferencesComponent
              doctorArray={doctorArray}
              timeSlotArray={availableTimeSlots[index]} 
              getOptionDisabled={(option) => getOptionsDisabled(option, timeSlotArray, index)}
              setSelectedDoctor={(value) => handleSetDoctorPreference(index, value)}
              setSelectedTimeSlot={(value) => handleSetTimeSlotPreference(index, value)}
              selectedDoctor={doctorPreference[index]}
              selectedTimeSlot={timeSlotPreference[index]}
              disabled={doctorPreference[index] === null} 
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        onClick={handleSubmit}
        sx={{
          width: '100%',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: 'white',
          borderRadius: '4rem',
          color: 'black',
          fontWeight: 500,
          borderColor: 'brown'
        }}
      >
        Submit Preferences
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

export default Patient;
