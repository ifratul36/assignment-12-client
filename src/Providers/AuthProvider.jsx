import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from '../../src/hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     
      if(currentUser){
        setUser(currentUser);
        setLoading(false);
        const userInfo = {email: currentUser.email};
        axiosPublic.post('/jwt',userInfo)
        .then(res =>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
            console.log(res.data.token);
          }
        })
      }
      else{
        setLoading(false);
          localStorage.removeItem('access-token');
      }
      
    });
    return () => {
      return unsubscribe();
    };
  }, []);


  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
