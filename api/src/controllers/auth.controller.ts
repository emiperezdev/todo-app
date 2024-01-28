import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.validate();
  const savedUser = await newUser.save();

  res.cookie('token', savedUser.getAuthToken()).status(201).json({
    id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
    password: savedUser.password
  });
}

export const login = (req: Request, res: Response) => {
  res.json('login');
}

export const logout = (req: Request, res: Response) => {
  res.json('logout');
}

export const profile = (req: Request, res: Response) => {
  res.json('profile');
}