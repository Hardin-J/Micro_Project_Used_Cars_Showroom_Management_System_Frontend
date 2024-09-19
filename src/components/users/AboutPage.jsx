import React from 'react';
import Footer from './Home/Footer';
import { FaCar, FaDollarSign, FaRegMoneyBillAlt } from 'react-icons/fa';
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaUserGroup } from "react-icons/fa6";
import { GoLightBulb } from "react-icons/go";

const AboutPage = () => {
    return (
        <main className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-indigo-700 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 opacity-40"></div>
                <div className="max-w-6xl mx-auto px-6 relative text-center">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                        About Us
                    </h1>
                    <p className="text-lg mb-10">
                        Welcome to <span className="font-semibold">Revved Autos</span> – where buying and selling used cars is effortless and enjoyable!
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-700 text-lg mb-10">
                        At Revved Autos, our mission is to provide a seamless and enjoyable experience for car buyers and sellers. We leverage cutting-edge technology and industry expertise to ensure that every transaction is transparent, efficient, and satisfying.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-8">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                            <div className="text-indigo-600 mb-4">
                                <VscWorkspaceTrusted size={40} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Integrity</h3>
                            <p className="text-gray-600">
                                We conduct our business with the highest ethical standards, ensuring honesty and transparency in all our dealings.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                            <div className="text-indigo-600 mb-4">
                                <FaUserGroup size={40} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Customer-Centric</h3>
                            <p className="text-gray-600">
                                Our customers are at the heart of everything we do. We strive to meet their needs and exceed their expectations.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                            <div className="text-indigo-600 mb-4">
                                <GoLightBulb size={40} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                            <p className="text-gray-600">
                                We embrace technology and innovation to improve our processes and deliver exceptional service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-8">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
                            <div className="text-indigo-600 mb-4">
                                <FaCar size={40} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Buy a Car</h3>
                            <p className="text-gray-600">
                                Explore our extensive inventory of high-quality used cars. Our knowledgeable staff is here to help you find the perfect vehicle.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
                            <div className="text-indigo-600 mb-4">
                                <FaDollarSign size={40} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Sell Your Car</h3>
                            <p className="text-gray-600">
                                We offer a hassle-free process for selling your car. Get a competitive offer and a smooth transaction experience.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
                            <div className="text-indigo-600 mb-4">
                                <FaRegMoneyBillAlt size={40} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Financing Options</h3>
                            <p className="text-gray-600">
                                Our financing solutions make it easy to purchase your next car. We work with multiple lenders to find the best rates for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default AboutPage;
