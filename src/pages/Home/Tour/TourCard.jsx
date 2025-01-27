import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TourCard = ({ item, setBookingCount }) => {
  const { photo, trip_title, tour_type, price, _id } = item;
  const [guides, setGuides] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState({});
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axiosSecure.get("/users");
        const guides = response.data.filter((user) => user.role === "guide");
        setGuides(guides);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, [axiosSecure]);

  const handleGuideChange = (tourId, guideId, guideName) => {
    if (!guideId || !guideName) {
      console.error("Invalid guide selected");
      return;
    }

    setSelectedGuides((prevSelectedGuides) => ({
      ...prevSelectedGuides,
      [tourId]: { id: guideId, name: guideName },
    }));
  };

  const handleAddToCart = (tour) => {
    const selectedGuide = selectedGuides[tour._id];
    if (user?.email && selectedGuide) {
      const cartItem = {
        tourId: tour._id,
        email: user.email,
        trip_title: tour.trip_title,
        photo: tour.photo,
        price: tour.price,
        guideId: selectedGuide.id,
        guideName: selectedGuide.name,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${tour.trip_title} added to your cart with guide ${selectedGuide.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setBookingCount((prevCount) => prevCount + 1); // Increment booking count

          // Reset the guide selection for this tour after adding to cart
          setSelectedGuides((prevSelectedGuides) => ({
            ...prevSelectedGuides,
            [tour._id]: { id: "", name: "" }, // Reset the selected guide to default
          }));
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

  return (
    <div className="tour-card md:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={photo}
        alt={trip_title}
        className="tour-image w-full h-56 object-cover transform transition duration-300 hover:scale-110"
      />
      <div className="p-6">
        <h2 className="tour-title text-2xl font-semibold text-gray-800">
          {trip_title}
        </h2>
        <p className="tour-type text-gray-500 mt-1">{tour_type}</p>
        <p className="tour-price text-xl font-semibold text-green-500 mt-4">
          Price: ${price}
        </p>

        {/* Guide Selection */}
        <select
          id="guide"
          name="guide"
          className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedGuides[item._id]?.id || ""}
          onChange={(e) => {
            const selectedGuide = guides.find(
              (guide) => guide._id === e.target.value
            );
            handleGuideChange(
              item._id,
              selectedGuide?._id,
              selectedGuide?.name
            );
          }}
        >
          <option value="">Select a guide</option>
          {guides.map((guide) => (
            <option key={guide._id} value={guide._id}>
              {guide.name}
            </option>
          ))}
        </select>

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition duration-300">
          View Details
        </button>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition duration-300"
          onClick={() => handleAddToCart(item)}
        >
          Add to PreBook
        </button>
      </div>
    </div>
  );
};

export default TourCard;
