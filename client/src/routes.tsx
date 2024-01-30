import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoutes } from "./pages/PrivateRoutes";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "/tasks", element: <TaskPage /> },
          { path: "/add-task", element: <TaskFormPage /> },
          { path: "/task/:id", element: <TaskFormPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

export default router;
