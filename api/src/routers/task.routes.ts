import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import auth from "../middleware/auth";
import validator from "../middleware/validator";
import createTaskSchema from "../schemas/task.schema";
import validateId from "../middleware/validateId";

const taskRouter = Router();

taskRouter.get("", auth, getTasks);

taskRouter.post("", auth, validator(createTaskSchema), createTask);

taskRouter.get("/:id", auth, validateId, getTask);

taskRouter.delete("/:id", auth, validateId, deleteTask);

taskRouter.put(
  "/:id",
  auth,
  validateId,
  validator(createTaskSchema),
  updateTask
);

export default taskRouter;
