import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { loginUser } from "@/api/loginUser";
import { useNavigate } from "react-router-dom";
export const useLoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      loginUser(data).then((response) => {
        if (response.error) {
          setError(response.error);
        } else if (response.success) {
          setSuccess(response.success);
          navigate("/");
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
    onSubmit,
    setError,
    setSuccess,
  };
};
