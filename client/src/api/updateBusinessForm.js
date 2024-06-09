import axios from "axios";

export const updateBusinessForm = async (data, formId) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/businessform/${formId}`,
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
