import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuth } from '../services/authService';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleAdminClick = () => {
        if (user && (user.role === 'Admin' || user.role === 'Hacker')) {
            navigate('/admin');
        }
    };

    const handlePatientClick = () => {
        if (user && (user.role === 'Patient' || user.role === 'Hacker')) {
            navigate('/patient');
        }
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
            <Box
                sx={{
                    display: 'flex',
                    gap: '4rem',
                }}
            >
                <Button
                    onClick={handleAdminClick}
                    disabled={!user || (user.role !== 'Admin' && user.role !== 'Hacker')}
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
                    <DashboardIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: '1rem',
                            fontFamily: '"Anton", sans-serif',
                            color: user && (user.role === 'Admin' || user.role === 'Hacker') ? 'black' : 'gray',
                        }}
                    >
                        Admin Dashboard
                    </Typography>
                </Button>
                <Button
                    onClick={handlePatientClick}
                    disabled={!user || (user.role !== 'Patient' && user.role !== 'Hacker')}
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
                    <LocalHospitalIcon sx={{ fontSize: '4rem', color: user && (user.role === 'Patient' || user.role === 'Hacker') ? 'black' : 'gray' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: '1rem',
                            fontFamily: '"Anton", sans-serif',
                            color: user && (user.role === 'Patient' || user.role === 'Hacker') ? 'black' : 'gray',
                        }}
                    >
                        Patient Dashboard
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
