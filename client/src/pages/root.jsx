import MainNavigation from "@/components/main-navigation";
import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

const Root = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, 1 * 60 * 60 * 1000);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Root;
