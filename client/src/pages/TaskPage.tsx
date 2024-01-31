import { Link } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import useGetTasks from "../hooks/useGetTasks";

export const TaskPage = () => {
  const { data, error, isLoading } = useGetTasks();

  if (error) return <p>{error.message}</p>;
  if (data?.length === 0)
    return (
      <div className="flex justify-center">
        <Link
          className="my-4 p-4 bg-cyan-50 text-black rounded-md"
          to="/add-task"
        >
          Create Tasks
        </Link>
      </div>
    );

  return (
    <ul>
      {isLoading && (
        <button
          type="button"
          className="bg-sky-700 px-5 rounded-md m-4 pb-5"
          disabled
        >
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
          Processing...
        </button>
      )}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-2 m-3">
        {data?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </ul>
  );
};
