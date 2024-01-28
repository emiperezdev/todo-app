import { NextFunction, Request, Response } from "express";
import RequestAuth from "../entities/requestAuth.entity";
import jwt from "jsonwebtoken";
import config from "config";

const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });

  try {
    const user = jwt.decode(token, config.get("jwtPrivateKey"));
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;
