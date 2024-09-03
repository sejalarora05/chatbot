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
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordApi } from '../../api_config/api_services';
import { toast, ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';
import { NETSMARTZ_THEME_COLOR } from '../../utils/theme/colors';
import { FormLabel } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';

const defaultTheme = createTheme();

export default function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();
    const notifyError = (message: string) => toast.error(message);
    const [loading, setLoading] = React.useState(false)

    const validationSchema = yup.object({
        new_password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('New Password is required'),
        confirm_password: yup.string()
            .oneOf([yup.ref('new_password')], 'Please ensure that the confirm password matches the new password.')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            new_password: '',
            confirm_password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (values && Object.keys(values).length > 0) {

                setLoading(true)
                const reqPayload = { ...values, 'token': token }
                await resetPasswordApi(reqPayload).then((result: any) => {
                    if (result?.success) {
                        setLoading(false)
                        toast.success('Your password has been reset successfully.')
                        resetForm()
                        //navigate('/email-sent')
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
                            <ArrowBackIcon sx={{ marginRight: '2px', paddingBottom: '3px', color: '#F58220' }} />
                            <Link sx={{ color: "#F58220", textDecoration: 'none' }} href="/login" variant="body2">
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
                            paddingTop: '25px'
                        }}
                        elevation={6}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
                        <Typography sx={{ fontWeight: '600', color: "#F58220" }} variant="h5">
                            Reset Password
                        </Typography>
                        <Typography component="h1" marginTop='4px' fontWeight={600} variant="subtitle1">
                        Please enter your new password below!
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1, pl: 4, pr: 4, width: '100%' }}>

                            {/* <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                name="new_password"
                                label="New Password"
                                type="password"
                                id="new_password"
                                autoComplete="current-password"
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                helperText={formik.touched.new_password && formik.errors.new_password}
                            />
                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                autoComplete="current-password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                            /> */}

                            <FormLabel sx={{ color: 'black', mt: 1 }} htmlFor="password">New Password</FormLabel>
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
                                name="new_password"
                                type="password"
                                id="new_password"
                                placeholder='Enter New Password'
                                autoComplete="current-password"
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                helperText={formik.touched.new_password && formik.errors.new_password}
                            />

                            <FormLabel sx={{ color: 'black', mt: 1 }} htmlFor="password">Confirm Password</FormLabel>
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
                                name="confirm_password"
                                type="password"
                                id="confirm_password"
                                placeholder='Enter Confirm Password'
                                autoComplete="current-password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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
                        backgroundImage: `url(${require('../../assets/SignIn/Step_01/resetPassword.png')})`,
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