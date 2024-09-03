import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CompanyLogo from '../common/CompanyLogo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import emailSent from "../../assets/SignIn/Step_01/email.png";
import { Avatar } from '@mui/material';
import { NETSMARTZ_THEME_COLOR } from '../../utils/theme/colors';


const defaultTheme = createTheme();

export default function EmailSent() {
    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate('/login')
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
                    <CompanyLogo />
       
                    <Paper
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '40px',
                            textAlign: 'center'
                        }}
                        elevation={6}
                    >                            <div>
                    <img style={{ width: '100px'}} src={emailSent} />
                </div>

                        <Typography sx={{ fontWeight: '600', color: "#F58220" }} variant="h5">
                        An Email Has Been Sent Successfully To Your Registered Email ID!
                        </Typography>
                        <Typography component="h1" marginTop='10px' fontWeight={600} variant="subtitle1">
                        Please check your registered email ID for instructions to reset your password.
                        </Typography>

                        <Grid mt={3} justifyContent='center' container>
                        <Button onClick={handleBack} sx={{backgroundColor:NETSMARTZ_THEME_COLOR, color:'white !important', fontWeight:600, padding:'10px',                             '&:hover': {
                              backgroundColor: "black !important", // Optional: change color on hover
                            }}} variant='contained'>
                            <ArrowBackIcon sx={{ marginRight: '5px', color: 'white' }} />
                            
                                Back To Login
                            
                        </Button>
                    </Grid>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${require('../../assets/SignIn/Step_01/emailSent.png')})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

            </Grid>
        </ThemeProvider>
    );
}