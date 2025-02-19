import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Show 10 users per page

  // Calculate the indexes for slicing the data
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination function to update current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
    <>
      <SectionTitle heading={"MANAGE ALL USERS"} subHeading={"---How many??---"} />
      <div className="flex justify-start my-4">
        <h2 className="text-3xl font-semibold ml-14">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto ml-8 p-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-[#d1a054] rounded"
                    >
                      <FaUsers className="p-1 size-6 text-[#fff]" />
                    </button>
                  )}
                  {user.role === "guide" ? (
                    "Guide"
                  ) : (
                    <button
                      onClick={() => handleMakeGuide(user)}
                      className="bg-[#050758] rounded ml-4"
                    >
                      <FaUsers className="p-1 size-6 text-[#fff]" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="bg-[#901604] rounded"
                  >
                    <MdDeleteForever className="p-1 size-6 text-[#fff]" />
                  </button>
                </td>
              </tr>
            ))}
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
              className={`btn  btn-sm mx-1 ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
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

export default ManageUsers;
