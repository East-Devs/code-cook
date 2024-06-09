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
import EmailPreview from "./pages/emailPreview";
import { businessFormsLoader } from "./loaders/businessFormsLoader";
import { emailTemplateLoader } from "./loaders/emailTemplateLoader";
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
        path: "businessforms/:userId",
        element: isTokenValid() ? <Business /> : <SignIn />,
        loader: businessFormsLoader,
      },
      {
        path: "form",
        element: isTokenValid() ? <BusinessFormPage /> : <SignIn />,
      },
      {
        path: "form/:formId",
        element: isTokenValid() ? <BusinessFormPage /> : <SignIn />,
        loader: emailTemplateLoader,
      },
      {
        path: "preview-email/:formId",
        element: isTokenValid() ? <EmailPreview /> : <SignIn />,
        loader: emailTemplateLoader,
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
