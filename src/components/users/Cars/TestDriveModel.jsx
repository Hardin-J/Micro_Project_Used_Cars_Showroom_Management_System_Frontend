import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';

const TestDriveModal = ({ isOpen, onClose, onBook, carId, isSubmitting}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [customer, setCustomer] = useState({});
    const [slots, setSlots] = useState([
        { time: '10am - 11am', available: true },
        { time: '12pm - 1pm', available: true },
        { time: '3pm - 4pm', available: true },
        { time: '4pm - 5pm', available: true }
    ]);
    const [minDate, setMinDate] = useState(new Date());
    const [availCar, setAvailCar] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    const customerId = sessionStorage.getItem("id");

    useEffect(() => {
        if (customerId) {
            const fetchCustomerData = async () => {
                try {
                    const response = await axios.get(`http://localhost:1310/customers/${customerId}`);
                    setCustomer(response.data);
                    console.log('Fetched customer data:', response.data);
                } catch (err) {
                    console.error('Error fetching customer data:', err);
                }
            };
            fetchCustomerData();
        }
    }, [customerId]);

    useEffect(() => {
        if (carId) {
            const fetchAppointmentData = async () => {
                try {
                    const response = await axios.get(`http://localhost:1310/testDriveApp/appointments/cars/${carId}`);
                    setAvailCar(response.data);
                    console.log('Fetched Appointment data:', response.data);
                } catch (err) {
                    console.error('Error fetching Appointment data:', err);
                }
            };
            fetchAppointmentData();
        }
    }, [carId]);

    useEffect(() => {
        // Update current time every minute
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 60 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (selectedDate) {
            // Format the selected date to YYYY-MM-DD
            const localDate = new Date(selectedDate);
            const year = localDate.getFullYear();
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const day = String(localDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            // Determine if the selected date is today
            const today = new Date();
            const isToday = formattedDate === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            const updatedSlots = slots.map(slot => {
                const [slotStart, slotEnd] = slot.time.split(' - ');
                const [slotStartHourStr, slotStartMeridiem] = slotStart.split(/(am|pm)/);
                const [slotEndHourStr, slotEndMeridiem] = slotEnd.split(/(am|pm)/);

                const slotStartHour = parseInt(slotStartHourStr) % 12 + (slotStartMeridiem === 'pm' ? 12 : 0);
                const slotEndHour = parseInt(slotEndHourStr) % 12 + (slotEndMeridiem === 'pm' ? 12 : 0);

                if (isToday) {
                    // For today's date, block slots based on the current time
                    const currentHour = currentTime.getHours();
                    const currentMinute = currentTime.getMinutes();
                    
                    const isSlotBooked = availCar.some(app => app.testDriveDate === formattedDate && app.slot === slot.time);
                    const isPastBusinessHours = slotEndHour < currentHour || (slotEndHour === currentHour && currentMinute > 0);
                    
                    return { ...slot, available: !isSlotBooked && !isPastBusinessHours };
                } else {
                    // For future dates, check availability based on appointments
                    const isSlotBooked = availCar.some(app => app.testDriveDate === formattedDate && app.slot === slot.time);
                    return { ...slot, available: !isSlotBooked };
                }
            });

            setSlots(updatedSlots);
        }
    }, [selectedDate, availCar, currentTime]);

    const handleBook = () => {
        if (selectedDate && selectedSlot) {
            const localDate = new Date(selectedDate);
            const year = localDate.getFullYear();
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const day = String(localDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const appointment = {
                testDriveDate: formattedDate,
                slot: selectedSlot,
                status: 'Pending',
                cust: customer
            };

            console.log('Booking appointment:', appointment);
            onBook(appointment);
        } else {
            alert('Please select a date and a slot.');
        }
    };

    const handleChangeDate = (date) => {
        console.log('Date selected:', date);
        setSelectedDate(date);
    };

    const handleSelectSlot = (slot) => {
        if (slot.available) {
            setSelectedSlot(slot.time);
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-xl font-semibold mb-4">Book Test Drive</h2>
                    <div className="mb-4 flex items-center space-x-2">
                        <label className="block text-md font-medium mb-2">Select Date:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleChangeDate}
                            className="w-full p-2 border border-gray-300 rounded"
                            dateFormat="yyyy-MM-dd"
                            minDate={minDate}
                        />
                        <FaCalendar size={30} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Select Slot</label>
                        <div className="grid grid-cols-2 gap-2">
                            {slots.map((slot) => (
                                <button
                                    key={slot.time}
                                    onClick={() => handleSelectSlot(slot)}
                                    className={`w-full p-2 border rounded ${slot.available ? (selectedSlot === slot.time ? 'bg-blue-300 text-black' : 'bg-green-500 text-white') : 'bg-gray-300 text-gray-700'} ${selectedSlot === slot.time ? 'border-blue-500 border-2' : 'border-transparent'}`}
                                    disabled={!slot.available}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBook}
                            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Booking...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default TestDriveModal;
