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
import { toast, ToastContainer } from 'react-toastify';
import { Avatar, CircularProgress, FormLabel } from '@mui/material';
import { AxiosError } from 'axios';
import { emailSentApi } from '../../api_config/api_services';
import { ThreeDots } from 'react-loader-spinner';
import { NETSMARTZ_THEME_COLOR } from '../../utils/theme/colors';
const defaultTheme = createTheme();

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false)
    const notifyError = (message: string) => toast.error(message);
    const validationSchema = yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log({ values })
            if (values && Object.keys(values).length > 0) {
                setLoading(true)
                await emailSentApi(values).then((result: any) => {
                    if (result?.success) {
                        setLoading(false)
                        navigate('/email-sent')
                    }
                    else {
                        setLoading(false)
                        const message: string = result.data?.response?.data?.error || "Something Went Wrong."
                        notifyError(message);
                    }

                }).catch((err: any) => {
                    setLoading(false)
                    const error = err as AxiosError;
                    // Consolidated error handling
                    let errorMessage = "Something went wrong.";
                    console.log({ err })
                    if (error.response) {
                        const responseData = error.response.data as { error?: string };
                        if (responseData?.error) {
                            errorMessage = responseData.error;
                        }
                    } else {
                        errorMessage = "Error occurred while setting up the request: " + error.message;
                    }
                    // Notify error and set response message
                    notifyError(errorMessage);
                })

            }
            else {
                notifyError('Something Went Wrong.')
            }
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer position="bottom-right" autoClose={2000} />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
                    <CompanyLogo />
                    <Grid container>
                        <Grid ml={4} item xs display='flex'>
                            <ArrowBackIcon sx={{ marginRight: '2px', paddingBottom: '3px', color: NETSMARTZ_THEME_COLOR }} />
                            <Link sx={{ color: NETSMARTZ_THEME_COLOR, textDecoration: 'none' }} href="/login" variant="body2">
                                Back To Login
                            </Link>
                        </Grid>
                    </Grid>
                    <Paper
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '20px',
                            paddingTop:'25px'
                        }}
                        elevation={6}
                    >
                        <Typography sx={{ fontWeight: '600', color: NETSMARTZ_THEME_COLOR }} variant="h5">
                            Forgot Password ?
                        </Typography>
                        <Typography component="h1" marginTop='4px' fontWeight={600} variant="subtitle1">
                            No worries, we’ll send you reset instructions.
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2, pl: 4, pr: 4, width: '100%' }}>
                            {/* 
                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            /> */}

                            <FormLabel sx={{ color: 'black', mt: 1 }} htmlFor="password">Email</FormLabel>
                            <TextField
                                sx={{
                                    marginTop: 0.5, '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'black', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'black', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black', // Border color on focus
                                        },
                                    },
                                }}
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                name="email"
                                type="email"
                                id="email"
                                placeholder='Enter Your Registered Email'
                                autoComplete="current-password"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, height:'40px' }}
                                className='upload-button'
                            >
                                {loading ? <ThreeDots height='40px' width='40px' color="white" /> : 'Reset password'}
                                
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${require('../../assets/SignIn/Step_01/forgotpass.png')})`,
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