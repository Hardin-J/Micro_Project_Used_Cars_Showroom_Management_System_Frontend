import React, { useEffect } from 'react';
import { FaTachometerAlt, FaUser, FaCar, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom'; // Use this if you're using react-router for navigation
import logo from '../../assest/BMW_Profile.png'

const AdminNav = () => {
  // const isLog = sessionStorage.getItem('isLog');
  // const user = sessionStorage.getItem('user');
  const nav = useNavigate();

  // useEffect(() => {
  //   if (isLog === 'no') {
  //     nav('/');
  //   }
  // }, [isLog]);

  // useEffect(() => {
  //   if (user !== null) {
  //     if (user !== 'admin') {
  //       nav('/404NotFound');
  //     }
  //   }
  // }, [user]);

  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem('isLog', 'no');
    nav('/');
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-center h-25 bg-gray-800 border-b border-gray-700 flex-col">
        <button onClick={() => { nav('/dashboard') }}>
          <div className="flex items-center justify-center h-25 bg-gray-800 border-b border-gray-700 flex-col">
            <img src={logo} alt="Revved Autos Logo" className="h-12 w-auto mb-2" />
            <h1 className="text-xl font-bold">Revved Autos</h1>
            <h2 className="text-lg font-semibold mt-1">Admin Panel</h2>
          </div>
        </button>
      </div>

      <nav className="mt-10">
        <ul>
          <li className="mb-6">
            <NavLink
              exact
              to="/dashboard"
              className="flex items-center py-3 px-6 hover:bg-gray-700 transition duration-300"
              activeClassName="bg-gray-700"
            >
              <FaTachometerAlt className="mr-4" size={20} />
              Dashboard
            </NavLink>
          </li>

          <li className="mb-6">
            <NavLink
              to="/admin/users"
              className="flex items-center py-3 px-6 hover:bg-gray-700 transition duration-300"
              activeClassName="bg-gray-700"
            >
              <FaUser className="mr-4" size={20} />
              Users
            </NavLink>
          </li>

          <li className="mb-6">
            <NavLink
              to="/admin/cars"
              className="flex items-center py-3 px-6 hover:bg-gray-700 transition duration-300"
              activeClassName="bg-gray-700"
            >
              <FaCar className="mr-4" size={20} />
              Cars
            </NavLink>
          </li>

          <li className="mb-6">
            <NavLink
              to="/admin/testDriveRequests"
              className="flex items-center py-3 px-6 hover:bg-gray-700 transition duration-300"
              activeClassName="bg-gray-700"
            >
              <FaClipboardList className="mr-4" size={20} />
              Test Drive Requests
            </NavLink>
          </li>

          <li className="mb-6">
            <NavLink
              to="/admin/bookings"
              className="flex items-center py-3 px-6 hover:bg-gray-700 transition duration-300"
              activeClassName="bg-gray-700"
            >
              <FaClipboardList className="mr-4" size={20} />
              Booking Requests
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-800 border-t border-gray-700 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-500 transition-transform transform hover:scale-105 duration-300"
        >
          <FaSignOutAlt className="mr-2" size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
