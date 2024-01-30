import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskDto from "../entities/task.entity";
import { CACHE_KEY_TASKS } from "../constants";
import APIClient from "../services/api-client";

const apiClient = new APIClient<TaskDto>('/tasks');

interface DeleteTaskContext {
  previousTasks?: TaskDto[];
}

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskDto, Error, string, DeleteTaskContext>({
    mutationFn: apiClient.delete,

    onMutate: (id: string) => {
      const previousTasks = queryClient.getQueryData<TaskDto[]>(CACHE_KEY_TASKS);

      queryClient.setQueryData<TaskDto[]>(CACHE_KEY_TASKS, (tasks) =>
      tasks?.filter((task) => task.id !== id)
      );

      return { previousTasks };
    },

    onError: (error, id, context) => {
      if (!context) return;

      queryClient.setQueryData<TaskDto[]>(CACHE_KEY_TASKS, context.previousTasks);
    },
  });
};

export default useDeleteTodo;
