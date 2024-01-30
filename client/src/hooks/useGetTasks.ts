import { useQuery } from "@tanstack/react-query";
import TaskDto from "../entities/task.entity";
import APIClient from "../services/api-client";
import { CACHE_KEY_TASKS } from "../constants";

const apiClient = new APIClient<TaskDto>('/tasks');

const useGetTasks = () => useQuery<TaskDto[], Error>({
  queryKey: CACHE_KEY_TASKS,
  queryFn: apiClient.getAll
});

export default useGetTasks;