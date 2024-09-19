import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCarList = () => {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        minPrice: 0,
        maxPrice: 100000,
        yrOfManufacture: '',
    });

    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 10;

    useEffect(() => {
        axios.get('http://localhost:1310/cars/all')
            .then(response => setCars(response.data))
            .catch(err => console.log(err));
    }, []);
    console.log(cars);
    

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const filteredCars = cars.filter(car => {
        return (            
            (filters.model === '' || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&                        
            (filters.yrOfManufacture === '' || car.yrOfManufacture.toLowerCase().includes(filters.yrOfManufacture.toLowerCase()))
        );
    });

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex">
            <AdminNav />
            <div className="flex-1 p-6 ml-64">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Car Inventory</h2>
                    <div className="mb-4 flex justify-between items-center">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                            onClick={() => nav('/admin/addCar')}
                        >
                            Add New Car
                        </button>
                        <div className="flex space-x-4">                           
                            <input
                                type="text"
                                name="model"
                                value={filters.model}
                                onChange={handleFilterChange}
                                className="p-2 border rounded-lg"
                                placeholder="Search by Model"
                            />                                                       
                            <input
                                type="text"
                                name="yrOfManufacture"
                                value={filters.yrOfManufacture}
                                onChange={handleFilterChange}
                                className="p-2 border rounded-lg"
                                placeholder="Year of Manufacture"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-4">Front Image</th>
                                    <th className="py-3 px-4">Make</th>
                                    <th className="py-3 px-4">Model</th>
                                    <th className="py-3 px-4">Price</th>
                                    <th className="py-3 px-4">Year</th>
                                    <th className="py-3 px-4">Location</th>
                                    <th className="py-3 px-4">Details</th>
                                    <th className="py-3 px-4">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCars.length > 0 ? (
                                    currentCars.map((car) => (
                                        <tr key={car.id} className="border-b">
                                            <td className="py-2 px-4">
                                                <img
                                                    src={`data:image/jpeg;base64,${car.carAdditionalInfo.carImage.frontImage || 'https://via.placeholder.com/100x60'}`}
                                                    alt={`${car.make} ${car.model}`}
                                                    className="w-24 h-14 object-cover rounded"
                                                />
                                            </td>
                                            <td className="py-2 px-4">{car.make}</td>
                                            <td className="py-2 px-4">{car.model}</td>
                                            <td className="py-2 px-4">${car.price}</td>
                                            <td className="py-2 px-4">{car.yrOfManufacture}</td>
                                            <td className="py-2 px-4">{car.location}</td>
                                            <td className="py-2 px-4">
                                                <button
                                                    className="px-2 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-400 transition"
                                                    onClick={() => window.location.href = `/carDetails/${car.id}`}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    className="px-2 py-1 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                                                    onClick={() => window.location.href = `/admin/editCar/${car.id}`}
                                                >
                                                    Edit car
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-4 text-center text-gray-500">No cars found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <div className="text-gray-500">
                        Showing {indexOfFirstCar + 1} to {Math.min(indexOfLastCar, filteredCars.length)} of {filteredCars.length} cars
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 rounded-lg shadow-md transition-transform transform ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:scale-105'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-lg shadow-md transition-transform transform ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:scale-105'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`px-4 py-2 rounded-lg shadow-md transition-transform transform ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:scale-105'}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCarList;
