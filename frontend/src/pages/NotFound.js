import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <Box
            sx={{
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: '2rem' }}>
                To Farr Brodyy.
            </Typography>
            <Button
                onClick={handleGoHome}
                variant="contained"
                sx={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '4rem',
                    color: 'black',
                    fontWeight: 500,
                }}
            >
                Go Home
            </Button>
        </Box>
    );
};

export default NotFound;
