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
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { signUpApi } from '../../api_config/api_services';
import CircularProgress from '@mui/material/CircularProgress';
import { NETSMARTZ_THEME_COLOR } from '../../utils/theme/colors';
import { ThreeDots } from 'react-loader-spinner';

const defaultTheme = createTheme();

export default function Signup() {
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notifyError = (message: string) => toast.error(message);

    const validationSchema = yup.object({
        username: yup.string().required('User Name is required'),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        organization: yup.string().required('Organization Name is required'),
        password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            organization: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (values && Object.keys(values).length > 0) {
                setLoading(true)
                await signUpApi(values).then((result: any) => {
                   
                    if (result?.success) {
                        setLoading(false)
                        resetForm()
                        toast.success(result?.data?.message)
                       // navigate('/login')
                    }
                    else {
                        setLoading(false)
                        const message: string = result.data?.response?.data?.error || "Something Went Wrong."
                        notifyError(message);
                    }



                }).catch((err: any) => {
                    const error = err as AxiosError;
                    // Consolidated error handling
                    let errorMessage = "Something went wrong.";
                    if (error.response) {
                        const responseData = error.response.data as { error?: string };
                        if (responseData?.error) {
                            errorMessage = responseData.error;
                        }
                    } else {
                        errorMessage = "Error occurred while setting up the request: " + error.message;
                    }
                    setLoading(false)
                    // Notify error and set response message
                    notifyError(errorMessage);
                })
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
                    <Paper
                        sx={{
                            my: 1,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '20px'
                        }}
                        elevation={6}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
                        <Typography sx={{ fontWeight: '600', color: NETSMARTZ_THEME_COLOR, }} variant="h5">
                            Sign Up
                        </Typography>
                        <Typography component="h1" marginTop='3px' fontWeight={600} variant="subtitle1">
                        Please fill in the below fields to register the customer
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1, pl: 7, pr: 7 }}>
                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                id="username"
                                label="Enter Username"
                                name="username"
                                type='text'
                                // autoComplete="email"
                                //  autoFocus
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                id="email"
                                label="Enter Email"
                                name="email"
                                type='email'
                                // autoComplete="email"
                                //  autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                name="password"
                                label="Enter Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />

                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                id="organization"
                                label="Enter Organization Name"
                                name="organization"
                                type='text'
                                // autoComplete="email"
                                //  autoFocus
                                value={formik.values.organization}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.organization && Boolean(formik.errors.organization)}
                                helperText={formik.touched.organization && formik.errors.organization}
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, height:'40px' }}
                                className='upload-button'
                            >
                                 {loading ? <ThreeDots height='40px' width='40px' color="white" /> : ' Sign Up'}
                               
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link sx={{
                    marginTop: '2px', color: '#F58220', fontSize: '16px', textDecoration: 'none', // Remove underline
                    borderBottom: '1px solid #F58220', // Add underline with orange color
                  }} href="/login" variant="body2">
                                        Already have an account?
                                    </Link>
                                </Grid>
                                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
                            </Grid>
                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${require('../../assets/SignIn/Step_01/signup.png')})`,
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