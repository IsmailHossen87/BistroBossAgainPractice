import { useContext } from "react";
import { AuthContext } from "../Providers/Authprobider/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default useAuth;