import { useForm } from "react-hook-form";
import { useContext, useState, useTransition } from "react";
import { loginUser } from "@/api/loginUser";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/authContext";
export const useLoginForm = () => {
  const { signIn } = useContext(AuthContext);
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
          signIn(response.token, response.userId, response.userEmail);
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
