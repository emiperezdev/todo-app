import { Router } from 'express';
import { login, logout, profile, register } from '../controllers/auth.controller';
import validator from '../middleware/validator';
import { registerSchema } from '../schemas/auth.schema';

const authRouter = Router();

authRouter.post('/register', validator(registerSchema), register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/profile', profile);

export default authRouter;