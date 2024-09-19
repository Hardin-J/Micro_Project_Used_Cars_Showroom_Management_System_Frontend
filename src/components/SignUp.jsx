// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useState } from 'react';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Alert, Snackbar } from '@mui/material';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="/">
//                 BMW Revved Autos
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// export default function SignUp() {
//     const [data, setData] = React.useState({
//         customerName: '',
//         email: '',
//         password: '',
//         phoneNumber: '',
//         dateOfBirth: '',
//     })
//     console.log(data);
//     console.log(data.dateOfBirth);


//     const nav = useNavigate();
//     const [open, setOpen] = React.useState(false);
//     const [snackMsg, setSnackMsg] = React.useState('');

//     let handleSubmit = (e) => {
//         e.preventDefault();
//         let result = validateValues(data);

//         if (result === true && confPass === true) {
//             axios
//                 .post("http://localhost:1310/customers", data)
//                 .then((res) => {
//                     // console.log(data);
//                     console.log(res.data);
//                     setSnackMsg("User Registered");
//                     // setSeverity("success");
//                     setOpen(true); // Show Snackbar
//                     setTimeout(() => {
//                         setOpen(false);
//                         nav("/");
//                     }, 3000);
//                     // alert("User added Successfully");
//                 })
//                 .catch((err) => console.log(err));
//         } else {
//             // setDataMessage("Please Enter the Valid Inputs!!!");
//         }
//     };

//     console.log(data);

//     const [dataStatus, setDataStatus] = React.useState('');
//     const [dataMessage, setDataMessage] = React.useState('');

//     const validateValues = (data) => {
//         if (data.customerName === "") {
//             setDataMessage("Please Enter your Name!!!");
//             setDataStatus(false);
//             return false;
//         } else if (data.email === "") {
//             setDataMessage("Please Enter your Email!!!");
//             setDataStatus(false);
//             return false;
//         } else if (data.phoneNumber === "") {
//             setDataMessage("Please Enter your phone number!!!");
//             setDataStatus(false);
//             return false;
//         } else if (!/^\d{10}$/.test(data.phoneNumber)) {
//             setDataMessage("Please Enter a valid 10-digit phone number!!!");
//             setDataStatus(false);
//             return false;
//         } else if (data.dateOfBirth === "") {
//             setDataMessage("Please Enter your Date of Birth!!!");
//             setDataStatus(false);
//             return false;
//         } else if (data.password === "") {
//             setDataMessage("Please Enter your Password!!!");
//             setDataStatus(false);
//             return false;
//         } else if (confPass === "") {
//             setDataMessage("Please Enter Confirm Password!!!");
//             setDataStatus(false);
//             return false;
//         } else {
//             setDataStatus(true);
//             return true;
//         }
//     };

//     const [confPass, setConfPass] = React.useState('');
//     const [alertMessage, setAlertMessage] = React.useState('');

//     const handleConfirmPassword = (e) => {
//         if (data.password === e.target.value) {
//             setConfPass(true);
//             setAlertMessage('Password matches!');
//         } else {
//             setConfPass(false);
//             setAlertMessage('Password does not match!');
//         }
//     }


//     const [selectedDate, setSelectedDate] = useState(null);

//     // Calculate the minimum valid date (18 years ago from today)
//     const today = dayjs();
//     const minDate = today.subtract(18, 'year').startOf('day') + 1;

//     // Function to disable dates based on the minimum date
//     const isDateDisabled = (date) => {
//         return date.isAfter(today) || date.isAfter(minDate);
//     };

//     return (

//         <section style={{
//             backgroundImage: `url('https://th.bing.com/th/id/R.f3acf72b62df95e0b366147dd76bdd29?rik=NMyeS16IAlrQEQ&riu=http%3a%2f%2fhdcarwallpapers.com%2fwalls%2f2016_bmw_m2_coupe_cars-wide.jpg&ehk=1RNVLoCiLD0MJ14J5ZFodfgn12CwUpaPZa5r3miGMtE%3d&risl=&pid=ImgRaw&r=0')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             filter: 'blur(8px)',
//             height: '100vh', // Full height
//             width: '100%', // Full width
//             display: 'flex',
//             alignItems: 'center',
//             zIndex:-10,
//             justifyContent: 'center',
//             overflow:'hidden'
//         }}>
//             <Container
//                 component="main"
//                 maxWidth="xs"
//                 sx={{
//                     zIndex:100,                
//                 }}
//             >            <ThemeProvider theme={defaultTheme}>
//                     <Container component="main" maxWidth="xs" >
//                         <CssBaseline />
//                         <Box
//                             sx={{
//                                 marginTop: 8,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 filter: 'blur(-10px)',
//                                 zIndex:100,     

//                             }}
//                         >
//                             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                                 <LockOutlinedIcon />
//                             </Avatar>
//                             <Typography component="h1" variant="h5">
//                                 Sign up
//                             </Typography>
//                             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12}>
//                                         {(dataStatus === false) && <div className="alert alert-danger">
//                                             {dataMessage}
//                                         </div>
//                                         }
//                                     </Grid>
//                                     <Grid item xs={12} sm={12}>
//                                         <TextField
//                                             name="customerName"
//                                             required
//                                             fullWidth
//                                             id="firstName"
//                                             label="Name"
//                                             onChange={(e) =>
//                                                 setData({ ...data, customerName: e.target.value })
//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="email"
//                                             label="Email Address"
//                                             name="email"
//                                             onChange={(e) =>
//                                                 setData({ ...data, email: e.target.value })
//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             name="phoneNumber"
//                                             label="Phone Number"
//                                             type="text"
//                                             id="password"
//                                             onChange={(e) =>
//                                                 setData({ ...data, phoneNumber: e.target.value })
//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                             <DatePicker
//                                                 label="Select Date of Birth"
//                                                 value={selectedDate}
//                                                 onChange={(date) =>
//                                                     setData({ ...data, dateOfBirth: date })
//                                                 }
//                                                 // onChange={(date) => setSelectedDate(date)}
//                                                 renderInput={(params) => <TextField {...params} />}
//                                                 shouldDisableDate={(date) => isDateDisabled(dayjs(date))}
//                                                 disableFuture
//                                                 required
//                                                 sx={{ width: "100%" }}
//                                             />
//                                         </LocalizationProvider>

//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             name="password"
//                                             label="Password"
//                                             type="password"
//                                             id="password"
//                                             onChange={(e) =>
//                                                 setData({ ...data, password: e.target.value })
//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             name="password"
//                                             label="Confirm Password"
//                                             type="password"
//                                             id="conf-pass"
//                                             onChange={(e) =>
//                                                 handleConfirmPassword(e)
//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         {(confPass === false) && <div className="alert alert-danger">
//                                             {alertMessage}
//                                         </div>
//                                         }
//                                         {(confPass === true) && <div className="alert alert-success">
//                                             {alertMessage}
//                                         </div>
//                                         }
//                                     </Grid>
//                                     <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
//                                         <Alert onClose={() => setOpen(false)} severity={"success"} variant="filled" sx={{ width: '100%' }}>
//                                             {snackMsg}
//                                         </Alert>
//                                     </Snackbar>

//                                 </Grid>
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={{ mt: 3, mb: 2 }}
//                                 >
//                                     Sign Up
//                                 </Button>
//                                 <Grid container justifyContent="flex-end">
//                                     <Grid item>
//                                         <Link href="#" variant="body2">
//                                             Already have an account? Sign in
//                                         </Link>
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Box>
//                         <Copyright sx={{ mt: 2 }} />
//                     </Container>
//                 </ThemeProvider>
//             </Container>
//         </section >
//     );
// }


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

function Copyright(props) {
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

export default function SignUp() {
    const [data, setData] = useState({
        customerName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
    });

    const nav = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let result = validateValues(data);
        if (result && confPass) {
            axios
                .post("http://localhost:1310/customers", data)
                .then((res) => {
                    setSnackMsg("User Registered");
                    setOpen(true);
                    setTimeout(() => {
                        setOpen(false);
                        nav("/");
                    }, 3000);
                })
                .catch((err) => console.log(err));
        }
    };

    const [dataStatus, setDataStatus] = useState('');
    const [dataMessage, setDataMessage] = useState('');
    const validateValues = (data) => {
        if (data.customerName === "") {
            setDataMessage("Please Enter your Name!!!");
            setDataStatus(false);
            return false;
        } else if (data.email === "") {
            setDataMessage("Please Enter your Email!!!");
            setDataStatus(false);
            return false;
        } else if (data.phoneNumber === "") {
            setDataMessage("Please Enter your phone number!!!");
            setDataStatus(false);
            return false;
        } else if (!/^\d{10}$/.test(data.phoneNumber)) {
            setDataMessage("Please Enter a valid 10-digit phone number!!!");
            setDataStatus(false);
            return false;
        } else if (data.dateOfBirth === "") {
            setDataMessage("Please Enter your Date of Birth!!!");
            setDataStatus(false);
            return false;
        } else if (data.password === "") {
            setDataMessage("Please Enter your Password!!!");
            setDataStatus(false);
            return false;
        } else if (confPass === "") {
            setDataMessage("Please Enter Confirm Password!!!");
            setDataStatus(false);
            return false;
        } else {
            setDataStatus(true);
            return true;
        }
    };

    const [confPass, setConfPass] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const handleConfirmPassword = (e) => {
        if (data.password === e.target.value) {
            setConfPass(true);
            setAlertMessage('Password matches!');
        } else {
            setConfPass(false);
            setAlertMessage('Password does not match!');
        }
    }

    const [selectedDate, setSelectedDate] = useState(null);
    const today = dayjs();
    const minDate = today.subtract(18, 'year').startOf('day');

    const isDateDisabled = (date) => {
        return date.isAfter(today) || date.isAfter(minDate);
    };

    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('https://th.bing.com/th/id/R.f3acf72b62df95e0b366147dd76bdd29?rik=NMyeS16IAlrQEQ&riu=http%3a%2f%2fhdcarwallpapers.com%2fwalls%2f2016_bmw_m2_coupe_cars-wide.jpg&ehk=1RNVLoCiLD0MJ14J5ZFodfgn12CwUpaPZa5r3miGMtE%3d&risl=&pid=ImgRaw&r=0')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment:'fixed',
                filter: 'blur(8px)',
                zIndex: 1,
            }} /> <br /><br /><br />

            <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 2, marginTop:"30px" }}>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Translucent background for the form
                            padding: '20px',
                            borderRadius: '8px',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {(dataStatus === false) && <div className="alert alert-danger">
                                        {dataMessage}
                                    </div>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="customerName"
                                        required
                                        fullWidth
                                        label="Name"
                                        onChange={(e) => setData({ ...data, customerName: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type="text"
                                        onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Select Date of Birth"
                                            value={selectedDate}
                                            onChange={(date) => setData({ ...data, dateOfBirth: date })}
                                            renderInput={(params) => <TextField {...params} />}
                                            shouldDisableDate={(date) => isDateDisabled(dayjs(date))}
                                            disableFuture
                                            required
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Confirm Password"
                                        type="password"
                                        onChange={handleConfirmPassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {(confPass === false) && <div className="alert alert-danger">{alertMessage}</div>}
                                    {(confPass === true) && <div className="alert alert-success">{alertMessage}</div>}
                                </Grid>
                                <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                                    <Alert onClose={() => setOpen(false)} severity={"success"} variant="filled" sx={{ width: '100%' }}>
                                        {snackMsg}
                                    </Alert>
                                </Snackbar>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 2 }} />
                </ThemeProvider>
            </Container>
        </section>
    );
}
