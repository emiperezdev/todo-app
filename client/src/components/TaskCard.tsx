import { Link } from "react-router-dom";
import TaskDto from "../entities/task.entity";
import useDeleteTask from "../hooks/useDeleteTask";

interface Props {
  task: TaskDto;
}

export const TaskCard = ({ task }: Props) => {
  const deleteTask = useDeleteTask();

  return (
    <div className="bg-sky-700 max-w-md w-full rounded-md p-6">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-slate-300 ">{new Date(task.date).toDateString()}</p>
      <div className="mt-3">
        <button
          className="bg-red-500 py-1 px-3 rounded-md me-2 hover:bg-red-600"
          onClick={() => deleteTask.mutate(task._id)}
        >
          Delete
        </button>
        <Link
          to={`/task/${task._id}`}
          className="bg-sky-500 py-2 px-3 rounded-md hover:bg-sky-600"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
