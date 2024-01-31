import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import TaskUpdateDto from "../entities/taskupdate.entity";
import { AxiosError } from "axios";
import useErrorState from "../state/useErrorState";

const apiClient = new APIClient<TaskUpdateDto>("/tasks");

const useUpdateTask = () => {
  const navigate = useNavigate();
  const setError = useErrorState(s => s.setErrors);

  return useMutation({
    mutationFn: (task: TaskUpdateDto) => apiClient.update(task),

    onSuccess: (savedTask: TaskUpdateDto, newTask: TaskUpdateDto) => {
      console.log(savedTask);
      navigate("/tasks");
    },

    onError: (err: Error) => {
      if (err instanceof AxiosError)
        setError(err.response?.data);
    },
  });
};

export default useUpdateTask;
