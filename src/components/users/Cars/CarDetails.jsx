// CarDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCar, FaCalendar, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Map from './Map';
import TestDriveModal from './TestDriveModel';
import BookPurchase from './BookPurchase'
import Swal from 'sweetalert2';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSold, setIsSold] = useState(false);

    const nav = useNavigate();
    const customerId = sessionStorage.getItem("id");
    const isAdmin = sessionStorage.getItem('isAdmin') === 'yes';
    const isLog = sessionStorage.getItem('isLog') === 'yes';

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`http://localhost:1310/cars/car/${id}`);
                setCar(response.data);
                setSelectedImage(response.data.carAdditionalInfo.carImage.frontImage);
                if(response.data.soldStatus === "Available"){
                    setIsSold(true);
                }
            } catch (err) {
                console.log(err);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:1310/feedbacks/all/${id}`);
                setReviews(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCarData();
        fetchReviews();
        
    }, [id]);

    const handleImageSelection = (image) => {
        setSelectedImage(image);
    };

    const handleTestDriveButtonClick = () => {
        if (sessionStorage.getItem('isLog') === "yes") {
            setIsModalOpen(true);
        } else {
            nav('/login');
        }
    };

    const handleBookTestDrive = async (appointment) => {
        const { testDriveDate, slot, status, cust } = appointment;
        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:1310/testDriveApp', {
                testDriveDate,
                slot,
                status,
                cars: car,
                customer: cust
            });
            console.log('Test drive booked:', response.data);
            await Swal.fire({
                title: "Booking Test Drive Successfull",
                icon: "success"
              });
            // window.location.reload();
            nav('/myTestDrives')
        } catch (error) {
            console.error('Error booking test drive:', error);
        }
        setIsSubmitting(false);
        setIsModalOpen(false);
    };

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setMousePosition({ x, y });
    };

    const handleNewReview = (newReview) => {
        setReviews((prevReviews) => [newReview, ...prevReviews]);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white mt-14 p-6 rounded-lg shadow-lg">
                <button className='btn btn-primary' onClick={() => { nav(-1) }}>{`< Go Back`}</button>
                <h1 className="text-3xl font-bold mb-4">{car.make} {car.model}</h1>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 relative group">
                        <div
                            className="relative w-full h-60 overflow-hidden"
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                src={`data:image/jpeg;base64,${selectedImage || 'https://via.placeholder.com/800x500'}`}
                                alt={`${car.make} ${car.model}`}
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out"
                                style={{
                                    transform: 'scale(1.0)',
                                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`
                                }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(data:image/jpeg;base64,${selectedImage || 'https://via.placeholder.com/800x500'})`,
                                    backgroundSize: '200%',
                                    backgroundPosition: `-${mousePosition.x * 2}px -${mousePosition.y * 2}px`,
                                    backgroundRepeat: 'no-repeat',
                                    transform: 'scale(1.5)',
                                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                        {/* Image Selector */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">Images</h2>
                            <div className="flex gap-2">
                                {Object.keys(car.carAdditionalInfo?.carImage || {})
                                    .filter(key => key !== 'id') // Skip 'id' key
                                    .map((key) => {
                                        const image = car.carAdditionalInfo.carImage[key];
                                        if (image) {
                                            return (
                                                <button
                                                    key={key}
                                                    className="border border-gray-300 p-1 rounded"
                                                    onClick={() => handleImageSelection(image)}
                                                >
                                                    <img
                                                        src={`data:image/jpeg;base64,${image}`}
                                                        alt={key}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                </button>
                                            );
                                        }
                                        return null;
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 pl-4">
                        <div className="mb-2">
                            <span className="text-xl font-semibold text-blue-600">Price:</span> <span className="text-lg">₹{car.price}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-xl font-semibold text-blue-600">Location:</span> <span className="text-lg">{car.location}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-xl font-semibold text-blue-600">Year of Manufacture:</span> <span className="text-lg">{car.yrOfManufacture}</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-xl font-semibold text-blue-600">Status:</span> <span className={`text-lg ${car.soldStatus === 'Sold' ? 'text-red-600' : 'text-green-600'}`}>{car.soldStatus}</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <FaCar className="mr-2 text-blue-500" />
                                <span className="font-semibold">Body Type:</span> <span>{car.carDetails?.bodyType}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaCalendar className="mr-2 text-blue-500" />
                                <span className="font-semibold">Year of Registration:</span> <span>{car.carDetails?.regYear}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaGasPump className="mr-2 text-blue-500" />
                                <span className="font-semibold">Fuel Type:</span> <span>{car.carDetails?.fuelType}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaTachometerAlt className="mr-2 text-blue-500" />
                                <span className="font-semibold">Engine Displacement:</span> <span>{car.carDetails?.engineDisplacement}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <MdLocationOn className="mr-2 text-blue-500" />
                                <span className="font-semibold">Color:</span> <span>{car.carDetails?.color}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="font-semibold">Kilometers Driven:</span> <span>{car.carDetails?.kmsDriven}</span>
                            </div>
                        </div>
                        { isSold && (
                        !isAdmin && (
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleTestDriveButtonClick}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Book Test Drive
                                </button>
                                {/* <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                    Book for Purchase
                                </button> */}
                                {/* Book Purchase Button Section */}
                                {isLog && (
                                    <div>
                                        <BookPurchase
                                            carId={id}
                                            customerId={customerId}
                                            carPrice={car.price}
                                            onPurchaseSuccess={(data) => console.log('Purchase booked:', data)}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact & Additional Information */}
                <div className="flex flex-wrap mt-3 gap-6">
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Owner Information</h2>
                        <p className="mb-2"><span className="font-semibold">Owner Name:</span> {car.carAdditionalInfo?.owner?.name}</p>
                        <p className="mb-2"><span className="font-semibold">Ownership Status:</span> {car.carAdditionalInfo?.owner?.ownershipStatus}</p>
                        {/* <p className="mb-2"><span className="font-semibold">Phone Number:</span> {car.carAdditionalInfo?.owner?.phoneNumber}</p> */}
                        <p className="mb-2"><span className="font-semibold">Address:</span> {car.carAdditionalInfo?.owner?.address}</p>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Dealer Location</h2>
                        <Map location={car.location} />
                    </div>
                </div> <br />

                {!isAdmin && (
                    <AddReview
                        carId={id}
                        customerId={customerId}
                        onReviewAdded={handleNewReview}
                    />
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                    {reviews.length === 0 ? (
                        <p className="text-gray-600">No reviews yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {reviews.map((feedback) => {
                                const reviewDate = new Date(feedback.date); // Assuming `feedback.date` is in a valid date format
                                const formattedDate = reviewDate.toLocaleDateString();

                                // Parse the time (stored as HH:MM:SS.ffffff) and convert to 12-hour format with AM/PM
                                const reviewTime = feedback.time.split(':');
                                let hours = parseInt(reviewTime[0], 10);
                                const minutes = reviewTime[1];
                                const isPM = hours >= 12;
                                const formattedHours = hours % 12 || 12; // Convert 0 hour to 12 for 12AM
                                const amPm = isPM ? 'PM' : 'AM';
                                const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

                                return (
                                    <li key={feedback.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center text-yellow-500">
                                                {Array(feedback.ratings)
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049.929l1.9 3.834 4.236.616-3.068 2.993.724 4.216-3.792-1.993-3.792 1.993.724-4.216-3.068-2.993 4.236-.616 1.9-3.834z" />
                                                        </svg>
                                                    ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-800 mb-2">{feedback.review}</p>
                                        <div className="text-sm text-gray-500">
                                            <p>Reviewed by: <span className="font-semibold">{feedback.customer.customerName}</span></p>
                                            <p>Submitted on: {formattedDate} at {formattedTime}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>             

                <TestDriveModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onBook={handleBookTestDrive}
                    carId={id}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
};

// Add Review Component
const AddReview = ({ carId, customerId, onReviewAdded }) => {
    const [review, setReview] = useState('');
    const [ratings, setRatings] = useState(0);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:1310/feedbacks', {
                review,
                ratings,
                cars: { id: carId },
                customer: { id: customerId }
            });
            console.log('Review submitted:', response.data);
            onReviewAdded(response.data); // Notify parent about new review
            setReview('');
            setRatings(0);
            setIsFormOpen(false); // Close the form on successful submission
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('An error occurred while submitting the review.');
        }
        setIsLoading(false);
    };

    const isLoggedIn = sessionStorage.getItem('isLog') === 'yes'; // Check if user is logged in

    const handleButtonClick = () => {
        console.log({
            cars: { id: carId },
            customer: { id: customerId }
        });

        if (!isLoggedIn) {
            alert('You must be logged in to add a review.'); // Alert or redirect to login
            return;
        }
        setIsFormOpen(!isFormOpen); // Toggle form visibility
    };

    return (
        <div>
            <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
            >
                {isFormOpen ? 'Cancel' : 'Add Review'}
            </button>

            {isFormOpen && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700">Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ratings:</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={ratings}
                            onChange={(e) => setRatings(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CarDetails;