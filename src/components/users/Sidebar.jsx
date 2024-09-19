import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unlikeCar } from '../../redux/action/action'; // Adjust the path as needed

function Sidebar({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
    const likedCars = useSelector((state) => state.likedCarsByUser[userId] || []);

    const handleLikeToggle = (carId) => {
        dispatch(unlikeCar(userId, carId));
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
        >
            <button
                className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
                onClick={onClose}
            >
                ×
            </button>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">My Saved Cars</h2>
                <ul>
                    {likedCars.map((car) => (
                        <li key={car.id} className="flex justify-between items-center mb-4 border-b pb-2">
                            <span>{car.model}</span>
                            <button
                                onClick={() => handleLikeToggle(car.id)}
                                className={`px-3 py-1 rounded ${car.liked ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {car.liked ? 'Unlike' : 'Like'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
