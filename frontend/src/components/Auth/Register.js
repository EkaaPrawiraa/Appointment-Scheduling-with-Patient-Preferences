import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Select, MenuItem } from '@mui/material';
import { Snackbar,Alert,CircularProgress} from '@mui/material';


const Register = () => {
    const [emailTerm, setEmailTerm] = useState('');
    const [passwordTerm, setPasswordTerm] = useState('');
    const [emailFormatAllowed, setEmailFormatAllowed] = useState(false);
    const [passwordFormatAllowed, setPasswordFormatAllowed] = useState(false);
    const [passwordConfirmationTerm,setPasswordConfirmationTerm]=useState('');
    const [passwordConfirmationAllowed,setPasswordConfirmationAllowed]=useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);
    

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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                    setSnackbarMessage('Registration Successfully');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    console.log("Registration successful");

                    setLoading(true);
                    setTimeout(() => {
                    setLoading(false);
                    navigate('/login');
                    }, 2000);
                } else {
                    setSnackbarMessage('Registration Failed. Email Already Exist');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                    console.error('Failed to register');
                }
            } catch (error) {
                setSnackbarMessage('Registration Failed');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.error('An error occurred during registration:', error);
            }
        } else {
            if (!emailFormatAllowed) {
                setSnackbarMessage('Invalid Email Format');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log("Invalid email format");
            } else if (!passwordFormatAllowed) {
                setSnackbarMessage('Invalid Password Format');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log("Invalid password format");
            } else if(!passwordConfirmationAllowed) {
                setSnackbarMessage("Password Confirmation Doesn't match");
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log("Password confirmation does not match");
            } else if  (roleTerm !== 'Admin' && roleTerm !== 'Patient') {
                setSnackbarMessage('Invalid Role');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.log("Invalid role");
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
                height: '80vh',
                display: 'flex',
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
                            value={passwordTerm}
                            type='password'
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
                    <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr max-content',
                            columnGap: '.75rem',
                            alignItems: 'center',
                            border: '2px solid',
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
                    <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr max-content',
                            columnGap: '.75rem',
                            alignItems: 'center',
                            border: '2px solid ',
                            paddingInline: '1.25rem',
                            borderRadius: '4rem',
                        }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SupervisorAccountIcon sx={{ color: 'black', marginRight: '0.5rem' }} />
                            <Select
                                variant="outlined"
                                value={roleTerm}
                                onChange={handleRoleTerm}
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
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                }}
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Patient">Patient</MenuItem>
                            </Select>
                        </Box>

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
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Register'}
                </Button>

                <Box
                    sx={{
                        fontSize: '.813rem',
                        textAlign: 'center',
                        color: 'black',
                    }}
                >
                    Already have an account?{' '}
                    <Box
                        component="a"
                        onClick={() => navigate('/login')}
                        sx={{
                            color: 'black',
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

export default Register;
