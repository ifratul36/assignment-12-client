// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";

// const ManageProfile = () => {
//   const { user } = useAuth(); // Get logged-in user from context
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (user?.email) {
//           // Fetch all users and filter the logged-in user without a role
//           const response = await axios.get(`http://localhost:3000/users`);
//           const filteredUser = response.data.find(
//             (u) => u.email === user.email && (!u.role || u.role === "No Role")
//           );
//           setUserData(filteredUser);
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!userData) {
//     return <div>No user profile found or the user has a role assigned.</div>;
//   }

//   return (
//     <div className="p-4 flex justify-center items-center">
//       <div>
//       <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>
//       <div className="border py-16 p-4 rounded-lg w-96 h-auto shadow-md flex flex-col items-center">
//         <img
//           src={user.photoURL || "https://via.placeholder.com/150"}
//           alt={userData.name}
//           className="w-52 h-52 rounded mb-2"
//         />
//         <h2 className="text-lg font-semibold">{userData.name}</h2>
//         <p className="text-gray-500">{userData.email}</p>
//         <p className="mt-2 text-sm">
//           Role:{" "}
//           <span className="px-2 py-1 rounded bg-[#27058e37] text-black">
//             Tourist
//           </span>
//         </p>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ManageProfile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const ManageProfile = () => {
//   const { user } = useAuth(); // Get logged-in user from context
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const axiosSecure = useAxiosSecure();

import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProfile = () => {
  const { user } = useAuth(); // Get logged-in user from context
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({ name: "", photoURL: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?.email) {
          // Fetch the user from the backend
          const response = await axios.get(`http://localhost:3000/users`);
          const filteredUser = response.data.find(
            (u) => u.email === user.email && (!u.role || u.role === "No Role")
          );
          setUserData(filteredUser); // Set userData
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, [user]); // Fetch data when user changes

  const handleEditClick = () => {
    if (userData) {
      // Pre-fill the modal with the current data
      setUpdatedData({
        name: userData.name || "",
        photoURL: userData.photoURL || "",
      });
    }
    setIsEditModalOpen(true); // Open the modal
  };

  const handleSave = async () => {
    try {
      // Send the updated data to the backend
      const response = await axiosSecure.patch(`/users/${userData._id}`, updatedData);

      if (response.data.modifiedCount > 0) {
        // Update local state with the updated data
        setUserData((prevData) => ({
          ...prevData,
          name: updatedData.name,
          photoURL: updatedData.photoURL,
        }));
        setIsEditModalOpen(false); // Close the modal
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${updatedData.name} updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user profile found or the user has a role assigned.</div>;
  }

  return (
    <div className="p-4 flex justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {userData.name}!</h1>
        <div className="border py-16 p-4 rounded-lg w-96 h-auto shadow-md flex flex-col items-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt={userData.name}
            className="w-52 h-52 rounded mb-2"
          />
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-2 text-sm">
            Role:{" "}
            <span className="px-2 py-1 rounded bg-[#27058e37] text-black">
              {userData.role || "Tourist"}
            </span>
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => alert("Tour Guide application link")}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Apply as Tour Guide
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="modal bg-gray-500 bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-sm">Name:</label>
              <input
                type="text"
                value={updatedData.name}
                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Photo URL:</label>
              <input
                type="text"
                value={updatedData.photoURL}
                onChange={(e) => setUpdatedData({ ...updatedData, photoURL: e.target.value })}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
