import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
// Book purchase Component
const BookPurchase = ({ carId, customerId, carPrice, onPurchaseSuccess }) => {
    const [selectedPrice, setSelectedPrice] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePriceSelect = (event) => {
        setSelectedPrice(event.target.value);
    };

    const generatePriceOptions = (carPrice) => {
        const priceNumber = carPrice ? parseFloat(carPrice.replace(/,/g, '')) : 0;
        const highestPrice = priceNumber;
        const options = [];
        for (let i = 0; i < 5; i++) {
            const optionPrice = highestPrice - i * 50000; // Decreasing by 50,000
            options.push(optionPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }));
        }
        return options;
    };

    const handleSubmit = async () => {
        if (!selectedPrice) {
            setError('Please select a price.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:1310/carSales', {
                cars: { id: carId },
                customer: { id: customerId },
                date: new Date().toISOString(),
                price: selectedPrice
            });
            console.log('Purchase successful:', response.data);
            onPurchaseSuccess(response.data); // Notify parent component
            await Swal.fire({
                title: "Booking Successfull",
                icon: "success"
              });
            closeModal();
        } catch (err) {
            console.error('Error booking purchase:', err);
            setError('Failed to book the purchase.');
        }
        setIsSubmitting(false);
    };

    const priceOptions = generatePriceOptions(carPrice);

    return (
        <div>
            <button
                onClick={openModal}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
            >
                Book Purchase
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Quote Your Price</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-gray-700">Select your price:</label>
                            <select
                                value={selectedPrice}
                                onChange={handlePriceSelect}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">-- Select Price --</option>
                                {priceOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Booking...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default BookPurchase;