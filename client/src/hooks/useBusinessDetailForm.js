import { useForm } from "react-hook-form";
import { useContext, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { createBusinessForm } from "@/api/createBusinessForm";
import { updateBusinessForm } from "@/api/updateBusinessForm";
import AuthContext from "@/context/authContext";
export const useBusinessDetailForm = ({ formId }) => {
  const { userInfo } = useContext(AuthContext);

  const navigate = useNavigate(); // Use useNavigate hook
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm({
    name: "",
    address: "",
    email: "",
    primaryColor: "",
    secondaryColor: "",
    typeOfBusiness: "",
    description: "",
    targetCompanyName: "",
    targetCompanyEmail: "",
    targetAudience: "",
    emailStyle: "",
    logo: null,
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    if (!userInfo || !userInfo.userId) {
      setError("User information is not available. Please log in again.");
      return;
    }
    data.userId = userInfo.userId;
    startTransition(() => {
      const submitFunction = formId ? updateBusinessForm : createBusinessForm;
      submitFunction(data, formId).then((response) => {
        if (response.error) {
          setError(response.error);
        } else if (response.success) {
          setSuccess(response.success);
          navigate(`/preview-email/${response.businessForm.id}`);
        }
      });
    });
  };

  return {
    isPending,
    error,
    success,
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
    onSubmit,
    setError,
    setSuccess,
  };
};
