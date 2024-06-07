import { useForm } from "react-hook-form";
import { useContext, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { businessForm } from "@/api/businessForm";
import AuthContext from "@/context/authContext";
export const useBusinessDetailForm = () => {
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
    // const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });
    data.userId = userInfo.userId;
    startTransition(() => {
      businessForm(data).then((response) => {
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
