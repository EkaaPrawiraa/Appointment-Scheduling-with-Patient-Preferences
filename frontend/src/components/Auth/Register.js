import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import bgImage from '../../assets/images/login-bg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


const Register = () => {
    const [emailTerm, setEmailTerm] = useState('');
    const [passwordTerm, setPasswordTerm] = useState('');
    const [emailFormatAllowed, setEmailFormatAllowed] = useState(false);
    const [passwordFormatAllowed, setPasswordFormatAllowed] = useState(false);
    const [passwordConfirmationTerm,setPasswordConfirmationTerm]=useState('');
    const [passwordConfirmationAllowed,setPasswordConfirmationAllowed]=useState(false);
    const navigate = useNavigate();
    const [roleTerm, setRoleTerm] = useState('');


    const handleEmailTerm = (e) => {
        const inputValue = e.target.value;
        setEmailTerm(inputValue);
    };
    const handleRoleTerm = (e) => {
        const inputValue = e.target.value;
        setRoleTerm(inputValue);
    };

    const handlePasswordTerm = (e) => {
        const inputValue = e.target.value;
        setPasswordTerm(inputValue);
    };
    const handlePasswordConfirmationTerm = (e) => {
        const inputValue = e.target.value;
        setPasswordConfirmationTerm(inputValue);
    };

    

    const handleRegisterButton = async (e) => {
        e.preventDefault();

        if (emailFormatAllowed && passwordFormatAllowed && passwordConfirmationAllowed && (roleTerm === 'Admin' || roleTerm === 'Patient')) {
            try {
                const response = await axios.post('http://localhost:5001/api/register', {
                    email: emailTerm,
                    password: passwordTerm,
                    role: roleTerm,
                });

                if (response.status === 201) {
                    console.log("Registration successful");
                    navigate('/login');
                } else {
                    console.error('Failed to register');
                }
            } catch (error) {
                console.error('An error occurred during registration:', error);
            }
        } else {
            if (roleTerm !== 'Admin' && roleTerm !== 'Patient') {
                console.log("Invalid role");
            } else if (!emailFormatAllowed) {
                console.log("Invalid email format");
            } else if (!passwordFormatAllowed) {
                console.log("Invalid password format");
            } else {
                console.log("Password confirmation does not match");
            }
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

    useEffect(()=>{
        if (passwordTerm != passwordConfirmationTerm){
            setPasswordConfirmationAllowed(false);
            return;
        }
        setPasswordConfirmationAllowed(true);
    },[passwordConfirmationTerm])

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
                    Register
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
                            value={passwordTerm}
                            type='password'
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
                    <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr max-content',
                            columnGap: '.75rem',
                            alignItems: 'center',
                            border: '2px solid hsla(0, 0%, 100%, .7)',
                            paddingInline: '1.25rem',
                            borderRadius: '4rem',
                        }}>
                        <TextField
                                variant="outlined"
                                placeholder="Password Confirmation"
                                value={passwordConfirmationTerm}
                                type='password'
                                onChange={handlePasswordConfirmationTerm}
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
                    <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr max-content',
                            columnGap: '.75rem',
                            alignItems: 'center',
                            border: '2px solid hsla(0, 0%, 100%, .7)',
                            paddingInline: '1.25rem',
                            borderRadius: '4rem',
                        }}>
                        <TextField
                                variant="outlined"
                                placeholder="Role"
                                value={roleTerm}
                                onChange={handleRoleTerm}
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
                                    startAdornment: <SupervisorAccountIcon />,
                                }}
                            />
                    </Box>
                </Box>


                <Button
                    variant="outlined"
                    onClick={handleRegisterButton}
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
                    Register
                </Button>

                <Box
                    sx={{
                        fontSize: '.813rem',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    Already have an account?{' '}
                    <Box
                        component="a"
                        onClick={() => navigate('/login')}
                        sx={{
                            color: 'white',
                            fontWeight: 500,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Login
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
