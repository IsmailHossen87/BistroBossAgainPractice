import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import SectionTitle from '../Shared/SectionTitle';

const PaymentHistory = () => {
    const {user}= useAuth()
    const axiosSecure = useAxiosSecure()
    const {data:payment=[],refetch}=useQuery({
        queryKey:['payment',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/paymentHistory/${user?.email}`)
            return res.data
        }
    })
    return (
        <div>
            <SectionTitle subHeading='Payment history' heading='history'/>

            <h3 className="text-3xl">Total Payment {payment.length}</h3>
            <div>
             <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                <tr>
                    <th className='py-3.5 px-4 text-sm font-normal text-left text-gray-500'>No</th>
                    <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>TotalPrice</th>
                    <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>TransactionId</th>
                    <th className='px-4 py-3.5 text-sm font-normal text-left text-gray-500'>Status</th>
                    
                </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                {payment.map((item, index) => (
                    <tr key={item._id}>
                    <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{index + 1}</td>
                    <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.price}</td>
                    <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>{item.transactionId}</td>
                    <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>${item.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            
        </div>
    )
};

export default PaymentHistory;