import { Router } from 'express';
import { login, logout, profile, register } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/profile', profile);

export default authRouter;