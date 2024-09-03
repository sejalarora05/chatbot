import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setSelectedOrganization } from '../../api_config/slices/authSlice';
import { CircularProgress, FormLabel } from '@mui/material';
import { loginApi } from '../../api_config/api_services';
import { AxiosError } from 'axios';
import { NETSMARTZ_THEME_COLOR } from '../../utils/theme/colors';
import { ThreeDots } from "react-loader-spinner";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifyError = (message: string) => toast.error(message);
  const [loading, setLoading] = React.useState(false)

  const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values && Object.keys(values).length > 0) {
        setLoading(true)
        // localStorage.setItem('token', `${Math.random()}`)
        // dispatch(setAuthToken({token:`${Math.random()}`}))
        // navigate('/')


        await loginApi(values).then((result: any) => {
          console.log({ result })
          if (result?.success) {
            setLoading(false)
            const access_token = result?.data?.access_token;
            const refresh_token = result?.data?.refresh_token;
            console.log(result?.data, 'result')
            localStorage.setItem('token', `${access_token}`)
            dispatch(setAuthToken(result?.data))
            dispatch(setSelectedOrganization({ org_id: result?.data?.organisations?.[0]?.org_id }))
            navigate('/')
          }
          else {
            const message: string = result.data?.message || "Something Went Wrong."
            notifyError(message);
            setLoading(false)
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
          // Notify error and set response message
          notifyError(errorMessage);
          setLoading(false)

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
            <Typography sx={{ fontWeight: '600', color: "#F58220", }} variant="h5">
              Sign in
            </Typography>
            <Typography component="h1" marginTop='3px' fontWeight={600} variant="subtitle1">
              Enter your credentials to continue.
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2, pl: 7, pr: 7 }}>
              <FormLabel sx={{ color: 'black' }} htmlFor="email">Email</FormLabel>
              <TextField
                margin="normal"
                sx={{
                  marginTop: 0.5,
                  '& .MuiOutlinedInput-root': {
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
                size='small'
                required
                fullWidth
                id="email"
                name="email"
                type='email'
                autoComplete="email"
                placeholder='Enter Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormLabel sx={{ color: 'black', mt: 1 }} htmlFor="password">Password</FormLabel>
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
                name="password"
                type="password"
                id="password"
                placeholder='Enter Password'
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              {/* <TextField
                margin="normal"
                size='small'
                required
                fullWidth
                id="username"
                label="Enter Username"
                name="username"
                type='username'
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              /> */}
              {/* <Grid container>
                     <Grid item xs>
                <FormControlLabel
                sx={{color:'orange', height:'30px'}}
                control={<Checkbox value="remember" sx={{ height:'30px', color:'orange'}} />}
                label="Remember me"
              />
                </Grid>
                <Grid item>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid> */}


              <Grid container mt={2}>
                <Grid item xs>
                  <FormControlLabel
                    sx={{
                      // color: 'orange',
                      height: '30px',
                      marginRight: 'auto', // Aligns the item to the left
                      '& .Mui-checked': { // Styles applied when the checkbox is checked
                        color: '#F58220 !important',

                      },
                      '& .MuiFormControlLabel-label': {
                        fontSize: '15px !important' // Smaller label font size
                      },
                    }}
                    control={<Checkbox value="remember" sx={{ height: '20px', color: '#F58220', fontSize: '14px !important' }} />}
                    label="Remember Me?"
                  />
                </Grid>

                {/* <Grid item sx={{ marginLeft: 'auto' }}> Aligns the item to the right */}
                {/* <Link href="/forgot-password" variant="body2" sx={{
                    marginTop: '2px', color: '#F58220', fontSize: '15px', textDecoration: 'none', // Remove underline
                    borderBottom: '1px solid #F58220', // Add underline with orange color
                  }}>
                    Forgot password?
                  </Link> */}
                {/* </Grid> */}

              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: '40px' }}
                className='upload-button'
                disabled={loading}
              >
                {loading ? <ThreeDots height='40px' width='40px' color="white" /> : 'Sign In'}

              </Button>

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
            backgroundImage: `url(${require('../../assets/SignIn/Step_01/login.png')})`,
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