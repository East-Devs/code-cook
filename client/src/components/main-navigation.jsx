import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function MainNavigation() {
  const { token, signOut, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="text-2xl font-bold">Custom Email Generator</h1>
        </NavLink>
        <ul className="flex gap-4">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          {userInfo && (
            <NavLink to="businessforms">
              <li>My Forms</li>
            </NavLink>
          )}
          {userInfo && (
            <NavLink to="form">
              <li>Get Started</li>
            </NavLink>
          )}
          {!token && (
            <>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
          {token && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
