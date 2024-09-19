import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaCar, FaGasPump, FaTachometerAlt, FaHeart } from 'react-icons/fa';
import { FaCar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import { likeCar, unlikeCar, setUserId } from '../../../redux/action/action';
import axios from 'axios';

const ListCars = () => {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        bodyType: [],
        fuelType: [],
        color: [],
        transmission: []
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6;
    // const dispatch = useDispatch();
    // const { likedCarsByUser, userId } = useSelector(state => state);
    const nav = useNavigate();
    const [isSold, setIsSold] = useState(false);

    // const custId = sessionStorage.getItem('id');

    // useEffect(() => {
    //     dispatch(setUserId(custId));
    // }, [dispatch]);

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: prevFilters[name].includes(value)
                ? prevFilters[name].filter(item => item !== value)
                : [...prevFilters[name], value]
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            bodyType: [],
            fuelType: [],
            color: [],
            transmission: []
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCars = cars.filter(car => {
        const searchTermMatch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) || car.model.toLowerCase().includes(searchTerm.toLowerCase());
        const bodyTypeMatch = filters.bodyType.length === 0 || filters.bodyType.includes(car.carDetails.bodyType);
        const fuelTypeMatch = filters.fuelType.length === 0 || filters.fuelType.includes(car.carDetails.fuelType);
        const colorMatch = filters.color.length === 0 || filters.color.includes(car.carDetails.color);
        const transmissionMatch = filters.transmission.length === 0 || filters.transmission.includes(car.carDetails.transmission);

        return searchTermMatch && bodyTypeMatch && fuelTypeMatch && colorMatch && transmissionMatch;
    });

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const handleViewDetails = (id) => {
        nav(`/carDetails/${id}`);
    };

    // const handleLike = (car) => {
    //     if (!userId) {
    //         nav('/login');
    //         return;
    //     }
    //     if (likedCarsByUser[userId]?.some(likedCar => likedCar.id === car.id)) {
    //         dispatch(unlikeCar(userId, car.id));
    //     } else {
    //         dispatch(likeCar(userId, car));
    //     }
    // };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex p-6 bg-gray-100 min-h-screen mt-14">
            {/* Filter Sidebar */}
            <div className="w-full sm:w-1/4 bg-white p-4 rounded-lg shadow-lg">
                <form>
                    <h2 className="text-lg font-bold mb-4">Filters</h2>

                    {/* Body Type */}
                    <fieldset className="block mb-4">
                        <legend className="font-semibold mb-2">Body Type</legend>
                        {['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'].map((type, index) => (
                            <label key={index} className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    name="bodyType"
                                    value={type}
                                    checked={filters.bodyType.includes(type)}
                                    onChange={handleFilterChange}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">{type}</span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Color */}
                    <fieldset className="block mb-4">
                        <legend className="font-semibold mb-2">Color</legend>
                        {['Red', 'Blue', 'White', 'Black', 'Grey', 'Green', 'Silver', 'Yellow'].map((color, index) => (
                            <label key={index} className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    name="color"
                                    value={color}
                                    checked={filters.color.includes(color)}
                                    onChange={handleFilterChange}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">{color}</span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Fuel Type */}
                    <fieldset className="block mb-4">
                        <legend className="font-semibold mb-2">Fuel Type</legend>
                        {['Petrol', 'Diesel', 'Electric'].map((fuel, index) => (
                            <label key={index} className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    name="fuelType"
                                    value={fuel}
                                    checked={filters.fuelType.includes(fuel)}
                                    onChange={handleFilterChange}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">{fuel}</span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Transmission */}
                    <fieldset className="block mb-4">
                        <legend className="font-semibold mb-2">Transmission</legend>
                        {['Manual', 'Automatic', 'Electric', 'Semi-Automatic'].map((transmission, index) => (
                            <label key={index} className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    name="transmission"
                                    value={transmission}
                                    checked={filters.transmission.includes(transmission)}
                                    onChange={handleFilterChange}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">{transmission}</span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Reset Filters Button */}
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </button>
                </form>
            </div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 sm:ml-auto sm:pl-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Browse Cars</h1>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by make or model..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 border rounded-lg w-64"
                    />
                </div>

                {/* Car List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {currentCars.map((car) => (
                        <div key={car.id} className="bg-white p-4 rounded-lg shadow-lg relative">
                            {/* Updated Image Code */}
                            <img
                                src={`data:image/jpeg;base64,${car.carAdditionalInfo.carImage.frontImage || 'https://via.placeholder.com/400x250'}`}
                                alt={`${car.make} ${car.model}`}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <div className={`absolute top-6 right-2 bg-${getBadgeColor(car.soldStatus)}-500 text-white px-2 py-1 text-xs rounded-full`}>
                                {car.soldStatus}
                            </div>
                            {/* <button
                                className={`absolute top-26 right-4 p-2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-transform transform ${likedCarsByUser[userId]?.some(likedCar => likedCar.id === car.id) ? 'text-red-500' : 'text-gray-500'}`}
                                onClick={() => handleLike(car)}
                            >
                                <FaHeart size={20} />
                            </button> */}
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
                                <p className="text-gray-600"><FaCar className="inline-block mr-1" /> {car.carDetails.bodyType}</p>
                                <p className="text-gray-600"><FaGasPump className="inline-block mr-1" /> {car.carDetails.fuelType}</p>
                                <p className="text-gray-600"><FaTachometerAlt className="inline-block mr-1" /> {car.carDetails.kmsDriven} km</p>
                                <p className="text-gray-600"><MdLocationOn className="inline-block mr-1" /> {car.location}</p>
                                <p className="text-gray-600"><FaTachometerAlt className="inline-block mr-1" /> {car.carDetails.engineDisplacement} cc</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-blue-600">₹{car.price}</span>
                                <button
                                    className="px-2 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                                    onClick={() => handleViewDetails(car.id)}
                                >
                                    View Details
                                </button>
                            </div>

                        </div>
                    ))}
                    {currentCars.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">No cars match the selected filters.</p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <button
                        className={`px-4 py-2 mx-1 rounded-lg shadow-md transition-transform transform ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:scale-105'}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 rounded-lg shadow-md transition-transform transform ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:scale-105'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-4 py-2 mx-1 rounded-lg shadow-md transition-transform transform ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:scale-105'}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListCars;

