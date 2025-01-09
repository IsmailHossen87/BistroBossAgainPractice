import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic= UseAxiosPublic()
  const navigate = useNavigate()
  const handlelogin = () => {
    googleLogin().
    then((res) => {
     const userInfo={email:res?.user?.email,name:res?.user?.displayName}
     axiosPublic.post('/user',userInfo)
     .then((res)=>{
      if(res.data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your signUp has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/')
      }
     })
    });
  };
  return (
    <div>
      <div className="w-full p-4">
        {" "}
        <button onClick={handlelogin} className="btn">
          <FaGoogle></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
