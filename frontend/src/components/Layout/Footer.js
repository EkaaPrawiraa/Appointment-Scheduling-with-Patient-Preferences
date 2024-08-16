import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/images/footer.jpeg';
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
    const { user, logout } = useAuth(); // Dapatkan user dari context
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login'); 
    };

    const handleDashboard = ()=>{
        if (user && user.role === 'Admin'){
            navigate('/admin');
        }else if (user && user.role === 'Patient'){
            navigate('/patient');
        }
        else{
            navigate('/patient');
        }
    };

    return (
        <AppBar 
            position="static" 
            sx={{ 
                top: 'auto', 
                bottom: 0, 
                backgroundImage: `url(${bgImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'black',
                padding: 1, 
            }}
        >
            <Toolbar>
                <Box sx={{ flex: 1 }}>
                    <Button 
                        component={Link} 
                        to="/Home" 
                        sx={{ 
                            fontFamily: '"Anton", sans-serif', 
                            color: 'black',
                            fontSize: '1.25rem' 
                        }}
                        startIcon={<HomeIcon sx={{ fontSize: 'rem' }} />} 
                    >
                        Home
                    </Button>
                </Box>
                <Box sx={{ flex: 2, textAlign: 'center' }}>
                    <Button 
                        onClick={handleDashboard}
                        sx={{ 
                            fontFamily: '"Anton", sans-serif', 
                            color: 'black',
                            fontSize: '1.25rem' 
                        }}
                        startIcon={<SpaceDashboardIcon sx={{ fontSize: '2rem' }} />} 
                    >
                        Dashboard
                    </Button>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'right' }}>
                    {user ? (
                        <Button 
                            onClick={handleSignOut}
                            sx={{ 
                                fontFamily: '"Anton", sans-serif', 
                                color: 'black',
                                fontSize: '1.25rem' 
                            }}
                            startIcon={<LogoutIcon sx={{ fontSize: '2rem' }} />} 
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleLogin}
                            sx={{ 
                                fontFamily: '"Anton", sans-serif', 
                                color: 'black',
                                fontSize: '1.25rem' 
                            }}
                            startIcon={<LoginIcon sx={{ fontSize: '2rem' }} />} 
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
