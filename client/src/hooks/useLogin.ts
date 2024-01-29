import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import LoginDto from "../entities/login.entity";
import { useNavigate } from "react-router-dom";
import useErrorState from "../state/useErrorState";
import { AxiosError } from "axios";

const apiClient = new APIClient<LoginDto>("/login");

const useLogin = () => {
  const navigate = useNavigate();
  const setError = useErrorState((s) => s.setErrors);

  return useMutation({
    mutationFn: apiClient.post,

    onSuccess: (savedLogin, newLogin) => {
      console.log(newLogin);
      navigate("/tasks");
    },

    onError: (error, newLogin, context) => {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        console.log(error);
      }
    },
  });
};

export default useLogin;
