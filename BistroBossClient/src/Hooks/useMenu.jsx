import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosSecure } from "./useAxiosSecure";

const useMenu = ()=>{
// const [menu,setMenu]= useState([])
// const [loading,setLoading] = useState(false)
// useEffect(()=>{
//     fetch('http://localhost:5000/menu')
//     .then(res => res.json())
//     .then(data =>{
//         setMenu(data)
//         setLoading(false)
//     })
// },[])
const {data:menu=[],isPending,loading,refetch}=useQuery({
    queryKey:['menu'],
    queryFn: async()=>{
        const {data}=await axiosSecure.get('/menu')
        return data
    }
})
return [menu,loading,refetch]
}

export default useMenu;