import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

export function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                BMW Revved Autos
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function SignInSide() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')
    // const [user, setUser] = React.useState('');

    const [data, setData] = React.useState({});
    const nav = useNavigate();

    const isAdmin = (email, password) => {
        if (email === "mrjeeva1011@gmail.com" && password === "Admin@123") {
            return true;
        }
    }

    const [dataStatus, setDataStatus] = React.useState('');
    const [dataMessage, setDataMessage] = React.useState('');

    const validateValues = (email, password) => {
        if (email === "") {
            setDataStatus("false");
            setDataMessage("Please enter your email address.");
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setDataStatus("false");
            setDataMessage("Invalid email address format.");
            return false;
        } else if (password === "") {
            setDataStatus("false");
            setDataMessage("Please enter your password.");
            return false;
        } else {
            setDataStatus("true");
            return true;
        }
    };

    const [open, setOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    const sendOtp = () => {
        axios
            .get(`http://localhost:1310/mailServices/${email}`)
            .then((response) => {
                console.log(response.data);
                setSnackMsg("OTP sent!!!");
                setSeverity("success");
                setOpen(true); // Show Snackbar
                setTimeout(() => setOpen(false), 3000);
                // sessionStorage.setItem('otp',response.data)
            })
            .catch(err => console.log(err));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(email, password);
        // sessionStorage.setItem("user", user);
        if (result === true) {
            const admin = isAdmin(email, password)
            if (!admin) {
                axios
                    .post(`http://localhost:1310/customers/login/${email}/${password}`).then((res) => {
                        setData(res.data);
                        console.log(res.data);
                        if (res.data === "") {
                            setDataStatus(false);
                            setDataMessage("Invalid Credentials!");
                        } else {
                            sessionStorage.setItem("id", res.data.id);
                            sessionStorage.setItem("name", res.data.customerName);
                            sessionStorage.setItem("email", res.data.email);
                            sessionStorage.setItem("isLog", "yes");
                            sessionStorage.setItem("home", "/");
                            sessionStorage.setItem("user", "customer");
                            nav("/");
                        }
                    }).catch((err) => {
                        if (err.response.status !== 200) {
                            setDataStatus(false);
                            setDataMessage("Invalid Credentials!");
                        }
                    });
            } else {
                // axios
                //     .get(`http://localhost:1310/admins/${email}/${password}`).then((res) => {
                //         setData(res.data);
                sendOtp();
                // console.log(res.status);
                sessionStorage.setItem("name", "Jeevarajan");
                sessionStorage.setItem("email", "mrjeeva1011@gmail.com");
                sessionStorage.setItem("otpLink", "/dashboard");
                sessionStorage.setItem("home", "/dashboard");
                sessionStorage.setItem("isLog", "yes");
                sessionStorage.setItem("isAdmin", "yes");
                sessionStorage.setItem("user", "admin");

                // console.log(otp);                        
                nav("/otp");                
            }

        } else {
            setDataStatus(false);
            // setDataMessage("Please Enter the Valid Inputs!!!");
        }
    }

    return (
        <section>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {snackMsg}
                </Alert>
            </Snackbar>

            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage:
                                'url("https://horizonmotorsport.com/cdn/shop/files/FullSizeRender_a9b439d8-3a4f-4572-8f88-485b543fc66d_1800x1800.jpg?v=1698280862")',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'left',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    {(dataStatus === false) && <div className="alert alert-danger">
                                        {dataMessage}
                                    </div>
                                    }
                                </Grid>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoFocus
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/forgetPswd" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signUp" className='text-dark' variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <br /><br /><br />
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </section>
    );
}