import axios from "axios";

export const loginUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/login", data);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
