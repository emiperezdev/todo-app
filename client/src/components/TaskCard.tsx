import TaskDto from "../entities/task.entity";
import useDeleteTask from "../hooks/useDeleteTask";

interface Props {
  task: TaskDto;
}

export const TaskCard = ({ task }: Props) => {
  const deleteTask = useDeleteTask();

  return (
    <div className="bg-zinc-800 max-w-md w-full rounded-md p-6">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-slate-300 ">{new Date(task.date).toDateString()}</p>
      <div className="mt-3">
        <button
          className="bg-red-500 py-1 px-3 rounded-md me-2"
          onClick={() => deleteTask.mutate(task._id)}
        >
          Delete
        </button>
        <button
          className="bg-sky-500 py-1 px-3 rounded-md"
          onClick={() => console.log('Edit', task._id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
