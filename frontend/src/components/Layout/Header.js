import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Badge, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import bgImage from '../../assets/images/footer.jpeg';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = ({ userName, userRole, onNotif, isNotif }) => {
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
                    <IconButton 
                        onClick={onNotif}
                        sx={{ 
                            position: 'relative',
                            color: 'black',
                            fontSize: '2rem'
                        }}
                    >
                        <Badge
                            badgeContent={isNotif}
                            color="error"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiBadge-dot': {
                                    borderRadius: '50%',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: 'red',
                                }
                            }}
                        >
                            <NotificationsIcon sx={{ fontSize: 40, color: 'black' }} />
                        </Badge>
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontFamily: '"Anton", sans-serif', 
                            color: 'black', 
                            fontSize: '1.5rem',
                            ml: 2
                        }}
                    >
                        {userName}
                    </Typography>
                </Box>
                <Box sx={{ flex: 2, textAlign: 'center' }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontFamily: '"Anton", sans-serif', 
                            color: 'black', 
                            fontSize: '1.5rem'
                        }}
                    >
                        Scheduling Appointment
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mr: 1, 
                            fontFamily: '"Anton", sans-serif', 
                            color: 'black', 
                            fontSize: '1.5rem' 
                        }}
                    >
                        {userRole}
                    </Typography>
                    <SupervisorAccountIcon sx={{ color: 'black', fontSize: '2rem' }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
