import useGetTasks from "../hooks/useGetTasks";

export const TaskPage = () => {
  const { data, error, isLoading } = useGetTasks();

  if (error) return <p>{error.message}</p>;
  if (data?.length === 0) return <p>No Tasks Created</p>;

  return (
    <ul>
      {isLoading && (
        <button
          type="button"
          className="bg-indigo-500 px-5 rounded-md m-4 pb-5"
          disabled
        >
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
          Processing...
        </button>
      )}
      {data?.map((task) => (
        <div key={task._id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </ul>
  );
};
