import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth.route.js';
import startServer from './server.js';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

startServer();
