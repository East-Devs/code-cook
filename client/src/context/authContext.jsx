import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUserInfo(savedUser);
    }
  }, []);

  const signIn = (newToken, userId, userEmail) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", { userId, userEmail });
    setToken(newToken);
    setUserInfo({ userId, userEmail });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
