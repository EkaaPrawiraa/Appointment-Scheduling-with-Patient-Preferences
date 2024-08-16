import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import bgImage from '../../assets/images/com.webp';

const PatientPreferencesComponent = ({ doctorArray, timeSlotArray, getOptionDisabled, setSelectedDoctor, setSelectedTimeSlot, selectedTimeSlot, selectedDoctor, disabled }) => {
    return (
        <Box sx={{
            position: 'relative',
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid',
            borderRadius: '30px',
            padding: '10px',
        }}>
            <Box>
                <FormControl variant="outlined" sx={{ width: 500, marginBottom: 2 }}>
                    <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
                    <Select
                        labelId="doctor-select-label"
                        id="doctor-select"
                        value={selectedDoctor?.label || ""}
                        onChange={(event) => {
                            const selected = doctorArray.find(doctor => doctor.label === event.target.value);
                            setSelectedDoctor(selected);
                        }}
                        label="Select Doctor"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        }}
                        
                    >
                        {doctorArray.map((doctor, index) => (
                            <MenuItem key={index} value={doctor.label}>
                                {doctor.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl variant="outlined" sx={{ width: 500 }}>
                    <InputLabel id="timeslot-select-label">Select Time Slot</InputLabel>
                    <Select
                        labelId="timeslot-select-label"
                        id="timeslot-select"
                        value={selectedTimeSlot?.label || ""}
                        onChange={(event) => {
                            const selected = timeSlotArray?.find(slot => slot.label === event.target.value);
                            setSelectedTimeSlot(selected);
                        }}
                        label="Select Time Slot"
                        disabled={disabled}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        }}
                    >
                        {timeSlotArray?.map((slot, index) => (
                            <MenuItem key={index} value={slot.label} disabled={getOptionDisabled(slot)}>
                                {slot.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};


export default PatientPreferencesComponent;
