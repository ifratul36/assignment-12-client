// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const BookingForm = () => {
//   const {user} = useAuth();
//   const [tourDate, setTourDate] = useState(new Date());
//   const [tours, setTours] = useState([]);
//   const [guides, setGuides] = useState([]);
//   const [selectedGuides, setSelectedGuides] = useState({}); // Track selected guides for each tour
//   const [bookingCount, setBookingCount] = useState(0);
//   const axiosSecure = useAxiosSecure();


//   const fetchGuides = async () => {
//     try {
//       const response = await axiosSecure.get("/users");
//       const guides = response.data.filter((user) => user.role === "guide");
//       setGuides(guides);
//     } catch (error) {
//       console.error("Error fetching guides:", error);
//     }
//   };
//   fetchTours();
//   fetchGuides();
// }, [axiosSecure]);

// // Handle guide selection for each tour
// const handleGuideChange = (tourId, guideId, guideName) => {
//   setSelectedGuides((prevSelectedGuides) => ({
//     ...prevSelectedGuides,
//     [tourId]: { id: guideId, name: guideName },
//   }));
// };
//  // Add to Cart handler
//    const handleAddToCart = (tour) => {
//      const selectedGuide = selectedGuides[tour?._id]; // Get the selected guide for the current tour
//      if (user?.email && selectedGuide) {
//        const cartItem = {
//          tourId: tour._id,
//          email: user.email,
//          trip_title: tour.trip_title,
//          photo: tour.photo,
//          price: tour.price,
//          guideId: selectedGuide.id,
//          guideName: selectedGuide.name,
//        };
 
//        axiosSecure.post("/carts", cartItem).then((res) => {
//          if (res.data.insertedId) {
//            Swal.fire({
//              position: "top-end",
//              icon: "success",
//              title: `${tour.trip_title} added to your cart with guide ${selectedGuide.name}`,
//              showConfirmButton: false,
//              timer: 1500,
//            });
//            setBookingCount((prevCount) => prevCount + 1); // Increment booking count
 
//            // Reset the guide selection for this tour after adding to cart
//            setSelectedGuides((prevSelectedGuides) => ({
//              ...prevSelectedGuides,
//              [tour._id]: { id: "", name: "" }, // Reset the selected guide to default
//            }));
//          }
//        });
//      } else {
//        Swal.fire({
//          title: "You are not Logged In or Guide Not Selected",
//          text: "Please login and select a guide to add to the cart.",
//          icon: "warning",
//          showCancelButton: true,
//          confirmButtonColor: "#3085d6",
//          cancelButtonColor: "#d33",
//          confirmButtonText: "Yes, login!",
//        }).then((result) => {
//          if (result.isConfirmed) {
//            navigate("/login", { state: { from: location } });
//          }
//        });
//      }
//    };

//   return (
//     <div className="max-w-lg mx-auto my-10 bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Tour</h2>
//       <form>
//         {/* Package Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Package Name</label>
//           <input
//             type="text"
//             placeholder="Enter package name"
//             className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300"
//           />
//         </div>

//         {/* Tourist Name (Read-only) */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Tourist Name</label>
//           <input
//             type="text"
//             value={user?.displayName} // Replace with logged-in user's name
//             readOnly
//             className="w-full bg-gray-100 border rounded-md px-4 py-2 mt-1"
//           />
//         </div>

//         {/* Tourist Email (Read-only) */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Tourist Email</label>
//           <input
//             type="email"
//             value={user?.email}
//             readOnly
//             className="w-full bg-gray-100 border rounded-md px-4 py-2 mt-1"
//           />
//         </div>

//         {/* Tourist Image (Read-only) */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Tourist Image</label>
//           <img
//             src={user?.photoURL} 
//             alt="Tourist"
//             className="w-20 h-20 rounded-full mt-2"
//           />
//         </div>

//         {/* Price */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Price</label>
//           <input
//             type="number"
//             placeholder="Enter price"
//             className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300"
//           />
//         </div>

//         {/* Tour Date */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700">Tour Date</label>
//           <DatePicker
//             selected={tourDate}
//             onChange={(date) => setTourDate(date)}
//             className="w-full border rounded-md px-4 py-2 mt-1 focus:ring focus:ring-blue-300"
//           />
//         </div>

//         {/* Guide Selection */}
//         <select
//                   id="guide"
//                   name="guide"
//                   className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   value={selectedGuides[item._id]?.id || ""} // Resets to empty value after adding to cart
//                   onChange={(e) => {
//                     const selectedGuide = guides.find(
//                       (guide) => guide._id === e.target.value
//                     );
//                     handleGuideChange(
//                       item._id,
//                       selectedGuide?._id,
//                       selectedGuide?.name
//                     );
//                   }}
//                 >
//                   <option value="">Select a guide</option>
//                   {guides.map((guide) => (
//                     <option key={guide._id} value={guide._id}>
//                       {guide.name}
//                     </option>
//                   ))}
//                 </select>

//         {/* Book Now Button */}
//         <div>
//           <button
//             type="button"
//             onClick={() => handleAddToCart(item)}
//             className="w-full bg-blue-950 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
//           >
//             Book Now
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;



import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2"; // Make sure Swal is imported
import { useNavigate, useLocation } from "react-router-dom"; // Ensure you're using react-router-dom

const BookingForm = () => {
  const { user } = useAuth();
  const [tourDate, setTourDate] = useState(new Date());
  const [tours, setTours] = useState([]);
  const [guides, setGuides] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState({}); // Track selected guides for each tour
  const [bookingCount, setBookingCount] = useState(0);
  const axiosSecure = useAxiosSecure();
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

    const fetchTours = async () => {
      try {
        const response = await axiosSecure.get("/carts"); // Replace with correct endpoint
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
    fetchGuides();
  }, [axiosSecure]);

  // Handle guide selection for each tour
  const handleGuideChange = (tourId, guideId, guideName) => {
    setSelectedGuides((prevSelectedGuides) => ({
      ...prevSelectedGuides,
      [tourId]: { id: guideId, name: guideName },
    }));
  };

  const handleAddToCart = () => {
    console.log("Adding to cart with tour:", tour); // Check if tour data is passed
    console.log("Selected guides:", selectedGuides); // Check if guide data is passed
  
    if (tour && selectedGuides) {
      const cartItem = {
        tourId: tour._id,
        guideId: selectedGuides._id, // Ensure guideId is selected properly
        userId: user._id, // Make sure you have userId
        date: new Date(),
      };
  
      // API call to add to cart
      axiosSecure.post("/carts", cartItem)
        .then((response) => {
          console.log("Item added to cart:", response.data); // Check if data is added successfully
          setShowToast(true); // Show toast on success
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error); // Debug error response
        });
    } else {
      console.log("Tour or guide data is missing.");
    }
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

        {/* Guide Selection */}
        <select
          id="guide"
          name="guide"
          className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedGuides[tours._id]?.id || ""} // Reset to empty value after adding to cart
          onChange={(e) => {
            const selectedGuide = guides.find(
              (guide) => guide._id === e.target.value
            );
            handleGuideChange(tours._id, selectedGuide?._id, selectedGuide?.name);
          }}
        >
          <option value="">Select a guide</option>
          {guides.map((guide) => (
            <option key={guide._id} value={guide._id}>
              {guide.name}
            </option>
          ))}
        </select>

        {/* Book Now Button */}
        <div>
          <button
            type="button"
            onClick={() => handleAddToCart(tours)} // Passing the correct tour object
            className="w-full bg-blue-950 text-white font-semibold py-2 mt-3 px-4 rounded-md hover:bg-blue-600 transition-all"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

