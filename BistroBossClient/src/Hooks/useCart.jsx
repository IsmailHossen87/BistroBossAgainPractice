import {useQuery} from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const axiosSecure= useAxiosSecure()
    const {user}= useAuth()
   const {data:cart=[],isLoading,refetch} = useQuery({
    queryKey: ['cart',user?.email],
    queryFn:async()=>{
        const {data}= await axiosSecure(`/cartitem?email=${user?.email}`)
        return data 
    }
   })
   return [cart,refetch]

};

export default useCart;