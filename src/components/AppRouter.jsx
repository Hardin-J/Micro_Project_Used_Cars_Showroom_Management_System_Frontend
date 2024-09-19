import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './users/Home';
import OverAllNav from './OverAllNav';
import SignInSide from './SignIn';
import SignUp from './SignUp';
import ContactUs from './users/ContactUs';
import AboutPage from './users/AboutPage';
import Footer from './users/Home/Footer';
import ListCars from './users/Cars/ListCars';
import CarDetails from './users/Cars/CarDetails';
import MyTestDriveAppointment from './users/MyTestDriveAppointments';
import UserProfile from './users/UserProfile';
import OTP from './OTP';
import ForgetPassword from './ForgetPassword';
import UpdatePassword from './UpdatePassword';
import AdminLayout from './admin/AdminLayout';
import AdminUserList from './admin/AdminUserList';
import AdminCarList from './admin/AdminCarList';
import AddCar from './users/Cars/AddCar';
import AdminTestDriveRequests from './admin/AdminTestDriveRequests';
import EditCar from './users/Cars/EditCar';
import MyBookings from './users/Cars/MyBookings';
import AdminBookings from './admin/AdminBookings';

function AppRouter() {
    return (
        <div>
            <Router>
                <Routes>
                    {/* ---------------- User side Routers ----------------  */}
                    <Route path="/" element={<><OverAllNav /><Home /></>} />
                    <Route path="/login" element={<> <OverAllNav /> <SignInSide /> </>} />
                    <Route path="/signup" element={<> <OverAllNav /> <SignUp /> </>} />
                    <Route path="/otp" element={<><OTP /></>} />
                    <Route path="/forgetPswd" element={<><OverAllNav /><ForgetPassword /></>} />
                    <Route path="/updatePassword" element={<><OverAllNav /><UpdatePassword /></>} />
                    <Route path="/about" element={<> <OverAllNav /> <AboutPage /> </>} />
                    <Route path="/contact" element={<> <OverAllNav /> <ContactUs /><Footer /> </>} />
                    <Route path="/browseCars" element={<> <OverAllNav /> <ListCars /> </>} />
                    <Route path="/carDetails/:id" element={<><OverAllNav /> <CarDetails /></>} />
                    <Route path="/myTestDrives" element={<><OverAllNav /> <MyTestDriveAppointment /></>} />
                    <Route path="/viewProfile" element={<><OverAllNav /> <UserProfile /></>} />
                    <Route path="/myBookings" element={<><OverAllNav /> <MyBookings /></>} />

                    {/* ---------------- Admin side Routers ----------------  */}
                    <Route path="/dashboard" element={<><AdminLayout/></>} />
                    <Route path="/admin/users" element={<><AdminUserList/></>} />
                    <Route path="/admin/cars" element={<><AdminCarList/></>} />
                    <Route path="/admin/addCar" element={<><AddCar/></>} />
                    <Route path="/admin/editCar/:id" element={<><EditCar/></>} />
                    <Route path="/admin/testDriveRequests" element={<><AdminTestDriveRequests/></>} />
                    <Route path="/admin/bookings" element={<><AdminBookings/></>} />
                    
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouter
