import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../Firebase/firebase";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = UseAxiosPublic()
    // create User
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sign in korar somoi
    const signIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // popup
    const googleLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    // update Profile that menas photo set
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // signOut
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }

     useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,CurrentUser=>{
            setUser(CurrentUser)
            if(CurrentUser){
                const useInfo= {email: CurrentUser.email}
                axiosPublic.post('/jwt',useInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('token',res.data.token)
                    }
                })
            }else{
                localStorage.removeItem('token')
            }
            setLoading(false)
        })
        return ()=>{
          return  unSubscribe()
        }
    },[axiosPublic])
    const AuthInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleLogin
         
    }
        return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;