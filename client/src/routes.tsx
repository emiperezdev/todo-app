import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/tasks", element: <h1>Tasks</h1> },
  { path: "/add-task", element: <h1>new task</h1> },
  { path: "/task/:id", element: <h1>update task</h1> },
  { path: "/profile", element: <h1>profile</h1> },
]);

export default router;
