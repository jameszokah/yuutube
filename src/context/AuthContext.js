import { createContext, useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: null,
  signInWithGoogle: Promise,
  signOutUser: Promise,
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    setCurrentUser,
    signInWithGoogle,
    signOutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
