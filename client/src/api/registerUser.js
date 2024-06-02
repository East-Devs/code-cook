import axios from "axios";

export const registerUser = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("http://localhost:3000/register", data);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
