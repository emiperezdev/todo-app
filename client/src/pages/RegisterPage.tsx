import { useForm } from "react-hook-form";
import RegisterDto from "../entities/register.entity";
import useRegister from "../hooks/useRegister";

export const RegisterPage = () => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<RegisterDto>();

  const registerUser = useRegister();

  const onSubmit = handleSubmit((data) => {
    registerUser.mutate(data);
    console.log(data);
    reset();
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md mx-auto">
      <form onSubmit={onSubmit}>
        <input
          className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
          {...register("username", { required: true })}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
          {...register("email", { required: true })}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md"
          {...register("password", { required: true })}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
