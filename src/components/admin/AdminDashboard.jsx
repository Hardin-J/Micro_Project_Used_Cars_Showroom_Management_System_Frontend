import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaUser, FaCar, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dashboard Card Component
const DashboardCard = ({ title, count, icon, bgColor, navlink }) => {
    const nav = useNavigate();
    return (
        <button onClick={() => { nav(navlink) }}>
            <div
                className={`bg-white p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl ${bgColor}`}
            >
                <div className="flex justify-between items-center">
                    <div className="text-3xl text-white p-4 bg-opacity-20 rounded-full">
                        {icon}
                    </div>
                    <div className="text-right">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                        <p className="text-4xl font-bold text-white">{count}</p>
                    </div>
                </div>
            </div>
        </button>
    );
};


// Sales Bar Chart Component
const SalesReportChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#38bdf8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

// Admin Dashboard Component
const AdminDashboard = () => {
    // const [userCount, setUserCount] = useState(0);
    // const [testDriveRequests, setTestDriveRequests] = useState(0);
    // const [availableCars, setAvailableCars] = useState(0);
    const [sales, setSales] = useState(0);
    const [count, setCount] = useState([]);
    const [error, setError] = useState('');
    const [salesData,setSalesData] = useState([])

    useEffect(() => {
        const fetchCounts = async () => {
            try {
              const response = await axios.get('http://localhost:1310/admin/dashboard'); // Adjust URL as needed
              setCount(response.data);
            //   setFilteredBookings(response.data);
            } catch (err) {
              setError('Failed to fetch Count results.');
            }
          };
      
          fetchCounts();
        // Simulate fetching data from API
        // setUserCount(150); // Example value
        // setTestDriveRequests(23);
        // setAvailableCars(45);
        // setSales(32);

        setSalesData([
            { month: 'January', sales: 30 },
            { month: 'February', sales: 20 },
            { month: 'March', sales: 50 },
            { month: 'April', sales: 70 },
            { month: 'May', sales: 40 },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <DashboardCard
                    title="Users"
                    count={count[1]}
                    icon={<FaUser size={40} />}
                    bgColor="bg-gradient-to-r from-blue-500 to-purple-600"
                    navlink={"/admin/users"}
                    />
                <DashboardCard
                    title="Test Drives"
                    count={count[2]}
                    icon={<FaClipboardList size={40} />}
                    bgColor="bg-gradient-to-r from-green-500 to-teal-600"
                    navlink={"/admin/testDriveRequests"}
                    />
                <DashboardCard
                    title="Available Cars"
                    count={count[0]}
                    icon={<FaCar size={40} />}
                    bgColor="bg-gradient-to-r from-red-500 to-orange-600"
                    navlink={"/admin/cars"}
                    />
                <DashboardCard
                    title="Bookings"
                    count={count[3]}
                    icon={<FaClipboardList size={40} />}
                    bgColor="bg-gradient-to-r from-yellow-500 to-pink-600"
                    navlink={"/admin/bookings"}
                />
            </div>

            {/* Sales Report Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-gray-700">Sales Report</h3>
                <SalesReportChart data={salesData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
