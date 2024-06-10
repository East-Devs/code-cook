import axios from "axios";

export const businessFormsLoader = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      throw new Error("User not found in localStorage");
    }
    const response = await axios.get(
      `http://localhost:3000/api/businessforms/${user.userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching business forms:", error);
    throw error;
  }
};
