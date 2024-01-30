import { create } from "zustand";
import TaskDto from "../entities/task.entity";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface TasksStateAction {
  tasks: TaskDto[];
}

const useTasksState = create<TasksStateAction>((set) => ({
  tasks: [],
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Tasks State", useTasksState);

export default useTasksState;
