import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { MdDelete } from 'react-icons/md';
import { FaUser, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUser = () => {
    const axiosSecure = useAxiosSecure()
    const {data:user=[],refetch}= useQuery({
        queryKey:['users'],
        queryFn:async()=>{
          const { data } = await axiosSecure.get('/users');
           return data;
        }
    })
    // delete
    const handleDelete =(user)=>{
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
                    axiosSecure.delete(`/delete/${user._id}`)
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
    }
    // user k database e admin bananor jonno
    const handleAdmin =(user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, admin it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${user._id}`)
                .then(res => {
                    if(res.data.modifiedCount){
                        Swal.fire({
                            title: "Updated!",
                            text: "Your file has been upload.",
                            icon: "success"
                          });
                          refetch()
                    }
                })
            }
          });
    }
    return (
        <div className='my-10 w-2/3 mx-auto'>
            <div className='flex justify-between px-4 rounded-md bg-gray-400'>
                <h2 className='font-semibold text-3xl'>All User</h2>
                <h2 className='font-semibold text-3xl'>Total User {user.length}</h2>
            </div>
            {/* table */}
             <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>No</th>
                        <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Name</th>
                        <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Email</th>
                        <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Roll</th>
                        <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {user?.map((item, index) => (
                        <tr key={item._id}>
                            {/* index */}
                          <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{index + 1}</td>
                         
                          <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.name}</td>
                          <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.email}</td>
                          {/* role */}
                          <td className='px-4 py-4 text-sm whitespace-nowrap'>
                           {
                            item.role === 'admin' ? 'Admin':
                            <>
                             <button
                                onClick={()=>handleAdmin(item)}
                               className=' bg-yellow-500 text-white p-3 rounded-[7px] hover:text-black text-xl focus:outline-none'
                            >
                             <FaUsers></FaUsers>
                            </button>
                            </>
                            
                           }
                          </td>
                          {/* acton */}
                          <td className='px-4 py-4 text-sm whitespace-nowrap'>
                            <button
                              onClick={() => handleDelete(item)}
                              className=' bg-red-500 p-2 rounded-[7px] hover:text-white text-2xl focus:outline-none'
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

export default AllUser;