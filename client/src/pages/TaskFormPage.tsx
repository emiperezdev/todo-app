import { useForm } from "react-hook-form";
import TodoDto from "../entities/task.entity";
import useAddTask from "../hooks/useAddTask";
import useErrorState from "../state/useErrorState";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import APIClient from "../services/api-client";
import TaskDto from "../entities/task.entity";
import useUpdateTask from "../hooks/useUpdateTask";

export const TaskFormPage = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TodoDto>();

  const { pathname } = useLocation();
  const params = useParams();

  const updateTask = useUpdateTask();
  const addTask = useAddTask(() => {
    reset();
  });

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      data._id = params.id;
      updateTask.mutate(data);
      console.log(data);
    } else {
      addTask.mutate(data);
    }
  });

  const error = useErrorState((s) => s.errors);

  // TODO
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const apiClient = new APIClient<TaskDto>("/tasks");
        const task = await apiClient.getbyId(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    };

    loadTask();
  }, []);

  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center">
      <div className="bg-sky-900 max-w-md 2-full p-10 rounded-md">
        <h1 className="text-3xl text-center font-bold mb-3">
          {pathname === "/add-task" ? "Add Task" : "Edit Task"}
        </h1>
        {error && (
          <div className="rounded-md bg-red-500 p-2 mt-6 text-white text-center">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            {...register("title", { required: true })}
            className="w-full bg-sky-100 text-black my-2 px-4 py-2 rounded-md"
            autoFocus
            type="text"
            placeholder="Title"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
          <textarea
            {...register("description", { required: true })}
            className="w-full bg-sky-100 text-black my-2 px-4 py-2 rounded-md"
            rows={3}
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
          <button
            className="border p-3 rounded-md mt-2 w-full bg-sky-800 hover:bg-sky-900"
            type="submit"
          >
            {pathname === "/add-task" ? "Add" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
};
