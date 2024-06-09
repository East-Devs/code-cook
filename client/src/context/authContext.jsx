import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUserInfo(savedUser);
    }
  }, []);

  const signIn = (newToken, userId, userEmail) => {
    localStorage.setItem("token", newToken);
    const userInfo = { userId, userEmail };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setToken(newToken);
    setUserInfo(userInfo);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUserInfo(null);
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
