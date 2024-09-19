import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Contact Information */}
        <div className="flex flex-col md:flex-row md:justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-3">Contact Us</h3>
            <p className="mb-3">1234 Car Lane, Auto City, AC 56789</p>
            <p className="mb-3">Phone: (123) 456-7890</p>
            <p>Email: 
              <a href="info@usedcarshowroom.com" className="text-blue-400 hover:underline">info@bmw.revved.autos.com</a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
            <a href="/" className="text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-110">
              <FaFacebookF className="text-3xl" />
            </a>
            <a href="/" className="text-blue-400 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaTwitter className="text-3xl" />
            </a>
            <a href="/" className="text-pink-500 hover:text-pink-700 transition duration-300 transform hover:scale-110">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="/" className="text-blue-700 hover:text-blue-900 transition duration-300 transform hover:scale-110">
              <FaLinkedinIn className="text-3xl" />
            </a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-center py-4 mt-12">
        <p className="text-gray-400 text-sm">© 2024 BMW Revved Autos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
