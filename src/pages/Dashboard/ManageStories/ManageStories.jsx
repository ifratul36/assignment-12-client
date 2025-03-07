// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaFacebook, FaShareAlt } from "react-icons/fa"; // Import Facebook icons

// const ManageStories = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   // Fetch stories from the backend
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await axiosSecure.get("/story");
//         const storiesData = response.data || [];
        
//         // Initialize the currentIndex for each story
//         const updatedStories = storiesData.map(story => ({
//           ...story,
//           currentIndex: 0, // Initialize currentIndex to 0
//         }));
//         setStories(updatedStories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStories();
//   }, []);

//   // Handle story deletion
//   const handleDelete = (storyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/story/${storyId}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             // Update the state to remove the deleted story immediately
//             setStories((prevStories) =>
//               prevStories.filter((story) => story._id !== storyId)
//             );

//             // Trigger the success modal
//             Swal.fire({
//               title: "Deleted!",
//               text: "Story has been deleted.",
//               icon: "success",
//             });
//           }
//         });
//       }
//     });
//   };

//   if (loading) {
//     return <div>Loading stories...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">Manage Stories</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {stories.map((story) => (
//           <div
//             key={story._id}
//             className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
//           >
//             <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
//               {/* Image Slider */}
//               <div
//                 className="absolute inset-0 flex transition-transform duration-500"
//                 style={{
//                   transform: `translateX(-${story.currentIndex * 100}%)`, // Slide to current image
//                 }}
//               >
//                 {story.images?.map((imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={imageUrl}
//                     alt={`Story ${index + 1}`}
//                     className="w-full h-full object-cover rounded-t-xl"
//                   />
//                 ))}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-between w-full h-full items-center px-4">
//                 <button
//                   className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100"
//                   onClick={() => {
//                     setStories((prevStories) =>
//                       prevStories.map((story) =>
//                         story._id === story._id
//                           ? {
//                               ...story,
//                               currentIndex:
//                                 story.currentIndex === 0
//                                   ? story.images.length - 1
//                                   : story.currentIndex - 1,
//                             }
//                           : story
//                       )
//                     );
//                   }}
//                 >
//                   {"<"}
//                 </button>
//                 <button
//                   className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100"
//                   onClick={() => {
//                     setStories((prevStories) =>
//                       prevStories.map((story) =>
//                         story._id === story._id
//                           ? {
//                               ...story,
//                               currentIndex:
//                                 story.currentIndex === story.images.length - 1
//                                   ? 0
//                                   : story.currentIndex + 1,
//                             }
//                           : story
//                       )
//                     );
//                   }}
//                 >
//                   {">"}
//                 </button>
//               </div>
//             </div>

//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
//               <p className="text-gray-600 text-sm mb-4">{story.text}</p>

//               {/* Action Buttons */}
//               <div className="flex gap-3 w-full justify-center">
//                 <button
//                   onClick={() => navigate(`/edit-story/${story._id}`)}
//                   className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-all duration-300"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(story._id)}
//                   className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
//                 >
//                   Delete
//                 </button>

//                 {/* Facebook Share Button with Icons */}
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${story.title}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <FaFacebook /> <FaShareAlt />
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageStories;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaFacebook, FaShareAlt } from "react-icons/fa"; // Import Facebook icons

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosSecure.get("/story");
        const storiesData = response.data || [];
        
        // Initialize the currentIndex for each story
        const updatedStories = storiesData.map(story => ({
          ...story,
          currentIndex: 0, // Initialize currentIndex to 0
        }));
        setStories(updatedStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Handle story deletion
  const handleDelete = (storyId) => {
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
        axiosSecure.delete(`/story/${storyId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // Update the state to remove the deleted story immediately
            setStories((prevStories) =>
              prevStories.filter((story) => story._id !== storyId)
            );

            // Trigger the success modal
            Swal.fire({
              title: "Deleted!",
              text: "Story has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (loading) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
              {/* Image Slider */}
              <div
                className="absolute inset-0 flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${story.currentIndex * 100}%)`, // Slide to current image
                }}
              >
                {story.images?.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Story ${index + 1}`}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between w-full h-full items-center px-4">
                <button
                  className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100"
                  onClick={() => {
                    setStories((prevStories) =>
                      prevStories.map((story) =>
                        story._id === story._id
                          ? {
                              ...story,
                              currentIndex:
                                story.currentIndex === 0
                                  ? story.images.length - 1
                                  : story.currentIndex - 1,
                            }
                          : story
                      )
                    );
                  }}
                >
                  {"<"}
                </button>
                <button
                  className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100"
                  onClick={() => {
                    setStories((prevStories) =>
                      prevStories.map((story) =>
                        story._id === story._id
                          ? {
                              ...story,
                              currentIndex:
                                story.currentIndex === story.images.length - 1
                                  ? 0
                                  : story.currentIndex + 1,
                            }
                          : story
                      )
                    );
                  }}
                >
                  {">"}
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{story.text}</p>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full justify-center flex-wrap">
                <button
                  onClick={() => navigate(`/edit-story/${story._id}`)}
                  className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
                >
                  Delete
                </button>

                {/* Facebook Share Button with Icons */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${story.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaFacebook /> <FaShareAlt />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
