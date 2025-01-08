import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Your one-stop solution for managing restaurants, exploring
              delicious foods, and enhancing your dining experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/all-foods" className="hover:underline">
                  All Foods
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:underline">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
            <form>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[rgb(229,101,3)] hover:bg-red-600 text-white px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-around">
          {/* Copyright */}
          <p className="text-gray-400 text-sm ">
            © {new Date().getFullYear()} Restaurant Management. All rights reserved.
          </p>

          {/* Social Media */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebook></FaFacebook>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter></FaTwitter>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram></FaInstagram>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
             <FaLinkedin></FaLinkedin>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
