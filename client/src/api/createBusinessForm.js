import axios from "axios";

export const createBusinessForm = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/businessform",
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
