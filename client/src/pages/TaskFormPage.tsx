import { useForm } from "react-hook-form";
import TodoDto from "../entities/task.entity";
import useTasksState from "../state/useTasksState";
import useAddTask from "../hooks/useAddTask";

export const TaskFormPage = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TodoDto>();

  const tasks = useTasksState(s => s.tasks);
  console.log(tasks);

  const addTask = useAddTask(() => {reset()});

  const onSubmit = handleSubmit(data => {
    addTask.mutate(data);
  })

  return (
    <div className="bg-zinc-800 max-w-md 2-full p-10 rounded-md">
      <h1 className="text-3xl text-center font-bold mb-3">Add Task</h1>
      <form onSubmit={onSubmit}>
        <input
          {...register("title", { required: true})}
          className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
          autoFocus
          type="text"
          placeholder="Title"
        />
        {errors.title && (
            <p className="text-red-500">Title is required</p>
          )}

        <textarea
          {...register("description", { required: true})}
          className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
          rows={3}
          placeholder="Description"
        />
        {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}

        <button className="border p-3 rounded-md mt-2 w-full" type="submit">Add Task</button>
      </form>
    </div>
  );
};
