import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'; // For smooth transitions

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const customerId = sessionStorage.getItem("id");

    useEffect(() => {
        if (customerId) {
            const fetchCustomerData = async () => {
                try {
                    const response = await axios.get(`http://localhost:1310/customers/${customerId}`);
                    setUser(response.data);
                    setEditedUser(response.data); // Initialize editedUser with fetched data
                    console.log('Fetched customer data:', response.data);
                } catch (err) {
                    console.error('Error fetching customer data:', err);
                }
            };
            fetchCustomerData();
        }
    }, [customerId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:1310/customers/${customerId}`, editedUser);
            setUser(editedUser);
            setIsEditing(false);
            console.log('User updated successfully');
        } catch (err) {
            console.error('Error updating user data:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-24 bg-white rounded-lg shadow-md transition-transform transform hover:scale-100 duration-300 ease-in-out">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>

            <div className="flex items-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-3xl font-bold">
                    {user.customerName ? user.customerName[0] : 'U'}
                </div>
                <div className="ml-4">
                    <h1 className="text-2xl font-semibold text-gray-800">{user.customerName}</h1>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Transition
                    show={isEditing}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Edit Contact Information</h2>
                        <input
                            type="text"
                            name="customerName"
                            value={editedUser.customerName || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            placeholder="Customer Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={editedUser.phoneNumber || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            placeholder="Phone Number"
                        />
                    </div>
                </Transition>

                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h2>
                    <p className="text-gray-700"><strong>Date of Birth:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                    <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber ? user.phoneNumber : 'N/A'}</p>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleEditToggle}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleEditToggle}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors duration-300"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
