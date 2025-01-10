import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import SectionTitle from '../Shared/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const UpdateItem = () => {
    const item = useLoaderData()
    const {name,category,image,recipe,price} =item
    console.log( "updaet data", item)


    const axiosPublic = UseAxiosPublic()
    const axiosSecure = useAxiosSecure()
  const { register, handleSubmit ,reset} = useForm();


  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const {data:res}=await  axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING}`, formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    // jodi res er modde sucess thake tahole
    if(res.success){
      const menuItem={
        name : data.name ,
        category:data.category,
        price:parseInt(data.price),
        recipe:data.recipe,
        image:res.data.display_url
      }
     const menuData = await axiosSecure.update('/menuUpdate',menuItem)
     console.log(menuData.data)
     if(menuData.data.insertedId){
      reset()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
     }
    }
    };
    return (
        <div>
            <div>
                <SectionTitle subHeading='Refresh info' heading='update an item' />
            </div>
            {/* table */}
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
                            defaultValue={name}
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
                              defaultValue={category}
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
                                defaultValue={price}
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
                            defaultValue={recipe}
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
                          <FaUtensils className="mr-3" /> Update Menu
                        </button>
                      </div>
                    </form>
                  </div>
        </div>
    );
};

export default UpdateItem;