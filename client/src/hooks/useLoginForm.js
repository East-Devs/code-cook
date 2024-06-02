import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

export const useLoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setError("");
    setSuccess("");
    //   startTransition(() => {
    //     login(values).then((data) => {
    //       if (data && data.error) setError(data.error);
    //       if (data && data.success) setSuccess(data.success);
    //     });
    //   });
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
