import React, { useState, useEffect } from "react"; 
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Confetti from "react-confetti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowLeft } from "react-icons/fa";

const AllTripsPage = () => {
  const [tours, setTours] = useState([]);
  const [guides, setGuides] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState({}); // Track selected guides for each tour
  const [bookingCount, setBookingCount] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch tours data and guides on component mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axiosSecure.get("/tours");
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    const fetchGuides = async () => {
      try {
        const response = await axiosSecure.get("/users");
        const guides = response.data.filter(user => user.role === "guide");
        setGuides(guides);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchTours();
    fetchGuides();
  }, [axiosSecure]);

  // Handle guide selection for each tour
  const handleGuideChange = (tourId, guideId) => {
    setSelectedGuides((prevSelectedGuides) => ({
      ...prevSelectedGuides,
      [tourId]: guideId,
    }));
  };

  // Add to Cart handler
  const handleAddToCart = (tour) => {
    const selectedGuide = selectedGuides[tour?._id]; // Get the selected guide for the current tour
    if (user?.email && selectedGuide) {
      const cartItem = {
        tourId: tour._id,
        email: user.email,
        trip_title: tour.trip_title,
        photo: tour.photo,
        price: tour.price,
        guideId: selectedGuide,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${tour.trip_title} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          setBookingCount((prevCount) => prevCount + 1); // Increment booking count
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In or Guide Not Selected",
        text: "Please login and select a guide to add to the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  // Show discount when booking count reaches 3
  useEffect(() => {
    if (bookingCount >= 3) {
      setShowDiscount(true);
    }
  }, [bookingCount]);

  // Close discount modal handler
  const handleCloseModal = () => {
    setShowDiscount(false);
  };

  return (
    <div className="relative my-9">
      <SectionTitle heading={"All Trips Hunt"} subHeading={"live your life"} />

      {/* Back to Home Button */}
      <div className="absolute top-16 left-8 z-10">
        <Link to="/" className="text-[#231081] text-2xl">
          <FaArrowLeft />
        </Link>
      </div>

      {/* Confetti & Discount Message */}
      {showDiscount && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <Confetti />
          <div className="bg-white shadow-lg rounded-lg p-6 text-center relative">
            <button
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 py-1 rounded-full"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-green-500">
              Congratulations! 🎉
            </h2>
            <p className="mt-4 text-lg">You have unlocked a special discount!</p>
            <button className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Apply Discount
            </button>
          </div>
        </div>
      )}

      <div className="w-[89%] mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-3 md:w-[95%] gap-6">
          {tours.map((item, index) => (
            <div
              key={index}
              className="tour-card md:w-96 w-72 mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={item.photo || "https://via.placeholder.com/150"}
                alt={item.trip_title || "Tour Title"}
                className="tour-image w-full h-56 object-cover transform transition duration-300 hover:scale-110"
              />
              <div className="p-6">
                <h2 className="tour-title text-2xl font-semibold text-gray-800">
                  {item.trip_title || "Untitled Trip"}
                </h2>
                <p className="tour-type text-gray-500 mt-1">
                  {item.tour_type || "Unknown Type"}
                </p>
                <p className="tour-price text-xl font-semibold text-green-500 mt-4">
                  Price: ${item.price || "N/A"}
                </p>

                {/* Guide Selection */}
                <div className="mt-4">
                  <label htmlFor="guide" className="block text-sm font-medium text-gray-700">Select Tour Guide</label>
                  <select
                    id="guide"
                    name="guide"
                    className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedGuides[item._id] || ""}
                    onChange={(e) => handleGuideChange(item._id, e.target.value)}
                  >
                    <option value="">Select a guide</option>
                    {guides.map((guide) => (
                      <option key={guide._id} value={guide._id}>
                        {guide.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </button>
                <button
                  className="mt-4 ml-4 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition duration-300"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to PreBook
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllTripsPage;

