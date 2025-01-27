

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const JoinTourGuide = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     reason: "",
//     cvLink: "",
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     // Validate fields
//     if (!formData.title || !formData.reason || !formData.cvLink) {
//       setError("All fields are required.");
//       return;
//     }
//     if (!isValidURL(formData.cvLink)) {
//       setError("Please enter a valid CV link.");
//       return;
//     }

//     // Submit data to backend
//     try {
//       setIsSubmitting(true);
//       const response = await axiosSecure.post("/candidates", formData);
//       if (response.status === 200) {
//         setSuccessMessage("Your application has been successfully submitted.");
//         setTimeout(() => {
//           navigate("/dashboard"); // Navigate to Dashboard after success
//         }, 2000);
//       }
//     } catch (error) {
//       setError("Something went wrong. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // URL validation function
//   const isValidURL = (url) => {
//     const pattern = new RegExp(
//       "^(https?:\\/\\/)?" + // Protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // Domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
//       "(\\#[-a-z\\d_]*)?$",
//       "i"
//     );
//     return !!pattern.test(url);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Join as a Tour Guide</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Application Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             placeholder="Enter your application title"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
//             Why You Want to Be a Tour Guide
//           </label>
//           <textarea
//             id="reason"
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             rows="4"
//             placeholder="Explain your reason here..."
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="cvLink" className="block text-sm font-medium text-gray-700">
//             CV Link
//           </label>
//           <input
//             type="url"
//             id="cvLink"
//             name="cvLink"
//             value={formData.cvLink}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             placeholder="Paste your CV link"
//           />
//         </div>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full py-2 px-4 text-white font-bold rounded-lg ${
//             isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {isSubmitting ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JoinTourGuide;


// import React, { useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth";

// const JoinTourGuide = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     reason: "",
//     cvLink: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const axiosSecure = useAxiosSecure();
//   const {user} = useAuth();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // URL validation function
//   const isValidURL = (url) => {
//     const pattern = new RegExp(
//       "^(https?:\\/\\/)?" + // Protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // Domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
//       "(\\#[-a-z\\d_]*)?$",
//       "i"
//     );
//     return !!pattern.test(url);
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate fields
//     if (!formData.title || !formData.reason || !formData.cvLink) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "All fields are required.",
//       });
//       return;
//     }
//     if (!isValidURL(formData.cvLink)) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid CV Link",
//         text: "Please enter a valid CV link.",
//       });
//       return;
//     }

//     // Submit data to backend
//     try {
//       setIsSubmitting(true);
//       const response = await axiosSecure.post("/candidates", formData);
//       if (response.status === 200) {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Your application has been successfully submitted.",
//         });
//         setTimeout(() => {
//         }, 2000);
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: "Something went wrong. Please try again later.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Join as a Tour Guide</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Application Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             placeholder="Enter your application title"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
//             Why You Want to Be a Tour Guide
//           </label>
//           <textarea
//             id="reason"
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             rows="4"
//             placeholder="Explain your reason here..."
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="cvLink" className="block text-sm font-medium text-gray-700">
//             CV Link
//           </label>
//           <input
//             type="url"
//             id="cvLink"
//             name="cvLink"
//             value={formData.cvLink}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border rounded-md"
//             placeholder="Paste your CV link"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full py-2 px-4 text-white font-bold rounded-lg ${
//             isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {isSubmitting ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JoinTourGuide;

import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const JoinTourGuide = () => {
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
  
  console.log(user);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // URL validation function
  const isValidURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // Domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.title || !formData.reason || !formData.cvLink) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required.",
      });
      return;
    }
    if (!isValidURL(formData.cvLink)) {
      Swal.fire({
        icon: "error",
        title: "Invalid CV Link",
        text: "Please enter a valid CV link.",
      });
      return;
    }

    // Add user ID and name to the form data
    const formDataWithUserInfo = {
      ...formData,
      userId: user?.id, // Assuming the 'user' object has an 'id' field
      userName: user?.displayName, // Assuming the 'user' object has a 'name' field
    };

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Submit data to backend
    try {
      setIsSubmitting(true);
      const response = await axiosSecure.post("/candidates", formDataWithUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your application has been successfully submitted.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Join as a Tour Guide</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Application Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Enter your application title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Why You Want to Be a Tour Guide
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
            rows="4"
            placeholder="Explain your reason here..."
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="cvLink" className="block text-sm font-medium text-gray-700">
            CV Link
          </label>
          <input
            type="url"
            id="cvLink"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Paste your CV link"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white font-bold rounded-lg ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default JoinTourGuide;
