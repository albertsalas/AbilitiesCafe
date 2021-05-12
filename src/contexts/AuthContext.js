import React, { createContext, useState, useEffect } from "react";
import { auth, projectFirestore } from "../firebase";

const AuthContext = createContext();
const adminsRef = projectFirestore.collection("admins");
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (user) => {
    const userCredential = await auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    await adminsRef
      .doc(userCredential.user.uid)
      .get()
      .then((doc) => {
        setIsAdmin(doc.exists);
      });
  };

  const logout = () => {
    return auth.signOut();
  };

  const signUp = async (newUser) => {
    const { firstName, lastName, email, admin, password } = newUser;
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          if (admin) {
            adminsRef.doc(userCredential.user.uid).set();
          }
          userCredential.user.updateProfile({
            displayName: firstName + " " + lastName,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = (email) => {
    console.log("resetting password");
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    login,
    logout,
    signUp,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
