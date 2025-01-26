import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";

const BookingForm = () => {
  const {user} = useAuth();
  const [tourDate, setTourDate] = useState(new Date());

  const handleBooking = () => {
    alert("Tour booked successfully!");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Tour</h2>
      <form>
        {/* Package Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Package Name</label>
          <input
            type="text"
            placeholder="Enter package name"
            className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Tourist Name (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Tourist Name</label>
          <input
            type="text"
            value={user?.displayName} // Replace with logged-in user's name
            readOnly
            className="w-full bg-gray-100 border rounded-md px-4 py-2 mt-1"
          />
        </div>

        {/* Tourist Email (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Tourist Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full bg-gray-100 border rounded-md px-4 py-2 mt-1"
          />
        </div>

        {/* Tourist Image (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Tourist Image</label>
          <img
            src={user?.photoURL} 
            alt="Tourist"
            className="w-20 h-20 rounded-full mt-2"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Price</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Tour Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Tour Date</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Tour Guide Name (Dropdown) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Tour Guide Name</label>
          <select className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300">
            <option value="">Select Tour Guide</option>
            <option value="guide1">Guide 1</option>
            <option value="guide2">Guide 2</option>
            <option value="guide3">Guide 3</option>
          </select>
        </div>

        {/* Book Now Button */}
        <div>
          <button
            type="button"
            onClick={handleBooking}
            className="w-full bg-blue-950 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
