import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosSecure } from "./useAxiosSecure";

const useMenu = ()=>{
const {data:menu=[],loading,refetch}=useQuery({
    queryKey:['menu'],
    queryFn: async()=>{
        const {data}=await axiosSecure.get('/menu')
        return data
    }
})
return [menu,loading,refetch]
}

export default useMenu;