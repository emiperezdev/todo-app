import { Outlet } from "react-router-dom";
import useVerifyToken from "../hooks/useVerifyToken";
import Cookies from "js-cookie";
import useAuthState from "../state/useAuthState";
import useUserState from "../state/useUserState";

export const Layout = () => {
  const cookies = Cookies.get();
  const setIsAuth = useAuthState((s) => s.setIsAuth);
  const setUser = useUserState((s) => s.setUser);

  if (cookies.token) {
    try {
      const { data } = useVerifyToken();
      if (!data) return setIsAuth(false);

      setIsAuth(true);
      setUser(data);
    } catch (err) {
      setIsAuth(false);
      setUser();
    }
  }

  return <Outlet />;
};
