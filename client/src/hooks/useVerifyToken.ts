import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from "ms";
import RegisterDto from "../entities/register.entity";

const apiClient = new APIClient<RegisterDto>('/verify');

const useVerifyToken = () =>
  useQuery({
    staleTime: ms("5m"),
    queryFn: apiClient.get,
    queryKey: ["verify token"]
  });

export default useVerifyToken;
