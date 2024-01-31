import { useMutation } from "@tanstack/react-query";
import RegisterDto from "../entities/register.entity";
import APIClient from "../services/api-client";
import useUserState from "../state/useUserState";
import useAuthState from "../state/useAuthState";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useErrorState from "../state/useErrorState";

const apiClient = new APIClient<RegisterDto>("/register");

const useRegister = (handler: () => void) => {
  const setUser = useUserState((s) => s.setUser);
  const setAuth = useAuthState((s) => s.setIsAuth);
  const setError = useErrorState((s) => s.setErrors);

  const navigate = useNavigate();
  return useMutation({
    mutationFn: apiClient.post,

    onSuccess: (_savedRegister, newRegister) => {
      setUser(newRegister);
      setAuth(true);
      console.log(newRegister);
      handler();
      navigate("/tasks");
      setError('');
    },

    onError: (error, _newRegister, _context) => {
      if (error instanceof AxiosError) {
        console.log(error.response!.data);
        setError(error.response!.data);
      }
    },
  });
};

export default useRegister;
