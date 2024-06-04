import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Root from "./pages/root";
import Error from "./pages/error";
import { checkAuthLoader, isTokenValid } from "./lib/auth";
import Business from "./pages/business";
import BusinessFormPage from "./pages/businessFormPage";
import { AuthProvider } from "./context/authContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
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
        path: "form",
        element: <BusinessFormPage />,
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
    ],
  },
]);
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
