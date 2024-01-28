import express, { json } from 'express';
import morgan from 'morgan';
import authRouter from '../routers/auth.router';
import cookieParser from 'cookie-parser';

const app = express();

app.use(json());
app.use(morgan('dev'));
app.use(cookieParser());

const baseURL = '/api'
app.use(baseURL, authRouter);

export default app;