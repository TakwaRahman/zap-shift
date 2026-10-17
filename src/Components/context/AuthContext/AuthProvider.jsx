import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../../firebase/firebase.init";
import { useEffect, useState } from "react";



const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const registerUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }


    const signInUser = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }


    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }


    const forgotPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        user,
        logOut,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        updateUserProfile,
        forgotPass
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;