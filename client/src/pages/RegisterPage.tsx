import { useForm } from "react-hook-form";
import RegisterDto from "../entities/register.entity";
import useRegister from "../hooks/useRegister";
import useErrorState from "../state/useErrorState";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<RegisterDto>();

  const registerUser = useRegister(reset);

  const error = useErrorState((s) => s.errors);

  const onSubmit = handleSubmit((data) => {
    registerUser.mutate(data);
  });

  return (
    <div className="flex h-[calc(100vh-200px)] justify-center items-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md mx-auto">
        <h1 className="text-3xl text-center font-bold">Register</h1>

        {error && (
          <div className="text-center rounded-md bg-red-500 p-2 mt-6 text-white">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
            {...register("username", { required: true })}
            type="text"
            name="username"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
            {...register("email", { required: true })}
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
            {...register("password", { required: true })}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button className="border p-3 rounded-md mt-2 w-full" type="submit">
            Register
          </button>
        </form>

        <p className="mt-3 flex gap-x-2 justify-between">
          Already have an account?
          <Link className="text-sky-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
