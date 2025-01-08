import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaHistory, FaShoppingCart, FaStar, FaBook } from "react-icons/fa";

const DeshBoard = () => {
  return (
    <div className="flex">
      {/* Left Navigation */}
      <div className="w-2/12 min-h-screen bg-orange-300">
        <ul className="space-y-4 ml-4 mt-6">
          <li>
            <NavLink  to="/home"  className={({ isActive }) =>
                `flex items-center space-x-2 ${  isActive ? "text-blue-600 font-bold" : "text-gray-700"  }` } > <FaHome /> <span>User Home</span></NavLink>
          </li>
          <li>
            <NavLink to="/reservation"className={({ isActive }) =>`flex items-center space-x-2 ${ isActive ? "text-blue-600 font-bold" : "text-gray-700" }`}> <FaCalendarAlt /> <span>Reservation</span></NavLink>
          </li>

          <li>
            <NavLink to="/payment-history" className={({ isActive }) =>`flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700" }`}> <FaHistory /> <span>Payment History</span> </NavLink>
             </li>

          <li>
            <NavLink to="/dashboard/card" className={({ isActive }) => `flex items-center space-x-2 ${ isActive ? "text-blue-600 font-bold" : "text-gray-700"}` } ><FaShoppingCart /> <span>My Cart</span> </NavLink>  </li>

          <li> <NavLink to="/add-review" className={({ isActive }) => `flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}` } > <FaStar /> <span>Add Review</span></NavLink>
          </li>

          <li>
            <NavLink to="/my-booking"className={({ isActive }) =>`flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700" }` }><FaBook /> <span>My Booking</span></NavLink>
          </li>
        </ul>
        <div className="divider">Or</div>
        <div>
            <ul className="ml-4">
                <li>
                <NavLink to="/"className={({ isActive }) =>`flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700" }` }><FaHome /> <span>Home</span></NavLink>
                </li>
                <li>
                <NavLink to="/order/salad"className={({ isActive }) =>`flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700" }` }><FaHome /> <span>Order</span></NavLink>
                </li>
            </ul>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DeshBoard;
