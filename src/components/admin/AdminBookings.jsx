import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:1310/carSales/all');
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (err) {
        setError('Failed to fetch booking requests.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAction = async (bookingId, status) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
    try {
      await axios.patch(`http://localhost:1310/carSales/approval/${bookingId}`, { approvalStatus: status });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, approvalStatus: status } : b))
      );
      filterBookings(); // Reapply the search and filter
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update status');
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.cars.id.toString().includes(searchTerm) || booking.cars.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((booking) => booking.approvalStatus === statusFilter);
    }

    setFilteredBookings(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, bookings]);

  const totalItems = filteredBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <p>Loading booking requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-1 p-6 ml-64">
        <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">All Booking Requests</h2>

          {/* Search and Filter */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Car ID or Model"
              className="border px-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border px-4 py-2 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200 text-left">
                  <th className="py-2 px-4">Car</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Actual Price</th>
                  <th className="py-2 px-4">Quoted Price</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No booking requests found.
                    </td>
                  </tr>
                ) : (
                  displayedBookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-2 px-4">
                        {booking.cars.make} - {booking.cars.model}
                      </td>
                      <td className="py-2 px-4">{booking.customer.customerName}</td>
                      <td className="py-2 px-4">₹{booking.cars.price}</td>
                      <td className="py-2 px-4">{booking.price}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-1 rounded-lg ${
                            booking.approvalStatus === 'Approved'
                              ? 'bg-green-200 text-green-800'
                              : booking.approvalStatus === 'Rejected'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-yellow-200 text-yellow-800'
                          }`}
                        >
                          {booking.approvalStatus}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {actionLoading[booking.id] ? (
                          <p>Processing...</p>
                        ) : (
                          <>
                            {booking.approvalStatus === 'Pending' && (
                              <>
                                <button
                                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                  onClick={() => handleAction(booking.id, 'Approved')}
                                >
                                  Approve
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                  onClick={() => handleAction(booking.id, 'Rejected')}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4">
                <button
                  className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
