// FeedbackForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ car, customerId, onClose }) => {
    const [review, setReview] = useState('');
    const [ratings, setRatings] = useState(1);
    const [error, setError] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:1310/feedbacks', {
    //             review,
    //             ratings,
    //             cars: { id: carId },
    //             customer: { id: customerId }
    //         });
    //         console.log('Feedback submitted:', response.data);
    //         alert('Feedback submitted successfully!');
    //         onClose(); // Close the form on success
    //     } catch (err) {
    //         console.error('Error submitting feedback:', err);
    //         setError('An error occurred while submitting feedback.');
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formData = new FormData();
        formData.append('review', review);
        formData.append('ratings', ratings);
        formData.append('cars', car.id); // Append car ID as part of the form data
        formData.append('customer', customerId); // Append customer ID as part of the form data

        try {
            const response = await axios.post('http://localhost:1310/feedbacks', formData);
            console.log('Feedback submitted:', response.data);
            alert('Feedback submitted successfully!');
            onClose(); // Close the form on success
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setError('An error occurred while submitting feedback.');
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="review" className="block text-lg font-medium mb-2">Review</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ratings" className="block text-lg font-medium mb-2">Ratings (1-5)</label>
                        <input
                            type="number"
                            id="ratings"
                            value={ratings}
                            onChange={(e) => setRatings(e.target.value)}
                            min="1"
                            max="5"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex gap-4">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit</button>
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
