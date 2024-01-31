import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthState from "../state/useAuthState";
import useUserState from "../state/useUserState";
import { NavBar } from "../components/NavBar";
import { useEffect } from "react";
import APIClient from "../services/api-client";
import RegisterDto from "../entities/register.entity";

const Layout = () => {
  const cookies = Cookies.get();
  const setIsAuth = useAuthState((s) => s.setIsAuth);
  const setUser = useUserState((s) => s.setUser);

  useEffect(() => {
    const verifyToken = async () => {
      if (cookies.token) {
        try {
          const apiClient = new APIClient<RegisterDto>("/verify");
          const data = await apiClient.get();
          if (!data) return setIsAuth(false);

          setIsAuth(true);
          setUser(data);
        } catch (err) {
          setIsAuth(false);
          setUser();
        }
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="container mx-auto">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
