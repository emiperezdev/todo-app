import Joi from "joi";
import Register from "../entities/register.entity";

export const registerSchema = (register: Register) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().min(13).max(30).trim().email().required(),
    password: Joi.string().min(5).max(255).trim().required(),
  });

  return schema.validate(register);
};
