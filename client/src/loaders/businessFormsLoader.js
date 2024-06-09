import axios from "axios";

export const businessFormsLoader = async ({ params }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/businessforms/${params.userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching business forms:", error);
  }
};
