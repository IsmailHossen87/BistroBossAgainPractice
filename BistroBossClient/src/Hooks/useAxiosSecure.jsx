import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {logOut}= useAuth()
    const navigate = useNavigate()
    // step 1
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('token')
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config
    }, function (error) {
        return Promise.reject(error);
      })
        // step 2
    //   ekhon joto error ase server e seguloke handle korar jonno 
    axiosSecure.interceptors.response.use(function(response){
        return response
    },async(err)=>{
        // errr theke status code k porar jonno ekta variable
        const status = err.response?.status 
        console.log(status)
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(err)
    })
    return  axiosSecure
};
export default useAxiosSecure;

