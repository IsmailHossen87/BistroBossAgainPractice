import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../../Firebase/firebase";
export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null)
    const [loading,setLoading] = useState(true)
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
            console.log("CurrentUser",CurrentUser)
            setLoading(false)
        })
        return ()=>{
          return  unSubscribe()
        }
    },[])
    const AuthInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
         
    }
        return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;