import { Navigate, Outlet } from "react-router-dom";
import useAuthState from "../state/useAuthState";

export const PrivateRoutes = () => {
  const isAuth = useAuthState(s => s.isAuth);
  if (!isAuth) return <Navigate to={'/login'} />

  return (
    <Outlet />
  )
}
