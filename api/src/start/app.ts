import express, { json } from 'express';
import morgan from 'morgan';
import authRouter from '../routers/auth.routes';
import cookieParser from 'cookie-parser';
import taskRouter from '../routers/task.routes';

const app = express();

app.use(json());
app.use(morgan('dev'));
app.use(cookieParser());

const baseURL = '/api'
app.use(baseURL, authRouter);
app.use(baseURL + '/tasks', taskRouter);

export default app;