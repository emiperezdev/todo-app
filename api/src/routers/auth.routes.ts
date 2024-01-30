import { Router } from 'express';
import { login, logout, profile, register, verifyToken } from '../controllers/auth.controller';
import validator from '../middleware/validator';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import auth from '../middleware/auth';

const authRouter = Router();

authRouter.post('/register', validator(registerSchema), register);

authRouter.post('/login', validator(loginSchema), login);

authRouter.post('/logout', logout);

authRouter.get('/profile', auth, profile);

authRouter.get('/verify', auth, verifyToken);

export default authRouter;