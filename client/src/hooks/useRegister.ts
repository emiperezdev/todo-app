import { useMutation } from "@tanstack/react-query";
import RegisterDto from "../entities/register.entity";
import APIClient from "../services/api-client";

const apiClient = new APIClient<RegisterDto>("/register");

const useRegister = () => {
  return useMutation({
    mutationFn: apiClient.register,
  });
};

export default useRegister;
