import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import bgImage from '../../assets/images/footer.jpeg';

const Header = ({ userName, userRole }) => {
    return (
        <AppBar 
            position="static" 
            sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: 1,
            }}
        >
            <Toolbar>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1, color: 'black', fontSize: '2rem' }} /> 
                    <Typography variant="h6" sx={{ fontFamily: '"Anton", sans-serif', color: 'black', fontSize: '1.5rem' }}>
                        {userName}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: '"Anton", sans-serif', color: 'black', fontSize: '1.5rem' }}>
                        Scheduling Appointment
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" sx={{ mr: 1, fontFamily: '"Anton", sans-serif', color: 'black', fontSize: '1.5rem' }}>
                        {userRole}
                    </Typography>
                    <SupervisorAccountIcon sx={{ color: 'black', fontSize: '2rem' }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
