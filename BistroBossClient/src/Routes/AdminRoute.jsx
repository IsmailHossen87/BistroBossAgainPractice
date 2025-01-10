import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const location = useLocation()
    const{user,loading} = useAuth()
    const[isAdmin,isAdminLoading]= useAdmin()
    if (loading || isAdminLoading) {
        return (
          <div className="text-center">
            <span className="loading loading-spinner bg-red-500 loading-lg "></span>
          </div>
        );
      }
      if (user && isAdmin) {
        return <Navigate state={{from:location}} replace to="/login"/>
      }
      return children;
};

export default AdminRoute;