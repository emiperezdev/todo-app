import { Link } from "react-router-dom";
import useAuthState from "../state/useAuthState";
import useUserState from "../state/useUserState";
import Cookies from "js-cookie";

export const NavBar = () => {
  const isAuth = useAuthState((s) => s.isAuth);
  const setAuth = useAuthState((s) => s.setIsAuth);
  const user = useUserState((s) => s.user);
  const setUser = useUserState((s) => s.setUser);

  const logout = () => {
    Cookies.remove("token");
    setAuth(false);
    setUser();
  };

  return (
    <nav className="bg-zinc-700 flex justify-between py-5 px-10">
      <h1 className="text-2xl font-bold">Tasks Manager</h1>
      <ul className="flex gap-x-4">
        {isAuth ? (
          <>
            <li className="">Welcome {user?.username}</li>
            <li>
              <Link
                to={"/add-task"}
                className="bg-indigo-500 px-4 py-1 rounded-md"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-indigo-500 px-4 py-1 rounded-md"
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={"/login"}
                className="bg-indigo-500 px-4 py-1 rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className="bg-indigo-500 px-4 py-1 rounded-md"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
