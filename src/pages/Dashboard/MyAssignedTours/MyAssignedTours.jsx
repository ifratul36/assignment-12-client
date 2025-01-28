import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssignedTours = () => {
  const [assignedTours, setAssignedTours] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch assigned tours filtered by the current guide's ID
  useEffect(() => {
    const fetchAssignedTours = async () => {
      try {
        const response = await axiosSecure.get("https://assignment-12-server-jet-six.vercel.app/carts");
        const tours = response.data.filter(
          (tour) => tour.guideId === "guideId" // Replace with the actual guide ID dynamically
        );
        setAssignedTours(tours);
      } catch (error) {
        console.error("Error fetching assigned tours:", error);
      }
    };

    fetchAssignedTours();
  }, [axiosSecure]);

  // Handle Accept Button Click
  const handleAccept = async (tourId) => {
    try {
      const response = await axiosSecure.patch(`/carts/${tourId}`, {
        status: "Accepted",
      });
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Tour status updated to Accepted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        // Update UI
        setAssignedTours((prev) =>
          prev.map((tour) =>
            tour._id === tourId ? { ...tour, status: "Accepted" } : tour
          )
        );
      }
    } catch (error) {
      console.error("Error accepting tour:", error);
      Swal.fire("Error", "Could not update status.", "error");
    }
  };

  // Handle Reject Button Click
  const handleReject = (tourId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tour will be marked as Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/carts/${tourId}`, {
            status: "Rejected",
          });
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "Rejected!",
              text: "Tour status updated to Rejected.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // Update UI
            setAssignedTours((prev) =>
              prev.map((tour) =>
                tour._id === tourId ? { ...tour, status: "Rejected" } : tour
              )
            );
          }
        } catch (error) {
          console.error("Error rejecting tour:", error);
          Swal.fire("Error", "Could not update status.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours: {assignedTours.length}</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Package Name</th>
            <th className="border px-4 py-2">Tourist Name</th>
            <th className="border px-4 py-2">Tour Date</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTours.map((tour) => (
            <tr key={tour._id}>
              <td className="border px-4 py-2">{tour.trip_title}</td>
              <td className="border px-4 py-2">{tour.touristName}</td>
              <td className="border px-4 py-2">{tour.tourDate}</td>
              <td className="border px-4 py-2">${tour.price}</td>
              <td className="border px-4 py-2">{tour.status}</td>
              <td className="border px-4 py-2">
                <button
                  className={`px-4 py-2 rounded text-white ${
                    tour.status === "In Review"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={tour.status !== "In Review"}
                  onClick={() => handleAccept(tour._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 ml-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleReject(tour._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssignedTours;