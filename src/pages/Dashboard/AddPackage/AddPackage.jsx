import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackage = () => {
  const { register, handleSubmit ,reset} = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const photoFile = {image: data.photo[0]}
    const res= await axiosPublic.post(image_hosting_api, photoFile,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    if(res.data.success){
      const tourItem = {
        trip_title: data.trip_title,
        tour_type: data.tour_type,
        price: parseFloat(data.price),
        photo: res.data.data.display_url
      }
      const tourRes = await axiosSecure.post('/tours', tourItem);
      console.log(tourRes.data);
      if(tourRes.data.insertedId){
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.trip_title} is added the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };
  return (
    <div className=" ml-8 mx-auto">
      <SectionTitle heading={"Add an Package"} subHeading={"What's new"} />
      <div className="bg-gray-50 px-14 py-14 rounded-lg shadow m-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Recipe Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
            Trip_Title*
            </label>
            <input
              {...register("trip_title", {required: true})}
              id="trip_title"
              type="text"
              placeholder="trip_title"
              className="input input-bordered w-full"
            />
          </div>

          {/* tour_type and Price */}
          <div className="flex gap-4">
            {/* tour_type */}
            <div className="flex-1">
              <label
                htmlFor="tour_type"
                className="block text-sm font-medium mb-1"
              >
                Tour_Type*
              </label>
              <select
                {...register("tour_type", {required: true})}
                id="tour_type"
                defaultValue="default"
                className="select select-bordered w-full"
              >
                <option value="default" disabled>
                 Select a Category
                </option>
                <option value="adventure">Adventure</option>
                <option value="beach">Beach</option>
                <option value="cultural">Cultural</option>
                <option value="city">City</option>
                <option value="mountain">Mountain</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price*
              </label>
              <input
                {...register("price", {required: true})}
                id="price"
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* choose file */}
          <div className="form-control w-full my-6">
              <input type="file"
               {...register("photo", {required: true})}
                className="file-input w-full max-w-xs" />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn bg-blue-950 text-white w-full"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
