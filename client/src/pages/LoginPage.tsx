import { useForm } from "react-hook-form";
import LoginDto from "../entities/login.entity";
import useLogin from "../hooks/useLogin";
import useErrorState from "../state/useErrorState";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginDto>();

  const error = useErrorState((s) => s.errors);

  const login = useLogin();

  const onSubmit = handleSubmit((data) => {
    login.mutate(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md mx-auto">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {error && (
          <div className="rounded-md bg-red-500 p-2 mt-6 text-white text-center">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
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
            Login
          </button>
        </form>

        <p className="mt-3 flex gap-x-2 justify-between">
          Don't have an account?
          <Link className="text-sky-500" to={"/register"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
