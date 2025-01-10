import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/Authprobider/AuthProvider";


const PrivateProvider = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner bg-red-500 loading-lg "></span>
      </div>
    );
  }
  if (user) {
    return <Navigate state={{from:location}} replace to="/login"/>
  }
  return children;
};

export default PrivateProvider;