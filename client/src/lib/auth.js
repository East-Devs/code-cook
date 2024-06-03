import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Token is expired
      return true;
    } else {
      // Token is not expired
      return false;
    }
  } catch (error) {
    // Decoding or other errors
    return true;
  }
};

// Function to check if token exists and is valid
export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export function tokenLoader() {
  return isTokenValid();
}
export function checkAuthLoader() {
  const token = isTokenValid();

  if (token) {
    return redirect("/");
  }
  return null;
}
