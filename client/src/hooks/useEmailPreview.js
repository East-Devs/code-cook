import { useForm } from "react-hook-form";
import { useContext, useState, useTransition } from "react";
import { updateBusinessForm } from "@/api/updateBusinessForm";
import AuthContext from "@/context/authContext";
export const useEmailPreview = ({ formId }) => {
  const { userInfo } = useContext(AuthContext);

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
  } = useForm();

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    if (!userInfo || !userInfo.userId) {
      setError("User information is not available. Please log in again.");
      return;
    }
    if (!formId) {
      setError("Form Id not available. Please try again");
      return;
    }
    data.userId = userInfo.userId;
    startTransition(() => {
      updateBusinessForm(data, formId).then((response) => {
        if (response.error) {
          setError(response.error);
        } else if (response.success) {
          setSuccess(response.success);
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
