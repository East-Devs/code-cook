import axios from "axios";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/register",
      data
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
