
import React from "react";
import SectionTitle from "../Shared/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";


const AddItems = () => {
    const axiosPublic = UseAxiosPublic()
  const { register, handleSubmit } = useForm();


  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    const formData = new FormData();
    formData.append("image", imageFile);

  
    const {data:res}=await  axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING}`, formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
      return console.log(res)
    };

  return (
    <div>
      <SectionTitle heading="Add an Item" subHeading="What's new?" />
      <div className="w-4/6 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            {/* Food name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipe Name</span>
              </div>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
            </label>

            <div className="flex gap-6">
              {/* Select */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">Category</span>
                </div>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>

              {/* Price */}
              <div className="w-full">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Price</span>
                  </div>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            {/* Text area */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipe Details</span>
              </div>
              <textarea
                {...register("recipe", { required: true })}
                className="textarea textarea-bordered w-full h-24"
                placeholder="Write the recipe details"
              ></textarea>
            </label>

            {/* File input */}
            <div className="w-full">
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input w-full"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-3">
            <button type="submit" className="btn w-full">
              <FaUtensils className="mr-3" /> Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
