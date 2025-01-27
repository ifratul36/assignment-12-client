
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch candidates data from the API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:3000/candidates");
        const data = await response.json();
        setCandidates(data); // Assuming the response contains the list of candidates
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleMakeGuide = (user) => {
    axiosSecure.patch(`/users/guide/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Guide Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

   const handleDeleteUser = (candidate) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/candidates/${candidate._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              // Trigger the success modal
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Candidates: {candidates.length}</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">CV Link</th>
            <th className="border px-4 py-2">Application Title</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates && candidates.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No candidates found.
              </td>
            </tr>
          ) : (
            candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td className="border px-4 py-2">{candidate.name}</td>
                <td className="border px-4 py-2">{candidate.email}</td>
                <td className="border px-4 py-2">
                  <a
                    href={candidate.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    View CV
                  </a>
                </td>
                <td className="border px-4 py-2">
                  {candidate.applicationTitle}
                </td>
                <td className="border px-4 py-2">
                  {candidate.applicationReason}
                </td>
                <td className="border px-4 py-2">{candidate.status}</td>
                <td>
                  <button
                    onClick={() => handleMakeGuide(user)}
                    className="bg-[#050758] rounded mx-4"
                  >
                    <FaUsers className="p-1 size-6 text-[#fff]" />
                  </button>
                
                  <button
                    onClick={() => handleDeleteUser(candidate)}
                    className="bg-[#901604] rounded"
                  >
                    <MdDeleteForever className="p-1 size-6 text-[#fff]" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCandidates;
