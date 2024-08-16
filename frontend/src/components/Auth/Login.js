import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import bgImage from '../../assets/images/login-bg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar,Alert,CircularProgress} from '@mui/material';
import { useAuth } from '../../services/authService';



const Login = () => {
    const [emailTerm, setEmailTerm] = useState('');
    const [passwordTerm, setPasswordTerm] = useState('');
    const [emailFormatAllowed, setEmailFormatAllowed] = useState(false);
    const [passwordFormatAllowed, setPasswordFormatAllowed] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleEmailTerm = (e) => {
        const inputValue = e.target.value;
        setEmailTerm(inputValue);
    };

    const handlePasswordTerm = (e) => {
        const inputValue = e.target.value;
        setPasswordTerm(inputValue);
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };
    

    const handleLoginButton = async (e) => {
        e.preventDefault();

        if (emailFormatAllowed && passwordFormatAllowed) {
            try {
                const response = await axios.post('http://localhost:5001/api/login', {
                    email: emailTerm,
                    password: passwordTerm,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const { email, role } = response.data.user;
                    
                    login({ email, role });
                    setSnackbarMessage('Login Successfully');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    setLoading(true);
                    setTimeout(() => {
                    setLoading(false);
                    navigate('/Home');
                    }, 2000); 
                } else {
                    setSnackbarMessage('Login Failed');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                    console.error('Failed to login');
                }
            } catch (error) {
                setSnackbarMessage('Login Failed');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.error('An error occurred during login:', error);
            }
        } else if (!emailFormatAllowed) {
                setSnackbarMessage('Invalid Email Format');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            console.log("Email format salah");
        } else {
            setSnackbarMessage('Invalid Password Format');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            console.log("Password format salah");
        }
    };

    useEffect(() => {
        if (emailTerm.startsWith('@')) {
            setEmailFormatAllowed(false);
            return;
        }
        let domain = emailTerm.substring(emailTerm.indexOf('@') + 1);
        if (domain.indexOf('.') === -1 || domain.startsWith(".") || domain.endsWith(".")) {
            setEmailFormatAllowed(false);
            return;
        }
        setEmailFormatAllowed(true);
    }, [emailTerm]);

    useEffect(() => {
        if (passwordTerm.length < 8) {
            setPasswordFormatAllowed(false);
            return;
        } else if (!(/\d/.test(passwordTerm))) {
            setPasswordFormatAllowed(false);
            return;
        } else if (!(/[A-Z]/.test(passwordTerm))) {
            setPasswordFormatAllowed(false);
            return;
        }
        setPasswordFormatAllowed(true);
    }, [passwordTerm]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                component="form"
                sx={{
                    position: 'relative',
                    marginInline: '1.5rem',
                    backgroundColor: 'hsla(0, 0%, 100%, .01)',
                    border: '2px solid ',
                    padding: '2.5rem 1rem',
                    color: 'black',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(16px)',
                    maxWidth: '420px',
                    width: '100%',
                }}
            >
                <Box
                    component="h1"
                    sx={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        marginBottom: '1.25rem',
                    }}
                >
                    Login
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        rowGap: '1.25rem',
                        marginBottom: '1rem',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr max-content',
                            columnGap: '.75rem',
                            alignItems: 'center',
                            border: '2px solid ',
                            paddingInline: '1.25rem',
                            borderRadius: '4rem',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Email"
                            value={emailTerm}
                            onChange={handleEmailTerm}
                            sx={{
                                width: '100%',
                                background: 'none',
                                color: 'black',
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    padding: '1rem',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: <PersonIcon />,
                            }}
                        />
                        
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr max-content',
                            columnGap: '.75rem',
                            alignItems: 'center',
                            border: '2px solid ',
                            paddingInline: '1.25rem',
                            borderRadius: '4rem',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Password"
                            type='password'
                            value={passwordTerm}
                            onChange={handlePasswordTerm}
                            sx={{
                                width: '100%',
                                background: 'none',
                                color: 'black',
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    padding: '1rem',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: <LockIcon />,
                            }}
                        />
                        
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    onClick={handleLoginButton}
                    type="submit"
                    sx={{
                        width: '100%',
                        padding: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '4rem',
                        color: 'black',
                        fontWeight: 500,
                    }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
                
                <Box
                    sx={{
                        fontSize: '.813rem',
                        textAlign: 'center',
                        color: 'black',
                    }}
                >
                    Don't have an account?{' '}
                    <Box
                        component="a"
                        onClick={() => navigate('/register')}
                        sx={{
                            color: 'black',
                            fontWeight: 500,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Register
                    </Box>
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

export default Login;
