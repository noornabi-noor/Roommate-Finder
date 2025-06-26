import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-gray-500 p-20 mt-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

        <div>
          <h3 className="text-primary text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: support@findmyroommate.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: 123 Roommate Street, Dhaka, Bangladesh</p>
        </div>

        <div className='text-gray-500'>
          <h3 className="text-primary text-xl font-semibold mb-4">Terms & Conditions</h3>
          <ul className="space-y-2">
            <li><a href="/terms" className=" hover:text-gray-700 transition">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-gray-700 transition">Privacy Policy</a></li>
            <li><a href="/refund" className="hover:text-gray-700 transition">Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-gray-700 transition text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-gray-700 transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-700 transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gray-700 transition text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 border-t pt-6 text-center text-gray-500 text-sm font-bold">
        © {new Date().getFullYear()} roommate.com . All rights reserved.
        
      </div>
    </footer>
  );
};

export default Footer;
