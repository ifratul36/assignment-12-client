
// import React, { useState, useEffect } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaUsers } from "react-icons/fa6";
// import { MdDeleteForever } from "react-icons/md";
// import Swal from "sweetalert2";

// const ManageCandidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const axiosSecure = useAxiosSecure();

//   // Fetch candidates data from the API
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await fetch("https://assignment-12-server-jet-six.vercel.app/candidates");
//         const data = await response.json();
//         setCandidates(data); // Assuming the response contains the list of candidates
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleMakeGuide = (user) => {
//     axiosSecure.patch(`/users/guide/${user._id}`).then((res) => {
//       console.log(res.data);
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.name} is a Guide Now!`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//    const handleDeleteUser = (candidate) => {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           axiosSecure.delete(`/candidates/${candidate._id}`).then((res) => {
//             if (res.data.deletedCount > 0) {
//               refetch();
//               // Trigger the success modal
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "User has been deleted.",
//                 icon: "success",
//               });
//             }
//           });
//         }
//       });
//     };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Manage Candidates: {candidates.length}</h2>
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">CV Link</th>
//             <th className="border px-4 py-2">Application Title</th>
//             <th className="border px-4 py-2">Reason</th>
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates && candidates.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="text-center py-4">
//                 No candidates found.
//               </td>
//             </tr>
//           ) : (
//             candidates.map((candidate) => (
//               <tr key={candidate._id}>
//                 <td className="border px-4 py-2">{candidate.name}</td>
//                 <td className="border px-4 py-2">{candidate.email}</td>
//                 <td className="border px-4 py-2">
//                   <a
//                     href={candidate.cvLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600"
//                   >
//                     View CV
//                   </a>
//                 </td>
//                 <td className="border px-4 py-2">
//                   {candidate.applicationTitle}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {candidate.applicationReason}
//                 </td>
//                 <td className="border px-4 py-2">{candidate.status}</td>
//                 <td>
//                   <button
//                     onClick={() => handleMakeGuide(user)}
//                     className="bg-[#050758] rounded mx-4"
//                   >
//                     <FaUsers className="p-1 size-6 text-[#fff]" />
//                   </button>
                
//                   <button
//                     onClick={() => handleDeleteUser(candidate)}
//                     className="bg-[#901604] rounded"
//                   >
//                     <MdDeleteForever className="p-1 size-6 text-[#fff]" />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageCandidates;
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const axiosSecure = useAxiosSecure();

  // Fetch candidates data from the API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("https://assignment-12-server-jet-six.vercel.app/candidates");
        const data = await response.json();

        // Check if data is an array before setting state
        if (Array.isArray(data)) {
          setCandidates(data); // Set candidates only if data is an array
        } else {
          console.error("Expected an array, but got:", data);
          setCandidates([]); // Set an empty array if data is not in the expected format
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setCandidates([]); // Handle errors gracefully by setting an empty array
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchCandidates();
  }, []);

  const handleMakeGuide = (user) => {
    axiosSecure.patch(`/users/guide/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
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
      
      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center my-4">Loading...</div>
      ) : (
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
            {/* Check if candidates is an array before mapping */}
            {Array.isArray(candidates) && candidates.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
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
                  <td className="border px-4 py-2">{candidate.applicationTitle}</td>
                  <td className="border px-4 py-2">{candidate.applicationReason}</td>
                  <td className="border px-4 py-2">{candidate.status}</td>
                  <td>
                    <button
                      onClick={() => handleMakeGuide(candidate)}
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
      )}
    </div>
  );
};

export default ManageCandidates;
