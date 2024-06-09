import axios from "axios";

export const emailTemplateLoader = async ({ params }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/businessform/${params.formId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching business forms:", error);
  }
};
