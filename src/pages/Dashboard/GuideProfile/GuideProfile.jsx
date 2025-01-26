import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const GuideProfile = () => {
  const { user } = useAuth();
  console.log(user);
  const [guide, setGuide] = useState(null);
  console.log(guide);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});

  // Fetch logged-in guide's information
  useEffect(() => {
    const fetchGuideInfo = async () => {
      try {
        if (user && user.email && user.role === "guide") { // Check if user is a guide
          const token = localStorage.getItem("accessToken"); // Get the token
          console.log(token);
          const response = await axios.get(`/users/${user?.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data) {
            setGuide(response.data);
            setUpdatedInfo({
              name: response.data.name,
              image: response.data.image,
            });
          }
        } else {
          console.log("User is not a guide.");
        }
      } catch (error) {
        console.error("Error fetching guide info:", error);
      }
    };

    fetchGuideInfo();
  }, [user]); // Run this effect whenever the `user` changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `/users/${guide._id}`,
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.modifiedCount > 0) {
        setGuide({ ...guide, ...updatedInfo });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating guide info:", error);
    }
  };

  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Welcome, {guide.name}</h2>
      <div className="flex flex-col items-center mb-4">
        <img
          src={guide.image || "https://via.placeholder.com/150"}
          alt={guide.name}
          className="w-32 h-32 rounded-full mb-2"
        />
        <p className="text-lg">Email: {guide.email}</p>
        <p className="text-lg">Role: {guide.role}</p>
      </div>
      {guide.role === "guide" && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedInfo.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={updatedInfo.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideProfile;
