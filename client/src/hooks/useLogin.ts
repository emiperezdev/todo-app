import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import useErrorState from "../state/useErrorState";
import { AxiosError } from "axios";
import useUserState from "../state/useUserState";
import useAuthState from "../state/useAuthState";
import LoginDto from "../entities/login.entity";

const apiClient = new APIClient<LoginDto>("/login");

const useLogin = () => {
  const navigate = useNavigate();
  const setError = useErrorState((s) => s.setErrors);

  const setUser = useUserState((s) => s.setUser);
  const setIsAuth = useAuthState((s) => s.setIsAuth);

  return useMutation({
    mutationFn: apiClient.post,

    onSuccess: (savedLogin, _newLogin) => {
      setUser(savedLogin);
      setIsAuth(true);
      navigate("/tasks");
      setError("");
    },

    onError: (error, _newLogin, _context) => {
      if (error instanceof AxiosError) setError(error.response?.data);
    },
  });
};

export default useLogin;
