import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle, FaTimesCircle, FaRedoAlt } from 'react-icons/fa';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { motion } from 'framer-motion'; // For animation

export default function SampleDemo() {
    const [token, setTokens] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const email = sessionStorage.getItem('email');
    const nav = useNavigate();
    const [confirm, setConfirm] = useState('');
    const link = sessionStorage.getItem('otpLink');

    const validateOtp = () => {
        axios
            .get(`http://localhost:1310/mailServices/verifyOtp/${token}`)
            .then((response) => {
                if (response.data === "Success") {
                    setSnackMsg("OTP verified");
                    setSeverity("success");
                    setOpen(true);
                    setTimeout(() => {
                        setOpen(false);
                        nav(link);
                    }, 3000);
                } else {
                    setSnackMsg("Invalid OTP");
                    setSeverity("error");
                    setOpen(true);
                    setTimeout(() => setOpen(false), 3000);
                }
                setConfirm(response.data);
            })
            .catch(err => console.log(err));
    };

    const sendOtp = () => {
        axios
            .get(`http://localhost:1310/mailServices/${email}`)
            .then(() => {
                setSnackMsg("OTP sent!!!");
                setSeverity("success");
                setOpen(true);
                setTimeout(() => setOpen(false), 3000);
            })
            .catch(err => console.log(err));
    }

    const resendOtp = async () => {
        setIsResending(true);
        sendOtp();
        setTimeout(() => {
            setIsResending(false);
        }, 1000);
    };

    const customInput = ({ events, props }) => {
        return (
            <>
                <input {...events} {...props} type="text" className="custom-otp-input" />
            </>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="card flex justify-content-center p-4 m-5"
        >
            <motion.div
                className="container d-flex flex-column align-items-center"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                {/* <h2 className="text-center mb-4">
                    <FaEnvelope className="text-primary" /> Authenticate Your Account
                </h2>
                <p className="text-center mb-4 text-muted">
                    Please enter the code sent to your Email ID <br /> <span className="font-weight-bold">{email}</span>.
                </p> */}
                <div className="auth-header text-center my-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="auth-title d-flex justify-content-center align-items-center mb-3">
                            <FaEnvelope className="icon-gradient me-2" />
                            Authenticate Your Account
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <p className="auth-description text-muted">
                            Please enter the code sent to your Email ID <br />
                            <span className="font-weight-bold email-highlight">{email}</span>
                        </p>
                    </motion.div>
                </div>

                <style jsx>{`
    .auth-header {
        padding: 20px;
        border-radius: 10px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .auth-title {
        font-size: 1.8rem;
        font-weight: bold;
        color: #007ad9;
        text-transform: uppercase;
    }

    .icon-gradient {
        background: linear-gradient(45deg, #007ad9, #00c6ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 2.5rem;
        margin-right: 10px;
    }

    .auth-description {
        font-size: 1.1rem;
        color: #6c757d;
        margin-bottom: 0;
    }

    .email-highlight {
        color: #007ad9;
        font-size: 1.2rem;
    }

    .me-2 {
        margin-right: 10px;
    }
`}</style>

                <motion.div
                    className="otp-container mb-4"
                    whileHover={{ scale: 1.05 }}
                >
                    <InputOtp
                        value={token}
                        onChange={(e) => setTokens(e.value)}
                        length={6}
                        inputTemplate={customInput}
                        style={{ gap: '10px' }}
                    />
                </motion.div>

                <div className="button-group d-flex justify-content-center align-items-center gap-3 my-4">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-wrapper"
                    >
                        <Button
                            className="btn btn-primary shadow-sm"
                            onClick={() => { nav(-1) }}
                        >
                            {`< Go Back`}
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-wrapper"
                    >
                        <Button
                            className="btn btn-success shadow-sm"
                            onClick={validateOtp}
                        >
                            Verify
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-wrapper"
                    >
                        <Button
                            className={`btn btn-sm shadow-sm ${isResending ? 'btn-dark' : 'btn-secondary'}`}
                            onClick={resendOtp}
                            disabled={isResending}
                        >
                            {isResending ? 'Resending...' : <><FaRedoAlt className="p-mr-2" /> Resend Code</>}
                        </Button>
                    </motion.div>
                </div>



            </motion.div>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {snackMsg}
                </Alert>
            </Snackbar>

            <style jsx>{`
                .custom-otp-input {
                    width: 60px;
                    height: 60px;
                    font-size: 24px;
                    text-align: center;
                    border-radius: 8px;
                    border: 1px solid #007ad9;
                    background-color: #f4f4f4;
                    transition: all 0.3s;
                    outline: none;
                    margin: 0 5px;
                }

                .custom-otp-input:focus {
                    border-color: #007ad9;
                    box-shadow: 0 0 10px rgba(0, 122, 217, 0.5);
                }

                .otp-container {
                    display: flex;
                    justify-content: center;
                }

                .text-primary {
                    color: #007ad9;
                }

                .text-muted {
                    color: #6c757d;
                }

                .font-weight-bold {
                    font-weight: bold;
                }

                .btn {
                    padding: 4px 8px;
                    font-size: 1rem;
                }

                .btn-primary {
                    background-color: #007ad9;
                    border-color: #007ad9;
                }

                .btn-secondary {
                    background-color: #6c757d;
                    border-color: #6c757d;
                }

                .btn-primary:hover {
                    background-color: #0056b3;
                    border-color: #0056b3;
                }

                .btn-secondary:hover {
                    background-color: #5a6268;
                    border-color: #5a6268;
                }
            `}</style>
            <style jsx>{`
    .button-wrapper {
        width: auto;
    }

    .button-group {
        gap: 20px;
    }

    .btn {
        font-size: 1rem;
        padding: 4px 8px;
        border-radius: 30px;
        transition: all 0.3s ease-in-out;
    }

    .btn-primary {
        background-color: #007ad9;
        border-color: #007ad9;
    }

    .btn-success {
        background-color: #28a745;
        border-color: #28a745;
    }

    .btn-secondary {
        background-color: #6c757d;
        border-color: #6c757d;
    }

    .btn-dark {
        background-color: #343a40;
        border-color: #343a40;
    }

    .btn:hover {
        opacity: 0.9;
    }

    .shadow-sm {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`}</style>
        </motion.div>
    );
}
