import { Request } from "express";

export default interface RequestAuth extends Request {
  user?: any;
}
