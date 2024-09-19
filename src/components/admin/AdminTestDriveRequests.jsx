import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

const AdminTestDriveRequests = () => {
    const [testDriveRequests, setTestDriveRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All'); // State for status filter
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 7;

    // Fetching data from the backend
    useEffect(() => {
        axios.get('http://localhost:1310/testDriveApp/all')
            .then((res) => {
                const sortedData = res.data.sort((a, b) => new Date(a.testDriveDate) - new Date(b.testDriveDate));
                setTestDriveRequests(sortedData);
            })
            .catch((err) => {
                console.error('Error fetching test drive requests:', err);
            });
    }, []);

    // Filter requests by status
    const filteredByStatus = statusFilter === 'All' ? testDriveRequests : testDriveRequests.filter(request => request.status === statusFilter);

    // Search functionality
    const filteredRequests = filteredByStatus.filter((request) =>
        request.cars.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleStatusChange = (id) => {
        axios.patch(`http://localhost:1310/testDriveApp/completedAppointment/${id}`)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
               
            })
            .catch((err) => {
                console.error('Error updating status:', err);
            });
    };

    return (
        <div className="flex">
            <AdminNav />
            <div className="flex-1 p-6 ml-64">
                <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Test Drive Requests</h1>

                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Search by model name or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-6 p-3 border rounded w-full"
                    />

                    {/* Status Filter Dropdown */}
                    <div className="mb-6">
                        <label htmlFor="status-filter" className="block text-gray-700 font-semibold mb-2">
                            Filter by Status
                        </label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-3 border rounded w-30"
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Table */}
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 px-4">Customer</th>
                                <th className="text-left py-2 px-4">Car</th>
                                <th className="text-left py-2 px-4">Test Drive Date</th>
                                <th className="text-left py-2 px-4">Slot</th>
                                <th className="text-left py-2 px-4">Status</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRequests.map((request) => (
                                <tr key={request.id} className="border-b">
                                    <td className="py-2 px-4">{request.customer.customerName}</td>
                                    <td className="py-2 px-4">{request.cars.make} - {request.cars.model}</td>
                                    <td className="py-2 px-4">{request.testDriveDate}</td>
                                    <td className="py-2 px-4">{request.slot}</td>
                                    <td className="py-2 px-4">
                                        {request.status === 'Pending' ? (
                                            <span className="text-yellow-500">{request.status}</span>
                                        ) : ( request.status === 'Cancelled'? 
                                            <span className="text-red-500">{request.status}</span> : <span className="text-green-500">{request.status}</span>  
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {request.status === 'Pending' && (
                                            <button
                                                onClick={() => handleStatusChange(request.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Mark as Completed
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 border rounded ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                        >
                            Previous
                        </button>

                        <span className="text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTestDriveRequests;
