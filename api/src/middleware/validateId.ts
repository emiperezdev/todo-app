import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

const validateId = (req: Request, res: Response, next: NextFunction) => {
  if (!isValidObjectId(req.params.id))
    return res.status(404).json({ message: "Invalid task id" });

  next();
};

export default validateId;
