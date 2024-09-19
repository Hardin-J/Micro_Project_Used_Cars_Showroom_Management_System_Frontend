import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FaCar,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaInfoCircle,
    FaImage,
    FaFileUpload,
    FaArrowLeft
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Make sure you have react-router-dom installed
import AdminNav from '../../admin/AdminNav';
import { Alert, Snackbar } from '@mui/material';

function EditCar() {
    const { id } = useParams();
    const [data, setData] = useState({
        make: '',
        model: '',
        price: '',
        location: '',
        yrOfManufacture: '',
        soldStatus: 'Pending',
        carDetails: {
            bodyType: '',
            kmsDriven: '',
            fuelType: '',
            color: '',
            transmission: '',
            regYear: '',
            seats: '',
            engineDisplacement: ''
        },
        carAdditionalInfo: {
            insuranceStatus: '',
            insuranceExpiresDate: '',
            owner: {
                name: '',
                phoneNumber: '',
                ownershipStatus: '',
                address: '',
                rc: null // For file uploads
            },
            carImage: {
                frontImage: null,
                backImage: null,
                rightSideImage: null,
                leftSideImage: null,
                interiorImage: null
            } // For file uploads
        }
    });
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const nav = useNavigate()

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`http://localhost:1310/cars/car/${id}`);
                setData(response.data);
                // setFeedback({ ...feedback, cars: response.data });
                // setSelectedImage(response.data.carAdditionalInfo.carImage.frontImage);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCarData();
    }, [id])
    const convertToFormData = (data) => {
        const formData = new FormData();

        // Append text fields
        formData.append('make', data.make);
        formData.append('model', data.model);
        formData.append('price', data.price);
        formData.append('location', data.location);
        formData.append('yrOfManufacture', data.yrOfManufacture);

        formData.append('bodyType', data.carDetails.bodyType);
        formData.append('kmsDriven', data.carDetails.kmsDriven);
        formData.append('fuelType', data.carDetails.fuelType);
        formData.append('color', data.carDetails.color);
        formData.append('transmission', data.carDetails.transmission);
        formData.append('regYear', data.carDetails.regYear);
        formData.append('seats', data.carDetails.seats);
        formData.append('engineDisplacement', data.carDetails.engineDisplacement);

        formData.append('insuranceStatus', data.carAdditionalInfo.insuranceStatus);
        formData.append('insuranceExpiresDate', data.carAdditionalInfo.insuranceExpiresDate);

        formData.append('ownerName', data.carAdditionalInfo.owner.name);
        formData.append('ownerPhoneNumber', data.carAdditionalInfo.owner.phoneNumber);
        formData.append('ownershipStatus', data.carAdditionalInfo.owner.ownershipStatus);
        formData.append('ownerAddress', data.carAdditionalInfo.owner.address);

        // Append files
        if (data.carAdditionalInfo.owner.rc) {
            formData.append('rc', data.carAdditionalInfo.owner.rc);
        }
        if (data.carAdditionalInfo.carImage.frontImage) {
            formData.append('frontImage', data.carAdditionalInfo.carImage.frontImage);
        }
        if (data.carAdditionalInfo.carImage.backImage) {
            formData.append('backImage', data.carAdditionalInfo.carImage.backImage);
        }
        if (data.carAdditionalInfo.carImage.leftSideImage) {
            formData.append('leftSideImage', data.carAdditionalInfo.carImage.leftSideImage);
        }
        if (data.carAdditionalInfo.carImage.rightSideImage) {
            formData.append('rightSideImage', data.carAdditionalInfo.carImage.rightSideImage);
        }
        if (data.carAdditionalInfo.carImage.interiorImage) {
            formData.append('interiorImage', data.carAdditionalInfo.carImage.interiorImage);
        }

        return formData;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = convertToFormData(data);
        axios
            .put("http://localhost:1310/cars/"+id, formData)
            .then((res) => {
                console.log(res.data);
                setSnackMsg("Edited Success");
                setSeverity("success");
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    nav('/admin/cars');
                }, 3000);
            }).catch((err) => {
                console.log(err);
                setSnackMsg("Edited Failed");
                setSeverity("error");
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    nav('/admin/cars');
                }, 3000);
            });
    };

    return (
        <div className="flex">
            <AdminNav />
            <div className="flex-1 p-6 ml-64">
                <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center mb-6">
                        <Link to="/admin/cars">
                            <button className="text-blue-800 hover:text-blue-600 transition-transform transform hover:scale-105">
                                <FaArrowLeft className="text-2xl" />
                                <span className="ml-2 text-lg">Back</span>
                            </button>
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold mb-6 text-blue-800 flex items-center">
                        <FaCar className="text-5xl mr-3" /> Edit Car
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                icon={<FaCar />}
                                label="Make"
                                value={data.make}
                                onChange={(e) => setData({ ...data, make: e.target.value })}
                            />
                            <InputField
                                icon={<FaCar />}
                                label="Model"
                                value={data.model}
                                onChange={(e) => setData({ ...data, model: e.target.value })}
                            />
                            <InputField
                                icon={<FaMoneyBillWave />}
                                label="Price"
                                value={data.price}
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                            />
                            <InputField
                                icon={<FaMapMarkerAlt />}
                                label="Location"
                                value={data.location}
                                onChange={(e) => setData({ ...data, location: e.target.value })}
                            />
                            <InputField
                                icon={<FaCalendarAlt />}
                                label="Year of Manufacture"
                                value={data.yrOfManufacture}
                                onChange={(e) => setData({ ...data, yrOfManufacture: e.target.value })}
                            />
                        </div>

                        <SectionTitle title="Car Details" icon={<FaInfoCircle />} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Body Type"
                                value={data.carDetails.bodyType}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, bodyType: e.target.value } })}
                            />
                            <InputField
                                label="Kilometers Driven"
                                value={data.carDetails.kmsDriven}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, kmsDriven: e.target.value } })}
                            />
                            <InputField
                                label="Fuel Type"
                                value={data.carDetails.fuelType}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, fuelType: e.target.value } })}
                            />
                            <InputField
                                label="Color"
                                value={data.carDetails.color}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, color: e.target.value } })}
                            />
                            <InputField
                                label="Transmission"
                                value={data.carDetails.transmission}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, transmission: e.target.value } })}
                            />
                            <InputField
                                label="Registration Year"
                                value={data.carDetails.regYear}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, regYear: e.target.value } })}
                            />
                            <InputField
                                label="Seats"
                                value={data.carDetails.seats}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, seats: e.target.value } })}
                            />
                            <InputField
                                label="Engine Displacement"
                                value={data.carDetails.engineDisplacement}
                                onChange={(e) => setData({ ...data, carDetails: { ...data.carDetails, engineDisplacement: e.target.value } })}
                            />
                        </div>

                        <SectionTitle title="Car Additional Info" icon={<FaInfoCircle />} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                icon={<FaInfoCircle />}
                                label="Insurance Status"
                                value={data.carAdditionalInfo.insuranceStatus}
                                onChange={(e) => setData({ ...data, carAdditionalInfo: { ...data.carAdditionalInfo, insuranceStatus: e.target.value } })}
                            />
                            <InputField
                                icon={<FaCalendarAlt />}
                                label="Insurance Expiry Date"
                                type="date"
                                value={data.carAdditionalInfo.insuranceExpiresDate}
                                onChange={(e) => setData({ ...data, carAdditionalInfo: { ...data.carAdditionalInfo, insuranceExpiresDate: e.target.value } })}
                            />
                            <OwnerDetails
                                owner={data.carAdditionalInfo.owner}
                                onChange={(updatedOwner) => setData({ ...data, carAdditionalInfo: { ...data.carAdditionalInfo, owner: updatedOwner } })}
                            />
                            <CarImages
                                images={data.carAdditionalInfo.carImage}
                                onChange={(updatedImages) => setData({
                                    ...data, carAdditionalInfo: { ...data.carAdditionalInfo, carImage: updatedImages }
                                })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-6 px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </div>
    )
}

const InputField = ({ icon, label, type = "text", value, onChange }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-2 flex items-center space-x-2">
            {icon && <span className="text-blue-600">{icon}</span>}
            <span>{label}</span>
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="form-input mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-600"
        />
    </div>
);

const SectionTitle = ({ title, icon }) => (
    <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-800 flex items-center space-x-3">
        {icon && <span className="text-3xl">{icon}</span>}
        <span>{title}</span>
    </h2>
);

const OwnerDetails = ({ owner, onChange }) => (
    <div className="space-y-4">
        <InputField
            icon={<FaFileUpload />}
            label="Owner's Name"
            value={owner.name}
            onChange={(e) => onChange({ ...owner, name: e.target.value })}
        />
        <InputField
            label="Owner's Phone Number"
            value={owner.phoneNumber}
            onChange={(e) => onChange({ ...owner, phoneNumber: e.target.value })}
        />
        <InputField
            label="Ownership Status"
            value={owner.ownershipStatus}
            onChange={(e) => onChange({ ...owner, ownershipStatus: e.target.value })}
        />
        <InputField
            label="Owner's Address"
            value={owner.address}
            onChange={(e) => onChange({ ...owner, address: e.target.value })}
        />
        <label className="block text-gray-700 font-semibold mb-2 flex items-center space-x-2">
            <FaImage className="text-blue-600" /> RC
            <input
                type="file"
                onChange={(e) => onChange({ ...owner, rc: e.target.files[0] })}
                className="mt-2 file:border-gray-300 file:py-2 file:px-4 file:rounded-md file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all duration-200"
            />
        </label>
    </div>
);
const CarImages = ({ images, onChange }) => (
    <div className="space-y-4">
        {[
            { name: 'frontImage', label: 'Front Image' },
            { name: 'backImage', label: 'Back Image' },
            { name: 'rightSideImage', label: 'Right Side Image' },
            { name: 'leftSideImage', label: 'Left Side Image' },
            { name: 'interiorImage', label: 'Interior Image' }
        ].map(({ name, label }) => (
            <label key={name} className="block text-gray-700 font-semibold mb-2 flex items-center space-x-2">
                <FaImage className="text-blue-600" /> {label}
                <input
                    type="file"
                    onChange={(e) => onChange({ ...images, [name]: e.target.files[0] })}
                    className="mt-2 file:border-gray-300 file:py-2 file:px-4 file:rounded-md file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all duration-200"
                />
            </label>
        ))}
    </div>
);

export default EditCar