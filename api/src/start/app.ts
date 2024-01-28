import express, { json } from 'express';
import morgan from 'morgan';
import authRouter from '../routers/auth.router';

const app = express();

app.use(json());
app.use(morgan('dev'));

const baseURL = '/api'
app.use(baseURL, authRouter);

export default app;