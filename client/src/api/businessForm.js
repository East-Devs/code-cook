import axios from "axios";

export const businessForm = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/businessform",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
