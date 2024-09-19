import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import axios from 'axios';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Fetch users from backend 
    useEffect(() => {
        axios
            .get('http://localhost:1310/customers/all')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, []);

    // Calculate the indices for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex">
            <AdminNav />
            <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Registered Users</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="w-full bg-gray-800 text-white text-left">
                                    <th className="py-2 px-4">ID</th>
                                    <th className="py-2 px-4">Customer Name</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Phone Number</th>
                                    <th className="py-2 px-4">Date of Birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="py-2 px-4">{user.id}</td>
                                            <td className="py-2 px-4">{user.customerName}</td>
                                            <td className="py-2 px-4">{user.email}</td>
                                            <td className="py-2 px-4">{user.phoneNumber}</td>
                                            <td className="py-2 px-4">{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center text-gray-500">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-lg font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserList;
