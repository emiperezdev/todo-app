import { useMutation } from "@tanstack/react-query";
import TaskDto from "../entities/task.entity";
import APIClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useErrorState from "../state/useErrorState";

interface AddTaskContext {
  previousTasks?: TaskDto[];
}

const apiClient = new APIClient<TaskDto>("/tasks");

const useAddTask = (reset: () => void) => {
  const navigate = useNavigate();
  const setError = useErrorState(s => s.setErrors);

  return useMutation<TaskDto, Error, TaskDto, AddTaskContext>({
    mutationFn: apiClient.post,

    onSuccess: (_savedTask, _newTask) => {
      reset();
      navigate('/tasks');
      setError('');
    },

    onError: (error, _newTask, _context) => {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        console.log(error.response?.data);
      }
    }
  });
};

export default useAddTask;
