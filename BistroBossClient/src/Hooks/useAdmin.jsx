import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user,loading}= useAuth()
    const axiosSecure= useAxiosSecure()

    const {data,isPending:isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/users/admin/${user?.email}`)
            return res?.data.admin
        },
        enabled:!loading
    })
    return [data,isAdminLoading]
};

export default useAdmin;