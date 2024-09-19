import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCar, FaCalendarAlt, FaClock, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For animations
import { useNavigate } from 'react-router-dom';

const userId = sessionStorage.getItem('id');
const APPOINTMENTS_API_URL = `http://localhost:1310/testDriveApp/appointments/customers/${userId}`;

const MyTestDriveAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(APPOINTMENTS_API_URL);
                const sortedAppointments = response.data.sort((a, b) =>
                    new Date(a.testDriveDate) - new Date(b.testDriveDate)
                );
                setAppointments(sortedAppointments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);


    const handleCancelClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (!cancelReason) {
            alert('Please provide a reason for cancellation.');
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('reason', cancelReason);
        try {
            await axios.patch(`http://localhost:1310/testDriveApp/cancelAppointment/${selectedAppointment.id}`, formData);
            setIsModalOpen(false);
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
        setIsSubmitting(false);
    };

    if (loading) return <div className="text-center py-4 text-lg">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-10"> <br /> <br />
            <h1 className="text-3xl font-bold mb-8 text-center">Test Drive Appointments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {appointments.map(appointment => (
                    <motion.div
                        key={appointment.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"                        
                    >
                        {/* <button className='btn' onClick={()=>{console.log("clicked this car id",appointment.cars.id);}}> */}
                        <div className="p-6">
                            <div onClick={() => { nav(`/carDetails/${appointment.cars.id}`); }}>
                                <div className="relative">
                                    <img
                                        src={`data:image/jpeg;base64,${appointment.cars.carAdditionalInfo.carImage.frontImage || 'https://via.placeholder.com/400x250'}`}
                                        alt={`${appointment.cars.make} ${appointment.cars.model}`}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <FaCar className="text-blue-500 mr-2 text-xl" />
                                    <h2 className="text-xl font-semibold">{appointment.cars.make} {appointment.cars.model}</h2>
                                </div>
                                <div className="flex items-center mb-2">
                                    <FaCalendarAlt className="text-green-500 mr-2" />
                                    <p className="text-gray-700">Test Drive Date: {new Date(appointment.testDriveDate).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <FaClock className="text-yellow-500 mr-2" />
                                    <p className="text-gray-700">Slot: {appointment.slot}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <FaCheckCircle className={`mr-2 ${appointment.status === 'Cancelled' ? 'text-red-500' : appointment.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`} />
                                    <p className={`text-gray-700 ${appointment.status === 'Cancelled' ? 'text-red-500' : appointment.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                                        Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </p>
                                </div>
                                {(appointment.cancelReason && appointment.status === 'Cancelled') && (
                                    <div className="mt-2 text-red-500">
                                        <FaExclamationCircle className="inline-block mr-1" /> Reason for Cancellation: {appointment.cancelReason}
                                    </div>
                                )}
                            </div>

                            {appointment.status === 'Pending' && (
                                <motion.button
                                    whileHover={{ scale: 1 }}
                                    onClick={() => handleCancelClick(appointment)}
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 "
                                    style={{ zIndex: "100" }}
                                >
                                    Cancel Appointment
                                </motion.button>
                            )}
                        </div>
                        {/* </button> */}
                    </motion.div>
                ))}
            </div>

            {/* Modal for cancellation reason */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                        >
                            <h2 className="text-xl font-semibold mb-4">Cancel Appointment</h2>
                            <p className="text-gray-700 mb-4">Please provide a reason for cancellation:</p>
                            <textarea
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={handleConfirmCancel}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Cancelling...' : 'Cancel Appointment'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )
            }
        </div >
    );
};

export default MyTestDriveAppointment;
