import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Root from "./pages/root";
import Error from "./pages/error";
import { checkAuthLoader, isTokenValid, tokenLoader } from "./lib/auth";
import { action as logoutAction } from "@/components/auth/logout";
import Business from "./pages/business";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "business",
        element: isTokenValid() ? <Business /> : <SignIn />,
      },
      {
        path: "signin",
        element: <SignIn />,
        loader: checkAuthLoader,
      },
      {
        path: "signup",
        element: <SignUp />,
        loader: checkAuthLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
