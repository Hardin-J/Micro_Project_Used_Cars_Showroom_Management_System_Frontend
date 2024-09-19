import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCalendar, FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import CarCard from './CarCard';


const FeaturedCars = () => {
    const [cars, setCars] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:1310/cars/all')
            .then(response => setCars(response.data))
            .catch(err => console.log(err));
    }, []);

    const getBadgeColor = (status) => {
        switch (status) {
            case 'Sold':
                return 'red';
            case 'Booked':
                return 'orange';
            default:
                return 'green';
        }
    };

    const currentCars = cars.slice(0, 3);
    const nav = useNavigate();

    const handleViewDetails = (id) => {
        nav(`/carDetails/${id}`);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Featured Cars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentCars.length > 0 ? (
                        currentCars.map((car, index) => {
                            const badgeColor = getBadgeColor(car.soldStatus);
                            return (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
                                    <div className="relative mb-4">
                                        <img
                                            src={`data:image/jpeg;base64,${car.carAdditionalInfo.carImage.frontImage || 'https://via.placeholder.com/400x250'}`}
                                            alt={`${car.make} ${car.model}`}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />
                                        <div className={`absolute top-2 right-2 bg-${badgeColor}-600 text-white px-2 py-1 text-xs rounded-full`}>
                                            {car.soldStatus}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2">{car.make} {car.model}</h2>
                                    <p className="text-gray-700 mb-2 flex items-center">
                                        <FaCar className="mr-2 text-blue-500" />
                                        {car.carDetails.bodyType} | {car.carDetails.transmission}
                                    </p>
                                    <p className="text-gray-700 mb-2 flex items-center">
                                        <FaCalendar className="mr-2 text-blue-500" />
                                        {car.yrOfManufacture}
                                    </p>
                                    <p className="text-gray-700 mb-2 flex items-center">
                                        <FaGasPump className="mr-2 text-blue-500" />
                                        {car.carDetails.fuelType} | {car.carDetails.kmsDriven}
                                    </p>
                                    <p className="text-gray-700 mb-2 flex items-center">
                                        <MdLocationOn className="mr-2 text-blue-500" />
                                        {car.location}
                                    </p>
                                    <p className="text-gray-700 mb-2 flex items-center">
                                        <FaTachometerAlt className="mr-2 text-blue-500" />
                                        {car.carDetails.engineDisplacement}
                                    </p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-lg font-bold text-blue-600">${car.price}</span>
                                        <button className="px-1 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => handleViewDetails(car.id)}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">No cars match the selected filters.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCars;
