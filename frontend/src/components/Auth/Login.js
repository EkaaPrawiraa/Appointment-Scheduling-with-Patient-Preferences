import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import bgImage from '../../assets/images/login-bg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [emailTerm, setEmailTerm] = useState('');
    const [passwordTerm, setPasswordTerm] = useState('');
    const [emailFormatAllowed, setEmailFormatAllowed] = useState(false);
    const [passwordFormatAllowed, setPasswordFormatAllowed] = useState(false);
    const navigate = useNavigate();

    const handleEmailTerm = (e) => {
        const inputValue = e.target.value;
        setEmailTerm(inputValue);
    };

    const handlePasswordTerm = (e) => {
        const inputValue = e.target.value;
        setPasswordTerm(inputValue);
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
                    console.log("Login successful");
                    navigate('/register');
                } else {
                    console.error('Failed to login');
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            }
        } else if (!emailFormatAllowed) {
            console.log("Email format salah");
        } else {
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
                backgroundImage: `url(${bgImage})`,
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
                    border: '2px solid hsla(0, 0%, 100%, .7)',
                    padding: '2.5rem 1rem',
                    color: 'white',
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
                            border: '2px solid hsla(0, 0%, 100%, .7)',
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
                                color: 'white',
                                '& .MuiInputBase-input': {
                                    color: 'white',
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
                            border: '2px solid hsla(0, 0%, 100%, .7)',
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
                                color: 'white',
                                '& .MuiInputBase-input': {
                                    color: 'white',
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
                >
                    Login
                </Button>

                <Box
                    sx={{
                        fontSize: '.813rem',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    Don't have an account?{' '}
                    <Box
                        component="a"
                        onClick={() => navigate('/register')}
                        sx={{
                            color: 'white',
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
        </Box>
    );
};

export default Login;
