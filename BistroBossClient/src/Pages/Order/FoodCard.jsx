import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const FoodCard = ({item}) => {
    const {user}= useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddtoCard =(item)=>{ 
        const axiosSecure= useAxiosSecure()
        if(user && user.email){
            const cartItem = {menuId:_id,email:user.email,name,image,price }
            // axiosSecure diye data backend e pathabo
            axiosSecure.post('/cart',cartItem)
            .then(res=>{
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your work has been saved`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })

        }else
        // jodi user na thake tahole login korate bbolbe
        {
            Swal.fire({
                title: "Are you sure?",
                text: "Please login add to card!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login it!"
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/login',{state:{from:location}})
                }
              });
        }
    }
    const { name, image, price, recipe, _id } = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
        <div className="card-body flex flex-col items-center">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <div className="card-actions justify-end">
                <button
                onClick={()=>handleAddtoCard(item)}
                    className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
                >Add to Cart</button>
            </div>
        </div>
    </div>
    );
};

export default FoodCard;