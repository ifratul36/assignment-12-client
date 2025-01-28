import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEdit, FaFacebook, FaShareAlt } from "react-icons/fa"; // Import Font Awesome icons
import { MdDelete } from "react-icons/md";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const AllStory = () => {
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
        setStories(storiesData);  // Directly set the stories without randomizing
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
            setStories((prevStories) =>
              prevStories.filter((story) => story._id !== storyId)
            );
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
    <div className="md:max-w-7xl mx-auto p-6">
       <SectionTitle subHeading={'share your amazing thoughts'} heading={'share your Story'}/>
      <div className="md:flex justify-between items-center my-3">
      <h2 className="text-3xl font-semibold text-center mb-6">Manage Stories</h2>
      <Link to="/allStory"><button className="btn btn-neutral">All Story</button></Link>
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 relative"
          >
            <div className="w-full h-72 relative overflow-hidden rounded-t-lg">
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
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-0 w-full flex justify-between items-center px-4 transform -translate-y-1/2">
                <button
                  className="bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
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
                  className="bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
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
              <h3 className="text-xl font-semibold text-teal-700 mb-2">{story.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{story.text}</p>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate(`/edit-story/${story._id}`)}
                  className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-all duration-300"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  <MdDelete />
                </button>
                {/* Facebook Share Button with Icons */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${story.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaFacebook /> <FaShareAlt />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8">

      <Link to="/"><button className="btn btn-neutral ">Home</button></Link>
      </div>
    </div>
  );
};

export default AllStory;
