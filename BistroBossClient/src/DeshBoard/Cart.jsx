import React from 'react';
import useCart from '../Hooks/useCart';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart,refetch] = useCart();
//   delete korar jonno
const axiosSecure = useAxiosSecure()

  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/delete/${id}`)
            .then(res => {
                if(res.data.deletedCount){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      refetch()
                }
            })
        }
      });
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + parseInt(item.price), 0);

  return (
    <div className='w-5/6 mx-auto py-8 bg-gray-300'>
      <div className='flex justify-between px-2 mb-4'>
        <h2 className='text-3xl font-semibold'>Items: {cart.length}</h2>
        <h2 className='text-3xl font-semibold'>Total Price: ${totalPrice}</h2>
         {
          cart.length ? <Link to={'/dashboard/payment'}>  <button className='btn btn-primary'>Pay</button></Link> :  <button disabled className='btn btn-primary'>Select Item</button>
         }
      </div>
      {/* table */}
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>No</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Item Image</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Item Name</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Price</th>
            <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Action</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {cart.map((item, index) => (
            <tr key={item._id}>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{index + 1}</td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                <img src={item.image} alt={item.name} className='rounded-full w-16 h-16 object-cover' />
              </td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.name}</td>
              <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>${item.price}</td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='text-gray-500 hover:text-red-500 text-2xl focus:outline-none'
                >
                 <MdDelete></MdDelete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
