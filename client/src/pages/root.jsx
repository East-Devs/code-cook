import MainNavigation from "@/components/main-navigation";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Root;
