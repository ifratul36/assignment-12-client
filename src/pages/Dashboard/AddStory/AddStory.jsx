
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const axiosSecure = useAxiosSecure(); // Initialize axiosSecure hook

  const handleImageChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text || imageUrls.some((url) => url.trim() === "")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required.",
      });
      return;
    }

    const storyData = {
      title,
      text,
      images: imageUrls,
    };

    try {
      const response = await axiosSecure.post(
        "/story", // Using relative URL with axiosSecure
        storyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Story added successfully!",
        });
        // Reset the form fields
        setTitle("");
        setText("");
        setImageUrls([""]);
      }
    } catch (error) {
      console.error("Error submitting the story:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an issue submitting your story.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add a New Story</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="text">
            Story Text:
          </label>
          <textarea
            id="text"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          ></textarea>
        </div>

        {imageUrls.map((url, index) => (
          <div className="mb-4" key={index}>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor={`imageUrl-${index}`}
            >
              Image URL {index + 1}:
            </label>
            <input
              type="text"
              id={`imageUrl-${index}`}
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addImageField}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        >
          Add More Images
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStory;
