import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import RequestAuth from "../entities/requestAuth.entity";
import RegisterEntity from "../entities/register.entity";
import LoginEntity from "../entities/login.entity";
import jwt from "jsonwebtoken";
import config from "config";

export const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body as RegisterEntity;

  const userFund = await User.findOne({ email: email });
  if (userFund) return res.status(400).json("The email already exists");

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
    _id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginEntity;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) return userNotFound(res);

  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  res.cookie("token", foundUser.getAuthToken()).json({
    _id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
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

export const verifyToken = async (req: RequestAuth, res: Response) => {
  const foundUser = await User.findById(req.user.id);
  res.json({
    id: foundUser?._id,
    username: foundUser?.username,
    email: foundUser?.email,
    createdAt: foundUser?.createdAt,
    updatedAt: foundUser?.updatedAt,
  });
};

const userNotFound = (res: Response) => {
  return res.status(400).json("User not found");
};
