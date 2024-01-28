import { Request, Response } from "express";
import Task from "../models/Task";
import RequestAuth from "../entities/requestAuth.entity";
import TaskEntity from "../entities/task.entity";

export const getTasks = async (req: RequestAuth, res: Response) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");

  res.json(tasks);
};

export const createTask = async (req: RequestAuth, res: Response) => {
  const { title, description } = req.body as TaskEntity;
  const newTask = new Task({
    title,
    description,
    user: req.user.id,
  });

  await newTask.validate();
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req: Request, res: Response) => {
  const foundTask = await Task.findById(req.params.id);
  if (!foundTask) return noTaskFound(res);

  res.json(foundTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const foundTask = await Task.findByIdAndDelete(req.params.id).populate(
    "user"
  );
  if (!foundTask) return noTaskFound(res);

  res.json(foundTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { title, description } = req.body as TaskEntity;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
    },
    { new: true }
  );
  if (!updatedTask) return noTaskFound(res);

  res.json(updatedTask);
};

const noTaskFound = (res: Response) => {
  return res.status(404).json({ message: "No task found" });
};
