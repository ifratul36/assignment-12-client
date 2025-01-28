
import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10); // Show 10 bookings per page
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings from the API
    const fetchBookings = async () => {
      try {
        const { data } = await axiosSecure.get("/carts");
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Calculate the indexes for slicing the data
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Pagination function to update current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <>
      <SectionTitle heading={"My Bookings"} subHeading={"---How many??---"} />
      <div className="flex justify-start my-4">
        <h2 className="text-3xl font-semibold">
          Total bookings: {bookings.length}
        </h2>
      </div>
      <div className="overflow-x-auto ml-8 p-2">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Package Name</th>
              <th>Tour Guide</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td><img src={booking.photo} className="w-16 h-16 rounded" alt="" /></td>
                  <td>{booking.trip_title || "N/A"}</td>
                  <td>{booking.guideName || "N/A"}</td>
                  <td>${booking.price || "N/A"}</td>
                  <td>
                  <button className="btn bg-blue-950 text-[#fff] btn-sm mr-2">
                        Pay
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {/* Previous Page Button */}
          <button
            className="btn bg-blue-950 text-[#fff] btn-sm mr-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {/* Page Number Buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn  btn-sm mx-1 ${currentPage === index + 1 ? "btn-active" : ""}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {/* Next Page Button */}
          <button
            className="btn bg-blue-950 text-[#fff] btn-sm ml-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MyBooking;
