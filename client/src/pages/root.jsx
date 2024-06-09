import MainNavigation from "@/components/main-navigation";
import AuthContext from "@/context/authContext";
import { getTokenDuration } from "@/lib/auth";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  const { token, signOut } = useContext(AuthContext);
  useEffect(() => {
    if (!token) {
      return;
    }
    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      signOut();
    }, tokenDuration);
  }, [token, signOut]);
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Root;
