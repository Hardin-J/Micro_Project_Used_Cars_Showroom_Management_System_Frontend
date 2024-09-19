import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const customerId = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:1310/carSales/customer/${customerId}`);
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch bookings.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [customerId]);

    console.log(bookings);
    

    if (isLoading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    // Function to get status color based on approval status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-600';
            case 'Pending':
                return 'bg-yellow-500';
            case 'Rejected':
                return 'bg-red-600';
            default:
                return 'bg-gray-500'; // Default color for undefined status
        }
    };

    return (
        <div className="mt-20 p-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Bookings</h2>
            {bookings.length === 0 ? (
                <p className="text-lg text-gray-600 text-center">You have no bookings yet.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="p-6 border border-gray-200 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            <div className="relative">
                                <img
                                    src={`data:image/jpeg;base64,${booking.cars.carAdditionalInfo.carImage.frontImage || 'https://via.placeholder.com/400x250'}`}
                                    alt={`${booking.cars.make} ${booking.cars.model}`}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <div className={`absolute top-0 left-0 text-white text-sm font-bold px-3 py-1 rounded-br-lg ${getStatusColor(booking.approvalStatus)}`}>
                                    {booking.approvalStatus === 'Approved' ? 'Approved' : booking.approvalStatus === 'Pending' ? 'Pending' : 'Rejected'}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-xl text-gray-700">{booking.cars.make} {booking.cars.model}</h3>
                                <p className="text-gray-600 mt-1">Price Quoted: <span className="text-green-600 font-bold">{booking.price}</span></p>
                                <p className="text-sm text-gray-500 mt-1">Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">Status: {booking.approvalStatus}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBookings;
