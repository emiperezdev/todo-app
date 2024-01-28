import { Router } from 'express';
import { login, logout, profile, register } from '../controllers/auth.controller';
import validator from '../middleware/validator';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import auth from '../middleware/auth';

const authRouter = Router();

authRouter.post('/register', validator(registerSchema), register);

authRouter.post('/login', validator(loginSchema), login);

authRouter.post('/logout', logout);

authRouter.post('/profile', auth, profile);

export default authRouter;