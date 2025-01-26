// import React from 'react';

// const TourCard = ({item}) => {
//     const { photo, trip_title, tour_type, price } = item;
//     return (
//         <div className="tour-card">
//             <img src={photo} alt={trip_title} className="tour-image" />
//             <h2 className="tour-title">{trip_title}</h2>
//             <p className="tour-type">{tour_type}</p>
//             <p className="tour-price">Price: ${price}</p>
//         </div>
//     );
// };

// export default TourCard;

import React from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TourCard = ({ item }) => {
    const { photo, trip_title, tour_type, price , _id} = item;
    const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure =  useAxiosSecure();

    const handleAddToCart = () => {
        if (user && user.email) {
          const cartItem = {
            tourId: _id,
            email: user.email,
            trip_title,
            photo,
            price,
          };
          axiosSecure.post("/carts", cartItem).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${trip_title} added to your cart`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } else {
          Swal.fire({
            title: "You are not Logged In",
            text: "Please login to add to the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login!",
          }).then((result) => {
            if (result.isConfirmed) {
              //  send the user in thelogin page
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
                <h2 className="tour-title text-2xl font-semibold text-gray-800">{trip_title}</h2>
                <p className="tour-type text-gray-500 mt-1">{tour_type}</p>
                <p className="tour-price text-xl font-semibold text-green-500 mt-4">Price: ${price}</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                    View Details
                </button>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition duration-300" onClick={() => handleAddToCart(item)}>
                    Add to PreBook
                </button>
            </div>
        </div>
    );
};

export default TourCard;
