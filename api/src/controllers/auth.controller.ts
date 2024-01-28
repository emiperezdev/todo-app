import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import RequestAuth from "../entities/requestAuth.entity";
import RegisterEntity from "../entities/register.entity";
import LoginEntity from "../entities/login.entity";

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body as RegisterEntity;
  const newUser = new User({
    username,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.validate();
  const savedUser = await newUser.save();

  res.cookie("token", savedUser.getAuthToken()).status(201).json({
    id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
    updatedAt: savedUser.updatedAt,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginEntity;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) return userNotFound(res);

  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (!validPassword) return userNotFound(res);

  res.cookie("token", foundUser.getAuthToken()).json({
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    createdAt: foundUser.createdAt,
    updatedAt: foundUser.updatedAt,
  });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  res.sendStatus(200);
};

export const profile = async (req: RequestAuth, res: Response) => {
  const foundUser = await User.findById(req.user.id);
  if (!foundUser) return userNotFound(res);

  res.json({
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    createdAt: foundUser.createdAt,
    updatedAt: foundUser.updatedAt,
  });
};

const userNotFound = (res: Response) => {
  return res.status(400).json({ message: "User not found" });
};
