import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskDto from "../entities/task.entity";
import APIClient from "../services/api-client";
import { CACHE_KEY_TASKS } from "../constants";
// import useTasksState from "../state/useTasksState";

interface AddTaskContext {
  previousTasks?: TaskDto[];
}

const apiClient = new APIClient<TaskDto>("/tasks");

const useAddTask = (reset: () => void) => {
  const queryClient = useQueryClient();
  // const tasks = useTasksState((s) => s.tasks);

  return useMutation<TaskDto, Error, TaskDto, AddTaskContext>({
    mutationFn: apiClient.post,

    onSuccess: (savedTask, newTask) => {
      queryClient.setQueryData<TaskDto[]>(CACHE_KEY_TASKS, (tasks) =>
        tasks?.map((task) => (task === newTask ? savedTask : task))
      );

      console.log(savedTask);

      reset();
    },

    onError: (error, newTask, context) => {
      if (!context) return;

      queryClient.setQueryData<TaskDto[]>(CACHE_KEY_TASKS, context.previousTasks);
    }
  });
};

export default useAddTask;
