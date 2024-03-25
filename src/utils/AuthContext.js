import { createContext, useState, useEffect, useContext } from "react";
import { firebaseAuth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);

    try {
      await firebaseAuth.signInWithEmailAndPassword(
        userInfo.email,
        userInfo.password,
      );
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const logoutUser = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async (userInfo) => {
    setLoading(true);

    try {
      await firebaseAuth.createUserWithEmailAndPassword(
        userInfo.email,
        userInfo.password1,
      );
      await firebaseAuth.currentUser.updateProfile({
        displayName: userInfo.name,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const checkUserStatus = () => {
    const authUser = firebaseAuth.currentUser;
    setUser(authUser);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const user = userCredential.user;
      // Additional logic if needed
      navigate("/search");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      // Handle error or display a message to the user
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
